# Lab Data Interpreter

A multi-panel web tool that interprets common lab values and recognises classic
combined patterns. Built around a small cast of dwarven companions who
greet, judge, and react to your results.

> ⚠️ **Educational use only.** This tool is not a substitute for clinical
> judgment, diagnosis, or treatment from a qualified healthcare professional.
> Reference ranges vary by laboratory and assay.

## Features

- **4 lab panels** — Coagulation (PT, INR, aPTT, D-dimer, fibrinogen),
  CBC (WBC, Hgb, MCV, platelets, neutrophil %), Renal (creatinine, BUN, eGFR),
  Basic electrolytes (Na, K, Cl, HCO₃)
- **Per-test interpretation** with severity levels: low / normal /
  borderline / therapeutic / high / critical
- **Combined-pattern recognition** (the headline feature) — surfaces 12
  classic profiles: DIC, warfarin effect, heparin effect, liver dysfunction,
  microcytic / macrocytic anemia, bacterial pattern, pancytopenia, prerenal /
  intrinsic AKI, anion-gap acidosis, severe hyperkalaemia
- **Bilingual content** — English + 繁體中文; toggle persists per session
- **Dual reading levels** — every description and interpretation has a
  *clinical* and *patient-friendly* version
- **Clinical context inputs** — anticoagulation, indication, sex, age, etc.
  refine interpretation (e.g. INR target depends on warfarin indication;
  D-dimer threshold is age-adjusted >50 yrs)
- **Dwarven companions** — each panel has a named dwarf with a stylised SVG
  portrait. The same dwarf greets you, then judges your results with a
  tier-appropriate face (calm → alert → stern → alarmed) and a verdict
  voiced in his own metaphor set. Pattern-specific quips (e.g. "DIC! The
  forge devours itself") appear when patterns match
- **Reference citations** at panel, analyte, and pattern level — links to
  KDIGO, CHEST/ACCP, ASH, ISTH, and UpToDate topic searches
- **Printable / exportable report** — Print or Save as PDF (browser-native
  via `window.print()`); Copy report to clipboard as Markdown including
  entered values, clinical context, dwarf's verdict, patterns, and references
- **Persistent state** — inputs, context, audience, language, and active
  panel survive page reloads via `localStorage`
- **Castle theme** — stone, parchment, banners, brass borders. Cinzel +
  Crimson Pro for English; PingFang TC / Microsoft JhengHei for Chinese
- **Accessibility** — semantic HTML, ARIA labels, `prefers-reduced-motion`
  disables animations
- **Responsive** — single-column mobile layout

## Stack

React 18 + Vite. No runtime UI framework dependencies beyond React itself.
Static build, deployable to GitHub Pages or any static host.

## Local development

```bash
npm install
npm run dev      # vite dev server at http://localhost:5173/
```

## Build

```bash
npm run build    # outputs to dist/
npm run preview  # preview the production build locally
```

`vite.config.js` sets `base: './'` so the build drops into GitHub Pages
without further configuration.

## Project layout

See [SPEC.md](SPEC.md) for architecture, data model, and instructions on
adding new panels, analytes, patterns, or dwarfs.

```
src/
├── App.jsx, main.jsx            # entry
├── i18n.js                      # bilingual helpers + UI strings
├── data/                        # panel + analyte definitions (bilingual)
│   ├── coagulation.js, cbc.js, renal.js, electrolytes.js
│   └── index.js                 # panel registry
├── engine/
│   ├── interpret.js             # rule evaluation + verdict tier helper
│   ├── patterns.js              # combined-pattern recognisers + quips
│   └── report.js                # Markdown report generator
├── components/
│   ├── Header.jsx, PanelTabs.jsx, ContextPanel.jsx
│   ├── LabInput.jsx, LabPanel.jsx
│   ├── ResultCard.jsx, PatternCard.jsx, References.jsx
│   ├── Dwarf.jsx                # SVG bust, 4 colour variants × 4 expressions
│   ├── DwarfGreeting.jsx        # panel intro
│   ├── DwarfVerdict.jsx         # post-Interpret reaction with quips
│   └── Disclaimer.jsx
├── hooks/usePersistedState.js
└── styles/global.css            # castle theme + animations + print
```

## Legacy

The original vanilla HTML/CSS/JS implementation is preserved in [legacy/](legacy/).
