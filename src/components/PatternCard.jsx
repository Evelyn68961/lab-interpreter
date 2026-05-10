import { UI, t, tt } from '../i18n.js';
import { References } from './References.jsx';

export function PatternCard({ pattern, audience, lang, index = 0 }) {
  return (
    <article
      className={`pattern-card confidence-${pattern.confidence}`}
      style={{ '--card-i': index }}
    >
      <header className="pattern-card-head">
        <h4>{t(pattern.name, lang)}</h4>
        <span className="pattern-confidence">{t(UI.confidence[pattern.confidence], lang)}</span>
      </header>
      {pattern.notes && <p className="pattern-notes">{pattern.notes}</p>}
      <p className="pattern-explanation">{tt(pattern.explanation, lang, audience)}</p>
      <p className="pattern-next">
        <strong>{t(UI.results.nextStep, lang)} </strong>
        {tt(pattern.nextSteps, lang, audience)}
      </p>
      <References items={pattern.references} lang={lang} />
    </article>
  );
}
