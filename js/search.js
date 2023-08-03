const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/search/movie?sort_by=popularity.desc&api_key=${api_key}&query="avengers`;
const search_api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;
const img_path = "https://image.tmdb.org/t/p/w1280";
const sortGenres = `https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}&language=en-US`;

const form = document.getElementById("search-form");
const search = document.getElementById("search");
const searchHeader = document.getElementById("section-search");
const searchSection = document.getElementById("searchSection");
// background: url(../1234.jpg);

window.addEventListener("DOMContentLoaded", () => {
  fetchGenres(sortGenres);
  updateBg(api_url);
});

async function updateBg(url) {
  const res = await fetch(url);
  const data = await res.json();

  data.results.forEach((item) => {
    const { backdrop_path } = item;
    console.log(backdrop_path);

    searchHeader.style.background = `linear-gradient(rgba(0, 0, 0, 0.9), rgba(0, 0, 0, 0.3), rgba(0, 0, 0, 0.7)), url(${
      img_path + backdrop_path
    })`;
  });
}

searchMovies(api_url);
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const searchTerm = search.value;
  if (searchTerm && searchTerm !== "") {
    search.value = "";
    searchMovies(search_api + searchTerm);
  }
  console.log(searchTerm);
});

async function searchMovies(url) {
  const movieRes = await fetch(url);
  const data = await movieRes.json();

  console.log(data.results);
  let searchResArr = data.results;
  // searchResArr.push(data.results)
  searchSection.innerHTML = "";
  const { title, backdrop_path, poster_path, release_date } = searchResArr;
  searchResArr.forEach((item) => {
    searchSection.innerHTML += `
    <div class="movie-card mt-4 d-flex flex-column align-items-center justify-content-center" >
      <img  src="${
        img_path + item.poster_path
      }" alt="Movie Poster" class="movie-poster rounded-3">
      <div class="movie-details">
          <h5 class="movie-title text-white text-center">${item.title}</h5>
          <p class="movie-release-year text-danger">${item.release_date}</p>
      </div>
    </div>
    `;
  });
}

// Filter Movies

let includeAdult = false;
let language;
// let sortByVote = `sort_by=vote_count`

// Popularity
let sortByPopularityAsc = `vote_count.asc`;
let sortByPopularityDsc = `vote_count.desc`;

// Revenue
let revenueAsc = `revenue.asc`;
let revenueDsc = `revenue.desc`;

// Date
let releaseYear;
let releaseDateAsc = `primary_release_date.asc`;
let releaseDateDsc = `primary_release_date.desc`;

const genreSelect = document.getElementById("genreSelect");

// const

const filterContainer = document.getElementById("filterContainer");
const applyFilterBtn = document.getElementById("applyFilters");
applyFilterBtn.addEventListener("click", async (e) => {
  e.preventDefault();

  const includeAdult = document.getElementById("includeAdult").checked;
  const language = document.getElementById("language").value;
  const genre = document.getElementById("genreSelect").value;
  const sortBy = document.getElementById("sortBy").value;
  const releaseYear = document.getElementById("releaseYear").value;

  console.log("Include Adult: ", includeAdult);
  console.log("Language: ", language);
  console.log("Genre: ", genre);
  console.log("Sort by: ", sortBy);
  console.log("Release Year: ", releaseYear);

  filterMovies();

  const movieRes = await fetch(
    `https://api.themoviedb.org/3/discover/movie?include_adult=${includeAdult}&language=en-US&page=1&primary_release_year=${releaseYear}&sort_by=${sortBy}.desc&with_genres=${genre}&api_key=${api_key}`
  );
  const data = await movieRes.json()
  console.log(data)
});
function filterMovies() {}

async function fetchGenres(url) {
  try {
    const genRes = await fetch(url);
    const genreData = await genRes.json();

    if (genreData.genres) {
      // genreSelect.innerHTML  = ''

      genreData.genres.forEach((genre) => {
        const genreOption = document.createElement("option");
        genreOption.textContent = genre.name;
        genreOption.value = genre.id;

        genreSelect.appendChild(genreOption);
      });
    }
  } catch (error) {
    console.log(error.message);
  }
}
