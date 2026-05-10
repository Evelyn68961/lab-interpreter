// Stylized dwarf bust illustration. Same SVG, four color variants, four
// facial expressions tied to verdict tier.

const variants = {
  ferrum: {
    helmet: '#3d3a36',
    helmetTrim: '#1a1816',
    helmetCenter: '#2a2622',
    beard: '#8b2e1e',
    beardShade: '#5a1a0e',
    skin: '#d4a378',
    noseShade: '#a87850',
    accent: '#c9a449',
    eyebrow: '#3d1408',
  },
  ruby: {
    helmet: '#a07a32',
    helmetTrim: '#5a4318',
    helmetCenter: '#6e5526',
    beard: '#6b3410',
    beardShade: '#3d1c08',
    skin: '#d4a378',
    noseShade: '#a87850',
    accent: '#e6c460',
    eyebrow: '#2a1408',
  },
  stoneward: {
    helmet: '#5a6361',
    helmetTrim: '#2e3535',
    helmetCenter: '#3d4543',
    beard: '#5a6f80',
    beardShade: '#2f3d4a',
    skin: '#d4a378',
    noseShade: '#a87850',
    accent: '#7a9bb5',
    eyebrow: '#283545',
  },
  saltbeard: {
    helmet: '#7a6e58',
    helmetTrim: '#3d352c',
    helmetCenter: '#544a3c',
    beard: '#ebe5d8',
    beardShade: '#9c947f',
    skin: '#d4a378',
    noseShade: '#a87850',
    accent: '#a4c4d8',
    eyebrow: '#5a503e',
  },
};

// Per-expression face geometry. Each entry produces:
//   eyebrows: two SVG <path d=...> values (left, right)
//   eyes:     {cx, cy, rx, ry} pair
//   mustache: two SVG <path d=...> halves
const expressions = {
  // calm — at rest, gentle arch
  calm: {
    leftBrow:  'M 42 67 Q 48 63 54 68',
    rightBrow: 'M 66 68 Q 72 63 78 67',
    eyes: { cx1: 48, cy1: 73, cx2: 72, cy2: 73, rx: 2.2, ry: 2.6 },
    leftStache:  'M 38 88 Q 48 96 58 90',
    rightStache: 'M 62 90 Q 72 96 82 88',
  },
  // alert — borderline; one brow raised, slight squint
  alert: {
    leftBrow:  'M 42 64 Q 48 60 54 66',
    rightBrow: 'M 66 68 Q 72 64 78 67',
    eyes: { cx1: 48, cy1: 73, cx2: 72, cy2: 73, rx: 2.2, ry: 2.4 },
    leftStache:  'M 38 88 Q 48 95 58 90',
    rightStache: 'M 62 90 Q 72 95 82 88',
  },
  // stern — concerning; brows angled down toward center, focused gaze
  stern: {
    leftBrow:  'M 42 64 Q 48 70 54 70',
    rightBrow: 'M 66 70 Q 72 70 78 64',
    eyes: { cx1: 48, cy1: 74, cx2: 72, cy2: 74, rx: 2.2, ry: 2.0 },
    // mustache flatter, ends slightly downturned
    leftStache:  'M 38 90 Q 48 92 58 92',
    rightStache: 'M 62 92 Q 72 92 82 90',
  },
  // alarmed — critical; brows peaked HIGH in the middle, wide eyes
  alarmed: {
    leftBrow:  'M 40 62 Q 50 56 56 64',
    rightBrow: 'M 64 64 Q 70 56 80 62',
    eyes: { cx1: 48, cy1: 73, cx2: 72, cy2: 73, rx: 2.8, ry: 3.4 },
    // mustache pulled wider in surprise
    leftStache:  'M 36 88 Q 48 94 58 88',
    rightStache: 'M 62 88 Q 72 94 84 88',
  },
};

