// dom elements
const form = document.getElementById("form");
const formSteps = [...document.querySelectorAll("[data-step]")];

// default current form step, the first step
let currentStep = 0;

// listen for clicks on form and fire when pre and next clicked
form.addEventListener("click", (e) => {
  let incrementor = 0;
  if (e.target.classList.contains("next")) incrementor += 1;
  if (e.target.classList.contains("previous")) incrementor += -1;
  currentStep += incrementor;
  showCurrentStep();
});

// toggle active class when step changed
function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}
