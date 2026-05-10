// Pattern engine: looks at all values in a panel + clinical context and
// surfaces classic combined profiles. All text is bilingual (en / zh).

const has = (v, ...keys) => keys.every((k) => typeof v[k] === 'number');

export const patterns = [
  // ---------------- Coagulation ----------------
  {
    id: 'dic',
    name: {
      en: 'DIC pattern (Disseminated Intravascular Coagulation)',
      zh: 'DIC 型態（瀰漫性血管內凝血）',
    },
    panel: 'coagulation',
    explanation: {
      en: {
        clinical:
          'Prolonged PT and aPTT, low fibrinogen (consumption), and elevated D-dimer (fibrinolysis) — the classic laboratory signature of DIC. Platelets are typically low as well.',
        patient:
          'A combination that can suggest your body is using up clotting factors faster than it can make them — usually triggered by a serious underlying illness.',
      },
      zh: {
        clinical:
          'PT 與 aPTT 同時延長、纖維蛋白原下降（消耗）、D-二聚體上升（纖維蛋白溶解）——DIC 的典型實驗室表現，血小板通常也偏低。',
        patient:
          '此組合提示身體消耗凝血因子的速度超過製造，常因嚴重的潛在疾病引發。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'Correlate with platelet count, schistocytes on smear, and ISTH DIC score. Treat the underlying trigger (sepsis, malignancy, obstetric complication, trauma).',
        patient: 'This pattern needs urgent clinical evaluation — do not self-manage.',
      },
      zh: {
        clinical:
          '結合血小板計數、抹片中分裂紅血球（schistocytes）與 ISTH DIC 分數判讀，並針對潛在病因（敗血症、惡性腫瘤、產科併發症、創傷）進行治療。',
        patient: '此型態需要緊急臨床評估，請勿自行處理。',
      },
    },
    dwarfQuip: {
      en: 'DIC! The forge devours itself — clotting and bleeding at once. To the healer with all haste.',
      zh: 'DIC！這是爐火吞噬自身的徵兆——一邊凝結、一邊崩漏。請火速就醫。',
    },
    references: [
      {
        label: 'ISTH: Practice Guidelines & DIC Scoring System',
        url: 'https://www.isth.org/page/Guidelines',
      },
      {
        label: 'UpToDate: DIC in adults — diagnosis and treatment',
        url: 'https://www.uptodate.com/contents/search?search=disseminated+intravascular+coagulation+adults',
      },
    ],
    match(v) {
      if (!has(v, 'pt', 'aptt', 'fibrinogen', 'ddimer')) return { matched: false };
      const ptHi = v.pt > 13.5;
      const apttHi = v.aptt > 35;
      const fibLo = v.fibrinogen < 200;
      const ddHi = v.ddimer > 1000;
      const score = [ptHi, apttHi, fibLo, ddHi].filter(Boolean).length;
      if (score < 3) return { matched: false };
      return {
        matched: true,
        confidence: score === 4 ? 'high' : 'moderate',
        notes: `${score}/4 features present.`,
      };
    },
  },

  {
    id: 'warfarin-effect',
    name: {
      en: 'Warfarin / vitamin K antagonist effect',
      zh: 'Warfarin / 維生素 K 拮抗劑作用型態',
    },
    panel: 'coagulation',
    explanation: {
      en: {
        clinical:
          'Isolated PT/INR prolongation with normal aPTT reflects reduced vitamin K-dependent factors (II, VII, IX, X) — most often warfarin. Factor VII has the shortest half-life, so PT prolongs first.',
        patient:
          'A pattern often seen in people taking warfarin. The blood takes longer to clot via one specific pathway.',
      },
      zh: {
        clinical:
          '單獨 PT/INR 延長且 aPTT 正常，反映維生素 K 依賴的凝血因子（II、VII、IX、X）下降，最常見於 warfarin。其中因子 VII 半衰期最短，PT 最先延長。',
        patient:
          '常見於服用 warfarin 者：血液在某一條凝血路徑上凝固速度變慢。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'If on warfarin: confirm INR is in target range (commonly 2.0–3.0, or 2.5–3.5 for mechanical valves). If not on warfarin: consider vitamin K deficiency, early liver dysfunction, or factor VII deficiency.',
        patient:
          'If you take warfarin, share this result with your clinician — your dose may need adjustment.',
      },
      zh: {
        clinical:
          '若使用 warfarin：確認 INR 是否在目標範圍內（一般 2.0–3.0，機械性瓣膜為 2.5–3.5）。若未使用 warfarin：考慮維生素 K 缺乏、早期肝功能異常或因子 VII 缺乏。',
        patient:
          '若您服用 warfarin，請將此結果告知醫師，可能需調整劑量。',
      },
    },
    dwarfQuip: {
      en: 'The mark of warfarin is upon the forge — the slow-clot tonic at work. If this is by the healer\'s design, all is well.',
      zh: '這是 warfarin 在爐中發揮作用的痕跡——若是醫者所授的劑量，便無大礙。',
    },
    references: [
      {
        label: 'ACCP/CHEST: Antithrombotic Therapy Guidelines',
        url: 'https://www.chestnet.org/guidelines-and-resources',
      },
      {
        label: 'UpToDate: Therapeutic use of warfarin',
        url: 'https://www.uptodate.com/contents/search?search=therapeutic+use+of+warfarin',
      },
    ],
    match(v, ctx) {
      if (!has(v, 'pt', 'aptt')) return { matched: false };
      const ptHi = v.pt > 13.5 || (typeof v.inr === 'number' && v.inr > 1.2);
      const apttNormal = v.aptt >= 25 && v.aptt <= 35;
      if (!(ptHi && apttNormal)) return { matched: false };
      const confidence = ctx?.onWarfarin ? 'high' : 'moderate';
      return { matched: true, confidence };
    },
  },

  {
    id: 'heparin-effect',
    name: { en: 'Heparin effect', zh: 'Heparin 作用型態' },
    panel: 'coagulation',
    explanation: {
      en: {
        clinical:
          'Isolated aPTT prolongation with normal PT/INR is the expected pattern of unfractionated heparin therapy (heparin amplifies antithrombin activity against factors IIa and Xa, prolonging the intrinsic pathway).',
        patient:
          'A pattern often seen during heparin treatment. One specific clotting test is prolonged while the other stays normal.',
      },
      zh: {
        clinical:
          '單獨 aPTT 延長而 PT/INR 正常，是未分餾 heparin 的典型表現（heparin 強化 antithrombin 對 IIa 與 Xa 的抑制，延長內在途徑）。',
        patient:
          '常見於使用 heparin 時：某一項凝血檢驗延長，另一項保持正常。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'If on UFH: confirm aPTT is within institutional therapeutic range (commonly 1.5–2.5× control). If not on heparin: consider lupus anticoagulant, intrinsic pathway factor deficiency (VIII, IX, XI, XII), or vWD.',
        patient: 'If you are receiving heparin, this result is for your care team to interpret.',
      },
      zh: {
        clinical:
          '若使用 UFH：確認 aPTT 是否在機構規定的治療範圍內（一般為對照的 1.5–2.5 倍）。若未使用 heparin：考慮狼瘡抗凝物、內在途徑凝血因子缺乏（VIII、IX、XI、XII）或 vWD。',
        patient: '若您正在接受 heparin 治療，此結果應由醫療團隊判讀。',
      },
    },
    dwarfQuip: {
      en: 'The second river runs slow — the touch of heparin. Confirm with your healer that this is the intended song.',
      zh: '第二條血脈被刻意放慢——這是 heparin 的觸動。請與醫者確認此為預期的節奏。',
    },
    match(v, ctx) {
      if (!has(v, 'pt', 'aptt')) return { matched: false };
      const ptNormal = v.pt >= 11 && v.pt <= 13.5;
      const apttHi = v.aptt > 35;
      if (!(ptNormal && apttHi)) return { matched: false };
      const confidence = ctx?.onHeparin ? 'high' : 'moderate';
      return { matched: true, confidence };
    },
  },

  {
    id: 'liver-dysfunction-coag',
    name: { en: 'Liver dysfunction pattern', zh: '肝功能異常型態' },
    panel: 'coagulation',
    explanation: {
      en: {
        clinical:
          'The liver synthesizes most coagulation factors. Advanced hepatic dysfunction prolongs both PT and aPTT, may lower fibrinogen, and (unlike DIC) typically does not markedly raise D-dimer.',
        patient:
          'A pattern that can appear when the liver is not making enough clotting proteins.',
      },
      zh: {
        clinical:
          '多數凝血因子由肝臟合成。嚴重肝功能異常會同時延長 PT 與 aPTT、可能降低纖維蛋白原；與 DIC 不同，D-二聚體通常不會顯著上升。',
        patient:
          '當肝臟製造的凝血蛋白不足時可能出現的型態。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'Correlate with LFTs, albumin, platelet count. PT/INR is part of MELD scoring. Distinguish from DIC using D-dimer and clinical context.',
        patient: 'Discuss liver health with your clinician — further testing may be needed.',
      },
      zh: {
        clinical:
          '結合肝功能、白蛋白與血小板判讀。PT/INR 是 MELD 分數的一部分；可透過 D-二聚體與臨床狀況與 DIC 鑑別。',
        patient: '請與醫師討論肝臟狀況，可能需要進一步檢查。',
      },
    },
    dwarfQuip: {
      en: 'The liver\'s bellows wheeze. Without their breath the forge has no fuel — both channels falter together.',
      zh: '肝之風箱已弱，火源無力——兩條血脈一同遲滯。',
    },
    match(v, ctx) {
      if (!has(v, 'pt', 'aptt')) return { matched: false };
      const bothHi = v.pt > 13.5 && v.aptt > 35;
      const ddNotHigh = !has(v, 'ddimer') || v.ddimer < 1000;
      if (!(bothHi && ddNotHigh)) return { matched: false };
      const confidence = ctx?.liverDisease ? 'high' : 'low';
      return { matched: true, confidence };
    },
  },

  // ---------------- CBC ----------------
  {
    id: 'microcytic-anemia',
    name: { en: 'Microcytic anemia', zh: '小球性貧血' },
    panel: 'cbc',
    explanation: {
      en: {
        clinical:
          'Low hemoglobin with low MCV (<80 fL). Most commonly iron deficiency; differential includes thalassemia trait, anemia of chronic disease (later stage), and sideroblastic anemia.',
        patient:
          'The red blood cells are smaller than expected and the count is low — often related to iron levels.',
      },
      zh: {
        clinical:
          '低 Hgb 合併低 MCV（<80 fL）。最常見原因為缺鐵；鑑別診斷包括地中海型貧血特性、慢性病貧血（晚期）以及鐵芽球性貧血。',
        patient:
          '紅血球比預期小且數量偏低——常與鐵的狀況有關。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'Order ferritin, iron studies, reticulocyte count. Consider hemoglobin electrophoresis if iron studies are normal.',
        patient: 'Your clinician may order iron-related blood tests next.',
      },
      zh: {
        clinical:
          '建議檢查 ferritin、鐵相關指標與網狀紅血球。若鐵相關檢查正常，可考慮血紅素電泳。',
        patient: '醫師可能會安排與鐵相關的血液檢查作為下一步。',
      },
    },
    dwarfQuip: {
      en: 'The red company is small in stature. Most likely they hunger for iron.',
      zh: '紅軍身形矮小——多半是鐵的給養不足。',
    },
    references: [
      {
        label: 'UpToDate: Causes and diagnosis of iron deficiency',
        url: 'https://www.uptodate.com/contents/search?search=causes+and+diagnosis+of+iron+deficiency',
      },
    ],
    match(v, ctx) {
      if (!has(v, 'hgb', 'mcv')) return { matched: false };
      const sex = ctx?.sex || 'female';
      const hgbLow = sex === 'male' ? v.hgb < 13.5 : v.hgb < 12.0;
      const micro = v.mcv < 80;
      if (!(hgbLow && micro)) return { matched: false };
      return { matched: true, confidence: 'high' };
    },
  },

  {
    id: 'macrocytic-anemia',
    name: { en: 'Macrocytic anemia', zh: '大球性貧血' },
    panel: 'cbc',
    explanation: {
      en: {
        clinical:
          'Low hemoglobin with elevated MCV (>100 fL). Causes include B12/folate deficiency (megaloblastic), alcohol use, hypothyroidism, liver disease, MDS, and certain medications (e.g., methotrexate, hydroxyurea).',
        patient: 'Red blood cells are larger than expected and the count is low.',
      },
      zh: {
        clinical:
          '低 Hgb 合併 MCV 上升（>100 fL）。原因包括維生素 B12 / 葉酸缺乏（巨母紅血球性）、酒精、甲狀腺功能低下、肝病、MDS 及某些藥物（如 methotrexate、hydroxyurea）。',
        patient: '紅血球比預期大且數量偏低。',
      },
    },
    nextSteps: {
      en: {
        clinical: 'Check B12, folate, TSH, reticulocytes; consider peripheral smear for megaloblastic features.',
        patient: 'Vitamin and thyroid testing is often the next step.',
      },
      zh: {
        clinical:
          '檢查維生素 B12、葉酸、TSH、網狀紅血球；必要時透過抹片觀察巨母紅血球性特徵。',
        patient: '通常下一步會檢查維生素與甲狀腺。',
      },
    },
    dwarfQuip: {
      en: 'The red company is large but few. Vitamin or rest is what they want.',
      zh: '紅軍體型雖巨，人數卻少——他們所缺的是維生素或喘息之機。',
    },
    references: [
      {
        label: 'UpToDate: Macrocytosis / macrocytic anemias',
        url: 'https://www.uptodate.com/contents/search?search=macrocytosis+macrocytic+anemia',
      },
    ],
    match(v, ctx) {
      if (!has(v, 'hgb', 'mcv')) return { matched: false };
      const sex = ctx?.sex || 'female';
      const hgbLow = sex === 'male' ? v.hgb < 13.5 : v.hgb < 12.0;
      const macro = v.mcv > 100;
      if (!(hgbLow && macro)) return { matched: false };
      return { matched: true, confidence: 'high' };
    },
  },

  {
    id: 'bacterial-pattern',
    name: { en: 'Bacterial infection pattern', zh: '細菌感染型態' },
    panel: 'cbc',
    explanation: {
      en: {
        clinical:
          'Leukocytosis with neutrophil predominance ("left shift" if bands are elevated) is consistent with acute bacterial infection or other neutrophilic stress response.',
        patient: 'White blood cells are elevated in a way that often goes with a bacterial infection.',
      },
      zh: {
        clinical:
          '白血球升高且以嗜中性球為主（若桿狀核增加即為「左移」），常見於急性細菌感染或嗜中性球性壓力反應。',
        patient: '白血球的升高型態常見於細菌感染。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'Correlate with vitals, source-specific exam, cultures, CRP/procalcitonin. Not specific — also seen in stress, steroids, post-op states.',
        patient: 'Combine with how you feel and any fever — your clinician will interpret in context.',
      },
      zh: {
        clinical:
          '結合生命徵象、感染源檢查、培養、CRP/procalcitonin 判讀。並非特異——壓力、類固醇、術後等情況亦可見。',
        patient: '需配合身體感受與是否發燒等狀況，由醫師綜合判讀。',
      },
    },
    dwarfQuip: {
      en: 'The white legions march in force — they answer some unseen call. Bacteria likely stalk the keep.',
      zh: '白甲軍團大舉出動——他們在回應某個看不見的敵手，多半是細菌已入侵城堡。',
    },
    match(v) {
      if (!has(v, 'wbc')) return { matched: false };
      const wbcHi = v.wbc > 11;
      const neuHi = !has(v, 'neutrophils') || v.neutrophils > 70;
      if (!(wbcHi && neuHi)) return { matched: false };
      return { matched: true, confidence: 'moderate' };
    },
  },

  {
    id: 'pancytopenia',
    name: { en: 'Pancytopenia', zh: '全血球減少' },
    panel: 'cbc',
    explanation: {
      en: {
        clinical:
          'Reduction in all three cell lines (RBC, WBC, platelets). Causes include marrow failure (aplastic anemia, MDS), marrow infiltration, severe B12/folate deficiency, hypersplenism, and certain medications.',
        patient: 'All three main types of blood cells are below expected — this needs careful evaluation.',
      },
      zh: {
        clinical:
          '紅血球、白血球與血小板三系皆下降。原因包括骨髓衰竭（再生不良性貧血、MDS）、骨髓浸潤、嚴重 B12/葉酸缺乏、脾功能亢進及某些藥物。',
        patient: '三大類血球都低於預期——需要仔細評估。',
      },
    },
    nextSteps: {
      en: {
        clinical: 'Peripheral smear, reticulocyte count, B12/folate, hematology referral; consider marrow biopsy.',
        patient: 'This pattern warrants prompt clinical follow-up.',
      },
      zh: {
        clinical:
          '建議週邊血液抹片、網狀紅血球計數、B12/葉酸檢查與血液腫瘤科會診，必要時做骨髓切片。',
        patient: '此型態需要儘速由醫師追蹤。',
      },
    },
    dwarfQuip: {
      en: 'All three companies are thinned. The marrow\'s foundry runs cold.',
      zh: '三軍俱削減——骨髓的兵工廠已冷卻。',
    },
    match(v, ctx) {
      if (!has(v, 'hgb', 'wbc', 'platelets')) return { matched: false };
      const sex = ctx?.sex || 'female';
      const hgbLow = sex === 'male' ? v.hgb < 13.5 : v.hgb < 12.0;
      const wbcLo = v.wbc < 4;
      const pltLo = v.platelets < 150;
      if (!(hgbLow && wbcLo && pltLo)) return { matched: false };
      return { matched: true, confidence: 'high' };
    },
  },

  // ---------------- Renal ----------------
  {
    id: 'prerenal-aki',
    name: {
      en: 'Prerenal pattern (likely volume-related)',
      zh: '腎前性型態（可能與容積有關）',
    },
    panel: 'renal',
    explanation: {
      en: {
        clinical:
          'BUN:creatinine ratio >20:1 with elevated creatinine suggests prerenal azotemia — kidney perfusion is reduced (volume depletion, heart failure, hepatorenal). Tubules are intact and concentrate urea.',
        patient:
          'A pattern often seen when the kidneys are not getting enough blood flow — for example from dehydration.',
      },
      zh: {
        clinical:
          'BUN:肌酸酐比值 >20:1 並合併肌酸酐上升，提示腎前性氮血症——腎臟灌流不足（容積不足、心衰竭、肝腎症候群），但腎小管功能正常並能濃縮尿素。',
        patient:
          '常見於腎臟血流不足的情況，例如脫水。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'Assess volume status, urine sodium / FENa, response to fluid challenge if indicated; review nephrotoxic medications.',
        patient: 'Hydration status and medication review are common next steps.',
      },
      zh: {
        clinical:
          '評估容積狀態、尿鈉 / FENa、必要時補液試驗；檢視可能的腎毒性藥物。',
        patient: '通常下一步會評估水分狀態並檢視用藥。',
      },
    },
    dwarfQuip: {
      en: 'The filter starves for flow. Bring water to the keep before the stones go dry.',
      zh: '過濾器缺乏流量——請及時為城堡引水，免得石材乾裂。',
    },
    references: [
      {
        label: 'KDIGO 2012 AKI Guideline',
        url: 'https://kdigo.org/guidelines/acute-kidney-injury/',
      },
      {
        label: 'UpToDate: Etiology and diagnosis of prerenal disease',
        url: 'https://www.uptodate.com/contents/search?search=etiology+and+diagnosis+of+prerenal+disease',
      },
    ],
    match(v) {
      if (!has(v, 'bun', 'creatinine')) return { matched: false };
      const ratio = v.bun / v.creatinine;
      const crHi = v.creatinine > 1.2;
      if (!(ratio > 20 && crHi)) return { matched: false };
      return { matched: true, confidence: 'moderate', notes: `BUN:Cr ratio ≈ ${ratio.toFixed(1)}.` };
    },
  },

  {
    id: 'intrinsic-aki',
    name: { en: 'Intrinsic renal pattern', zh: '腎實質性型態' },
    panel: 'renal',
    explanation: {
      en: {
        clinical:
          'Elevated creatinine with BUN:Cr ratio 10–20:1 is more consistent with intrinsic kidney injury (ATN, glomerulonephritis, interstitial nephritis) than prerenal causes.',
        patient: 'A pattern that points more to the kidney tissue itself than to blood flow alone.',
      },
      zh: {
        clinical:
          '肌酸酐上升合併 BUN:肌酸酐比值 10–20:1，較符合腎實質性損傷（ATN、絲球腎炎、間質性腎炎），而非單純腎前性原因。',
        patient: '此型態較指向腎臟本身的組織問題，而非單純血流問題。',
      },
    },
    nextSteps: {
      en: {
        clinical: 'Urinalysis with microscopy, urine sediment, FENa; consider nephrology consult.',
        patient: 'A urine test typically comes next to clarify the cause.',
      },
      zh: {
        clinical:
          '建議尿液常規與沉渣鏡檢、FENa；必要時腎臟科會診。',
        patient: '通常下一步會做尿液檢查以釐清原因。',
      },
    },
    dwarfQuip: {
      en: 'The filter itself is wounded. Tend to the stone, not just the river that feeds it.',
      zh: '過濾器本體已受傷——須照料石材，而非僅僅供水。',
    },
    match(v) {
      if (!has(v, 'bun', 'creatinine')) return { matched: false };
      const ratio = v.bun / v.creatinine;
      const crHi = v.creatinine > 1.2;
      if (!(ratio >= 10 && ratio <= 20 && crHi)) return { matched: false };
      return { matched: true, confidence: 'moderate', notes: `BUN:Cr ratio ≈ ${ratio.toFixed(1)}.` };
    },
  },

  // ---------------- Electrolytes ----------------
  {
    id: 'anion-gap-acidosis',
    name: {
      en: 'High anion gap metabolic acidosis (suspected)',
      zh: '高陰離子間隙代謝性酸中毒（疑似）',
    },
    panel: 'electrolytes',
    explanation: {
      en: {
        clinical:
          'Anion gap = Na − (Cl + HCO3). Values >12 suggest unmeasured anions. Classic differential: MUDPILES / GOLDMARK (lactate, ketones, toxic alcohols, uremia, salicylates).',
        patient: 'A calculated value that suggests acid is building up in the blood from a specific cause.',
      },
      zh: {
        clinical:
          '陰離子間隙 = Na − (Cl + HCO3)，>12 提示有未量測的陰離子。經典鑑別診斷：MUDPILES / GOLDMARK（乳酸、酮體、毒性醇類、尿毒、salicylate 等）。',
        patient: '計算出的數值，提示血液中有特定原因造成的酸性物質堆積。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'Check lactate, ketones, glucose, salicylate level if suspected; consider osmolar gap if toxic alcohol on differential.',
        patient: 'This needs prompt clinical evaluation — do not self-treat.',
      },
      zh: {
        clinical:
          '檢查乳酸、酮體、血糖；若懷疑 salicylate 中毒可加驗其濃度；若懷疑毒性醇類，計算 osmolar gap。',
        patient: '需要儘速臨床評估，請勿自行處理。',
      },
    },
    dwarfQuip: {
      en: 'An unmeasured acid stalks the salts. Hunt it down — lactate, ketone, or worse.',
      zh: '有一種未被計算的酸潛伏於鹽中——追緝它，可能是乳酸、酮體，或更糟的東西。',
    },
    references: [
      {
        label: 'UpToDate: Approach to the adult with metabolic acidosis',
        url: 'https://www.uptodate.com/contents/search?search=approach+to+the+adult+with+metabolic+acidosis',
      },
    ],
    match(v) {
      if (!has(v, 'sodium', 'chloride', 'bicarbonate')) return { matched: false };
      const ag = v.sodium - (v.chloride + v.bicarbonate);
      if (ag <= 12) return { matched: false };
      return { matched: true, confidence: 'high', notes: `Calculated anion gap ≈ ${ag.toFixed(0)}.` };
    },
  },

  {
    id: 'hyperkalemia-severe',
    name: { en: 'Severe hyperkalemia', zh: '嚴重高血鉀' },
    panel: 'electrolytes',
    explanation: {
      en: {
        clinical:
          'Potassium >6.0 mmol/L carries risk of cardiac arrhythmia (peaked T waves → QRS widening → sine wave). Confirm not hemolyzed (pseudohyperkalemia is common).',
        patient: 'Potassium is high enough to need urgent attention from a clinician.',
      },
      zh: {
        clinical:
          '鉀 >6.0 mmol/L 具心律不整風險（T 波尖突 → QRS 增寬 → sine wave）。需確認非檢體溶血造成的假性高血鉀。',
        patient: '鉀已高到需要緊急由醫療人員處理。',
      },
    },
    nextSteps: {
      en: {
        clinical:
          'ECG immediately. If real and >6.5 or with ECG changes: calcium gluconate, insulin/dextrose, beta-agonist, then potassium removal (kayexalate / patiromer / dialysis).',
        patient: 'Seek medical care promptly — do not wait.',
      },
      zh: {
        clinical:
          '立即做 ECG。若確認為真且 >6.5 或合併 ECG 變化：給予 calcium gluconate、insulin/葡萄糖、β-促效劑，再以 kayexalate / patiromer / 透析清除鉀。',
        patient: '請立即就醫，不要拖延。',
      },
    },
    dwarfQuip: {
      en: 'The potassium drum thunders. The heart cannot keep time — to the healer at once.',
      zh: '鉀的鼓聲如雷鳴——心臟難以合拍，請立即就醫。',
    },
    references: [
      {
        label: 'UpToDate: Treatment and prevention of hyperkalemia',
        url: 'https://www.uptodate.com/contents/search?search=treatment+and+prevention+of+hyperkalemia',
      },
    ],
    match(v) {
      if (!has(v, 'potassium')) return { matched: false };
      if (v.potassium <= 6.0) return { matched: false };
      return { matched: true, confidence: 'high' };
    },
  },
];

export function runPatterns(panelId, values, context) {
  return patterns
    .filter((p) => p.panel === panelId)
    .map((p) => {
      const r = p.match(values, context);
      if (!r.matched) return null;
      return {
        id: p.id,
        name: p.name,
        confidence: r.confidence,
        notes: r.notes,
        explanation: p.explanation,
        nextSteps: p.nextSteps,
        dwarfQuip: p.dwarfQuip,
        references: p.references,
      };
    })
    .filter(Boolean);
}
