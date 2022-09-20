const form = document.getElementById("form");
const formSteps = [...document.getElementsByClassName("step")];
let currentStep = 0;

// step 1 - form elements
const userName = document.getElementById("name");
const email = document.getElementById("email");

// step 2 - form elements
const serviceCheckboxes = document.querySelectorAll(`input[type="checkbox"]`);

// step 3 - form elements
const budgetRadios = document.querySelectorAll(`input[name="budget"]`);

// step 4 - form elements
const phone = document.getElementById("phone");
const company = document.getElementById("company");

// initiate radio and checkbox listeners
addRadioListeners();
addCheckboxListeners();

form.addEventListener("click", (e) => {
  const next = e.target.classList.contains("next");
  const previous = e.target.classList.contains("previous");

  if (!next && !previous) return;

  if (previous) {
    currentStep -= 1;
    showCurrentStep();
    return;
  }

  // function will only continue if next is pressed

  switch (true) {
    case currentStep === 0:
      validateStepOne();
      break;
    case currentStep === 1:
      validateStepTwo();
      break;
    case currentStep === 2:
      validateStepThree();
      break;
    default:
      break;
  }
});

// show current step in form

function showCurrentStep() {
  formSteps.forEach((step, index) => {
    step.classList.toggle("active", index === currentStep);
  });
}

// go to next step

function goToNextStep() {
  currentStep += 1;
  showCurrentStep();
}

// set error in each step

const setError = (element, message) => {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector(".error-message");

  errorMessage.innerText = message;
  errorMessage.style.display = "block";

  if (
    element?.childNodes[0]?.type === "radio" ||
    element?.childNodes[0]?.type === "checkbox"
  )
    return;

  // only change input if text, email, textarea, phone, number
  element.classList.add("input-error");
  element.classList.remove("input-success");
};

// set success in each step and remove error message

const setSuccess = (element) => {
  const inputControl = element.parentElement;
  const errorMessage = inputControl.querySelector(".error-message");

  errorMessage.innerText = "";
  errorMessage.style.display = "none";
  element.classList.remove("input-error");

  if (
    element?.childNodes[0]?.type === "radio" ||
    element?.childNodes[0]?.type === "checkbox"
  )
    return;

  // only change input if text, email, textarea, phone, number

  element.classList.add("input-success");
};

// validation steps

function validateStepOne() {
  const checkName = validateNameInput();
  const checkEmail = validateEmailInput();

  if (!checkName || !checkEmail) return;

  goToNextStep();
}

function validateStepTwo() {
  const checkboxes = [...document.querySelectorAll('input[type="checkbox"]')];
  const checkAtLeastOne = checkboxes.some((input) => input.checked);

  if (checkAtLeastOne) {
    goToNextStep();
    setSuccess(budgetRadios[0].parentElement);
  } else {
    setError(checkboxes[0].parentElement, "Select at least one option");
  }
}

function validateStepThree() {
  const isItChecked = document.querySelector('input[name="budget"]:checked');

  if (isItChecked !== null) {
    setSuccess(budgetRadios[0].parentElement);
    goToNextStep();
    return;
  } else {
    setError(budgetRadios[0].parentElement, "Select a radio option");
  }
}

// last step validation on form submit

Webflow.push(function () {
  $("form").submit(function () {
    const checkNumber = validatePhoneInput();
    if (!checkNumber) return false;

    /* if (phone.value.length < 10) {
      setError(phone, "Phone number must be at least 10 digits.");
      return false;
    } */
  });
});

// event listeners

function addRadioListeners() {
  for (radio in budgetRadios) {
    budgetRadios[radio].onclick = function () {
      if (this.value) {
        setSuccess(budgetRadios[0].parentElement);
      }
    };
  }
}

function addCheckboxListeners() {
  for (checkbox in serviceCheckboxes) {
    serviceCheckboxes[checkbox].onclick = function () {
      if (this.value) {
        setSuccess(serviceCheckboxes[0].parentElement);
      }
    };
  }
}

// on blur
userName.addEventListener("blur", validateNameInput);
email.addEventListener("blur", validateEmailInput);

// on keystroke only if error state active
userName.addEventListener(
  "input",
  () => inputHasError(userName) && validateNameInput()
);
phone.addEventListener(
  "input",
  () => inputHasError(phone) && validatePhoneInput()
);
email.addEventListener(
  "input",
  () => inputHasError(email) && validateEmailInput()
);

// utility functions

function inputHasError(input) {
  return input.classList.contains("input-error");
}

// validation functions

function validateNameInput() {
  if (userName.value.trim() === "") {
    setError(userName, "name is required");
    return false;
  } else if (userName.value.trim().length < 3) {
    setError(userName, "name must be 3 characters or longer");
    return false;
  } else {
    setSuccess(userName);
    return true;
  }
}

function validateEmailInput() {
  if (!email.value.includes("@")) {
    setError(email, "Enter a valid email address");
    return false;
  } else {
    setSuccess(email);
    return true;
  }
}

function validatePhoneInput() {
  if (phone.value.length < 10) {
    setError(phone, "Phone number must be at least 10 digits");
    return false;
  } else {
    setSuccess(phone);
    return true;
  }
}
