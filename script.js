window.addEventListener("DOMContentLoaded", async () => {
  // global constants
  const IMAGE_PATH = "https://image.tmdb.org/t/p/w500";
  const BACKDROP_PATH = "https://image.tmdb.org/t/p/original";
  const API_URL =
    "https://api.themoviedb.org/3/discover/movie?api_key=055f6f9bdc1efba5bbbd107a79a2c5cb";

  // functions
  async function getData() {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      return data.results;
    } catch (err) {
      errorDetected();
    }
  }

  function errorDetected() {
    document.getElementById("load-icon").style.display = "none";
    document.getElementById("error-msg").style.display = "block";
  }

  // get data
  const movies = await getData();

  // dom elements
  const loader = document.getElementById("loader");
  const hero = document.getElementById("hero");
  const heroTitle = document.getElementById("hero-title");
  const heroDescription = document.getElementById("hero-desc");
  const movieGrid = document.getElementById("movie-grid");
  const heroImage = document.createElement("img");

  // initial styles
  movieGrid.style.opacity = "0%";

  // set a random featured movie for the hero section
  const randomMovie = Number((Math.random() * movies?.length || 1).toFixed());
  const featuredMovie = movies[randomMovie];

  // set hero elements
  heroImage.classList.add("hero-image");
  heroImage.src = featuredMovie
    ? `${BACKDROP_PATH}${featuredMovie.backdrop_path}`
    : null;
  hero.appendChild(heroImage);
  heroTitle.innerText = featuredMovie.title;
  heroDescription.innerText = featuredMovie.overview;

  // iterate through data results
  // create img element for each data item
  // add class to each image (class exists in Webflow)
  // append each item to movie grid
  movies.forEach((movie) => {
    const img = document.createElement("img");
    img.classList.add("movie-image");
    img.src = `${IMAGE_PATH}${movie.poster_path}`;
    movieGrid.appendChild(img);
  });

  // remove loader and show movie grid
  setTimeout(() => {
    loader.style.opacity = "0%";
    loader.classList.toggle("hide");
    movieGrid.style.opacity = "100%";
  }, 1500);
});
