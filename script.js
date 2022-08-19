const API_URL =
  "https://api.themoviedb.org/3/discover/movie?api_key=055f6f9bdc1efba5bbbd107a79a2c5cb";

async function getData() {
  try {
    const response = await fetch(API_URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log("error");
  }
}

function errorDetected() {
  return true;
}

window.addEventListener("DOMContentLoaded", (event) => {
  // set global constants
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";

  // dom elements
  const loader = document.getElementById("loader");
  const hero = document.getElementById("hero");
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-desc");
  const movieGrid = document.getElementById("movie-grid");

  // initial styles
  movieGrid.style.opacity = "0%";

  // handle any errors
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch(
    "https://api.themoviedb.org/3/discover/movie?api_key=055f6f9bdc1efba5bbbd107a79a2c5cb"
  )
    .then(handleError)
    .then((data) => {
      // set a random featured movie for th ehero section
      const randomMovie = Number(
        (Math.random() * data.results.length).toFixed()
      );
      const featuredMovie = data.results[randomMovie];

      // set hero elements
      // hero.style.backgroundImage = `url("${BACKDROP_PATH}${featuredMovie.backdrop_path}")`;
      const heroImage = document.createElement("img");
      heroImage.classList.add("hero-image");
      heroImage.src = BACKDROP_PATH
        ? `${BACKDROP_PATH}${featuredMovie.backdrop_path}`
        : null;
      hero.appendChild(heroImage);
      heroTitle.innerText = featuredMovie.title;
      heroDescription.innerText = featuredMovie.overview;

      // iterate through data results
      // create img element for each item
      // add class from Webflow to each image
      // append each item to movie grid
      data.results.forEach((movie) => {
        const img = document.createElement("img");
        img.classList.add("movie-image");
        img.src = `${IMAGE_PATH}${movie.poster_path}`;
        movieGrid.appendChild(img);
      });
    })
    .catch(function writeError(err) {
      console.error(err);
    })
    .finally(() => {
      setTimeout(() => {
        loader.style.opacity = "0%";

        loader.classList.toggle("hide");

        movieGrid.style.opacity = "100%";
      }, 1500);
    });
});

// movieGrid.style.display = "grid";
// gridMovieLoading.classList.toggle("hide");
// gridMovieLoading.style.opacity = "0%";

/* async function getData() {
  const res = await fetch("https://dev--movies.api-for-webflow.autocode.gg/");
  const data = await res.json();
  console.log(data);
  return data;
}

getData(); */
