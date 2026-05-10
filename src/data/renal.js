// Renal panel: BUN, creatinine, eGFR.

export const renal = {
  id: 'renal',
  name: { en: 'Renal Function', zh: '腎功能檢驗' },
  shortName: { en: 'Renal', zh: '腎功能' },
  dwarf: {
    id: 'stoneward',
    name: 'Stoneward Filterhand',
    title: { en: 'Warden of the Twin Filters', zh: '雙腎守關人' },
    greeting: {
      en: 'The filters of the keep must run clean. I mark what is kept, what is sent away, and what slips through unbidden. Show me the readings, and I shall judge their flow.',
      zh: '城堡的過濾器必須運作清澈。我會記下哪些留下、哪些被排出、哪些不該流失卻流失了。把你的數據交予我，我來評判其流動。',
    },
    verdicts: {
      normal: {
        en: 'The twin filters run clean. Waste is sent away as it should be, and the keep stays well-watered. All is in order.',
        zh: '雙腎濾水清澈，廢物該排則排，城堡水脈飽滿——一切井然有序。',
      },
      borderline: {
        en: 'A slight murk in the channel — perhaps the filter strains a little under its load. Watch and revisit.',
        zh: '濾道略有混濁——或許負荷略重。請持續留意，過些時日再看。',
      },
      concerning: {
        en: 'The filter labours. Either the flow has slowed, or what should be kept is slipping through. Heed this before the gates clog.',
        zh: '過濾器吃力——或流量變慢，或該留住的東西流失了。請在門戶堵塞之前處理。',
      },
      critical: {
        en: 'By the stone of the deep wells! The filter is failing. Urgent watch is needed — to the healer without delay.',
        zh: '我以深井之石起誓——過濾器岌岌可危！請即刻就醫，不可拖延。',
      },
    },
  },
  blurb: {
    en: {
      clinical:
        'Markers of glomerular filtration. Trend matters more than a single value; always interpret with urine studies and clinical context.',
      patient: 'Tests that estimate how well your kidneys are filtering waste from your blood.',
    },
    zh: {
      clinical:
        '評估腎絲球過濾功能的指標。單一數值不如趨勢重要；判讀時請結合尿液檢查與臨床狀況。',
      patient: '用來估計腎臟過濾血液中廢物能力的檢驗。',
    },
  },
  references: [
    {
      label: 'KDIGO 2024 CKD Evaluation & Management',
      url: 'https://kdigo.org/guidelines/ckd-evaluation-and-management/',
    },
    {
      label: 'KDIGO 2012 Clinical Practice Guideline for AKI',
      url: 'https://kdigo.org/guidelines/acute-kidney-injury/',
    },
    {
      label: 'UpToDate: Definition and staging of CKD',
      url: 'https://www.uptodate.com/contents/search?search=definition+and+staging+of+chronic+kidney+disease',
    },
    {
      label: 'UpToDate: Diagnostic approach to AKI',
      url: 'https://www.uptodate.com/contents/search?search=diagnostic+approach+to+acute+kidney+injury',
    },
  ],
  analytes: [
    {
      id: 'creatinine',
      name: { en: 'Creatinine', zh: '肌酸酐' },
      fullName: { en: 'Serum creatinine', zh: '血清肌酸酐' },
      unit: { en: 'mg/dL', zh: 'mg/dL' },
      placeholder: { en: 'e.g. 0.9', zh: '例如 0.9' },
      normalRange: {
        en: 'Male: 0.7–1.3 · Female: 0.6–1.1 mg/dL',
        zh: '男性：0.7–1.3 · 女性：0.6–1.1 mg/dL',
      },
      description: {
        en: {
          clinical:
            'Filtered marker of muscle metabolism. Affected by muscle mass, diet, drugs (cimetidine, trimethoprim block tubular secretion). Use eGFR for staging, not creatinine alone.',
          patient: 'A waste product that healthy kidneys clear from the blood. Used to estimate kidney function.',
        },
        zh: {
          clinical:
            '由腎絲球過濾的肌肉代謝產物，受肌肉量、飲食以及藥物（cimetidine、trimethoprim 會抑制腎小管分泌）影響。腎病分期應使用 eGFR，不單看肌酸酐。',
          patient: '健康腎臟會清除的代謝廢物，常用來估計腎功能。',
        },
      },
      rules: [
        {
          when: (v) => v < 0.5,
          level: 'low',
          title: { en: 'Below reference', zh: '低於參考範圍' },
          message: {
            en: {
              clinical:
                'Often reflects low muscle mass (elderly, cachectic, paralyzed) rather than kidney pathology. eGFR may overestimate true GFR.',
              patient: 'Often related to having less muscle mass rather than a kidney problem.',
            },
            zh: {
              clinical:
                '常反映肌肉量偏低（年長、惡病質、癱瘓）而非腎臟病變；此時 eGFR 可能高估真實 GFR。',
              patient: '通常與肌肉量較少有關，而非腎臟問題。',
            },
          },
        },
        {
          when: (v, ctx) => v <= (ctx?.sex === 'male' ? 1.3 : 1.1),
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within sex-specific reference range.', patient: 'In the expected range.' },
            zh: { clinical: '在依性別調整的參考範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 2.0,
          level: 'high',
          title: { en: 'Mildly elevated', zh: '輕度升高' },
          message: {
            en: {
              clinical:
                'Could reflect AKI or CKD — trend and baseline are critical. Calculate eGFR, review nephrotoxins, assess volume status.',
              patient: 'Slightly elevated — your clinician will compare with prior values to interpret.',
            },
            zh: {
              clinical:
                '可能反映急性腎損傷或慢性腎臟病——基準值與變化趨勢相當關鍵。請計算 eGFR、檢視腎毒性藥物並評估容積狀態。',
              patient: '略為偏高——醫師會比較過往數值來判讀。',
            },
          },
        },
        {
          when: (v) => v <= 4.0,
          level: 'high',
          title: { en: 'Substantially elevated', zh: '顯著升高' },
          message: {
            en: {
              clinical:
                'Significant impairment. KDIGO AKI staging: ≥1.5× baseline = stage 1, ≥2× = stage 2, ≥3× or ≥4 mg/dL = stage 3.',
              patient: 'Substantially elevated — the kidneys are not filtering as well as expected.',
            },
            zh: {
              clinical:
                '腎功能明顯受損。KDIGO AKI 分期：≥1.5 倍基準值為第 1 期、≥2 倍為第 2 期、≥3 倍或 ≥4 mg/dL 為第 3 期。',
              patient: '明顯偏高——腎臟過濾能力下降。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Severe kidney impairment', zh: '嚴重腎功能損傷' },
          message: {
            en: {
              clinical:
                'Severe renal dysfunction. Evaluate for dialysis indications (volume overload, acidosis, hyperkalemia, uremia, intoxications) and nephrology consult.',
              patient: 'Severely elevated — needs urgent clinical attention.',
            },
            zh: {
              clinical:
                '嚴重腎功能不全。評估透析適應症（體液過多、酸中毒、高血鉀、尿毒、特定中毒），並建議腎臟科會診。',
              patient: '嚴重偏高——需要儘速就醫處理。',
            },
          },
        },
      ],
    },

    {
      id: 'bun',
      name: { en: 'BUN', zh: 'BUN' },
      fullName: { en: 'Blood Urea Nitrogen', zh: '血中尿素氮' },
      unit: { en: 'mg/dL', zh: 'mg/dL' },
      placeholder: { en: 'e.g. 14', zh: '例如 14' },
      normalRange: { en: '7–20 mg/dL', zh: '7–20 mg/dL' },
      description: {
        en: {
          clinical:
            'Reflects urea clearance and protein turnover. BUN:creatinine ratio helps localize renal injury (>20:1 prerenal, 10–20:1 intrinsic). Falsely elevated by GI bleeding, steroids, high-protein intake.',
          patient: 'A waste product from protein breakdown that the kidneys remove.',
        },
        zh: {
          clinical:
            '反映尿素清除與蛋白質代謝。BUN:肌酸酐比值協助分辨腎損傷部位（>20:1 為腎前性、10–20:1 為腎實質性）。腸胃道出血、類固醇、高蛋白飲食會使數值上升。',
          patient: '蛋白質代謝產生、由腎臟排出的廢物。',
        },
      },
      rules: [
        {
          when: (v) => v < 7,
          level: 'low',
          title: { en: 'Below reference', zh: '低於參考範圍' },
          message: {
            en: {
              clinical:
                'Causes: low protein intake, advanced liver disease (decreased synthesis), pregnancy (volume expansion), SIADH.',
              patient: 'Below usual — often related to diet or liver function.',
            },
            zh: {
              clinical:
                '原因：蛋白質攝取不足、嚴重肝病（合成下降）、懷孕（血液稀釋）、SIADH。',
              patient: '低於一般範圍——常與飲食或肝功能有關。',
            },
          },
        },
        {
          when: (v) => v <= 20,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 40,
          level: 'high',
          title: { en: 'Mildly elevated', zh: '輕度升高' },
          message: {
            en: {
              clinical:
                'Differential: prerenal (volume depletion, heart failure), GI bleed (urea reabsorption), high-protein diet, steroids, kidney dysfunction. Use BUN:Cr ratio for context.',
              patient: 'Slightly elevated. Dehydration and bleeding are common contributors; kidney function also matters.',
            },
            zh: {
              clinical:
                '鑑別診斷：腎前性原因（體液不足、心衰竭）、腸胃道出血（尿素再吸收）、高蛋白飲食、類固醇、腎功能異常。需參考 BUN:肌酸酐比值。',
              patient: '略為偏高。脫水或出血是常見原因，腎功能也須一併考慮。',
            },
          },
        },
        {
          when: () => true,
          level: 'high',
          title: { en: 'Substantially elevated', zh: '顯著升高' },
          message: {
            en: {
              clinical:
                'Marked elevation typically reflects significant renal dysfunction or major prerenal insult; uremic symptoms become more likely as BUN climbs.',
              patient: 'Substantially elevated — needs clinical evaluation.',
            },
            zh: {
              clinical:
                '顯著上升通常代表嚴重腎功能異常或重大腎前性事件；隨著 BUN 升高，尿毒症狀的可能性增加。',
              patient: '明顯偏高——需要進一步臨床評估。',
            },
          },
        },
      ],
    },

    {
      id: 'egfr',
      name: { en: 'eGFR', zh: 'eGFR' },
      fullName: {
        en: 'Estimated Glomerular Filtration Rate',
        zh: '估算腎絲球過濾率',
      },
      unit: { en: 'mL/min/1.73m²', zh: 'mL/min/1.73m²' },
      placeholder: { en: 'e.g. 90', zh: '例如 90' },
      normalRange: {
        en: '≥60 (CKD staging applies below)',
        zh: '≥60（低於此值依下方分期）',
      },
      description: {
        en: {
          clinical:
            'KDIGO CKD stages: G1 ≥90 (with kidney damage), G2 60–89, G3a 45–59, G3b 30–44, G4 15–29, G5 <15. Use CKD-EPI 2021 race-free equation.',
          patient: 'A score that estimates how well your kidneys filter blood. Higher is generally better.',
        },
        zh: {
          clinical:
            'KDIGO 慢性腎臟病分期：G1 ≥90（合併腎損傷）、G2 60–89、G3a 45–59、G3b 30–44、G4 15–29、G5 <15。建議使用 CKD-EPI 2021 不含種族的公式。',
          patient: '評估腎臟過濾血液能力的分數，數值越高一般代表功能越好。',
        },
      },
      rules: [
        {
          when: (v) => v < 15,
          level: 'critical',
          title: { en: 'Stage 5 — kidney failure', zh: '第 5 期——腎衰竭' },
          message: {
            en: {
              clinical: 'eGFR <15: kidney failure (G5). Evaluate for renal replacement therapy.',
              patient: 'Severely reduced — you need close care from a kidney specialist.',
            },
            zh: {
              clinical: 'eGFR <15：腎衰竭（G5），應評估腎臟替代療法。',
              patient: '嚴重下降——需要由腎臟專科醫師密切照護。',
            },
          },
        },
        {
          when: (v) => v < 30,
          level: 'critical',
          title: { en: 'Stage 4 CKD', zh: '第 4 期慢性腎臟病' },
          message: {
            en: {
              clinical: 'G4 (15–29): severely decreased GFR. Prepare for dialysis access / transplant evaluation.',
              patient: 'Significantly reduced kidney function. A kidney specialist should be involved.',
            },
            zh: {
              clinical:
                'G4（15–29）：GFR 嚴重下降，應準備透析路徑或評估腎臟移植。',
              patient: '腎功能顯著下降，需由腎臟科專科醫師介入。',
            },
          },
        },
        {
          when: (v) => v < 45,
          level: 'high',
          title: { en: 'Stage 3b CKD', zh: '第 3b 期慢性腎臟病' },
          message: {
            en: {
              clinical: 'G3b (30–44): moderate-to-severe decrease. Monitor for complications (anemia, mineral/bone, acidosis).',
              patient: 'Moderately reduced — your clinician will monitor closely.',
            },
            zh: {
              clinical:
                'G3b（30–44）：中重度下降，需監測併發症（貧血、礦物質與骨骼異常、酸中毒）。',
              patient: '中度下降——醫師會密切追蹤。',
            },
          },
        },
        {
          when: (v) => v < 60,
          level: 'borderline',
          title: { en: 'Stage 3a CKD', zh: '第 3a 期慢性腎臟病' },
          message: {
            en: {
              clinical: 'G3a (45–59): mild-to-moderate decrease. Address modifiable risk factors (BP, glycemia, ACEi/ARB if indicated, nephrotoxin avoidance).',
              patient: 'Mildly to moderately reduced — there are steps to slow further decline.',
            },
            zh: {
              clinical:
                'G3a（45–59）：輕至中度下降。調整可控風險因子（血壓、血糖控制、必要時使用 ACEi/ARB、避免腎毒性藥物）。',
              patient: '輕至中度下降——可以採取一些方式減緩惡化。',
            },
          },
        },
        {
          when: (v) => v < 90,
          level: 'normal',
          title: {
            en: 'Stage 2 (only if kidney damage present)',
            zh: '第 2 期（僅在合併腎損傷時成立）',
          },
          message: {
            en: {
              clinical:
                'G2 (60–89). Without markers of kidney damage (albuminuria, abnormal imaging, hereditary disease), this is normal-for-age.',
              patient: 'Slightly below 90 — usually only meaningful with other signs of kidney damage.',
            },
            zh: {
              clinical:
                'G2（60–89）。若沒有腎損傷指標（蛋白尿、影像異常、遺傳性腎病），常屬於依年齡的正常變化。',
              patient: '略低於 90——通常只有合併其他腎損傷指標時才有臨床意義。',
            },
          },
        },
        {
          when: () => true,
          level: 'normal',
          title: { en: 'Stage 1 / normal', zh: '第 1 期 / 正常' },
          message: {
            en: {
              clinical: 'eGFR ≥90. CKD only if markers of kidney damage present (e.g., albuminuria).',
              patient: 'In the expected range.',
            },
            zh: {
              clinical: 'eGFR ≥90。僅在合併腎損傷指標（如白蛋白尿）時才屬於 CKD。',
              patient: '在預期的正常範圍內。',
            },
          },
        },
      ],
    },
  ],

  contextOptions: [
    {
      id: 'sex',
      label: {
        en: 'Biological sex (for creatinine reference)',
        zh: '生理性別（影響肌酸酐參考值）',
      },
      type: 'select',
      options: [
        { value: 'female', label: { en: 'Female', zh: '女性' } },
        { value: 'male', label: { en: 'Male', zh: '男性' } },
      ],
    },
    {
      id: 'diabetic',
      label: { en: 'Diabetes', zh: '糖尿病' },
      type: 'toggle',
    },
    {
      id: 'hypertensive',
      label: { en: 'Hypertension', zh: '高血壓' },
      type: 'toggle',
    },
    {
      id: 'nephrotoxin',
      label: {
        en: 'Recent nephrotoxin (NSAIDs, contrast, aminoglycoside)',
        zh: '近期使用腎毒性藥物（NSAIDs、顯影劑、aminoglycoside）',
      },
      type: 'toggle',
    },
  ],
};
