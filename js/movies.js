// // Movie Credits
// const api_credits = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=5e750355564957a2353604d8a9344e94`;
// // https://api.themoviedb.org/3/movie/298618/credits?api_key=5e750355564957a2353604d8a9344e94

const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
const api_mov_details = `
https://api.themoviedb.org/3/movie/{movie_id}`;
const img_path = "https://image.tmdb.org/t/p/w1280";

const mainSection = document.getElementById("mainSection");
const mainAbout = document.getElementById("mainAbout");

let currentIndex = 7;
getMovies(api_url);
async function getMovies(url) {
  const resp = await fetch(url);
  const data = await resp.json();

  const movies = data.results;
  console.log(movies)

  displayMovie(movies[currentIndex]);

  // console.log(data.results)
  // getMovieDetails(data.results[0].id);
  // getMovieCredits(data.results[0].id);
  // getSimilarMovies(data.results[0].id);

  // Call the updateStars function to update the stars based on the rating
  // updateStars(rating);

  // Example usage: Update stars with a rating of 5
  // updateStars(data.results[0].overview);

  // });
}

function displayMovie(movie) {
  mainSection.style.background = ` linear-gradient(black, rgba(0,0,0,0.4)), url(${
    img_path + movie.backdrop_path
  })`;
  mainSection.innerHTML = `
  <div class="container-section">
      <div style="background: linear-gradient(white, rgba(0, 0, 0, 0.5)); -webkit-text-fill-color: transparent; -webkit-background-clip: text;">
        <h1 class="display-1 title text-white" style="font-weight: 600">${movie.title}</h1>
      </div>
      <div class="ratings">
        <div class="rate-count d-flex">
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
          <i class="fas fa-star"></i>
        </div>
      ${movie.vote_average} / 10
    </div>

    <div class="story-line text-light"></div>
    <button><i class="fas fa-play"></i> Watch Trailer</button>
  </div>
`;

  // Get the full movie details
  getMovieDetails(movie.id);
  // Get Similar movies
  getSimilarMovies(movie.id);
}

async function getMovieDetails(mov_detail_id) {
  const resp = await fetch(`
  https://api.themoviedb.org/3/movie/${mov_detail_id}?api_key=${api_key}`);
  const data = await resp.json();

  const details = data;

  const {
    id,
    budet,
    title,
    status,
    genres,
    imbd_id,
    runtime,
    tagline,
    homepage,
    overview,
    poster_path,
    release_date,
    original_title,
    spoken_languages,
    original_language,
    production_countries,
    production_companies,
  } = details;
  console.log(data);

  mainAbout.innerHTML = `
    <div class="container d-flex align-items-center justify-content-between">
      <div class="mov-poster" id="movPoster"></div>
      <div class="details w-50">
        <div class="m-overview d-flex flex-column justify-content-between">
          <h1 class="m-title text-white">${title}</h1>
          <div class="genre" id="genreId">${genres
            .map(
              (item, index) =>
                `<button class="genreBtn border-0 bg-dark rounded-1 text-warning fw-bold">${item.name}</button>`
            )
            .join(" ")}</div>
          <div class="d-flex">
            <p class="text-danger runtime" id="runtime">Runtime: ${convertRuntime(
              runtime
            )}</p>
          </div>
          <div style="text-align: justify;">
            <small class="text-white">${overview}</small>
          </div>
        </div>
        <div class="m-watch">
          
        </div>
      </div>
    </div>
  `;
  movPoster.style.backgroundImage = `url(${img_path + poster_path})`;
}

async function getSimilarMovies(similar_id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${similar_id}/similar?api_key=${api_key}`
  );
  const data = await resp.json();

  // console.log(data);
}

async function getMovieCredits(credits_id) {
  const creditsResponse = await fetch(
    `https://api.themoviedb.org/3/movie/${credits_id}/credits?api_key=${api_key}`
  );
  const creditsData = await creditsResponse.json();

  console.log(creditsData);
}

async function getPersonMovieCredits(person_id) {
  const personCreditRes = await fetch(
    `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${api_key}`
  );
  const personData = await personCreditRes.json();

  console.log(personData);
}

async function getMovieTrailers(movie_id) {
  const trailerResp = await fetch(
    `https://api.themoviedb.org/3/movie/${movie_id}/videos`
  );
  const trailerData = await trailerResp.json();

  console.log(trailerData);
}

function convertRuntime(runtime) {
  let hourToMins = 60;
  let mins = runtime % hourToMins;
  let hrs = Math.floor(runtime / hourToMins);

  return `${hrs}hr ${mins}mins`;
}

async function watchProvider(watch_id) {
  const watchRespose = await fetch(
    ` https://api.themoviedb.org/3/movie/${watch_id}/watch/providers`
  );
  const watchData = await watchRespose.json();
}

function checkNull(logo_path) {
  if(logo_path === null) {
    img.style.display = 'none'
  }
}