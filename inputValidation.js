function validate(userName, email, phone) {
  function nameInput() {
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

  function emailInput() {
    if (!email.value.includes("@")) {
      setError(email, "Enter a valid email address");
      return false;
    } else {
      setSuccess(email);
      return true;
    }
  }

  function phoneInput() {
    if (phone.value.length < 10) {
      setError(phone, "Phone number must be at least 10 digits");
      return false;
    } else {
      setSuccess(phone);
      return true;
    }
  }
}

export default validate;
