import { UI, t } from '../i18n.js';

export function References({ items, lang, heading }) {
  if (!items || items.length === 0) return null;
  const headingText = heading ? t(heading, lang) : t(UI.results.references, lang);
  return (
    <div className="refs">
      <span className="refs-label">{headingText}:</span>
      <ul className="refs-list">
        {items.map((r, i) => (
          <li key={i}>
            <a href={r.url} target="_blank" rel="noopener noreferrer">
              {r.label}
            </a>
          </li>
        ))}
      </ul>
    </div>
  );
}
