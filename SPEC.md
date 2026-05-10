# Lab Interpreter — Specification

This document describes how the system is put together and how to extend it.
Read [README.md](README.md) first for what the tool does at a user level.

## Architecture

```
                    ┌──────────────┐
                    │   App.jsx    │
                    └──────┬───────┘
                           │
              ┌────────────┼────────────┐
              ▼            ▼            ▼
         Header     PanelTabs       LabPanel
                                      │
        ┌─────────────────┬───────────┼──────────────┬─────────────┐
        ▼                 ▼           ▼              ▼             ▼
  DwarfGreeting    ContextPanel  LabInput[]   DwarfVerdict   PatternCard[] / ResultCard[]
        │                                     │
        └────── reads panel.dwarf ────────────┘
                                              │
                       ┌──────────────────────┴──────────────────────┐
                       ▼                                              ▼
               engine/interpret.js                          engine/patterns.js
                  · interpretAnalyte()                         · runPatterns()
                  · verdictTier()                              · 12 pattern definitions
                  · collectValues()
```

The flow is one-way:

1. **Data** ([src/data/](src/data/)) defines panels, analytes, rules, dwarfs.
2. **Engine** ([src/engine/](src/engine/)) consumes data + user inputs,
   produces results / patterns / verdict tier / Markdown report.
3. **Components** ([src/components/](src/components/)) render engine output.

State lives in [LabPanel.jsx](src/components/LabPanel.jsx) (per-panel inputs +
context, persisted via [usePersistedState](src/hooks/usePersistedState.js)) and
in [App.jsx](src/App.jsx) (audience, language, active panel).

## Bilingual + audience model

Every text field is one of three shapes:

```js
"plain string"                                              // 1. no translation needed (numbers, units)
{ en: "...", zh: "..." }                                    // 2. one axis: language
{ en: { clinical, patient }, zh: { clinical, patient } }    // 3. two axes: language × audience
```

Resolved in [i18n.js](src/i18n.js):

- `t(field, lang)` — handles shapes 1 and 2.
- `tt(field, lang, audience)` — handles shape 3 (with shape-2 fallback).

UI strings live in `i18n.js#UI`. Medical strings live in the `data/` files.

## Data model

### Panel

```js
{
  id: 'coagulation',
  name:      { en, zh },          // shape 2
  shortName: { en, zh },
  blurb:     { en: {clinical, patient}, zh: {clinical, patient} },  // shape 3
  dwarf:     { /* see Dwarf below */ },
  references: [{label, url}, ...],
  contextOptions: [
    { id, label: {en,zh}, type: 'toggle' | 'select' | 'number',
      options?: [{value, label: {en,zh}}], hint?: {en,zh} }
  ],
  analytes: [{ /* see Analyte */ }],
}
```

### Analyte

```js
{
  id: 'pt',
  name:        { en, zh },
  fullName:    { en, zh },
  unit:        { en, zh },
  placeholder: { en, zh },
  normalRange: { en, zh },
  description: { en: {clinical, patient}, zh: {clinical, patient} },
  rules: [/* see Rule */],
  references: [{label, url}],   // optional
}
```

### Rule (per-analyte threshold)

```js
{
  when: (value, context) => boolean,        // first match wins
  level: 'low' | 'normal' | 'borderline' | 'therapeutic' | 'high' | 'critical',
  title:   { en, zh },
  message: { en: {clinical, patient}, zh: {clinical, patient} },
  suggestion?: { en: {clinical, patient}, zh: {clinical, patient} },  // optional
}
```

Rules are evaluated top-down by [`interpretAnalyte`](src/engine/interpret.js).
**Order matters** — context-dependent rules (e.g. INR while on warfarin) must
appear before generic numeric rules so they take precedence.

### Pattern (combined recognisers)

```js
{
  id: 'dic',
  name: { en, zh },
  panel: 'coagulation',                     // which panel this belongs to
  explanation: { en: {clinical, patient}, zh: {clinical, patient} },
  nextSteps:   { en: {clinical, patient}, zh: {clinical, patient} },
  dwarfQuip:   { en, zh },                  // shown in verdict bubble when matched
  references:  [{label, url}],
  match(values, context) {                  // values = parsed numeric inputs
    if (!has(values, 'pt', 'aptt', ...)) return { matched: false };
    // ...
    return { matched: true, confidence: 'high' | 'moderate' | 'low', notes?: '...' };
  }
}
```

### Dwarf (panel-level mascot)

