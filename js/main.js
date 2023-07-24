const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}&page=2"`;

// const api_url_genres = "https://api.themoviedb.org/3/genre/movie/list";
const api_url_movies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=2"`;
const img_path = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;
// `https://api.themoviedb.org/3/search/movie?api_key=5e750355564957a2353604d8a9344e94&query="war`;

const contentInfo = document.getElementById("content-info");
const moviesHeader = document.getElementById("moviesHeader");

// const video_url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}`33333333333333
// const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key="${api_key}&page=2"`

// Get Genre list
const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=5e750355564957a2353604d8a9344e94&page=2"`;

// Popular movies list
const api_popular_list = `https://api.themoviedb.org/3/movie/popular?api_key=5e750355564957a2353604d8a9344e94`;
async function getGenres() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list" + "?api_key=" + api_key
  );
  const genreData = await res.json();
}

let genres = [];

const genreMap = {
  12: "Adventure",
  16: "Animation",
  35: "Comedy",
  80: "Crime",
  99: "Documentary",
  18: "Drama",
  10751: "Family",
  14: "Fantasy",
  36: "History",
  27: "Horror",
  10402: "Music",
  9648: "Mystery",
  10749: "Romance",
  878: "Science Fiction",
  10770: "TV Movie",
  53: "Thriller",
  10752: "War",
  37: "Western",
};

getMovies(api_url);
getPopular(api_popular_list);
getGenres(api_url_genres);
setInterval(() => {
  getMovies(api_url);
}, 10000);
let genreName;

async function getMovies(url) {
  const res = await fetch(url);

  const data = await res.json();

  // console.log(data.results);
  updateHeader(data.results);
}
let mainData = [];
async function getGenres(api_url_genres) {
  const genreRes = await fetch(api_url_genres);
  const genreData = await genreRes.json();
  return genreData;
}

let currentIndex = 0;
let random = Math.floor(Math.random() * 1);

async function updateHeader(contents) {
  currentIndex++;
  if (currentIndex >= contents.length) {
    currentIndex = 0;
  }

  // object to display movies
  contentInfo.innerHTML = "";
  const content = contents[currentIndex];
  const { id, title, vote_average, overview, poster_path, genre_ids } = content;
  const data = await getGenres(api_url_genres);
  console.log();
  console.log(genre_ids);

  console.log(content);
  // getMovieDetails(content)

  // Genre List
  let result = [];
  let genreName = [];
  const res = genre_ids.forEach((element) => {
    data.genres.filter((dat) => {
      result.push(dat.id === element);
      if (dat.id === element) {
        genreName.push(dat.name);
      }
    });
  });

  // Update button
  const button = document.createElement("button");
  button.innerText = "Movie Details";
  button.classList.add(
    "px-5",
    "py-3",
    "rounded-pill",
    "shadow",
    "text-white",
    "bg-red"
  );
  button.addEventListener("click", () => {
    // getMovieDetails(content)
    console.log(content);
    // console.log(content)
  });

  moviesHeader.innerHTML = `
    <div class="container-mov content-container m-auto position-relative" id="content-info">
      <div class="content mt-5">
        <div class="logo-header py-2 px-4 " style="width: 200px">
          <img class="img-fluid" src="img/logo.png" alt="" />
        </div>

        <div class="mov-info">
          <div class="movie-info-header-text mt-3">
            <h1 class="fw-900">${title}</h1>
          </div>
          <div class="movie-info nav align-items-center gap-3">
            <small id="rating" class="rating badge bg-light ${getRatings(
              vote_average
            )}">${vote_average.toFixed(1)}</small>
            <a class="genre d-none d-md-block text-white text-decoration-none">${genreName.join(
              ", "
            )}</a>
            <a class="mov-type text-white" id="mov-type"></a>
          </div>
          <div class="info mt-3">
            <p class="mov-info text-white">${overview.slice(0, 240)}...</p>
          </div>

          <div>${button.outerHTML}</div>
        </div>
      </div>
    </div>
    <img class="mov-img br-30 shd btn position-absolute" style="right: 60px; top: 90px" src="${
      img_path + poster_path
    }" width="450" alt="" />
    `;

  header.style.background = `
    linear-gradient(to right,
    rgba(${0}, ${0}, ${0}, ${0.9}) 30%,
    rgba(${0}, ${0}, ${0}, ${0.2}),
    rgba(${0}, ${0}, ${0}, ${0.8})),
    url(${img_path + poster_path})`;
}

function getRatings(vote) {
  if (vote >= 8) {
    return "text-success";
  } else if (vote >= 5) {
    return "text-warning";
  } else {
    return "text-danger";
  }
}

// function getMovieDetails(movie) {
//   // console.log(movie);

//   // const movies = JSON.parse(movie);
//   console.log(movie);
// }
// getMovieDetails()

async function getPopular(list_content) {
  const res = await fetch(list_content);
  const data = await res.json();

  topRatedMovies.innerHTML = "";
  data.results.forEach((movList) => {
    const { id, poster_path, overview, vote_average} = movList
    topRatedMovies.innerHTML += `
      <div class="list me-5" id="list">
        <img src="${img_path + poster_path}" alt=""
      </div>

    `;
  });
}
