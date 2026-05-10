// Run an analyte's rules against a value + clinical context.
// Returns { level, title, message: {clinical, patient}, suggestion } or null when no value.
//
// Each rule shape:
//   { when: (value, context) => boolean,
//     level: 'low' | 'normal' | 'borderline' | 'therapeutic' | 'high' | 'critical',
//     title: string,
//     message: { clinical: string, patient: string },
//     suggestion?: { clinical: string, patient: string } }
//
// Rules are evaluated in order; the first match wins. Put more specific
// (context-dependent) rules ahead of generic numeric thresholds.

export function interpretAnalyte(analyte, rawValue, context) {
  if (rawValue === '' || rawValue === null || rawValue === undefined) return null;
  const value = Number(rawValue);
  if (Number.isNaN(value)) return null;
  if (value < 0) {
    return {
      level: 'invalid',
      title: 'Invalid value',
      message: {
        clinical: 'Negative values are not physiologic.',
        patient: 'That value cannot be negative — please re-check.',
      },
    };
  }

  for (const rule of analyte.rules) {
    if (rule.when(value, context)) {
      return {
        level: rule.level,
        title: rule.title,
        message: rule.message,
        suggestion: rule.suggestion,
        value,
        unit: analyte.unit,
      };
    }
  }
  return null;
}

// Choose the dwarf's verdict tier based on per-test results + matched patterns.
// 4 tiers: 'normal' | 'borderline' | 'concerning' | 'critical'.
//   - any high-confidence pattern        → 'critical'
//   - any critical level                 → 'critical'
//   - any high or low                    → 'concerning'
//   - moderate-confidence pattern        → bumps 'borderline' up to 'concerning'
//   - any borderline                     → 'borderline'
//   - everything normal/therapeutic      → 'normal'
export function verdictTier(results, patterns) {
  const levels = results.map((r) => r.result?.level).filter(Boolean);
  const hasHighConf = patterns?.some((p) => p.confidence === 'high');
  const hasModConf = patterns?.some((p) => p.confidence === 'moderate');

  if (hasHighConf) return 'critical';
  if (levels.includes('critical')) return 'critical';
  if (levels.includes('high') || levels.includes('low')) return 'concerning';
  if (hasModConf) return 'concerning';
  if (levels.includes('borderline')) return 'borderline';
  return 'normal';
}

// Helper to read parsed numeric values across a panel (used by patterns.js).
export function collectValues(panel, inputs) {
  const out = {};
  for (const a of panel.analytes) {
    const raw = inputs[a.id];
    if (raw === '' || raw === null || raw === undefined) continue;
    const n = Number(raw);
    if (!Number.isNaN(n) && n >= 0) out[a.id] = n;
  }
  return out;
}
