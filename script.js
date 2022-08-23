const form = document.getElementById("form");
const formSteps = [...document.querySelectorAll("[data-step]")];

let currentStep = 0;

form.addEventListener("click", (e) => {
  const next = e.target.classList.contains("next");
  const previous = e.target.classList.contains("previous");

  if (!next && !previous) return;
  if (next) currentStep += 1;
  if (previous) currentStep -= 1;

  console.log("next or previous clicked");

  showCurrentStep();
});

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

/* if (e.target.classList.contains("next")) currentStep += 1;
if (e.target.classList.contains("previous")) currentStep += -1;
 */
