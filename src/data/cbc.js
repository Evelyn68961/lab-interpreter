// CBC panel: WBC, Hemoglobin, MCV, Platelets, Neutrophil%
// Sex-specific reference ranges for Hgb via context.

export const cbc = {
  id: 'cbc',
  name: { en: 'Complete Blood Count', zh: '全血球計數（CBC）' },
  shortName: { en: 'CBC', zh: 'CBC' },
  dwarf: {
    id: 'ruby',
    name: 'Ruby Hearthcounter',
    title: { en: 'Keeper of the Three Bloodlines', zh: '三系血脈守護人' },
    greeting: {
      en: 'Three companies march in your veins — the red, the white, and the small ones. I count their numbers and weigh their stature. What have you brought for the count?',
      zh: '你的血液中有三支隊伍——紅、白、與血小板。我會點清他們的人數，秤量他們的體格。把你的檢驗結果交給我吧。',
    },
    verdicts: {
      normal: {
        en: 'All three companies stand at full strength, in good order and proper stature. Well marched, traveler.',
        zh: '三軍齊整，人數足、體格正——旅人，行軍有方。',
      },
      borderline: {
        en: 'A column wavers slightly — perhaps a soldier or two short, perhaps grown a touch larger or smaller than is usual. Worth a second look.',
        zh: '某一列略有動搖——或差一兩名兵卒，或體型稍顯偏大偏小。值得再點一次名。',
      },
      concerning: {
        en: 'I cannot give a clean count. A regiment falls short, or swells beyond its natural number. The cause should be sought before it grows.',
        zh: '此次點名不能算清楚。某支隊伍人數不足，或膨脹超過該有的數量。原因須在情況惡化前找出。',
      },
      critical: {
        en: 'By the count of the deep halls! The lines are broken — too few standing, or wildly too many. To the healer, swift as you can.',
        zh: '以深殿之名！軍列已亂——或殘兵潰散，或暴增失控。請盡速就醫。',
      },
    },
  },
  blurb: {
    en: {
      clinical:
        'Counts and indices for the three cell lines. Most diagnostic value is in the pattern (e.g., MCV with Hgb, WBC differential, all three lines together).',
      patient:
        'Counts your red cells, white cells, and platelets. Helps screen for anemia, infection, and bleeding/clotting issues.',
    },
    zh: {
      clinical:
        '三大血球系列的計數與指標。多數診斷價值來自整體型態（如 MCV 配合 Hgb、白血球分類、三系合併判讀）。',
      patient:
        '計數紅血球、白血球與血小板，協助篩檢貧血、感染以及出血/凝血相關問題。',
    },
  },
  references: [
    {
      label: 'ASH: Clinical Practice Guidelines',
      url: 'https://www.hematology.org/education/clinicians/guidelines-and-quality-care',
    },
    {
      label: 'UpToDate: Approach to the adult with anemia',
      url: 'https://www.uptodate.com/contents/search?search=approach+to+the+adult+with+anemia',
    },
    {
      label: 'UpToDate: Approach to the patient with thrombocytopenia',
      url: 'https://www.uptodate.com/contents/search?search=approach+to+the+adult+with+thrombocytopenia',
    },
  ],
  analytes: [
    {
      id: 'wbc',
      name: { en: 'WBC', zh: '白血球' },
      fullName: { en: 'White Blood Cell count', zh: '白血球計數' },
      unit: { en: '×10⁹/L', zh: '×10⁹/L' },
      placeholder: { en: 'e.g. 7.5', zh: '例如 7.5' },
      normalRange: { en: '4.0–11.0 ×10⁹/L', zh: '4.0–11.0 ×10⁹/L' },
      description: {
        en: {
          clinical:
            'Total leukocyte count. Interpretation requires the differential — the same total can mean very different things depending on which line is elevated or suppressed.',
          patient: 'The total count of white blood cells, which fight infection.',
        },
        zh: {
          clinical:
            '白血球總數。判讀需配合分類——相同總數依據哪一型態上升或下降，臨床意義可能完全不同。',
          patient: '對抗感染的白血球總量。',
        },
      },
      rules: [
        {
          when: (v) => v < 1.0,
          level: 'critical',
          title: {
            en: 'Severely low (agranulocytosis range)',
            zh: '嚴重偏低（顆粒性白血球缺乏範圍）',
          },
          message: {
            en: {
              clinical:
                'Severe leukopenia carries high infection risk. Differential: chemotherapy effect, marrow failure, severe sepsis, drug-induced (e.g., clozapine, methimazole). Source-evaluation and neutropenic precautions if neutrophils <0.5.',
              patient: 'Very low — increases infection risk. Needs urgent clinical attention.',
            },
            zh: {
              clinical:
                '嚴重白血球減少感染風險高。鑑別診斷：化療影響、骨髓衰竭、嚴重敗血症、藥物相關（如 clozapine、methimazole）。中性球 <0.5 時應採取嗜中性球減少預防措施並尋找感染源。',
              patient: '非常低——感染風險上升，需要儘速就醫。',
            },
          },
        },
        {
          when: (v) => v < 4.0,
          level: 'low',
          title: { en: 'Leukopenia', zh: '白血球減少' },
          message: {
            en: {
              clinical:
                'Causes include viral infection, medication effect, autoimmune disease, marrow suppression, and benign ethnic neutropenia. Correlate with differential.',
              patient: 'Lower than the usual range. Causes vary — viral infections and certain medications are common.',
            },
            zh: {
              clinical:
                '常見原因：病毒感染、藥物影響、自體免疫疾病、骨髓抑制，及良性族群性中性球減少。請結合白血球分類判讀。',
              patient: '低於一般範圍。原因多樣，常見於病毒感染或某些藥物。',
            },
          },
        },
        {
          when: (v) => v <= 11.0,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 30.0,
          level: 'high',
          title: { en: 'Leukocytosis', zh: '白血球增多' },
          message: {
            en: {
              clinical:
                'Common: bacterial infection, inflammation, stress response, steroid effect, post-op. Persistent or marked: consider hematologic malignancy. Differential and smear are key.',
              patient: 'Elevated. Often a response to infection, inflammation, or stress.',
            },
            zh: {
              clinical:
                '常見原因：細菌感染、發炎、壓力反應、類固醇作用、術後。若持續或顯著上升，需考慮血液惡性腫瘤。白血球分類與週邊血液抹片很重要。',
              patient: '偏高。常見於感染、發炎或壓力反應。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Marked leukocytosis', zh: '顯著白血球增多' },
          message: {
            en: {
              clinical:
                'WBC >30 raises concern for leukemoid reaction or hematologic malignancy (CML, AML, ALL). Peripheral smear and hematology evaluation indicated.',
              patient: 'Substantially elevated — needs prompt clinical evaluation.',
            },
            zh: {
              clinical:
                'WBC >30 需考慮類白血病反應或血液惡性疾病（CML、AML、ALL）。建議抹片檢查並安排血液腫瘤科評估。',
              patient: '顯著上升——需要儘快就醫評估。',
            },
          },
        },
      ],
    },

    {
      id: 'hgb',
      name: { en: 'Hemoglobin', zh: '血色素' },
      fullName: { en: 'Hemoglobin', zh: '血紅蛋白（血色素）' },
      unit: { en: 'g/dL', zh: 'g/dL' },
      placeholder: { en: 'e.g. 14', zh: '例如 14' },
      normalRange: {
        en: 'Male: 13.5–17.5 · Female: 12.0–15.5 g/dL',
        zh: '男性：13.5–17.5 · 女性：12.0–15.5 g/dL',
      },
      description: {
        en: {
          clinical:
            'Oxygen-carrying capacity. Interpret with MCV (anemia subtype) and reticulocyte count (production vs destruction).',
          patient: 'Measures the protein in red blood cells that carries oxygen.',
        },
        zh: {
          clinical:
            '反映血液攜氧能力。需與 MCV（貧血型態分類）及網狀紅血球數（生成 vs 破壞）合併判讀。',
          patient: '紅血球中負責攜帶氧氣的蛋白。',
        },
      },
      rules: [
        {
          when: (v) => v < 7,
          level: 'critical',
          title: { en: 'Severe anemia', zh: '嚴重貧血' },
          message: {
            en: {
              clinical:
                'Hgb <7 g/dL: transfusion threshold in most stable inpatients (higher in active cardiac ischemia). Evaluate cause urgently.',
              patient: 'Significantly low — needs urgent clinical evaluation.',
            },
            zh: {
              clinical:
                'Hgb <7 g/dL：多數穩定住院病人的輸血閾值（活動性心肌缺血者閾值較高）。需儘快評估病因。',
              patient: '顯著偏低——需要儘快就醫處理。',
            },
          },
        },
        {
          when: (v, ctx) => v < (ctx?.sex === 'male' ? 13.5 : 12.0),
          level: 'low',
          title: { en: 'Anemia', zh: '貧血' },
          message: {
            en: {
              clinical:
                'Classify by MCV (microcytic <80, normocytic 80–100, macrocytic >100) and reticulocyte response (hypoproliferative vs hemolytic/blood loss).',
              patient: 'Below the expected range. The next step is usually finding out why.',
            },
            zh: {
              clinical:
                '依 MCV 分類（小球性 <80、正常球性 80–100、大球性 >100）並結合網狀紅血球反應（造血不足 vs 溶血/失血）。',
              patient: '低於預期範圍。下一步通常是找出原因。',
            },
          },
        },
        {
          when: (v, ctx) => v <= (ctx?.sex === 'male' ? 17.5 : 15.5),
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within sex-specific reference range.', patient: 'In the expected range.' },
            zh: { clinical: '在依性別調整的參考範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 18.5,
          level: 'high',
          title: { en: 'Mild erythrocytosis', zh: '輕度紅血球增多' },
          message: {
            en: {
              clinical:
                'Causes: dehydration (relative), chronic hypoxia (smoking, COPD, OSA, high altitude), polycythemia vera, EPO use, renal cell or other tumors.',
              patient: 'Slightly higher than expected. Smoking, lung disease, or dehydration are common causes.',
            },
            zh: {
              clinical:
                '原因：脫水（相對性）、慢性缺氧（吸菸、COPD、OSA、高海拔）、真性紅血球增多症、EPO 使用，或腎細胞癌等腫瘤。',
              patient: '比預期略高。常見於吸菸、肺部疾病或脫水。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Marked erythrocytosis', zh: '顯著紅血球增多' },
          message: {
            en: {
              clinical:
                'Hgb >18.5 raises concern for polycythemia vera (especially with elevated WBC/platelets and JAK2 mutation) or significant secondary cause.',
              patient: 'Substantially elevated — warrants clinical evaluation.',
            },
            zh: {
              clinical:
                'Hgb >18.5 需考慮真性紅血球增多症（尤其合併 WBC/血小板上升及 JAK2 突變）或顯著次發性原因。',
              patient: '顯著偏高——需要進一步評估。',
            },
          },
        },
      ],
    },

    {
      id: 'mcv',
      name: { en: 'MCV', zh: 'MCV' },
      fullName: { en: 'Mean Corpuscular Volume', zh: '平均紅血球體積' },
      unit: { en: 'fL', zh: 'fL' },
      placeholder: { en: 'e.g. 90', zh: '例如 90' },
      normalRange: { en: '80–100 fL', zh: '80–100 fL' },
      description: {
        en: {
          clinical:
            'Average red cell size. The cornerstone of anemia classification: microcytic (<80), normocytic (80–100), macrocytic (>100).',
          patient: 'How big your red blood cells are on average.',
        },
        zh: {
          clinical:
            '紅血球的平均體積，是貧血分類的核心：小球性（<80）、正常球性（80–100）、大球性（>100）。',
          patient: '紅血球的平均大小。',
        },
      },
      rules: [
        {
          when: (v) => v < 80,
          level: 'low',
          title: { en: 'Microcytic', zh: '小球性' },
          message: {
            en: {
              clinical:
                'Differential: iron deficiency (most common), thalassemia, anemia of chronic disease (later), sideroblastic anemia, lead toxicity. Iron studies are usually first.',
              patient: 'Smaller than usual — often related to iron levels.',
            },
            zh: {
              clinical:
                '鑑別診斷：缺鐵（最常見）、地中海型貧血、慢性病貧血（晚期）、鐵芽球性貧血、鉛中毒。通常先檢查鐵相關指標。',
              patient: '比一般更小——常與鐵含量有關。',
            },
          },
        },
        {
          when: (v) => v <= 100,
          level: 'normal',
          title: { en: 'Normocytic', zh: '正常球性' },
          message: {
            en: {
              clinical: 'Normal range. If anemic: consider acute blood loss, hemolysis, anemia of chronic disease, mixed deficiencies.',
              patient: 'Average size — in the expected range.',
            },
            zh: {
              clinical:
                '在正常範圍內。若同時貧血，需考慮急性失血、溶血、慢性病貧血或合併性缺乏。',
              patient: '平均大小——在預期範圍內。',
            },
          },
        },
        {
          when: () => true,
          level: 'high',
          title: { en: 'Macrocytic', zh: '大球性' },
          message: {
            en: {
              clinical:
                'Differential: B12/folate deficiency (megaloblastic), alcohol, hypothyroidism, liver disease, MDS, certain drugs (methotrexate, hydroxyurea, AZT).',
              patient: 'Larger than usual — vitamin or thyroid testing is often the next step.',
            },
            zh: {
              clinical:
                '鑑別診斷：維生素 B12 / 葉酸缺乏（巨母紅血球性）、酒精、甲狀腺功能低下、肝病、MDS、某些藥物（methotrexate、hydroxyurea、AZT）。',
              patient: '比一般更大——通常下一步會檢查維生素或甲狀腺。',
            },
          },
        },
      ],
    },

    {
      id: 'platelets',
      name: { en: 'Platelets', zh: '血小板' },
      fullName: { en: 'Platelet count', zh: '血小板計數' },
      unit: { en: '×10⁹/L', zh: '×10⁹/L' },
      placeholder: { en: 'e.g. 250', zh: '例如 250' },
      normalRange: { en: '150–450 ×10⁹/L', zh: '150–450 ×10⁹/L' },
      description: {
        en: {
          clinical:
            'Cell fragments essential for primary hemostasis. Always consider pseudothrombocytopenia (EDTA-induced clumping) when low values are unexpected — confirm on smear or in citrate tube.',
          patient: 'Tiny cell fragments that help your blood form clots.',
        },
        zh: {
          clinical:
            '參與初級止血的細胞碎片。若數值意外偏低，需考慮假性血小板減少（EDTA 誘發的聚集），可透過血液抹片或 citrate 管確認。',
          patient: '幫助血液凝固的微小細胞碎片。',
        },
      },
      rules: [
        {
          when: (v) => v < 20,
          level: 'critical',
          title: { en: 'Severe thrombocytopenia', zh: '嚴重血小板減少' },
          message: {
            en: {
              clinical:
                'Spontaneous bleeding risk. Differential: ITP, TTP/HUS, DIC, drug-induced (heparin → HIT), marrow failure, hypersplenism. Avoid platelet transfusion in TTP and HIT unless life-threatening bleeding.',
              patient: 'Very low — increased risk of bleeding. Needs prompt clinical attention.',
            },
            zh: {
              clinical:
                '自發性出血風險上升。鑑別診斷：ITP、TTP/HUS、DIC、藥物相關（heparin 引發 HIT）、骨髓衰竭、脾功能亢進。除非危及生命的出血，否則 TTP 與 HIT 應避免輸注血小板。',
              patient: '非常低——出血風險上升，需要儘速就醫。',
            },
          },
        },
        {
          when: (v) => v < 150,
          level: 'low',
          title: { en: 'Thrombocytopenia', zh: '血小板減少' },
          message: {
            en: {
              clinical:
                'Many causes including viral, medication-induced, alcohol, liver disease, autoimmune (ITP). Trend, smear, and clinical context guide workup.',
              patient: 'Below the usual range — your clinician may want to investigate.',
            },
            zh: {
              clinical:
                '原因眾多，包括病毒感染、藥物、酒精、肝病、自體免疫（ITP）等。需依數值變化、抹片與臨床狀況決定檢查方向。',
              patient: '低於一般範圍——醫師可能會進一步檢查原因。',
            },
          },
        },
        {
          when: (v) => v <= 450,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'In the expected range.' },
            zh: { clinical: '在正常範圍內。', patient: '在預期的正常範圍內。' },
          },
        },
        {
          when: (v) => v <= 1000,
          level: 'high',
          title: { en: 'Thrombocytosis', zh: '血小板增多' },
          message: {
            en: {
              clinical:
                'Often reactive (infection, inflammation, iron deficiency, post-splenectomy, malignancy). Persistent or extreme: consider essential thrombocythemia or other MPN.',
              patient: 'Higher than usual — often a response to infection, inflammation, or iron deficiency.',
            },
            zh: {
              clinical:
                '多為反應性（感染、發炎、缺鐵、脾切除後、惡性腫瘤）。若持續或極高，需考慮原發性血小板增多症或其他 MPN。',
              patient: '比一般高——常見於感染、發炎或缺鐵。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Extreme thrombocytosis', zh: '極度血小板增多' },
          message: {
            en: {
              clinical:
                'Platelets >1000 raises concern for myeloproliferative neoplasm; paradoxical bleeding risk via acquired vWD.',
              patient: 'Substantially elevated — warrants hematology evaluation.',
            },
            zh: {
              clinical:
                '血小板 >1000 需考慮骨髓增生性腫瘤；可能因後天性 von Willebrand 病造成反向出血風險。',
              patient: '顯著上升——建議至血液科評估。',
            },
          },
        },
      ],
    },

    {
      id: 'neutrophils',
      name: { en: 'Neutrophil %', zh: '嗜中性球%' },
      fullName: {
        en: 'Neutrophil percent of WBC differential',
        zh: '嗜中性球占白血球分類比例',
      },
      unit: { en: '%', zh: '%' },
      placeholder: { en: 'e.g. 60', zh: '例如 60' },
      normalRange: { en: '40–70%', zh: '40–70%' },
      description: {
        en: {
          clinical:
            'Use with absolute neutrophil count (ANC = WBC × neutrophil%). ANC <0.5 ×10⁹/L = severe neutropenia and infection risk.',
          patient: 'The portion of white blood cells that are neutrophils — the main bacterial-fighting type.',
        },
        zh: {
          clinical:
            '需與絕對嗜中性球數（ANC = WBC × 嗜中性球%）合併判讀。ANC <0.5 ×10⁹/L 屬嚴重嗜中性球減少，感染風險高。',
          patient: '白血球中屬於嗜中性球的比例——主要負責對抗細菌。',
        },
      },
      rules: [
        {
          when: (v) => v < 40,
          level: 'low',
          title: { en: 'Relative neutropenia', zh: '相對性嗜中性球減少' },
          message: {
            en: {
              clinical:
                'Compute ANC for clinical significance. Causes include viral infections, drug effect, autoimmune, ethnic neutropenia, marrow disorders.',
              patient: 'Below the usual proportion. Often viral or medication-related.',
            },
            zh: {
              clinical:
                '需計算 ANC 以判斷臨床意義。原因包括病毒感染、藥物、自體免疫、族群性中性球減少、骨髓疾病。',
              patient: '比一般比例低。常見於病毒感染或藥物影響。',
            },
          },
        },
        {
          when: (v) => v <= 70,
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
          title: { en: 'Neutrophil predominance', zh: '嗜中性球比例上升' },
          message: {
            en: {
              clinical:
                'Classic for acute bacterial infection, stress response, steroids, post-op. Marked left shift or bands suggest more aggressive bacterial process.',
              patient: 'Higher proportion than usual — common with bacterial infection or stress.',
            },
            zh: {
              clinical:
                '常見於急性細菌感染、壓力反應、類固醇、術後。若有顯著左移或桿狀核增加，提示較嚴重的細菌性病程。',
              patient: '比一般比例高——常見於細菌感染或壓力反應。',
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
        en: 'Biological sex (for Hgb reference)',
        zh: '生理性別（影響 Hgb 參考值）',
      },
      type: 'select',
      options: [
        { value: 'female', label: { en: 'Female', zh: '女性' } },
        { value: 'male', label: { en: 'Male', zh: '男性' } },
      ],
    },
    {
      id: 'pregnant',
      label: { en: 'Pregnant', zh: '懷孕' },
      type: 'toggle',
    },
    {
      id: 'onChemotherapy',
      label: { en: 'Recent chemotherapy', zh: '近期接受化學治療' },
      type: 'toggle',
    },
  ],
};
