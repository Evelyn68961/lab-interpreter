// Lab information data
const labInfo ={
  pt: {
    title: "PT (Prothrombin Time)", 
    description: `A test that measures how long it takes your blood to clot, 
    primarily evaluating the extrinsic pathway of coagulation.`,
    normalRange: "11-13.5 seconds (can vary slightly by lab)"
  },

  inr: {
      title: "INR (International Normalized Ratio)", 
      description: `A standardized measurement derived from PT results that allows 
      for consistent monitoring of warfarin and other vitamin K antagonist therapies.`,
      normalRange: `Target 0.8-1.2 for those not on anticoagulant therapy.
      Target 2.0-3.0 for most indications of warfarin therapy. 
      Target 2.5-3.5 for mechanical heart valves.`
  },

  aptt: {
    title: "aPTT (activated Partial Prothrombin Time)",
    description: `A test that evaluates the intrinsic and common pathways of coagulation, 
    commonly used to monitor heparin therapy.`,
    normalRange: "25-35 seconds (can vary by lab method)"
  },

  ddimer: {
    title: "D-dimer",
    description: `A fibrin degradation product that indicates recent or ongoing blood clot formation and breakdown, 
    used to rule out conditions such as deep vein thrombosis or pulmonary embolism.`,
    normalRange: "<500 ng/mL or <0.5 μg/mL FEU (Fibrinogen Equivalent Units)"
  },

  fibrinogen: {
    title: "Fibrinogen",
    description: `A plasma protein produced by the liver that is converted to fibrin during the clotting process,
    with levels that may increase during inflammation or decrease in certain coagulation disorders.`,
    normalRange: "200-400 mg/dL (2-4 g/L)"
  }
}

// setup tooltips function with enhanced text handling
function setupToolTips() {
  const labels = document.querySelectorAll('.form label');
  const output = document.getElementById('output');

  labels.forEach(label => {
    const testId = label.getAttribute('for');
    const info = labInfo[testId];

    if (info) {
      label.addEventListener('mouseenter', function() {
        // handle arrays or strings for description and normalRange
        const description = Array.isArray(info.description)
          ? info.description.join('<br>')  //If it's an array: Joins array elements with <br> tags
          : info.description;  //If it's a string: Uses the string as-is

        const normalRange = Array.isArray(info.normalRange)
          ? info.normalRange.join('<br>')
          : info.normalRange;

        // Bold title followed by line break
        // Processed description + Two line breaks for spacing
        // Bold "Normal range:" label
        // Processed normal range data
        const infoText = `
        <b>${info.title}:</b><br> 
        ${description}<br><br>
        <b>Normal range:</b><br>
        ${normalRange}
        `;

        output.innerHTML = infoText;
        output.style.opacity = '1'; 
      });

      label.addEventListener('mouseleave', function() {
        output.style.opacity = '0';
        setTimeout(() => {
          output.innerText = '';
        }, 300);
      });
    }
  });

  // set default message
  output.innerHTML = "Hover over a label to see the explanation. <br> Type your lab values into the boxes to analyze the results.";
  output.style.opacity = '1';
}

// initialize tooltips when DOM is ready
document.addEventListener('DOMContentLoaded', setupToolTips);


