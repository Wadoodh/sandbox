// set global constants
const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";
const heroLoading = document.getElementById("hero-loading");
const gridMovieLoading = document.getElementById("loading-movie-grid");

window.addEventListener("DOMContentLoaded", (event) => {
  const handleError = (response) => {
    if (!response.ok) {
      throw Error(` ${response.status} ${response.statusText}`);
    } else {
      return response.json();
    }
  };

  fetch("url")
    .then(handleError)
    .then((data) => {
      // get dom elements
      const hero = document.getElementById("hero");
      const heroTitle = document.getElementById("hero-title");
      const heroDesc = document.getElementById("hero-desc");
      const movieGrid = document.getElementById("movie-grid");

      // set a random featured movie
      const randomMovie = Number(
        (Math.random() * data.results.length).toFixed()
      );
      const featuredMovie = data.results[randomMovie];

      // set hero elements
      hero.style.backgroundImage = `url("${BACKDROP_PATH}${featuredMovie.backdrop_path}")`;
      heroTitle.textContent = featuredMovie.title;
      heroDesc.textContent = featuredMovie.overview;

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
      console.log("done...");
    });
});

/* async function getData() {
  const res = await fetch("https://dev--movies.api-for-webflow.autocode.gg/");
  const data = await res.json();
  console.log(data);
  return data;
}

getData(); */