export function Dwarf({
  variant = 'ferrum',
  expression = 'calm',
  size = 140,
  className = '',
}) {
  const v = variants[variant] ?? variants.ferrum;
  const e = expressions[expression] ?? expressions.calm;
  const w = size;
  const h = (size * 150) / 120;
  return (
    <svg
      viewBox="0 0 120 150"
      width={w}
      height={h}
      className={'dwarf-svg ' + className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label={`${variant} dwarf, ${expression}`}
    >
      {/* Shoulders / cloak hint */}
      <path
        d="M 6 150 Q 14 128 32 124 L 88 124 Q 106 128 114 150 Z"
        fill={v.beardShade}
        stroke={v.helmetTrim}
        strokeWidth="1"
      />
      <path
        d="M 18 150 Q 22 138 35 134 L 85 134 Q 98 138 102 150 Z"
        fill={v.beard}
        opacity="0.4"
      />

      {/* Helmet dome */}
      <path
        d="M 26 52 Q 60 6 94 52 L 94 60 L 26 60 Z"
        fill={v.helmet}
        stroke={v.helmetTrim}
        strokeWidth="1.8"
      />

      {/* Helmet center band — vertical strip */}
      <rect x="56" y="10" width="8" height="46" fill={v.helmetCenter} />
      <rect
        x="56"
        y="10"
        width="8"
        height="46"
        fill="none"
        stroke={v.helmetTrim}
        strokeWidth="0.8"
      />

      {/* Helmet rivets */}
      <circle cx="38" cy="50" r="2.4" fill={v.accent} stroke={v.helmetTrim} strokeWidth="0.6" />
      <circle cx="60" cy="14" r="2.4" fill={v.accent} stroke={v.helmetTrim} strokeWidth="0.6" />
      <circle cx="82" cy="50" r="2.4" fill={v.accent} stroke={v.helmetTrim} strokeWidth="0.6" />

      {/* Helmet brim */}
      <rect x="24" y="58" width="72" height="6" fill={v.helmetTrim} />
      <rect x="24" y="58" width="72" height="2" fill={v.accent} opacity="0.6" />

      {/* Face skin patch */}
      <path d="M 40 64 L 80 64 L 78 86 Q 60 92 42 86 Z" fill={v.skin} />

      {/* Eyebrows — bushy, expression-driven */}
      <path
        d={e.leftBrow}
        stroke={v.eyebrow}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={e.rightBrow}
        stroke={v.eyebrow}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Eyes — expression-driven size */}
      <ellipse cx={e.eyes.cx1} cy={e.eyes.cy1} rx={e.eyes.rx} ry={e.eyes.ry} fill="#1a0e08" />
      <ellipse cx={e.eyes.cx2} cy={e.eyes.cy2} rx={e.eyes.rx} ry={e.eyes.ry} fill="#1a0e08" />
      {/* eye glints */}
      <circle cx={e.eyes.cx1 + 1} cy={e.eyes.cy1 - 1} r="0.6" fill="#fff" />
      <circle cx={e.eyes.cx2 + 1} cy={e.eyes.cy2 - 1} r="0.6" fill="#fff" />

      {/* Nose — bulbous */}
      <ellipse cx="60" cy="83" rx="6" ry="7" fill={v.noseShade} />
      <ellipse cx="58" cy="81" rx="2" ry="2.5" fill={v.skin} opacity="0.5" />

      {/* Beard: large flowing shape */}
      <path
        d="M 30 78 Q 18 102 26 132 Q 34 146 60 146 Q 86 146 94 132 Q 102 102 90 78 Q 84 100 78 110 Q 60 105 42 110 Q 36 100 30 78 Z"
        fill={v.beard}
        stroke={v.beardShade}
        strokeWidth="1.2"
      />

      {/* Mustache curls — expression-driven */}
      <path
        d={e.leftStache}
        stroke={v.beardShade}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d={e.rightStache}
        stroke={v.beardShade}
        strokeWidth="3"
        strokeLinecap="round"
        fill="none"
      />

      {/* Beard texture braids */}
      <path d="M 46 110 Q 47 122 45 138" stroke={v.beardShade} strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M 60 115 Q 60 128 60 142" stroke={v.beardShade} strokeWidth="1.4" fill="none" opacity="0.5" />
      <path d="M 74 110 Q 73 122 75 138" stroke={v.beardShade} strokeWidth="1.4" fill="none" opacity="0.5" />

      {/* Beard band/clasp */}
      <ellipse cx="60" cy="140" rx="9" ry="3.5" fill={v.accent} stroke={v.helmetTrim} strokeWidth="1" />
      <ellipse cx="60" cy="140" rx="6" ry="2" fill="none" stroke={v.helmetTrim} strokeWidth="0.6" />
    </svg>
  );
}

// Map verdict tier to expression — used by callers.
export const tierToExpression = {
  normal: 'calm',
  borderline: 'alert',
  concerning: 'stern',
  critical: 'alarmed',
};
