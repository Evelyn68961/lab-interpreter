// Coagulation panel: PT, INR, aPTT, D-dimer, fibrinogen.
// All text fields are bilingual: simple {en, zh} for labels, {en/zh: {clinical, patient}}
// for descriptions and rule messages.

export const coagulation = {
  id: 'coagulation',
  name: { en: 'Coagulation Profile', zh: '凝血功能檢驗' },
  shortName: { en: 'Coag', zh: '凝血' },
  dwarf: {
    id: 'ferrum',
    name: 'Ferrum Stoutbeard',
    title: { en: 'Master of the Forge of Lifeblood', zh: '生命之血爐主' },
    greeting: {
      en: 'Greetings, traveler. I tend the great forge where blood is bidden to flow or stilled. Show me your readings, and I shall tell whether the channels run true.',
      zh: '旅人，歡迎來到我的鐵爐——這裡掌管著血液流動與凝結的奧秘。將你的數據交予我，由我來判斷流動是否合度。',
    },
    verdicts: {
      normal: {
        en: 'The forge runs true. The channels of blood are neither too quick to clot nor too slow to mend. Carry on, traveler.',
        zh: '爐火正旺，血脈通暢——既不貪快凝結，也不怠慢修補。旅人，繼續前行吧。',
      },
      borderline: {
        en: 'A faint hiss from the forge — the flow is mostly true, but one channel rings off-key. Mark it and watch.',
        zh: '爐火傳來一絲嘶聲——血脈大致通順，唯有一條微微走音。記下，留心觀察便是。',
      },
      concerning: {
        en: 'The forge complains. Either the iron flows too freely, or it sets too eagerly. This is not the song of a healthy keep — speak with your healer.',
        zh: '爐火傳來低吼。鐵汁或流得太奔放，或凝得太急切——這不是健康城堡該有的節奏。請與你的醫者商議。',
      },
      critical: {
        en: 'By my hammer! The forge thunders out of true. Tarry not — seek the healer at once, lest the keep bleed or be sealed shut.',
        zh: '我以這把鐵錘起誓——爐火已亂！別再耽擱，立刻去找醫者，免得城堡或大出血、或徹底凝閉。',
      },
    },
  },
  blurb: {
    en: {
      clinical:
        'Screening tests of the extrinsic (PT/INR), intrinsic (aPTT), and fibrinolytic pathways. Most useful when interpreted as a pattern alongside clinical context.',
      patient:
        'A group of blood tests that look at how well your blood clots. Different tests check different parts of the clotting process.',
    },
    zh: {
      clinical:
        '篩檢外在途徑（PT/INR）、內在途徑（aPTT）以及纖維蛋白溶解功能的檢驗組。建議結合多項檢驗結果與臨床狀況綜合判讀。',
      patient:
        '一組評估「血液凝固能力」的檢驗。不同的項目檢查凝血流程中的不同環節。',
    },
  },
  references: [
    {
      label: 'ACCP/CHEST: Antithrombotic Therapy Guidelines',
      url: 'https://www.chestnet.org/guidelines-and-resources',
    },
    {
      label: 'ASH: Venous Thromboembolism Guidelines',
      url: 'https://www.hematology.org/education/clinicians/guidelines-and-quality-care/clinical-practice-guidelines/venous-thromboembolism-guidelines',
    },
    {
      label: 'ISTH: Practice Guidelines & DIC Score',
      url: 'https://www.isth.org/page/Guidelines',
    },
    {
      label: 'UpToDate: Clinical use of coagulation tests',
      url: 'https://www.uptodate.com/contents/search?search=clinical+use+of+coagulation+tests',
    },
  ],
  analytes: [
    {
      id: 'pt',
      name: { en: 'PT', zh: 'PT' },
      fullName: { en: 'Prothrombin Time', zh: '凝血酶原時間' },
      unit: { en: 'seconds', zh: '秒' },
      placeholder: { en: 'e.g. 12.5', zh: '例如 12.5' },
      normalRange: { en: '11–13.5 s (lab-dependent)', zh: '11–13.5 秒（因實驗室而異）' },
      description: {
        en: {
          clinical:
            'Measures the extrinsic and common pathways (factors VII, X, V, II, fibrinogen). Sensitive to warfarin, vitamin K deficiency, and hepatic synthetic dysfunction; factor VII has the shortest half-life and falls first.',
          patient:
            'Measures how long one specific part of clotting takes. It is sensitive to medicines like warfarin and to liver and vitamin K issues.',
        },
        zh: {
          clinical:
            '反映外在途徑與共同途徑（凝血因子 VII、X、V、II 與纖維蛋白原）。對 warfarin、維生素 K 缺乏及肝臟合成功能下降敏感；其中因子 VII 半衰期最短，最先出現延長。',
          patient:
            '測量血液在某一條凝血路徑上需要多久才會凝固。對 warfarin 等藥物、維生素 K 不足或肝功能異常較敏感。',
        },
      },
      rules: [
        {
          when: (v) => v < 11,
          level: 'low',
          title: { en: 'Below reference range', zh: '低於參考範圍' },
          message: {
            en: {
              clinical:
                'Mildly shortened PT is rarely clinically significant in isolation; can occasionally reflect specimen handling or an acute-phase response with high factor levels.',
              patient: 'Slightly shorter than expected — usually not a concern on its own.',
            },
            zh: {
              clinical:
                '單獨輕微縮短的 PT 多無重要臨床意義；偶爾與檢體處理或急性期反應導致凝血因子上升有關。',
              patient: '比一般預期略短——通常不是獨立的問題。',
            },
          },
        },
        {
          when: (v) => v <= 13.5,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: {
              clinical: 'Extrinsic and common pathway screening tests are within normal limits.',
              patient: 'Within the expected range.',
            },
            zh: {
              clinical: '外在途徑與共同途徑篩檢結果正常。',
              patient: '在預期的正常範圍內。',
            },
          },
        },
        {
          when: (v) => v <= 18,
          level: 'high',
          title: { en: 'Mildly prolonged', zh: '輕度延長' },
          message: {
            en: {
              clinical:
                'Differential includes warfarin/VKA effect, early/mild hepatic dysfunction, vitamin K deficiency, factor VII deficiency, or DIC (early). Correlate with INR, aPTT, fibrinogen, and D-dimer.',
              patient:
                'A bit longer than expected. Can reflect medications (like warfarin), low vitamin K, or liver issues.',
            },
            zh: {
              clinical:
                '鑑別診斷包括 warfarin/VKA 作用、早期或輕度肝功能異常、維生素 K 缺乏、因子 VII 缺乏，或早期 DIC。請結合 INR、aPTT、纖維蛋白原與 D-二聚體判讀。',
              patient:
                '比預期略長。可能與藥物（如 warfarin）、維生素 K 不足或肝臟問題有關。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Markedly prolonged', zh: '顯著延長' },
          message: {
            en: {
              clinical:
                'Marked PT prolongation suggests significant factor deficiency or anticoagulation. Consider therapeutic/supratherapeutic warfarin, advanced liver disease, vitamin K deficiency, or DIC.',
              patient:
                'Significantly longer than expected — needs prompt clinical interpretation, especially if you take blood thinners.',
            },
            zh: {
              clinical:
                'PT 顯著延長提示嚴重凝血因子缺乏或抗凝藥物作用，需考慮 warfarin 過量、嚴重肝病、維生素 K 缺乏或 DIC。',
              patient:
                '比預期長很多——若您正在服用抗凝血藥物，請儘快與醫療人員聯繫。',
            },
          },
        },
      ],
    },

    {
      id: 'inr',
      name: { en: 'INR', zh: 'INR' },
      fullName: { en: 'International Normalized Ratio', zh: '國際標準化比值' },
      unit: { en: '', zh: '' },
      placeholder: { en: 'e.g. 1.0', zh: '例如 1.0' },
      normalRange: {
        en: 'Off anticoagulant: 0.8–1.2 · Warfarin (most): 2.0–3.0 · Mechanical valve: 2.5–3.5',
        zh: '未使用抗凝劑：0.8–1.2 · 多數 warfarin 治療：2.0–3.0 · 機械性瓣膜：2.5–3.5',
      },
      description: {
        en: {
          clinical:
            'Standardizes PT across reagents using ISI: INR = (patient PT / mean normal PT)^ISI. Designed for monitoring vitamin K antagonist therapy; not validated for non-VKA anticoagulants or acute hepatic failure assessment beyond MELD.',
          patient:
            'A standardized version of the PT test, used most often to monitor warfarin doses.',
        },
        zh: {
          clinical:
            '透過 ISI 將不同試劑的 PT 結果標準化：INR = (病人 PT / 正常平均 PT)^ISI。主要用於 warfarin 等維生素 K 拮抗劑的監測，並未驗證用於 DOAC 或除 MELD 外的急性肝衰竭評估。',
          patient:
            'PT 的標準化版本，最常用來追蹤服用 warfarin 病人的劑量。',
        },
      },
      rules: [
        {
          when: (v, ctx) => ctx?.indication === 'mechanical-valve' && v < 2.5,
          level: 'low',
          title: {
            en: 'Sub-therapeutic for mechanical valve',
            zh: '低於機械性瓣膜的治療目標',
          },
          message: {
            en: {
              clinical:
                'Below the typical 2.5–3.5 target for mechanical heart valves — increased thrombosis risk. Review dose, adherence, and recent dietary/medication changes affecting warfarin.',
              patient: 'Below the target your doctor set for a mechanical heart valve. Check in with your care team.',
            },
            zh: {
              clinical:
                '低於機械性心臟瓣膜常見的 2.5–3.5 目標範圍——血栓風險上升。請檢視劑量、用藥順從性，以及近期飲食或共用藥物對 warfarin 的影響。',
              patient: '低於醫師為機械性心臟瓣膜設定的目標範圍。建議盡快聯絡您的醫療團隊。',
            },
          },
        },
        {
          when: (v, ctx) => ctx?.indication === 'mechanical-valve' && v <= 3.5,
          level: 'therapeutic',
          title: {
            en: 'Therapeutic (mechanical valve target)',
            zh: '治療範圍內（機械性瓣膜目標）',
          },
          message: {
            en: {
              clinical: 'Within the 2.5–3.5 target range typical for mechanical heart valves.',
              patient: 'In the target range your doctor set.',
            },
            zh: {
              clinical: '處於機械性心臟瓣膜常見的 2.5–3.5 目標範圍。',
              patient: '在醫師設定的目標範圍內。',
            },
          },
        },
        {
          when: (v, ctx) => ctx?.onWarfarin && v < 2.0,
          level: 'low',
          title: { en: 'Sub-therapeutic on warfarin', zh: 'Warfarin 治療下偏低' },
          message: {
            en: {
              clinical:
                'Below standard 2.0–3.0 warfarin target. Increased thrombotic risk; verify adherence, drug interactions (e.g., rifampin, carbamazepine), and dietary vitamin K changes.',
              patient: 'Below the target range for warfarin. Your dose may need adjustment.',
            },
            zh: {
              clinical:
                '低於常見的 warfarin 2.0–3.0 目標範圍，血栓風險上升。請確認用藥順從性、藥物交互作用（如 rifampin、carbamazepine）以及飲食中維生素 K 的變化。',
              patient: '低於 warfarin 的目標範圍，可能需要調整劑量。',
            },
          },
        },
        {
          when: (v, ctx) => ctx?.onWarfarin && v <= 3.0,
          level: 'therapeutic',
          title: { en: 'Therapeutic on warfarin', zh: 'Warfarin 治療範圍內' },
          message: {
            en: {
              clinical: 'Within the standard 2.0–3.0 warfarin target range.',
              patient: 'In the typical target range for warfarin.',
            },
            zh: {
              clinical: '處於 warfarin 常見的 2.0–3.0 目標範圍。',
              patient: '在 warfarin 常見的治療範圍內。',
            },
          },
        },
        {
          when: (v, ctx) => ctx?.onWarfarin && v <= 4.5,
          level: 'high',
          title: { en: 'Mildly supratherapeutic', zh: '輕度高於治療範圍' },
          message: {
            en: {
              clinical:
                'Above target. If no bleeding: hold warfarin and consider lower doses; do not routinely give vitamin K below INR 4.5–10 in absence of bleeding (per ACCP guidance, lab-specific).',
              patient: 'Higher than target. Contact your clinician — your dose likely needs adjusting.',
            },
            zh: {
              clinical:
                '高於目標範圍。若無出血，可暫停 warfarin 並考慮減量；INR 4.5–10 之間若無出血，依 ACCP 指引一般不需常規給予維生素 K。',
              patient: '高於目標範圍。請聯絡醫師，劑量可能需要調整。',
            },
          },
        },
        {
          when: (v, ctx) => ctx?.onWarfarin,
          level: 'critical',
          title: {
            en: 'Markedly supratherapeutic — bleeding risk',
            zh: '顯著高於治療範圍——出血風險',
          },
          message: {
            en: {
              clinical:
                'INR >4.5 substantially raises major bleeding risk. Active bleeding: 4-factor PCC + IV vitamin K. No bleeding: hold warfarin, consider oral vitamin K (1–2.5 mg) per local guidance.',
              patient: 'Significantly above target — risk of bleeding is increased. Seek prompt medical attention.',
            },
            zh: {
              clinical:
                'INR >4.5 顯著提高重大出血風險。若有活動性出血：使用 4-factor PCC 加 IV 維生素 K；若無出血：暫停 warfarin 並依當地指引考慮口服維生素 K (1–2.5 mg)。',
              patient: '顯著高於目標——出血風險增加，請儘速就醫。',
            },
          },
        },
        {
          when: (v) => v < 0.8,
          level: 'low',
          title: { en: 'Below reference', zh: '低於參考範圍' },
          message: {
            en: {
              clinical:
                'Mildly low INR is rarely clinically significant; consider acute-phase response or technical factors. Not used to diagnose hypercoagulability.',
              patient: 'Slightly below the usual range. Often not clinically significant on its own.',
            },
            zh: {
              clinical:
                '輕微偏低的 INR 多無臨床意義，可能與急性期反應或檢驗技術因素有關。INR 不作為高凝狀態的診斷工具。',
              patient: '比一般範圍略低，多半本身無臨床意義。',
            },
          },
        },
        {
          when: (v) => v <= 1.2,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: {
              clinical: 'Normal for someone not on a vitamin K antagonist.',
              patient: 'Normal range for someone not taking warfarin.',
            },
            zh: {
              clinical: '未使用維生素 K 拮抗劑者的正常範圍。',
              patient: '未服用 warfarin 者的正常範圍。',
            },
          },
        },
        {
          when: (v) => v < 2.0,
          level: 'borderline',
          title: { en: 'Mildly elevated', zh: '輕度上升' },
          message: {
            en: {
              clinical:
                'Mild elevation outside warfarin therapy: consider early hepatic dysfunction, vitamin K deficiency, mild factor deficiency, antibiotic effect, or early DIC.',
              patient:
                'Slightly elevated. If you are not taking a blood thinner, your clinician may want to investigate.',
            },
            zh: {
              clinical:
                '非 warfarin 病人輕微上升：需考慮早期肝功能異常、維生素 K 缺乏、輕度凝血因子不足、抗生素影響或早期 DIC。',
              patient:
                '略為偏高。若您並未服用抗凝血劑，醫師可能會進一步檢查原因。',
            },
          },
        },
        {
          when: () => true,
          level: 'high',
          title: { en: 'Elevated (off anticoagulant)', zh: '上升（未使用抗凝劑）' },
          message: {
            en: {
              clinical:
                'INR >2.0 in a patient not on a VKA suggests significant coagulopathy: hepatic dysfunction, vitamin K deficiency, or DIC. Evaluate clinically and check fibrinogen, D-dimer, and LFTs.',
              patient:
                'Elevated for someone not taking blood thinners — needs clinical evaluation.',
            },
            zh: {
              clinical:
                '未使用 VKA 病人的 INR >2.0 提示明顯凝血異常：肝功能異常、維生素 K 缺乏或 DIC。建議臨床評估並檢查纖維蛋白原、D-二聚體及肝功能。',
              patient:
                '對於未服用抗凝血劑者偏高——需要進一步臨床評估。',
            },
          },
        },
      ],
      references: [
        {
          label: 'ACCP/CHEST: Warfarin INR targets & supratherapeutic management',
          url: 'https://www.chestnet.org/guidelines-and-resources',
        },
        {
          label: 'UpToDate: Management of warfarin-associated bleeding or supratherapeutic INR',
          url: 'https://www.uptodate.com/contents/search?search=management+of+warfarin+associated+bleeding+supratherapeutic+INR',
        },
      ],
    },

    {
      id: 'aptt',
      name: { en: 'aPTT', zh: 'aPTT' },
      fullName: {
        en: 'activated Partial Thromboplastin Time',
        zh: '活化部分凝血酶原時間',
      },
      unit: { en: 'seconds', zh: '秒' },
      placeholder: { en: 'e.g. 30', zh: '例如 30' },
      normalRange: { en: '25–35 s (lab-dependent)', zh: '25–35 秒（因實驗室而異）' },
      description: {
        en: {
          clinical:
            'Evaluates intrinsic (XII, XI, IX, VIII) and common pathways. Used to monitor unfractionated heparin (target typically 1.5–2.5× control). Sensitive to lupus anticoagulant.',
          patient: 'Looks at a different clotting pathway than PT. It is also used to monitor heparin treatment.',
        },
        zh: {
          clinical:
            '評估內在途徑（凝血因子 XII、XI、IX、VIII）與共同途徑。常用於監測未分餾 heparin（目標約為對照的 1.5–2.5 倍），對狼瘡抗凝物（lupus anticoagulant）敏感。',
          patient: '檢查與 PT 不同的凝血途徑，也用於監測 heparin 治療。',
        },
      },
      rules: [
        {
          when: (v) => v < 25,
          level: 'low',
          title: { en: 'Below reference range', zh: '低於參考範圍' },
          message: {
            en: {
              clinical:
                'Shortened aPTT is rarely clinically significant; may reflect acute-phase reactant elevation of factor VIII or sample handling.',
              patient: 'Slightly shorter than expected — usually not a concern on its own.',
            },
            zh: {
              clinical:
                'aPTT 縮短多無臨床意義，常與急性期反應使凝血因子 VIII 上升或檢體處理有關。',
              patient: '比預期略短——通常本身不是問題。',
            },
          },
        },
        {
          when: (v) => v <= 35,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: {
              clinical: 'Intrinsic and common pathway screening within normal limits.',
              patient: 'Within the expected range.',
            },
            zh: {
              clinical: '內在途徑與共同途徑篩檢正常。',
              patient: '在預期的正常範圍內。',
            },
          },
        },
        {
          when: (v, ctx) => ctx?.onHeparin && v <= 70,
          level: 'therapeutic',
          title: { en: 'Therapeutic on UFH', zh: '未分餾 heparin 治療範圍內' },
          message: {
            en: {
              clinical:
                'Within typical 1.5–2.5× control therapeutic range for unfractionated heparin (institution-specific).',
              patient: 'In the expected range while on heparin.',
            },
            zh: {
              clinical:
                '在未分餾 heparin（UFH）的 1.5–2.5 倍對照治療範圍內（依各機構規定可能略有不同）。',
              patient: '在使用 heparin 時的預期範圍內。',
            },
          },
        },
        {
          when: (v) => v <= 70,
          level: 'high',
          title: { en: 'Mildly prolonged', zh: '輕度延長' },
          message: {
            en: {
              clinical:
                'Differential: heparin (UFH) effect, lupus anticoagulant, intrinsic pathway factor deficiency (VIII/IX/XI/XII), vWD, or contamination. Mixing study can distinguish factor deficiency from inhibitor.',
              patient:
                'Longer than expected. Common with heparin, but other causes are possible if you are not on heparin.',
            },
            zh: {
              clinical:
                '鑑別診斷：heparin（UFH）作用、狼瘡抗凝物、內在途徑凝血因子缺乏（VIII/IX/XI/XII）、von Willebrand 病或檢體污染。Mixing study 可協助分辨凝血因子缺乏與抑制劑。',
              patient:
                '比預期長。常見於使用 heparin 時；若未使用 heparin，仍有其他可能原因。',
            },
          },
        },
        {
          when: () => true,
          level: 'critical',
          title: { en: 'Markedly prolonged', zh: '顯著延長' },
          message: {
            en: {
              clinical:
                'Markedly prolonged aPTT raises concern for supratherapeutic heparin, severe factor deficiency, or significant inhibitor (e.g., factor VIII inhibitor).',
              patient: 'Significantly longer than expected — needs prompt clinical evaluation.',
            },
            zh: {
              clinical:
                'aPTT 顯著延長需考慮 heparin 過量、嚴重凝血因子缺乏或顯著的抑制劑（例如因子 VIII 抑制劑）。',
              patient: '比預期長很多——需要儘快評估。',
            },
          },
        },
      ],
      references: [
        {
          label: 'UpToDate: Clinical use of the activated partial thromboplastin time',
          url: 'https://www.uptodate.com/contents/search?search=activated+partial+thromboplastin+time',
        },
      ],
    },

    {
      id: 'ddimer',
      name: { en: 'D-dimer', zh: 'D-二聚體' },
      fullName: { en: 'Fibrin D-dimer', zh: '纖維蛋白 D-二聚體' },
      unit: { en: 'ng/mL', zh: 'ng/mL' },
      placeholder: { en: 'e.g. 250', zh: '例如 250' },
      normalRange: {
        en: '<500 ng/mL FEU (age-adjusted threshold may apply)',
        zh: '<500 ng/mL FEU（>50 歲可採年齡校正切點）',
      },
      description: {
        en: {
          clinical:
            'Fibrin degradation product reflecting clot formation and lysis. Highly sensitive but poorly specific. Negative result has high negative predictive value for VTE in low-pretest probability patients (e.g., Wells score). Age-adjusted cutoff: age × 10 ng/mL FEU >50 yrs.',
          patient:
            'A protein fragment left behind when clots break down. A normal result helps rule out a clot when suspicion is low.',
        },
        zh: {
          clinical:
            '纖維蛋白裂解產物，反映血栓形成與分解。敏感性高但特異性低。對 VTE 低臨床機率（如 Wells 分數低）病人，陰性結果具高陰性預測值。>50 歲可採年齡校正切點：年齡 × 10 ng/mL FEU。',
          patient:
            '血栓溶解後產生的蛋白碎片。當臨床懷疑血栓的可能性低時，正常結果有助於排除血栓。',
        },
      },
      rules: [
        {
          when: (v, ctx) => {
            const cutoff = ctx?.age && ctx.age > 50 ? ctx.age * 10 : 500;
            return v < cutoff;
          },
          level: 'normal',
          title: { en: 'Below threshold', zh: '低於切點' },
          message: {
            en: {
              clinical:
                'Below the threshold (age-adjusted if applicable). In low pretest-probability patients, this carries a high negative predictive value for VTE.',
              patient: 'In the expected range. When clinical suspicion is low, this helps rule out a clot.',
            },
            zh: {
              clinical:
                '低於切點（必要時採年齡校正）。對臨床機率低的病人具高陰性預測值，有助於排除 VTE。',
              patient: '在預期範圍內。當臨床懷疑度不高時，可協助排除血栓。',
            },
          },
        },
        {
          when: (v) => v < 1000,
          level: 'borderline',
          title: { en: 'Mildly elevated', zh: '輕度上升' },
          message: {
            en: {
              clinical:
                'Non-specific. Common with infection, inflammation, recent surgery/trauma, malignancy, pregnancy, advanced age. Not diagnostic of VTE in isolation.',
              patient:
                'Slightly above the cutoff. Many things can raise this — infection, surgery, pregnancy, age — so context matters.',
            },
            zh: {
              clinical:
                '非特異性。常見於感染、發炎、近期手術或創傷、惡性腫瘤、懷孕及高齡，單獨不足以診斷 VTE。',
              patient:
                '略高於切點。感染、手術、懷孕、年齡等都可能升高此數值，需結合臨床判讀。',
            },
          },
        },
        {
          when: () => true,
          level: 'high',
          title: { en: 'Substantially elevated', zh: '顯著上升' },
          message: {
            en: {
              clinical:
                'Markedly elevated D-dimer with appropriate clinical suspicion warrants imaging (CTPA, doppler) to evaluate for VTE; also seen in DIC, malignancy, sepsis, recent major surgery/trauma.',
              patient: 'Substantially elevated — should be interpreted by a clinician alongside symptoms.',
            },
            zh: {
              clinical:
                '若臨床高度懷疑 VTE，D-二聚體顯著上升時應安排影像（CTPA、超音波）。亦可見於 DIC、惡性腫瘤、敗血症、近期重大手術或創傷。',
              patient: '顯著上升——需由醫療人員結合症狀進行判讀。',
            },
          },
        },
      ],
      references: [
        {
          label: 'ASH: Venous Thromboembolism Diagnosis Guidelines',
          url: 'https://www.hematology.org/education/clinicians/guidelines-and-quality-care/clinical-practice-guidelines/venous-thromboembolism-guidelines',
        },
        {
          label: 'UpToDate: Clinical use of D-dimer',
          url: 'https://www.uptodate.com/contents/search?search=clinical+use+of+d-dimer',
        },
      ],
    },

    {
      id: 'fibrinogen',
      name: { en: 'Fibrinogen', zh: '纖維蛋白原' },
      fullName: { en: 'Fibrinogen (Factor I)', zh: '纖維蛋白原（凝血因子 I）' },
      unit: { en: 'mg/dL', zh: 'mg/dL' },
      placeholder: { en: 'e.g. 300', zh: '例如 300' },
      normalRange: { en: '200–400 mg/dL (2–4 g/L)', zh: '200–400 mg/dL（2–4 g/L）' },
      description: {
        en: {
          clinical:
            'Hepatically synthesized acute-phase protein and substrate for fibrin clot. Levels rise with inflammation, pregnancy, malignancy; fall in DIC (consumption), severe hepatic failure (synthesis), and dysfibrinogenemia.',
          patient: 'A clotting protein made by the liver. Levels go up with inflammation and down in some serious conditions.',
        },
        zh: {
          clinical:
            '由肝臟合成的急性期蛋白，是形成纖維蛋白血栓的基質。發炎、懷孕、惡性腫瘤時上升；DIC（消耗）、嚴重肝衰竭（合成下降）及異常纖維蛋白原症時下降。',
          patient: '由肝臟製造的凝血蛋白。發炎時會上升，在某些嚴重疾病時會下降。',
        },
      },
      rules: [
        {
          when: (v) => v < 100,
          level: 'critical',
          title: { en: 'Critically low', zh: '危險性偏低' },
          message: {
            en: {
              clinical:
                'Severe hypofibrinogenemia (<100 mg/dL) increases bleeding risk; consider DIC, severe hepatic failure, massive transfusion, or thrombolytic therapy. Replacement (cryoprecipitate / fibrinogen concentrate) often indicated, especially if bleeding.',
              patient: 'Very low — needs urgent clinical attention, especially if there is bleeding.',
            },
            zh: {
              clinical:
                '嚴重低纖維蛋白原症（<100 mg/dL）會增加出血風險，需考慮 DIC、嚴重肝衰竭、大量輸血或溶栓治療。若有出血常需給予冷凍沉澱品或纖維蛋白原濃縮劑補充。',
              patient: '非常低——若有出血需要緊急就醫處理。',
            },
          },
        },
        {
          when: (v) => v < 200,
          level: 'low',
          title: { en: 'Below reference', zh: '低於參考範圍' },
          message: {
            en: {
              clinical:
                'Differential includes early DIC, hepatic dysfunction, dysfibrinogenemia, or recent thrombolytic. Correlate with PT, aPTT, D-dimer, and clinical context.',
              patient: 'Lower than expected. Several causes are possible — your clinician will interpret in context.',
            },
            zh: {
              clinical:
                '鑑別診斷包括早期 DIC、肝功能異常、異常纖維蛋白原症或近期使用溶栓藥物。請與 PT、aPTT、D-二聚體及臨床狀況綜合判讀。',
              patient: '低於預期。可能原因不只一種——醫師會結合整體狀況解讀。',
            },
          },
        },
        {
          when: (v) => v <= 400,
          level: 'normal',
          title: { en: 'Within reference range', zh: '在參考範圍內' },
          message: {
            en: { clinical: 'Within normal limits.', patient: 'Within the expected range.' },
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
                'Acute-phase elevation: infection/inflammation, malignancy, pregnancy, tissue injury. Sustained elevation associated with cardiovascular risk in epidemiologic studies but not used as a clinical risk marker.',
              patient: 'Elevated. Common with inflammation, infection, or pregnancy.',
            },
            zh: {
              clinical:
                '急性期反應上升：感染/發炎、惡性腫瘤、懷孕、組織損傷。流行病學研究中持續升高與心血管風險相關，但未作為臨床風險指標。',
              patient: '偏高。常見於發炎、感染或懷孕。',
            },
          },
        },
      ],
    },
  ],

  contextOptions: [
    {
      id: 'onWarfarin',
      label: { en: 'On warfarin / VKA', zh: '正在服用 warfarin / VKA' },
      type: 'toggle',
    },
    {
      id: 'onHeparin',
      label: { en: 'On unfractionated heparin', zh: '正在使用未分餾 heparin' },
      type: 'toggle',
    },
    {
      id: 'onDOAC',
      label: {
        en: 'On DOAC (apixaban / rivaroxaban / etc.)',
        zh: '正在使用 DOAC（apixaban / rivaroxaban 等）',
      },
      type: 'toggle',
    },
    {
      id: 'liverDisease',
      label: { en: 'Known liver disease', zh: '已知肝病' },
      type: 'toggle',
    },
    {
      id: 'pregnant',
      label: { en: 'Pregnant', zh: '懷孕' },
      type: 'toggle',
    },
    {
      id: 'indication',
      label: { en: 'Anticoagulation indication', zh: '抗凝治療適應症' },
      type: 'select',
      options: [
        { value: '', label: { en: '— not specified —', zh: '— 未指定 —' } },
        { value: 'afib', label: { en: 'Atrial fibrillation', zh: '心房顫動' } },
        { value: 'vte', label: { en: 'VTE / DVT / PE', zh: '靜脈血栓 / DVT / 肺栓塞' } },
        {
          value: 'mechanical-valve',
          label: { en: 'Mechanical heart valve', zh: '機械性心臟瓣膜' },
        },
      ],
    },
    {
      id: 'age',
      label: { en: 'Age (years)', zh: '年齡（歲）' },
      type: 'number',
      hint: {
        en: 'Used for age-adjusted D-dimer threshold (>50 yrs).',
        zh: '用於 >50 歲病人的 D-二聚體年齡校正切點。',
      },
    },
  ],
};
