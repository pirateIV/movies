const movContainer = document.getElementById("movContainer");
const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;

// const api_url_genres = "https://api.themoviedb.org/3/genre/movie/list";
const api_url_movies = `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&sort_by=popularity.desc&page=1"`;
const img_path = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;
// `https://api.themoviedb.org/3/search/movie?api_key=5e750355564957a2353604d8a9344e94&query="war`;

const contentInfo = document.getElementById("content-info");
const moviesHeader = document.getElementById("moviesHeader");

// const video_url = `https://api.themoviedb.org/3/movie/${movie.id}/videos?api_key=${api_key}`
// const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key="${api_key}&page=2"`

// Get Genre list
const api_url_genres = `https://api.themoviedb.org/3/genre/movie/list?api_key=5e750355564957a2353604d8a9344e94&page=1`;

// Popular movies list
const api_popular_list = `https://api.themoviedb.org/3/discover/movie?api_key=5e750355564957a2353604d8a9344e94&sort_by=popularity.desc&page=1  `;

// airing today movies
const api_air_today = `https://api.themoviedb.org/3/tv/airing_today?api_key=${api_key}`;

const youtube_watch = `https://www.youtube.com/watch?v=`;

async function getGenres() {
  const res = await fetch(
    "https://api.themoviedb.org/3/genre/movie/list" + "?api_key=" + api_key
  );
  const genreData = await res.json();
}

const selectedMovieDisplay = document.getElementById("selectedMovieDisplay");

// Get Movie Details
async function getMovieDetails(movieContent, index) {
  // console.log(movieContent[index])
  // console.log(selectedMovieDisplay.innerHTML);
  const movContent = movieContent[index];
  const {
    id,
    title,
    adults,
    vote_average,
    vote_count,
    original_language,
    overview,
    poster_path,
    backdrop_path,
    genre_ids,
    release_date,
  } = movContent;

  let results = [];
  let res;

  // Get genres according to specific id
  const datas = await getGenres(api_url_genres);
  genre_ids.forEach((item) => {
    console.log(item);

    datas.genres.filter((data) => {
      if (data.id === item) {
        results.push(data.name);
      }
    });
  });

  // Update Movie Details
  selectedMovieDisplay.innerHTML = `
   <div class="d-flex text-white gap-5 bg-dark">
   <i class="fas fa-times text-danger position-absolute fs-3 close-btn"></i>  
    <img src="${
      img_path + poster_path
    }" alt="" class="img-fluid" style="width: 31%"> 

    <div>
      <h1 class="text-white">${title}</h1>
      <section class="mt-5 d-flex justify-content-center flex-column">
        <div>
          <small class="text-muted fw-bold">Language: <span class="badge bg-primary">${original_language}</span></small>
        </div>
        <div class="d-flex genre align-items-center gap-2">
            <h4 class="text-warning">Genre: </h4>
            <a class="genre-a">${results
              .map((result) => `<a class="genre-item">${result}</a>`)
              .join(" | ")}</a>
        </div>
        <div class="overview">
            <h4 class="text-warning">Overview: </h4>
            <p>${overview}</p>
        </div>
        <div class="release">
            <h4 class="text-warning">Release Date: </h4>
            <p>${release_date}</p>
        </div>
        
        <button id="fullMovieBtn" style="width: 170px" class="rounded-pill py-2 shadow text-white bg-red btn-mov-details">Watch Trailer</button>
      </section>
    </div>

    <div class="item position-absolute top-0 ">
            <svg width="40" height="40" class="position-absolute">
              <circle id="circle" stroke="${updateVotesAverage(
                vote_average * 10
              )}" stroke-dasharray="${votesPercentage(
    vote_average * 10
  )}" cx="20" cy="20" r="16" fill="none"  stroke-width="5"></circle>
                                  <circle cx="20" cy="20" r="16"  fill="black"></circle>
              <text x="23" y="22" text-anchor="middle" dominant-baseline="middle" font-size="12" fill="white" font-weight="bold">
                ${vote_average * 10}<tspan dy="-5" font-size="8">%</tspan>
              </text>
            </svg>

          </div>
  </div> 
  `;
  const fullMovieBtn = document.getElementById("fullMovieBtn");
  fullMovieBtn.addEventListener("click", () => {
    getMovieFullDetails(id);

    viewTrailer();
    // navigateToDestination(id)
  });
  // Close Movie Details Icon
  const closeIcon = document.querySelector(".close-btn");
  closeIcon.addEventListener("click", closeMovieDetails);

  // Show Movie Details
  movContainer.style.transform = `scale(${1})`;
}

