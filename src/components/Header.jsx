import { UI, t } from '../i18n.js';

export function Header({ audience, setAudience, lang, setLang }) {
  return (
    <header className="header">
      <div className="header-text">
        <h1>{t(UI.app.title, lang)}</h1>
        <p className="tagline">{t(UI.app.tagline, lang)}</p>
      </div>
      <div className="header-toggles">
        <div className="audience-toggle" role="group" aria-label={t(UI.language.label, lang)}>
          <span className="audience-toggle-label">{t(UI.language.label, lang)}:</span>
          <button
            type="button"
            className={lang === 'en' ? 'active' : ''}
            onClick={() => setLang('en')}
            aria-pressed={lang === 'en'}
          >
            {t(UI.language.en, lang)}
          </button>
          <button
            type="button"
            className={lang === 'zh' ? 'active' : ''}
            onClick={() => setLang('zh')}
            aria-pressed={lang === 'zh'}
          >
            {t(UI.language.zh, lang)}
          </button>
        </div>
        <div className="audience-toggle" role="group" aria-label={t(UI.audience.label, lang)}>
          <span className="audience-toggle-label">{t(UI.audience.label, lang)}:</span>
          <button
            type="button"
            className={audience === 'patient' ? 'active' : ''}
            onClick={() => setAudience('patient')}
            aria-pressed={audience === 'patient'}
          >
            {t(UI.audience.patient, lang)}
          </button>
          <button
            type="button"
            className={audience === 'clinical' ? 'active' : ''}
            onClick={() => setAudience('clinical')}
            aria-pressed={audience === 'clinical'}
          >
            {t(UI.audience.clinical, lang)}
          </button>
        </div>
      </div>
    </header>
  );
}