```js
{
  id: 'ferrum',                             // matches Dwarf.jsx variant
  name: 'Ferrum Stoutbeard',                // proper noun — not translated
  title: { en, zh },
  greeting: { en, zh },                     // shown above inputs (always calm face)
  verdicts: {                               // shown after Interpret, face matches tier
    normal:      { en, zh },
    borderline:  { en, zh },
    concerning:  { en, zh },
    critical:    { en, zh },
  },
}
```

## The interpretation engine

[`interpretAnalyte(analyte, value, context)`](src/engine/interpret.js) →
`{ level, title, message, suggestion?, value, unit }` or `null`.

- Walks `analyte.rules` top-down; returns the first matching rule's payload.
- Negative values short-circuit to an `'invalid'` result.
- Empty / non-numeric inputs return `null` (no card rendered).

[`collectValues(panel, inputs)`](src/engine/interpret.js) → flat numeric
object, used by patterns.

## The pattern engine

[`runPatterns(panelId, values, context)`](src/engine/patterns.js) returns the
list of matched patterns for a panel, each with explanation, next steps,
dwarf quip, references, and confidence level.

Patterns use `has(values, ...keys)` to require enough inputs to be meaningful.
Each pattern's `match()` returns `{ matched: true, confidence, notes? }` or
`{ matched: false }`.

## The verdict-tier helper

[`verdictTier(results, patterns)`](src/engine/interpret.js) collapses all the
per-test results and matched patterns into one of four tiers:

| Tier | Trigger |
|---|---|
| `normal` | all values normal/therapeutic, no patterns |
| `borderline` | any borderline value |
| `concerning` | any low/high, OR moderate-confidence pattern |
| `critical` | any critical value, OR high-confidence pattern |

A high-confidence pattern always escalates to `critical` — clinically that's
the right call (DIC with all 4 features beats individual borderline thresholds).

Used by [DwarfVerdict.jsx](src/components/DwarfVerdict.jsx) for face,
glyph, and bubble accent; also exported in the Markdown report.

## Dwarf SVG system

[Dwarf.jsx](src/components/Dwarf.jsx) takes:

- `variant` — one of `ferrum`, `ruby`, `stoneward`, `saltbeard`. Selects
  helmet / beard / accent colour palette.
- `expression` — one of `calm`, `alert`, `stern`, `alarmed`. Selects
  eyebrow paths, eye size, mustache shape.
- `size` — pixel width; height scales to maintain 120:150 viewBox aspect.

`tierToExpression` map (also exported) converts verdict tier → expression:

```js
{ normal: 'calm', borderline: 'alert', concerning: 'stern', critical: 'alarmed' }
```

The greeting dwarf is always `calm` (passes no expression prop). The verdict
dwarf reads tier and picks its face accordingly.

## i18n + audience flow

```
┌────────────────────────────────────────────┐
│ App owns: lang ('en'|'zh'), audience       │
└──────────────────┬─────────────────────────┘
                   │ props
        ┌──────────┴───────────┐
        ▼                      ▼
   PanelTabs(lang)       LabPanel(lang, audience)
                                  │ props
                  ┌───────────────┼───────────────┐
                  ▼               ▼               ▼
            DwarfGreeting    LabInput        DwarfVerdict
            (lang)           (lang,          (lang)
                              audience)
```

Components call `t(field, lang)` or `tt(field, lang, audience)` to resolve.

## Castle theme + animations

Theme tokens are CSS custom properties at `:root` ([global.css](src/styles/global.css)):

- `--stone-darkest` ... `--stone-light`: backgrounds
- `--parchment`, `--parchment-2`, `--parchment-shade`, `--parchment-fold`: surfaces
- `--brass`, `--brass-light`, `--brass-dark`: borders, accents, gold
- `--burgundy`, `--burgundy-deep`, `--burgundy-light`: banners, primary CTA
- `--ink`, `--ink-soft`, `--ink-faded`: text
- `--level-{low,normal,borderline,therapeutic,high,critical}`: severity colours

Entrance animations on Interpret (all CSS-only):

| Element | Animation | Delay |
|---|---|---|
| `.dwarf-verdict` | fade up + scale | 0s |
| `.dwarf-verdict-glyph` | bouncy pop | 0.35s |
| Each `.dwarf-verdict-quip` | slide from left | 0.55s + 0.12s × index |
| Section headings | fade | 0.55s / 0.85s |
| Each `.pattern-card` | fade up | 0.7s + 0.08s × index |
| Each `.result-card` | fade up | 0.9s + 0.06s × index |

