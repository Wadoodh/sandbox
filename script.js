const form = document.getElementById("form");
const formSteps = [...document.querySelectorAll("[data-step]")];

let currentStep = 0;

form.addEventListener("click", (e) => {
  let stepIncrementor = 0;
  const next = e.target.classList.contains("next");
  const previous = e.target.classList.contains("previous");

  if (!next && !previous) return;

  if (next) stepIncrementor += 1;
  if (previous) stepIncrementor -= 1;

  console.log("next or previous clicked");

  const inputs = [...formSteps[currentStep].querySelectorAll("input")];
  const allInputsValid = inputs.every((input) => input.reportValidity());
  if (allInputsValid) {
    currentStep += stepIncrementor;
    showCurrentStep();
  }
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

/* if (e.target.classList.contains("next")) currentStep += 1;
if (e.target.classList.contains("previous")) currentStep += -1;
 */
