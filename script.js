document.getElementById("loginForm").addEventListener("submit", function(e) {
  e.preventDefault();
  document.getElementById("loginPage").style.display = "none";
  document.getElementById("mainPage").style.display = "block";
});

const diseaseMap = {
  "fever,cough,fatigue": { name: "COVID-19", base: 80 },
  "fever,cough": { name: "Flu", base: 75 },
  "fatigue,headache": { name: "Migraine", base: 65 },
  "nausea,headache": { name: "Food Poisoning", base: 70 },
  "fever,fatigue": { name: "Dengue", base: 60 },
  "fever,joint pain,rash": { name: "Chikungunya", base: 70 },
  "fever,nausea,vomiting": { name: "Typhoid", base: 68 },
  "vomiting,diarrhea": { name: "Stomach Infection", base: 75 },
  "chest pain,shortness of breath": { name: "Heart Disease", base: 85 },
  "sore throat,runny nose,cough": { name: "Common Cold", base: 60 },
  "fever,sore throat": { name: "Tonsillitis", base: 65 },
  "rash,fever": { name: "Measles", base: 70 },
  "fever,headache,nausea,stiff neck": { name: "Meningitis", base: 80 },
  "stomach upset,diarrhea": { name: "Gastroenteritis", base: 78 }
};

document.getElementById("symptomForm").addEventListener("submit", function (e) {
  e.preventDefault();

  const selected = Array.from(
    document.querySelectorAll('input[type="checkbox"]:checked')
  ).map(cb => cb.value);

  const resultDiv = document.getElementById("results");
  resultDiv.innerHTML = "";

  if (selected.length === 0) {
    resultDiv.innerHTML = "<p>Please select at least one symptom.</p>";
    return;
  }

  let bestMatch = null;
  let maxOverlap = 0;

  for (const key in diseaseMap) {
    const keySymptoms = key.split(",");
    const overlap = keySymptoms.filter(symptom => selected.includes(symptom)).length;

    if (overlap > maxOverlap) {
      maxOverlap = overlap;
      bestMatch = { ...diseaseMap[key], matchCount: overlap, total: keySymptoms.length };
    }
  }

  if (bestMatch) {
    // Estimate confidence based on how many symptoms matched
    const confidence = Math.floor((bestMatch.matchCount / bestMatch.total) * bestMatch.base);
    resultDiv.innerHTML = `
      <h3>Possible Disease:</h3>
      <p><strong>${bestMatch.name}</strong> – ${confidence}% match</p>
      <p>Note: This is an AI-based prediction. Please consult a doctor for confirmation.</p>
    `;
  } else {
    resultDiv.innerHTML = `
      <p>Couldn't find a close match.</p>
      <p>Please consult a healthcare professional for an accurate diagnosis.</p>
    `;
  }
});

// Log out functionality
document.getElementById("logoutBtn").addEventListener("click", function () {
  // Uncheck all symptoms
  document.querySelectorAll('input[type="checkbox"]').forEach(cb => cb.checked = false);
  
  // Clear results
  document.getElementById("results").innerHTML = "";

  // Show login page again
  document.getElementById("mainPage").style.display = "none";
  document.getElementById("loginPage").style.display = "block";

  // Optional: Clear login inputs
  document.getElementById("username").value = "";
  document.getElementById("password").value = "";
});
