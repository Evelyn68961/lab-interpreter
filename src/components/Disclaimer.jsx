import { UI, t } from '../i18n.js';

export function Disclaimer({ lang }) {
  return (
    <footer className="disclaimer">
      <strong>{t(UI.disclaimer.strong, lang)}</strong> {t(UI.disclaimer.body, lang)}
    </footer>
  );
}
