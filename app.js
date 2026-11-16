// BMI calculator with metric and imperial units.
// BMI = weight (kg) / height (m)^2; imperial uses the 703 factor.

let metric = true;

const form = document.getElementById("form");
const weightInput = document.getElementById("weight");
const heightInput = document.getElementById("height");
const weightUnit = document.getElementById("weight-unit");
const heightUnit = document.getElementById("height-unit");
const metricBtn = document.getElementById("unit-metric");
const imperialBtn = document.getElementById("unit-imperial");
const resultEl = document.getElementById("result");
const bmiValueEl = document.getElementById("bmi-value");
const categoryEl = document.getElementById("bmi-category");

function categoryFor(bmi) {
  if (bmi < 18.5) return ["Underweight", "#0284c7"];
  if (bmi < 25) return ["Normal weight", "#16a34a"];
  if (bmi < 30) return ["Overweight", "#d97706"];
  return ["Obese", "#dc2626"];
}

function setUnits(isMetric) {
  metric = isMetric;
  weightUnit.textContent = isMetric ? "kg" : "lb";
  heightUnit.textContent = isMetric ? "cm" : "in";
  weightInput.placeholder = isMetric ? "e.g. 70" : "e.g. 154";
  heightInput.placeholder = isMetric ? "e.g. 175" : "e.g. 69";
  metricBtn.classList.toggle("active", isMetric);
  imperialBtn.classList.toggle("active", !isMetric);
  resultEl.hidden = true;
}

metricBtn.addEventListener("click", () => setUnits(true));
imperialBtn.addEventListener("click", () => setUnits(false));

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const weight = parseFloat(weightInput.value);
  const height = parseFloat(heightInput.value);
  if (!weight || !height || weight <= 0 || height <= 0) return;
  const bmi = metric
    ? weight / Math.pow(height / 100, 2)
    : (weight / Math.pow(height, 2)) * 703;
  const [label, color] = categoryFor(bmi);
  bmiValueEl.textContent = bmi.toFixed(1);
  categoryEl.textContent = label;
  categoryEl.style.color = color;
  resultEl.hidden = false;
});