// analyze the lab data provided by the user
function analyze() {
  const pt = parseFloat(document.getElementById('pt').value);
  let interpretation = "";

   if (isNaN(pt)) {
    interpretation += `<span style="color: dark brown;"> Please enter a value for PT.</span>\n`;
  } else {
    if (pt < 11) {
      interpretation += `<span style="color: #4da6ff;">⬇️ PT: ${pt} seconds — Low \n Possible hypercoagulable state.</span>\n`;
    } else if (pt <= 13.5) {
      interpretation += `<span style="color: green;">✅ PT: ${pt} seconds — Normal range.</span>\n`;
    } else {
      interpretation += `<span style="color: darkred;">🚨 PT: ${pt} seconds — High \n Prolonged clotting time. Consider liver dysfunction, vitamin K deficiency, or anticoagulants.</span>\n`;
    }
  }

  interpretation += `<br><br>`;  // add extra space 

  const inr = parseFloat(document.getElementById('inr').value);

    if (isNaN(inr)) {
    interpretation += `<span style="color: darkbrown;"> Please enter a value for INR.</span>\n`;
    } else {
    if (inr < 0.8) {
        interpretation += `<span style="color: #4da6ff;">⬇️ INR: ${inr} — Low \n Possible risk of thrombosis (under-anticoagulated).</span>\n`;
    } else if (inr <= 1.2) {
        interpretation += `<span style="color: green;">✅ INR: ${inr} — Normal (for those not on warfarin).</span>\n`;
    } else if (inr > 1.2 && inr < 2.0) {
        interpretation += `<span style="color: #CC5500	;">🟠 INR: ${inr} — Borderline high. Monitor closely if on therapy.</span>\n`;
    } else if (inr <= 3.0) {
        interpretation += `<span style="color: green;">✅ INR: ${inr} — Therapeutic range (typical goal for warfarin).</span>\n`;
    } else if (inr <= 3.5) {
        interpretation += `<span style="color: #556B2F;">🟢 INR: ${inr} — High-normal (used for mechanical valves).</span>\n`;
    } else {
        interpretation += `<span style="color: darkred;">🚨 INR: ${inr} — High \n Risk of bleeding. Consider reducing anticoagulant dose.</span>\n`;
    }
    }

  interpretation += `<br><br>`; 

  const aptt = parseFloat(document.getElementById('aptt').value);

  if (isNaN(aptt)) {
    interpretation += `<span style="color: darkbrown;"> Please enter a value for aPTT.</span>\n`;
  } else {
    if (aptt < 25) {
      interpretation += `<span style="color: #4da6ff;">⬇️ aPTT: ${aptt} seconds — Low \n Possible hypercoagulable state or heparin underdosing.</span>\n`;
    } else if (aptt <= 35) {
      interpretation += `<span style="color: green;">✅ aPTT: ${aptt} seconds — Normal range.</span>\n`;
    } else if (aptt <= 70) {
      interpretation += `<span style="color: #556B2F;">🟢 aPTT: ${aptt} seconds — Therapeutic range (for heparin therapy).</span>\n`;
    } else {
      interpretation += `<span style="color: darkred;">🚨 aPTT: ${aptt} seconds — High \n Increased bleeding risk. Consider heparin overdose or factor deficiencies.</span>\n`;
    }
  }

  interpretation += `<br><br>`;

    const ddimer = parseFloat(document.getElementById('ddimer').value);

  if (isNaN(ddimer)) {
    interpretation += `<span style="color: darkbrown;"> Please enter a value for D-dimer.</span>\n`;
  } else {
    if (ddimer < 500) {
      interpretation += `<span style="color: green;">✅ D-dimer: ${ddimer} ng/mL — Normal. Active clot formation is unlikely.</span>\n`;
    } else if (ddimer < 1000) {
      interpretation += `<span style="color: #CC5500;">🟠 D-dimer: ${ddimer} ng/mL — Mild elevation. May occur with infection, inflammation, or post-surgery.</span>\n`;
    } else {
      interpretation += `<span style="color: darkred;">🚨 D-dimer: ${ddimer} ng/mL — High \n Consider evaluation for DVT, PE, or DIC based on clinical context.</span>\n`;
    }
  }

  interpretation += `<br><br>`;

    const fibrinogen = parseFloat(document.getElementById('fibrinogen').value);

  if (isNaN(fibrinogen)) {
    interpretation += `<span style="color: darkbrown;"> Please enter a value for fibrinogen.</span>\n`;
  } else {
    if (fibrinogen < 150) {
      interpretation += `<span style="color: #4da6ff;">⬇️ Fibrinogen: ${fibrinogen} mg/dL — Low \n Suggests possible DIC, liver disease, or severe bleeding.</span>\n`;
    } else if (fibrinogen <= 400) {
      interpretation += `<span style="color: green;">✅ Fibrinogen: ${fibrinogen} mg/dL — Normal range.</span>\n`;
    } else {
      interpretation += `<span style="color: #556B2F;">🟢 Fibrinogen: ${fibrinogen} mg/dL — Elevated \n May indicate inflammation, tissue damage, or pregnancy.</span>\n`;
    }
  }

  interpretation += `<br><br>`;

    


  const output = document.getElementById('output');
  output.innerHTML = interpretation.replace(/\n/g, "<br>");
  output.style.opacity = '1';
}

document.addEventListener('keydown', function(event) {
  if (event.key === 'Enter') {
    analyze();
  }
});
