import validate from "./inputValidation";

export function initializeInputListeners(userName, email, phone) {
  // on blur  userName.addEventListener("blur", validateNameInput);

  email.addEventListener("blur", validate.emailInput());

  // on keystroke only if error state active
  userName.addEventListener(
    "input",
    () => inputHasError(userName) && validate.nameInput()
  );
  phone.addEventListener(
    "input",
    () => inputHasError(phone) && validate.phoneInput()
  );
  email.addEventListener(
    "input",
    () => inputHasError(email) && validate.emailInput()
  );

  function inputHasError(input) {
    return input.classList.contains("input-error");
  }
}

/* 
validateEmailInput
validateNameInput
validatePhoneInput
*/
