// Tiny i18n helper used throughout the app.
//
// Two shapes appear in the data:
//   1. Plain string                                         (no translation)
//   2. { en: <string>, zh: <string> }                       (single language axis)
//   3. { en: { clinical, patient }, zh: { clinical, patient } } (language + audience)
//
// `t(field, lang)`            handles shapes 1 and 2.
// `tt(field, lang, audience)` handles shape 3 (and passes through shape 2 if audience missing).

export const LANGS = ['en', 'zh'];

export function t(field, lang = 'en') {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  if (typeof field === 'object' && (field.en !== undefined || field.zh !== undefined)) {
    return field[lang] ?? field.en ?? '';
  }
  return String(field);
}

export function tt(field, lang = 'en', audience = 'patient') {
  if (field == null) return '';
  if (typeof field === 'string') return field;
  // shape 3: language outer
  const inLang = field[lang] ?? field.en;
  if (inLang && typeof inLang === 'object') {
    return inLang[audience] ?? inLang.clinical ?? inLang.patient ?? '';
  }
  // fall back to shape 2
  if (typeof inLang === 'string') return inLang;
  return '';
}

// UI labels (non-medical)
export const UI = {
  app: {
    title: { en: 'Lab Data Interpreter', zh: '檢驗數據解讀工具' },
    tagline: {
      en: 'A tool for understanding common lab panels — coagulation, CBC, renal, and electrolytes.',
      zh: '協助理解常見檢驗項目的工具——凝血、血液、腎功能與電解質。',
    },
  },
  audience: {
    label: { en: 'Reading level', zh: '閱讀程度' },
    patient: { en: 'Patient', zh: '一般民眾' },
    clinical: { en: 'Clinical', zh: '臨床' },
  },
  language: {
    label: { en: 'Language', zh: '語言' },
    en: { en: 'English', zh: 'English' },
    zh: { en: '繁體中文', zh: '繁體中文' },
  },
  context: {
    summary: {
      en: 'Clinical context (refines interpretation)',
      zh: '臨床情境（影響判讀結果）',
    },
  },
  panel: {
    blurbHeading: { en: 'About this panel', zh: '關於此檢驗組' },
  },
  inputs: {
    refPrefix: { en: 'Ref:', zh: '參考範圍：' },
    fullnameSeparator: { en: '·', zh: '·' },
  },
  actions: {
    interpret: { en: 'Interpret', zh: '解讀結果' },
    interpretValues: { en: 'value', zh: '個數值' },
    interpretValuesPlural: { en: 'values', zh: '個數值' },
    reset: { en: 'Reset', zh: '重置' },
  },
  results: {
    enterAtLeast: {
      en: 'Enter at least one value above to see an interpretation.',
      zh: '請於上方輸入至少一個數值以取得判讀。',
    },
    perTest: { en: 'Per-test interpretation', zh: '單項判讀' },
    patterns: { en: 'Combined patterns', zh: '綜合判讀' },
    nextStep: { en: 'Next step:', zh: '建議：' },
    references: { en: 'References', zh: '參考資料' },
    panelReferences: { en: 'Guidelines & references', zh: '參考指引' },
  },
  exports: {
    print: { en: 'Print / Save as PDF', zh: '列印 / 儲存為 PDF' },
    copy: { en: 'Copy report', zh: '複製報告' },
    copied: { en: 'Copied!', zh: '已複製！' },
    reportTitle: { en: 'Lab Data Interpretation Report', zh: '檢驗判讀報告' },
    generated: { en: 'Generated', zh: '產生時間' },
    enteredValues: { en: 'Entered values', zh: '輸入數值' },
    clinicalContext: { en: 'Clinical context', zh: '臨床情境' },
    none: { en: '(none entered)', zh: '（未輸入）' },
  },
  levels: {
    low: { en: 'Low', zh: '偏低' },
    normal: { en: 'Normal', zh: '正常' },
    borderline: { en: 'Borderline', zh: '臨界' },
    therapeutic: { en: 'Therapeutic', zh: '治療範圍' },
    high: { en: 'High', zh: '偏高' },
    critical: { en: 'Critical', zh: '嚴重異常' },
    invalid: { en: 'Invalid', zh: '數值無效' },
  },
  confidence: {
    low: { en: 'Low confidence', zh: '低度符合' },
    moderate: { en: 'Moderate confidence', zh: '中度符合' },
    high: { en: 'High confidence', zh: '高度符合' },
  },
  disclaimer: {
    strong: { en: 'Educational use only.', zh: '僅供教育用途。' },
    body: {
      en: 'This tool offers general interpretation of common lab values and is not a substitute for clinical judgment, diagnosis, or treatment from a qualified healthcare professional. Reference ranges vary by laboratory and assay. Always correlate with the patient\'s full clinical picture.',
      zh: '此工具僅提供常見檢驗數值的一般性說明，並不能取代專業醫療人員的臨床判斷、診斷或治療。各實驗室與檢驗方法的參考範圍可能不同，請務必結合完整的臨床狀況綜合評估。',
    },
  },
};
