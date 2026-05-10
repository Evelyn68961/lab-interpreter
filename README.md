# Lab Data Interpreter

A multi-panel web tool that interprets common lab values and recognizes classic
combined patterns (DIC, warfarin effect, anemia subtypes, AKI patterns, anion-gap
acidosis, and more).

## Panels
- Coagulation (PT, INR, aPTT, D-dimer, fibrinogen)
- CBC (WBC, Hgb, MCV, platelets, neutrophil %)
- Renal (creatinine, BUN, eGFR)
- Basic electrolytes (Na, K, Cl, HCO3)

## Features
- Per-test interpretation with severity levels (low / normal / borderline / therapeutic / high / critical)
- **Combined-pattern recognition** (the headline feature) — surfaces DIC, warfarin / heparin / liver patterns, anemia subtypes, prerenal vs intrinsic AKI, anion-gap acidosis, etc.
- **Reading-level toggle** — every interpretation has both a *clinical* and a *patient-friendly* version
- **Clinical context inputs** — anticoagulation, indication, sex, age, etc. — refine interpretation (e.g., INR target depends on warfarin indication)
- Persistent state across reloads (localStorage)
- Responsive layout, accessible labels, no-JS-framework runtime dependencies

## Stack
React 18 + Vite. Static build, deployable to GitHub Pages or any static host.

## Local development
```bash
npm install
npm run dev
```

## Build
```bash
npm run build
```
Outputs static assets to `dist/`.

## Important
**Educational use only.** This tool is not a substitute for clinical judgment,
diagnosis, or treatment from a qualified healthcare professional. Reference
ranges vary by laboratory and assay.

## Legacy
The original vanilla HTML/CSS/JS implementation is preserved in [legacy/](legacy/).