Critical tier additionally pulses `box-shadow` twice.

`prefers-reduced-motion: reduce` disables all animations. Print stylesheet
disables them too via `* { animation: none !important; }`.

## Persistence

[`usePersistedState(key, initial)`](src/hooks/usePersistedState.js) is a
drop-in `useState` replacement that syncs to `localStorage` on every change.
Keys used:

- `lab.lang` — selected language
- `lab.audience` — clinical / patient
- `lab.activePanel` — current panel id
- `lab.inputs.<panelId>` — entered values per panel
- `lab.context.<panelId>` — clinical context per panel

`submitted` is intentionally NOT persisted — refreshing the page returns to
the input view.

## Print + report export

Two paths:

1. **Print / Save as PDF** — `window.print()` triggers the browser dialog.
   The print stylesheet (bottom of [global.css](src/styles/global.css)) hides
   form chrome (`.no-print`, tabs, toggles, action buttons, dwarf greeting),
   strips background colours, expands result grid to single column, expands
   reference URLs inline (`href` shown after each link), and disables animations.
   A hidden `.print-only` `PrintHeader` (in [LabPanel.jsx](src/components/LabPanel.jsx))
   appears in print with date + entered values + clinical context summary.

2. **Copy report** — [`buildReport()`](src/engine/report.js) generates a
   Markdown string with title, date, entered values, clinical context, dwarf
   verdict + tier + pattern quips, combined patterns (with refs), per-test
   results, panel-level guidelines, and disclaimer. Written to clipboard via
   `navigator.clipboard.writeText` with an `execCommand('copy')` fallback for
   contexts where the modern API is blocked.

## How to extend

### Add a new panel

1. Create `src/data/<panel>.js` exporting a panel object (see Panel above).
2. Register it in [src/data/index.js](src/data/index.js) — add to `panels` array.
3. Author a dwarf for it (see "Add a new dwarf").
4. If your panel needs combined patterns, add them to
   [src/engine/patterns.js](src/engine/patterns.js) with `panel: '<your-id>'`.
5. Done — `LabPanel` renders any panel data shape generically.

### Add a new analyte

Add an entry to the panel's `analytes` array. Make sure rules are ordered
context-specific → numeric, top match wins.

### Add a new pattern

Append to the `patterns` array in [patterns.js](src/engine/patterns.js):

```js
{
  id: 'unique-id',
  name: { en, zh },
  panel: 'coagulation',
  explanation: { en: {clinical, patient}, zh: {clinical, patient} },
  nextSteps:   { en: {clinical, patient}, zh: {clinical, patient} },
  dwarfQuip:   { en, zh },
  references:  [{label, url}],
  match(values, context) {
    if (!has(values, 'requiredKey1', 'requiredKey2')) return { matched: false };
    // ... your logic
    return { matched: true, confidence: 'high' | 'moderate' };
  }
}
```

### Add a new dwarf

1. Add a colour variant to `variants` in [Dwarf.jsx](src/components/Dwarf.jsx)
   under a new key (e.g. `'mossbeard'`).
2. Add a `dwarf:` block to the panel's data file with `id` matching your
   variant key, `name`, `title`, `greeting`, and `verdicts` for all four tiers.
3. The same SVG handles all four expressions automatically — no asset work.

### Add a new language

1. Add the language code to `LANGS` in [i18n.js](src/i18n.js).
2. Translate every `{en, zh}` and `{en: {...}, zh: {...}}` field across
   `src/data/`, `src/engine/patterns.js`, and `src/i18n.js#UI`. The `t` /
   `tt` helpers fall back to English if the new language is missing.
3. Add a font fallback rule in [global.css](src/styles/global.css) under a
   matching `[lang="..."]` selector if the script needs different fonts.
4. Add a button to the language toggle in [Header.jsx](src/components/Header.jsx).

### Add a new audience

(Same idea as language — extend the inner object shape in `tt()` consumers.)

## Tested in production

- Vite production build passes (`npm run build`)
- Bundle size: ~85 KB JS gzipped, ~6 KB CSS gzipped
- No runtime dependencies beyond React 18

## Disclaimer

This is an educational tool. Reference ranges, thresholds, and clinical
recommendations vary by laboratory, assay, guideline body, and patient
population. Always correlate with the patient's full clinical picture and
consult current local guidelines for management decisions.
