import { UI, t, tt } from '../i18n.js';

const LEVEL_ICONS = {
  low: '↓',
  normal: '✓',
  borderline: '~',
  therapeutic: '◎',
  high: '↑',
  critical: '!',
  invalid: '?',
};

export function ResultCard({ analyte, result, audience, lang }) {
  if (!result) return null;
  const level = result.level;
  const levelLabel = t(UI.levels[level] ?? UI.levels.invalid, lang);
  return (
    <article className={`result-card level-${level}`} aria-label={`${t(analyte.name, lang)} result`}>
      <header className="result-card-head">
        <span className="result-icon" aria-hidden="true">
          {LEVEL_ICONS[level]}
        </span>
        <div>
          <h4 className="result-name">
            {t(analyte.name, lang)}
            {result.value !== undefined && (
              <span className="result-value">
                {' '}
                = {result.value}
                {analyte.unit ? ` ${t(analyte.unit, lang)}` : ''}
              </span>
            )}
          </h4>
          <span className="result-level-badge">
            {levelLabel} — {t(result.title, lang)}
          </span>
        </div>
      </header>
      <p className="result-message">{tt(result.message, lang, audience)}</p>
      {result.suggestion && (
        <p className="result-suggestion">{tt(result.suggestion, lang, audience)}</p>
      )}
    </article>
  );
}