// Exit Movie Details
function closeMovieDetails() {
  movContainer.style.transform = `scale(${0})`;
}

let currentTrailerIndex = 0;
// get Movie Trailers
function getMovieFullDetails(movie_id) {
  fetch(`https://api.themoviedb.org/3/movie/${movie_id}?api_key=${api_key}`)
    .then((response) => response.json())
    .then((response) => {
      let mov_detail = response;
      const { budget, revenue, tagline, homepage, runtime } = mov_detail;
      console.log(mov_detail);
    })
    .catch((err) => console.warn(err.message));

  fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos?api_key=${api_key}`
  )
    .then((vidResponse) => vidResponse.json())
    .then((vidResponse) => {
      console.log(vidResponse.results[0].key);
      video_key = vidResponse.results[currentTrailerIndex].key;
      // -------------------------- For Later ----------------------- //
      viewTrailer(video_key);
    })
    .catch((err) => {
      console.log(err.message);
    });
}

const videoContainer = document.getElementById("video-container");
function viewTrailer(videoKey) {
  // window.location.href = `movies.html?videoKey=${videoKey}`;

  videoContainer.innerHTML = `
  <iframe class="responsive-iframe" 
    width="560"
    height="315"
    src="https://www.youtube.com/embed/${videoKey}?autoplay=1"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
`;
}

let genres = [];

// id as used by api for genre list
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

// getMovies(api_url);

getPopular(api_popular_list);
getGenres(api_url_genres);
setInterval(() => {
  updateHeader();
}, 10000);
updateHeader();
let genreName;

let mainData = [];

// Get Genres
async function getGenres(api_url_genres) {
  const genreRes = await fetch(api_url_genres);
  const genreData = await genreRes.json();
  return genreData;
}

let currentIndex = 0;
let random = Math.floor(Math.random() * 1);

// get Movies URL and Minimum Results for fetch
async function getMovies(url, minResults) {
  try {
    let totalResults = 0;
    let currentPage = 1;

    // add fetched movies to array
    let fetchedMoviesArr = [];

    while (fetchedMoviesArr.length < minResults) {
      const response = await fetch(`${url}&page=${currentPage}`);
      const data = await response.json();

      fetchedMoviesArr = fetchedMoviesArr.concat(data.results);
      totalResults = data.total_results;
      currentPage++;

      if (currentPage > data.total_pages) {
        // stop fetching if there are no more pages
        break;
      }
    }

    return fetchedMoviesArr.slice(130, minResults);
  } catch (error) {
    console.log(error.message);
  }
}

// function for header / first page
async function updateHeader() {
  // Update button

  const minMoviesToFetch = 200;
  const movies = await getMovies(api_url, minMoviesToFetch);
  currentIndex++;
  // if (currentIndex >= movies.length) {
  //   currentIndex = 50;
  // }
  try {
    // object to display movies
    contentInfo.innerHTML = "";

    const movie = movies[currentIndex];
    const {
      title,
      vote_average,
      overview,
      poster_path,
      backdrop_path,
      genre_ids,
    } = movie;
    console.log(movie);

    const data = await getGenres(api_url_genres);

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
    const button = document.createElement("button");
    button.innerText = "Go to Movies";
    button.classList.add(
      "px-5",
      "py-3",
      "rounded-pill",
      "shadow",
      "text-white",
      "bg-red",
      "btn-mov-details"
    );

    moviesHeader.innerHTML = `
      <div class="container-mov content-container m-auto position-relative" style="height: 70vh" id="content-info">
        <div class="content mt-5 d-flex flex-column " style="height:inherit">
          <div class="logo-header py-2 px-4" >
            <img class="img-fluid" src="img/logo.png" alt="" />
          </div>

          <div class="mov-info">
            <div class="movie-info-header-text">
              <h1 class="fw-900">${title.slice(0, 36)}</h1>
            </div>
            <div class="movie-info nav align-items-center gap-3">
              <small id="rating" class="rating badge bg-light ${getRatings(
                vote_average
              )}">${vote_average.toFixed(1)}</small>
              <a class="genre d-none d-md-block text-white text-decoration-none">${genreName
                .map(
                  (genre) =>
                    `<a class="text-light text-decoration-none">${genre}</a>`
                )
                .join("|")}</a>
              <a class="mov-type text-white" id="mov-type"></a>
            </div>
            <div class="info mt-3">
              <p class="mov-info text-white">${overview.slice(0, 240)}...</p>
            </div>
            
            <a href="./movies.html">${button.outerHTML}</a>
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
      url(${img_path + backdrop_path})`;
  } catch (error) {
    console.error(error.message);
  }
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

// function checkLength(text) {
//   if (text.length > 36) {
//     // text.style.fontSize = `${30}px`;
//   }
// }

async function getPopular() {
  let popularMoviesLength = 200;
  const movList = document.querySelector(".mov-list");

  let movieContents = await getMovies(api_popular_list, popularMoviesLength);
  try {
    // console.log(movieContents);
    movList.style.gridTemplateColumns = `repeat(${popularMoviesLength}, ${1}fr)`;
    const movieContent = movieContents;

    console.log(movieContent);
    // movieContent.forEach((content) => {
    // })

    topRatedMovies.innerHTML = "";
    for (let i = 0; i <= popularMoviesLength; i++) {
      const { id, vote_average, poster_path, title, release_date } =
        movieContent[i];
      topRatedMovies.innerHTML += `
        <div class="list mx-3 " id="list">
          <div class="position-relative overflow-hidden ">
            <img class="border border-dark  overflow-hidden" src="${
              img_path + poster_path
            }" alt="">
            <div class="img-details position-absolute top-0 text-white h-100 w-100" style="border-radius: 5px">
              <p>View Info</p>
            </div>
          </div>
          <div class="item position-absolute top-0 ">
            <svg width="40" height="40" class="position-absolute">
              <circle id="circle" stroke="${updateVotesAverage(
                vote_average * 10
              )}" stroke-dasharray="${votesPercentage(
        vote_average * 10
      )}" cx="20" cy="20" r="16" fill="none"  stroke-width="5"></circle>
                      <circle cx="20" cy="20" r="16"  fill="black"></circle>
              <text x="23" y="22" text-anchor="middle" dominant-baseline="middle" font-size="10" fill="white" font-weight="bold">
                ${vote_average * 10}<tspan dy="-5" font-size="8">%</tspan>
              </text>
            </svg>

          </div>
          <p class="date text-muted">${release_date}</p>
          <h6 class="text-center text-light mb-5">${title}</h4>
        </div>
    
    
      `;
      const lists = document.querySelectorAll("#list");
      lists.forEach((list, index) => {
        list.addEventListener("click", (e) => {
          getMovieDetails(movieContent, index);
        });
      });
      // getMovieFullDetails(id)
    }
  } catch (error) {
    console.log(error.message);
  }
}

function updateVotesAverage(vote) {
  if (vote >= 75) {
    return "green";
  } else if (vote >= 60) {
    return "yellow";
  } else {
    return "red";
  }
}

// Update Votes Rating
function votesPercentage(percentage) {
  const circleRadius = 16;
  const circumference = 2 * Math.PI * circleRadius;
  const borderLength = (circumference * percentage) / 100;

  return `${borderLength} ${circumference - borderLength}`;
}
