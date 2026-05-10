import { Dwarf, tierToExpression } from './Dwarf.jsx';
import { UI, t } from '../i18n.js';

const TIER_GLYPH = {
  normal: '✦',
  borderline: '⚠',
  concerning: '⚔',
  critical: '☠',
};

export function DwarfVerdict({ dwarf, tier, lang, patterns = [] }) {
  if (!dwarf || !dwarf.verdicts) return null;
  const verdictText = dwarf.verdicts[tier] ?? dwarf.verdicts.normal;
  const tierLabel = t(UI.verdictTier[tier] ?? UI.verdictTier.normal, lang);
  const expression = tierToExpression[tier] ?? 'calm';

  const quips = patterns.filter((p) => p.dwarfQuip);

  return (
    <section className={`dwarf-verdict tier-${tier}`} aria-label="Dwarf verdict">
      <div className="dwarf-verdict-portrait">
        <div className="dwarf-verdict-frame">
          <Dwarf variant={dwarf.id} expression={expression} size={96} />
          <span className="dwarf-verdict-glyph" aria-hidden="true">
            {TIER_GLYPH[tier]}
          </span>
        </div>
      </div>
      <div className="dwarf-verdict-bubble">
        <header className="dwarf-verdict-head">
          <span className="dwarf-verdict-heading">{t(UI.results.verdictHeading, lang)}</span>
          <span className="dwarf-verdict-tier">{tierLabel}</span>
        </header>
        <p className="dwarf-verdict-text">{t(verdictText, lang)}</p>

        {quips.length > 0 && (
          <ul className="dwarf-verdict-quips">
            {quips.map((p, i) => (
              <li
                key={p.id}
                className="dwarf-verdict-quip"
                style={{ '--quip-i': i }}
              >
                <span className="dwarf-verdict-quip-tag">{t(p.name, lang)}</span>
                <span className="dwarf-verdict-quip-text">{t(p.dwarfQuip, lang)}</span>
              </li>
            ))}
          </ul>
        )}

        <p className="dwarf-verdict-attrib">— {dwarf.name}</p>
      </div>
    </section>
  );
}
