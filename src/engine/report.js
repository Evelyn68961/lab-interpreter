// Build a Markdown / plain-text report of the current panel's interpretation.
// Used by the "Copy report" button. Bilingual via i18n helpers.

import { t, tt, UI } from '../i18n.js';

export function buildReport({ panel, audience, lang, inputs, context, results, patterns }) {
  const lines = [];
  const now = new Date().toLocaleString(lang === 'zh' ? 'zh-Hant' : 'en');

  lines.push(`# ${t(UI.exports.reportTitle, lang)}`);
  lines.push('');
  lines.push(`_${t(UI.exports.generated, lang)}: ${now}_`);
  lines.push('');
  lines.push(`## ${t(panel.name, lang)}`);
  lines.push('');
  lines.push(tt(panel.blurb, lang, audience));
  lines.push('');

  // Entered values
  lines.push(`### ${t(UI.exports.enteredValues, lang)}`);
  const entered = panel.analytes.filter((a) => inputs[a.id] !== undefined && inputs[a.id] !== '');
  if (entered.length === 0) {
    lines.push(`_${t(UI.exports.none, lang)}_`);
  } else {
    for (const a of entered) {
      const unit = t(a.unit, lang);
      lines.push(`- **${t(a.name, lang)}**: ${inputs[a.id]}${unit ? ' ' + unit : ''}`);
    }
  }
  lines.push('');

  // Clinical context
  const ctxOpts = panel.contextOptions || [];
  const enteredCtx = ctxOpts.filter((o) => {
    const v = context[o.id];
    return v !== undefined && v !== '' && v !== false && v !== null;
  });
  if (enteredCtx.length > 0) {
    lines.push(`### ${t(UI.exports.clinicalContext, lang)}`);
    for (const o of enteredCtx) {
      let value = context[o.id];
      if (o.type === 'select') {
        const found = (o.options || []).find((opt) => opt.value === value);
        value = found ? t(found.label, lang) : value;
      } else if (o.type === 'toggle') {
        value = '✓';
      }
      lines.push(`- **${t(o.label, lang)}**: ${value}`);
    }
    lines.push('');
  }

  // Patterns first (most clinically meaningful)
  if (patterns && patterns.length > 0) {
    lines.push(`### ${t(UI.results.patterns, lang)}`);
    for (const p of patterns) {
      lines.push(`#### ${t(p.name, lang)} — _${t(UI.confidence[p.confidence], lang)}_`);
      if (p.notes) lines.push(`> ${p.notes}`);
      lines.push(tt(p.explanation, lang, audience));
      lines.push('');
      lines.push(`**${t(UI.results.nextStep, lang)}** ${tt(p.nextSteps, lang, audience)}`);
      if (p.references && p.references.length > 0) {
        lines.push('');
        lines.push(`**${t(UI.results.references, lang)}:**`);
        for (const r of p.references) lines.push(`- [${r.label}](${r.url})`);
      }
      lines.push('');
    }
  }

  // Per-test
  if (results && results.length > 0) {
    lines.push(`### ${t(UI.results.perTest, lang)}`);
    for (const { analyte, result } of results) {
      const unit = t(analyte.unit, lang);
      const levelLabel = t(UI.levels[result.level] ?? UI.levels.invalid, lang);
      lines.push(
        `- **${t(analyte.name, lang)}** = ${result.value}${unit ? ' ' + unit : ''} — _${levelLabel}: ${t(result.title, lang)}_`
      );
      lines.push(`  ${tt(result.message, lang, audience)}`);
      if (result.suggestion) lines.push(`  _${tt(result.suggestion, lang, audience)}_`);
    }
    lines.push('');
  }

  // Panel-level guidelines
  if (panel.references && panel.references.length > 0) {
    lines.push(`### ${t(UI.results.panelReferences, lang)}`);
    for (const r of panel.references) lines.push(`- [${r.label}](${r.url})`);
    lines.push('');
  }

  // Disclaimer
  lines.push('---');
  lines.push(`**${t(UI.disclaimer.strong, lang)}** ${t(UI.disclaimer.body, lang)}`);

  return lines.join('\n');
}
