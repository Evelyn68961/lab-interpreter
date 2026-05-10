import { Dwarf } from './Dwarf.jsx';
import { t, tt } from '../i18n.js';

export function DwarfGreeting({ dwarf, panel, audience, lang }) {
  if (!dwarf) return null;
  return (
    <section className="dwarf-greeting" aria-label="Panel introduction">
      <div className="dwarf-portrait">
        <div className="dwarf-frame">
          <Dwarf variant={dwarf.id} size={150} />
        </div>
        <div className="dwarf-nameplate">
          <div className="dwarf-name">{dwarf.name}</div>
          <div className="dwarf-title">{t(dwarf.title, lang)}</div>
        </div>
      </div>
      <div className="dwarf-speech">
        <div className="dwarf-speech-tail" aria-hidden="true" />
        <p className="dwarf-greeting-text">{t(dwarf.greeting, lang)}</p>
        <p className="dwarf-blurb">{tt(panel.blurb, lang, audience)}</p>
      </div>
    </section>
  );
}
