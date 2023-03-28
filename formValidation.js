const fakeSubmitButton = document.querySelector("#fake-submit");
const websiteInput = document.querySelector("#website");
const formErrorMsg = document.querySelector("#form-error");

// add to Webflow form in case someone uncovers the form submit button and clicks it
function preventDefaultSubmit() {
  return false;
}

websiteInput.addEventListener("keydown", (event) => {
  const key = event.key.toLowerCase();
  if (key === "enter") getAuditData();
});

websiteInput.addEventListener("blur", (event) => {
  const isInputValid = validURL(event.target.value);

  !isInputValid ? showFormError("Invalid input") : removeFormError();
});

fakeSubmitButton.addEventListener("click", getAuditData);

function showFormError(errorMessage) {
  formErrorMsg.textContent = errorMessage;
  formErrorMsg.style.display = "block";
}

function removeFormError() {
  formErrorMsg.textContent = "";
  formErrorMsg.style.display = "none";
}

function disableFormSubmitButton() {
  fakeSubmitButton.style.pointerEvents = "none";
  fakeSubmitButton.style.opacity = "50%";
}

function validURL(str) {
  const pattern = new RegExp(
    "^(https?:\\/\\/)?" + // protocol
      "((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|" + // domain name
      "((\\d{1,3}\\.){3}\\d{1,3}))" + // OR ip (v4) address
      "(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*" + // port and path
      "(\\?[;&a-z\\d%_.~+=-]*)?" + // query string
      "(\\#[-a-z\\d_]*)?$",
    "i"
  ); // fragment locator
  return !!pattern.test(str);
}

async function getAuditData() {
  if (websiteInput.value.length === 0) {
    console.log("field cannot be blank");
    showFormError("field cannot be blank");
    return;
  } else if (!validURL(websiteInput.value)) {
    console.log("enter correct format for website");
    showFormError(
      `Website format should be like "www.domain.com" or "domain.com"`
    );
    return;
  }

  // disable button if validation passed
  disableFormSubmitButton();

  console.log("Loading...");

  const { data } = await axios.get(
    "https://api-for-webflow.autocode.dev/auditmywebflowsite@dev/",
    { params: { website: websiteInput.value } }
  );

  console.log(data);
}

/* 

======== GET MOVIES ========


const axios = require('axios');

const movieApi = axios.create({
  baseURL: "https://api.themoviedb.org/3/",
  params: {
    api_key: process.env.MOVIE_API_KEY,
  },
});
  
async function getMovies() {
  const { data } = await movieApi.get("discover/movie");
  return data;
}

return getMovies();

*/

async function getPsiData() {
  const psiBaseUrl =
    "https://www.googleapis.com/pagespeedonline/v5/runPagespeed";

  const { data } = await axios.get(psiBaseUrl, {
    params: {
      key: "AIzaSyBQpLKV8c3pbzrwLFKeMGUmEgJ4TB1De4M",
      url: "https://www.webflow.com",
      strategy: "desktop",
      category: "performance",
      category: "seo",
      category: "accessibility",
    },
  });

  console.log(data);

  return data;
}

// getPsiData();

/* async function makeApiCall() {
  axios
    .post("https://api-for-webflow.autocode.dev/auditmywebflowsite@dev/", {
      name: "test from Webflow",
    })
    .then(() => console.log("client side success..."))
    .catch((error) => console.log(error));

  const button = document.getElementById("submit-btn");
  button.disabled = true;

  return false;
} */

// Webflow.push(function () {});

/* 
try {
  const response = await fetch(
    "https://api-for-webflow.autocode.run/auditmywebflowsite@dev/"
  );
  const data = await response.json();
  return data.results;
} catch (err) {
  console.log(err);
} 


// https://api-for-webflow.autocode.dev/movies@dev/
// https://api-for-webflow.autocode.dev/auditmywebflowsite@dev/

Webflow.push(function () {
  $("form").submit(async function () {
    try {
      const response = await fetch(
        "https://api-for-webflow.autocode.run/auditmywebflowsite@dev/"
      );
      const data = await response.json();
      return data.results;
    } catch (err) {
      console.log(err);
    }

    return false;
  });
});



Webflow.push(function () {
  $("form").submit(async function () {
    try {
      const response = await fetch(
        "https://api-for-webflow.autocode.dev/auditmywebflowsite@dev/"
      );
      const data = await response.json();
      return data.results;
    } catch (err) {
      console.log(err);
    }

    return false;
  });
});

const button = document.getElementById("submit-btn");
button.disabled = true;

*/
