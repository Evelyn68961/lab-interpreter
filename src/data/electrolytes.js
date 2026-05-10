// Electrolytes panel: Na, K, Cl, HCO3.

export const electrolytes = {
  id: 'electrolytes',
  name: { en: 'Basic Electrolytes', zh: '基本電解質' },
  shortName: { en: 'Lytes', zh: '電解質' },
  blurb: {
    en: {
      clinical:
        'Sodium, potassium, chloride, bicarbonate ± calcium/magnesium. Always interpret with anion gap, volume status, and clinical picture.',
      patient: 'Minerals in your blood that need to stay in narrow ranges for nerves, muscles, and the heart to work normally.',
    },
    zh: {
      clinical:
        '鈉、鉀、氯、重碳酸鹽（必要時加上鈣、鎂）。判讀時需考慮陰離子間隙、容積狀態與整體臨床狀況。',
      patient:
        '血液中的礦物質，必須維持在狹窄的範圍內，神經、肌肉與心臟才能正常運作。',
    },
  },
  references: [
    {
      label: 'UpToDate: Approach to the adult with hyponatremia',
      url: 'https://www.uptodate.com/contents/search?search=approach+to+the+adult+with+hyponatremia',
    },
    {
      label: 'UpToDate: Treatment and prevention of hyperkalemia in adults',
      url: 'https://www.uptodate.com/contents/search?search=treatment+and+prevention+of+hyperkalemia',
    },
    {
      label: 'UpToDate: Approach to the adult with metabolic acidosis',
      url: 'https://www.uptodate.com/contents/search?search=approach+to+the+adult+with+metabolic+acidosis',
    },
  ],
  analytes: [
    {
      id: 'sodium',
      name: { en: 'Sodium', zh: '鈉' },
      fullName: { en: 'Serum Sodium', zh: '血清鈉' },
      unit: { en: 'mmol/L', zh: 'mmol/L' },
      placeholder: { en: 'e.g. 140', zh: '例如 140' },
      normalRange: { en: '135–145 mmol/L', zh: '135–145 mmol/L' },
      description: {
        en: {
          clinical:
            'Primarily reflects free water balance, not sodium content. Classify hyponatremia by osmolality (true hypotonic vs pseudo) and volume status. Correct rapid changes slowly to avoid osmotic demyelination (raise <8–10 mmol/L per 24 h).',
          patient: 'Mainly tells us about water balance, not how much salt you have.',
        },
        zh: {
          clinical:
            '主要反映自由水平衡，而非鈉的總量。低血鈉應依滲透壓（真性低張 vs 假性）與容積狀態分類。矯正速度需慢，避免滲透性脫髓鞘（24 小時內上升 <8–10 mmol/L）。',
          patient: '主要反映身體水分平衡，不代表攝取鹽分多寡。',
        },
      },
      rules: [
        {
          when: (v) => v < 120,
          level: 'critical',
          title: { en: 'Severe hyponatremia', zh: '嚴重低血鈉' },
          message: {
            en: {
              clinical:
                'Risk of seizure, altered mental status, herniation. With symptoms: 3% saline boluses with careful monitoring (≤6 mmol/L rise in first 6 h, ≤8–10 mmol/L per 24 h).',
              patient: 'Very low — seek emergency care.',
            },
            zh: {
              clinical:
                '可能發生抽搐、意識改變與腦疝。若有症狀：使用 3% 食鹽水緩慢補充並嚴密監測（前 6 小時上升 ≤6 mmol/L、24 小時內 ≤8–10 mmol/L）。',
              patient: '非常低——請立即就醫。',
            },
          },
        },
        {
          when: (v) => v < 135,
          level: 'low',
          title: { en: 'Hyponatremia', zh: '低血鈉' },
          message: {
            en: {
              clinical:
                'Workup: serum osmolality, urine osmolality, urine sodium, volume assessment. Differential by volume: hypovolemic, euvolemic (SIADH most common), hypervolemic (HF, cirrhosis, nephrotic).',
              patient: 'Low — your clinician will figure out whether it is from too much water, fluid loss, or another cause.',
            },
            zh: {
              clinical:
                '評估：血清滲透壓、尿液滲透壓、尿鈉與容積狀態。依容積分類：低容積、等容積（SIADH 最常見）、高容積（心衰、肝硬化、腎病症候群）。',
              patient: '偏低——醫師會判斷是因水分過多、流失或其他原因引起。',
            },
          },
        },
        {
          when: (v) => v <= 145,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 155,
          level: 'high',
          title: { en: 'Hypernatremia', zh: '高血鈉' },
          message: {
            en: {
              clinical:
                'Almost always free water deficit (impaired thirst access, GI losses, diabetes insipidus, osmotic diuresis). Correct slowly (<10–12 mmol/L per 24 h).',
              patient: 'Elevated — usually means not enough water relative to salt.',
            },
            zh: {
              clinical:
                '幾乎都是自由水缺乏（無法獲得水分、腸胃道流失、尿崩症、滲透性利尿）。矯正應緩慢（24 小時內 <10–12 mmol/L）。',
              patient: '偏高——通常代表相對於鹽分而言水分不足。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Severe hypernatremia', zh: '嚴重高血鈉' },
          message: {
            en: {
              clinical: 'Marked hypernatremia carries high mortality; manage in monitored setting with controlled correction.',
              patient: 'Very high — seek prompt medical care.',
            },
            zh: {
              clinical:
                '嚴重高血鈉死亡率高，應於可監測的單位控制速度緩慢矯正。',
              patient: '非常高——請儘速就醫。',
            },
          },
        },
      ],
    },

    {
      id: 'potassium',
      name: { en: 'Potassium', zh: '鉀' },
      fullName: { en: 'Serum Potassium', zh: '血清鉀' },
      unit: { en: 'mmol/L', zh: 'mmol/L' },
      placeholder: { en: 'e.g. 4.0', zh: '例如 4.0' },
      normalRange: { en: '3.5–5.0 mmol/L', zh: '3.5–5.0 mmol/L' },
      description: {
        en: {
          clinical:
            'Tightly regulated; small changes have cardiac impact. Always exclude pseudohyperkalemia (hemolysis, prolonged tourniquet, marked thrombocytosis/leukocytosis). ECG changes correlate with severity.',
          patient: 'A mineral your heart and muscles need in a narrow range.',
        },
        zh: {
          clinical:
            '受嚴格調控，些微變化即影響心臟。需排除假性高血鉀（溶血、止血帶過久、顯著血小板或白血球增多）。ECG 變化與嚴重度相關。',
          patient: '心臟與肌肉需要維持在狹窄範圍內的一種礦物質。',
        },
      },
      rules: [
        {
          when: (v) => v < 2.5,
          level: 'critical',
          title: { en: 'Severe hypokalemia', zh: '嚴重低血鉀' },
          message: {
            en: {
              clinical:
                'Arrhythmia risk (especially with digoxin, prolonged QT). IV replacement, telemetry, and concomitant magnesium repletion (hypoK is refractory to correction without Mg).',
              patient: 'Very low — needs urgent treatment.',
            },
            zh: {
              clinical:
                '心律不整風險上升（尤其合併 digoxin、QT 延長）。需靜脈補充、心電監測，並同時補充鎂（低鎂時低血鉀難以矯正）。',
              patient: '非常低——需要立即治療。',
            },
          },
        },
        {
          when: (v) => v < 3.5,
          level: 'low',
          title: { en: 'Hypokalemia', zh: '低血鉀' },
          message: {
            en: {
              clinical:
                'Causes: GI loss (diarrhea, vomiting), renal loss (diuretics, hyperaldosteronism), intracellular shift (insulin, beta-agonist, alkalosis). Replace and correct underlying cause; check magnesium.',
              patient: 'Below the expected range — common with vomiting, diarrhea, or some diuretics.',
            },
            zh: {
              clinical:
                '原因：腸胃道流失（腹瀉、嘔吐）、腎臟流失（利尿劑、醛固酮過多症）、細胞內移轉（胰島素、β-促效劑、鹼中毒）。補充鉀並針對病因處理，並檢查鎂。',
              patient: '低於預期範圍——常見於嘔吐、腹瀉或某些利尿劑使用。',
            },
          },
        },
        {
          when: (v) => v <= 5.0,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 6.0,
          level: 'high',
          title: { en: 'Hyperkalemia', zh: '高血鉀' },
          message: {
            en: {
              clinical:
                'Get an ECG. Causes: kidney impairment, RAAS-active drugs (ACEi/ARB/spironolactone), tissue breakdown (rhabdo, tumor lysis), acidosis, K-sparing diuretics, pseudohyperkalemia.',
              patient: 'Above the usual range — your clinician will check the heart and kidneys.',
            },
            zh: {
              clinical:
                '應做 ECG。原因：腎功能異常、RAAS 相關藥物（ACEi/ARB/spironolactone）、組織破壞（橫紋肌溶解、腫瘤溶解症候群）、酸中毒、保鉀利尿劑、假性高血鉀。',
              patient: '高於一般範圍——醫師會檢查心臟與腎臟。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Severe hyperkalemia', zh: '嚴重高血鉀' },
          message: {
            en: {
              clinical:
                'Cardiac arrhythmia risk. Calcium gluconate (membrane stabilization), insulin/dextrose + beta-agonist (intracellular shift), then potassium removal (kayexalate/patiromer/dialysis).',
              patient: 'Severely elevated — seek emergency care immediately.',
            },
            zh: {
              clinical:
                '心律不整風險。處置：先用 calcium gluconate（穩定細胞膜）、insulin/葡萄糖加 β-促效劑（將鉀移入細胞），再以 kayexalate/patiromer/透析清除鉀。',
              patient: '嚴重偏高——請立即就醫。',
            },
          },
        },
      ],
    },

    {
      id: 'chloride',
      name: { en: 'Chloride', zh: '氯' },
      fullName: { en: 'Serum Chloride', zh: '血清氯' },
      unit: { en: 'mmol/L', zh: 'mmol/L' },
      placeholder: { en: 'e.g. 102', zh: '例如 102' },
      normalRange: { en: '98–107 mmol/L', zh: '98–107 mmol/L' },
      description: {
        en: {
          clinical:
            'Mainly used to compute anion gap and to recognize non-anion-gap (hyperchloremic) acidosis (e.g., diarrhea, RTA, saline-induced).',
          patient: 'Helps interpret acid-base balance alongside other labs.',
        },
        zh: {
          clinical:
            '主要用於計算陰離子間隙，協助辨識非陰離子間隙性（高氯性）酸中毒（如腹瀉、RTA、輸生理食鹽水後）。',
          patient: '與其他檢驗共同用來判讀酸鹼平衡。',
        },
      },
      rules: [
        {
          when: (v) => v < 98,
          level: 'low',
          title: { en: 'Below reference', zh: '低於參考範圍' },
          message: {
            en: {
              clinical: 'Often parallels sodium changes; can be seen with vomiting (loss of HCl) and metabolic alkalosis.',
              patient: 'Slightly low — interpret alongside sodium and acid-base values.',
            },
            zh: {
              clinical:
                '常與鈉同步變化；嘔吐（流失 HCl）與代謝性鹼中毒時可見。',
              patient: '略為偏低——須結合鈉與酸鹼值判讀。',
            },
          },
        },
        {
          when: (v) => v <= 107,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: () => true,
          level: 'high',
          title: { en: 'Above reference', zh: '高於參考範圍' },
          message: {
            en: {
              clinical:
                'Common with non-anion-gap metabolic acidosis (diarrhea, RTA, post-saline resuscitation). Calculate anion gap.',
              patient: 'Slightly elevated — meaning depends on other electrolytes.',
            },
            zh: {
              clinical:
                '常見於非陰離子間隙性代謝性酸中毒（腹瀉、RTA、輸生理食鹽水後）。請計算陰離子間隙。',
              patient: '略為偏高——意義依其他電解質而定。',
            },
          },
        },
      ],
    },

    {
      id: 'bicarbonate',
      name: { en: 'Bicarbonate', zh: '重碳酸鹽' },
      fullName: {
        en: 'Bicarbonate (CO₂ content)',
        zh: '重碳酸鹽（CO₂ 含量）',
      },
      unit: { en: 'mmol/L', zh: 'mmol/L' },
      placeholder: { en: 'e.g. 24', zh: '例如 24' },
      normalRange: { en: '22–28 mmol/L', zh: '22–28 mmol/L' },
      description: {
        en: {
          clinical:
            'Surrogate for serum HCO3. Use with anion gap to characterize metabolic acidosis (high vs normal gap).',
          patient: 'A buffer that helps keep your blood from becoming too acidic.',
        },
        zh: {
          clinical:
            '血清 HCO3 的替代指標。配合陰離子間隙可辨識代謝性酸中毒（高間隙或正常間隙）。',
          patient: '幫助血液避免過酸的緩衝物質。',
        },
      },
      rules: [
        {
          when: (v) => v < 15,
          level: 'critical',
          title: {
            en: 'Severe metabolic acidosis (likely)',
            zh: '可能嚴重代謝性酸中毒',
          },
          message: {
            en: {
              clinical:
                'Very low HCO3 suggests significant acidosis. Calculate anion gap; consider DKA, lactic acidosis, toxic ingestion, severe diarrhea, advanced renal failure.',
              patient: 'Very low — needs urgent evaluation.',
            },
            zh: {
              clinical:
                'HCO3 顯著偏低提示明顯酸中毒。需計算陰離子間隙；考慮 DKA、乳酸酸中毒、毒物攝取、嚴重腹瀉或晚期腎衰竭。',
              patient: '非常低——需要儘速評估。',
            },
          },
        },
        {
          when: (v) => v < 22,
          level: 'low',
          title: { en: 'Reduced', zh: '偏低' },
          message: {
            en: {
              clinical:
                'Suggests metabolic acidosis or compensated respiratory alkalosis. Pair with anion gap and clinical context.',
              patient: 'Below the expected range — your clinician will check the cause.',
            },
            zh: {
              clinical:
                '提示代謝性酸中毒，或是呼吸性鹼中毒的代償。需結合陰離子間隙與臨床狀況判讀。',
              patient: '低於預期範圍——醫師會找出原因。',
            },
          },
        },
        {
          when: (v) => v <= 28,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: () => true,
          level: 'high',
          title: { en: 'Elevated', zh: '上升' },
          message: {
            en: {
              clinical:
                'Suggests metabolic alkalosis (vomiting, diuretic use, hyperaldosteronism) or compensated respiratory acidosis (chronic lung disease).',
              patient: 'Above the expected range — common with persistent vomiting or some lung conditions.',
            },
            zh: {
              clinical:
                '提示代謝性鹼中毒（嘔吐、使用利尿劑、醛固酮過多症），或呼吸性酸中毒的代償（慢性肺病）。',
              patient: '高於預期範圍——常見於持續嘔吐或某些肺部疾病。',
            },
          },
        },
      ],
    },
  ],

  contextOptions: [
    {
      id: 'onDiuretic',
      label: { en: 'On diuretic', zh: '正在使用利尿劑' },
      type: 'toggle',
    },
    {
      id: 'onAceArb',
      label: { en: 'On ACEi/ARB/MRA', zh: '正在使用 ACEi / ARB / MRA' },
      type: 'toggle',
    },
    {
      id: 'diabetic',
      label: { en: 'Diabetes (DKA risk)', zh: '糖尿病（DKA 風險）' },
      type: 'toggle',
    },
    {
      id: 'gilLoss',
      label: {
        en: 'Recent vomiting / diarrhea',
        zh: '近期嘔吐或腹瀉',
      },
      type: 'toggle',
    },
  ],
};
