import { UI, t } from '../i18n.js';

export function ContextPanel({ options, context, onChange, lang }) {
  if (!options || options.length === 0) return null;

  return (
    <details className="context-panel" open>
      <summary>{t(UI.context.summary, lang)}</summary>
      <div className="context-grid">
        {options.map((opt) => {
          if (opt.type === 'toggle') {
            return (
              <label key={opt.id} className="context-toggle">
                <input
                  type="checkbox"
                  checked={!!context[opt.id]}
                  onChange={(e) => onChange({ ...context, [opt.id]: e.target.checked })}
                />
                <span>{t(opt.label, lang)}</span>
              </label>
            );
          }
          if (opt.type === 'select') {
            return (
              <label key={opt.id} className="context-select">
                <span>{t(opt.label, lang)}</span>
                <select
                  value={context[opt.id] ?? ''}
                  onChange={(e) => onChange({ ...context, [opt.id]: e.target.value })}
                >
                  {opt.options.map((o) => (
                    <option key={o.value} value={o.value}>
                      {t(o.label, lang)}
                    </option>
                  ))}
                </select>
              </label>
            );
          }
          if (opt.type === 'number') {
            return (
              <label key={opt.id} className="context-number">
                <span>{t(opt.label, lang)}</span>
                <input
                  type="number"
                  inputMode="numeric"
                  value={context[opt.id] ?? ''}
                  onChange={(e) =>
                    onChange({
                      ...context,
                      [opt.id]: e.target.value === '' ? undefined : Number(e.target.value),
                    })
                  }
                />
                {opt.hint && <small>{t(opt.hint, lang)}</small>}
              </label>
            );
          }
          return null;
        })}
      </div>
    </details>
  );
}
