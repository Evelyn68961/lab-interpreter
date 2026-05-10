import { UI, t, tt } from '../i18n.js';
import { References } from './References.jsx';

export function LabInput({ analyte, value, onChange, audience, lang }) {
  return (
    <div className="lab-input">
      <div className="lab-input-row">
        <label htmlFor={analyte.id} className="lab-input-label">
          <span className="lab-input-name">{t(analyte.name, lang)}</span>
          {analyte.unit && <span className="lab-input-unit">({t(analyte.unit, lang)})</span>}
        </label>
        <input
          id={analyte.id}
          type="number"
          step="any"
          inputMode="decimal"
          placeholder={t(analyte.placeholder, lang)}
          value={value}
          onChange={(e) => onChange(analyte.id, e.target.value)}
        />
      </div>
      <div className="lab-input-meta">
        <span className="lab-input-fullname">{t(analyte.fullName, lang)}</span>
        <span className="lab-input-range">
          {t(UI.inputs.refPrefix, lang)} {t(analyte.normalRange, lang)}
        </span>
      </div>
      <p className="lab-input-desc">{tt(analyte.description, lang, audience)}</p>
      <References items={analyte.references} lang={lang} />
    </div>
  );
}
