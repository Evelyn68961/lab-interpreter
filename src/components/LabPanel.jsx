import { useMemo, useState } from 'react';
import { LabInput } from './LabInput.jsx';
import { ResultCard } from './ResultCard.jsx';
import { PatternCard } from './PatternCard.jsx';
import { ContextPanel } from './ContextPanel.jsx';
import { References } from './References.jsx';
import { DwarfGreeting } from './DwarfGreeting.jsx';
import { DwarfVerdict } from './DwarfVerdict.jsx';
import { interpretAnalyte, collectValues, verdictTier } from '../engine/interpret.js';
import { runPatterns } from '../engine/patterns.js';
import { buildReport } from '../engine/report.js';
import { usePersistedState } from '../hooks/usePersistedState.js';
import { UI, t, tt } from '../i18n.js';

export function LabPanel({ panel, audience, lang }) {
  const [inputs, setInputs] = usePersistedState(`lab.inputs.${panel.id}`, {});
  const [context, setContext] = usePersistedState(`lab.context.${panel.id}`, {});
  const [submitted, setSubmitted] = useState(false);
  const [copyState, setCopyState] = useState('idle'); // idle | copied

  const handleChange = (id, value) => {
    setInputs({ ...inputs, [id]: value });
  };

  const reset = () => {
    setInputs({});
    setSubmitted(false);
  };

  const results = useMemo(() => {
    if (!submitted) return [];
    return panel.analytes
      .map((a) => ({ analyte: a, result: interpretAnalyte(a, inputs[a.id], context) }))
      .filter((r) => r.result);
  }, [panel, inputs, context, submitted]);

  const matchedPatterns = useMemo(() => {
    if (!submitted) return [];
    return runPatterns(panel.id, collectValues(panel, inputs), context);
  }, [panel, inputs, context, submitted]);

  const verdictLevel = useMemo(
    () => (submitted ? verdictTier(results, matchedPatterns) : 'normal'),
    [submitted, results, matchedPatterns]
  );

  const filledCount = panel.analytes.filter(
    (a) => inputs[a.id] !== undefined && inputs[a.id] !== ''
  ).length;
  const valuesLabel =
    filledCount === 1 ? t(UI.actions.interpretValues, lang) : t(UI.actions.interpretValuesPlural, lang);

  const handlePrint = () => window.print();

  const handleCopy = async () => {
    const md = buildReport({
      panel,
      audience,
      lang,
      inputs,
      context,
      results,
      patterns: matchedPatterns,
    });
    try {
      await navigator.clipboard.writeText(md);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 1800);
    } catch {
      // Fallback for browsers / contexts where clipboard API is blocked
      const ta = document.createElement('textarea');
      ta.value = md;
      document.body.appendChild(ta);
      ta.select();
      document.execCommand('copy');
      document.body.removeChild(ta);
      setCopyState('copied');
      setTimeout(() => setCopyState('idle'), 1800);
    }
  };

  return (
    <section className="lab-panel">
      <DwarfGreeting dwarf={panel.dwarf} panel={panel} audience={audience} lang={lang} />

      <div className="no-print">
        <ContextPanel
          options={panel.contextOptions}
          context={context}
          onChange={setContext}
          lang={lang}
        />

        <div className="inputs-grid">
          {panel.analytes.map((a) => (
            <LabInput
              key={a.id}
              analyte={a}
              audience={audience}
              lang={lang}
              value={inputs[a.id] ?? ''}
              onChange={handleChange}
            />
          ))}
        </div>

        <div className="actions">
          <button
            type="button"
            className="btn-primary"
            onClick={() => setSubmitted(true)}
            disabled={filledCount === 0}
          >
            {t(UI.actions.interpret, lang)} ({filledCount} {valuesLabel})
          </button>
          <button type="button" className="btn-secondary" onClick={reset}>
            {t(UI.actions.reset, lang)}
          </button>
          {submitted && (
            <>
              <button type="button" className="btn-secondary" onClick={handlePrint}>
                {t(UI.exports.print, lang)}
              </button>
              <button type="button" className="btn-secondary" onClick={handleCopy}>
                {copyState === 'copied' ? t(UI.exports.copied, lang) : t(UI.exports.copy, lang)}
              </button>
            </>
          )}
        </div>
      </div>

      {submitted && (
        <div className="results">
          <PrintHeader panel={panel} lang={lang} audience={audience} inputs={inputs} context={context} />

          {results.length > 0 && (
            <DwarfVerdict
              dwarf={panel.dwarf}
              tier={verdictLevel}
              lang={lang}
              patterns={matchedPatterns}
            />
          )}

          {matchedPatterns.length > 0 && (
            <div className="pattern-section">
              <h3>{t(UI.results.patterns, lang)}</h3>
              {matchedPatterns.map((p, i) => (
                <PatternCard
                  key={p.id}
                  pattern={p}
                  audience={audience}
                  lang={lang}
                  index={i}
                />
              ))}
            </div>
          )}

          <div className="result-section">
            <h3>{t(UI.results.perTest, lang)}</h3>
            {results.length === 0 && <p className="muted">{t(UI.results.enterAtLeast, lang)}</p>}
            <div className="result-grid">
              {results.map(({ analyte, result }, i) => (
                <ResultCard
                  key={analyte.id}
                  analyte={analyte}
                  result={result}
                  audience={audience}
                  lang={lang}
                  index={i}
                />
              ))}
            </div>
          </div>

          {panel.references && panel.references.length > 0 && (
            <div className="panel-refs-section">
              <References items={panel.references} lang={lang} heading={UI.results.panelReferences} />
            </div>
          )}
        </div>
      )}
    </section>
  );
}

// Header that appears only in printed output: title, date, entered values, context.
function PrintHeader({ panel, lang, audience, inputs, context }) {
  const now = new Date().toLocaleString(lang === 'zh' ? 'zh-Hant' : 'en');
  const entered = panel.analytes.filter(
    (a) => inputs[a.id] !== undefined && inputs[a.id] !== ''
  );
  const ctxOpts = panel.contextOptions || [];
  const enteredCtx = ctxOpts.filter((o) => {
    const v = context[o.id];
    return v !== undefined && v !== '' && v !== false && v !== null;
  });

  return (
    <div className="print-only print-header">
      <h2>{t(UI.exports.reportTitle, lang)} — {t(panel.name, lang)}</h2>
      <p className="print-meta">
        {t(UI.exports.generated, lang)}: {now}
      </p>
      <div className="print-section">
        <h4>{t(UI.exports.enteredValues, lang)}</h4>
        <ul>
          {entered.length === 0 ? (
            <li className="muted">{t(UI.exports.none, lang)}</li>
          ) : (
            entered.map((a) => (
              <li key={a.id}>
                <strong>{t(a.name, lang)}:</strong> {inputs[a.id]}
                {a.unit ? ` ${t(a.unit, lang)}` : ''}
              </li>
            ))
          )}
        </ul>
      </div>
      {enteredCtx.length > 0 && (
        <div className="print-section">
          <h4>{t(UI.exports.clinicalContext, lang)}</h4>
          <ul>
            {enteredCtx.map((o) => {
              let value = context[o.id];
              if (o.type === 'select') {
                const found = (o.options || []).find((opt) => opt.value === value);
                value = found ? t(found.label, lang) : value;
              } else if (o.type === 'toggle') {
                value = '✓';
              }
              return (
                <li key={o.id}>
                  <strong>{t(o.label, lang)}:</strong> {value}
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}
