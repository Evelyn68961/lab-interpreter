import { t } from '../i18n.js';

export function PanelTabs({ panels, activeId, onChange, lang }) {
  return (
    <nav className="panel-tabs" role="tablist" aria-label="Lab panels">
      {panels.map((p) => (
        <button
          key={p.id}
          role="tab"
          aria-selected={p.id === activeId}
          className={'panel-tab ' + (p.id === activeId ? 'active' : '')}
          onClick={() => onChange(p.id)}
        >
          {t(p.name, lang)}
        </button>
      ))}
    </nav>
  );
}
