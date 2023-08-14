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

let currentIndex = 1;
getMovies(api_url);
async function getMovies(url) {
  const resp = await fetch(url);
  const data = await resp.json();

  const movies = data.results;
  console.log(movies);

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

async function displayMovie(movie) {
  const data = await getMoviesId(movie.id);
  console.log(data, "get-movies");

  mainSection.style.background = ` linear-gradient(black, rgba(0,0,0,0.4)), url(${
    img_path + movie.backdrop_path
  })`;
  mainSection.innerHTML = `
      <div class="container-section">
        <div style="background: linear-gradient(white, rgba(0, 0, 0, 0.5)); -webkit-text-fill-color: transparent; -webkit-background-clip: text;">
            <h1 class="display-1 title text-white" style="font-weight: 600">${
              movie.title
            }</h1>
        </div>
          <div class="ratings">
            <div class="rate-count d-flex">
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
              <i class="fas fa-star"></i>
            </div>
            </div>
            <p class="tagline text-white">${data.tagline}</p>
            <div class="d-flex align-items-center gap-4">
              
              <div class="badge bg-light text-dark ">${
                movie.vote_average
              }<sup class="text-danger text-bold">  10<sup></div>
              <small class="text-white">${
                data.release_date.split("-")[0]
              }</small>
              <small class="text-white">${convertRuntime(data.runtime)}</small>
            </div>
          </div>
        </div>
      </div>

    
`;

  // Get the full movie details
  getMovieDetails(movie.id);
  // Get Similar movies
  getSimilarMovies(movie.id);
}
async function getMovieDetails(mov_detail_id) {
  // const resp = await fetch(`
  // https://api.themoviedb.org/3/movie/${mov_detail_id}?api_key=${api_key}`);
  // const data = await resp.json();

  // const details = data;
  const data = await getMoviesId(mov_detail_id);
  console.log(data);

  const {
    id,
    budet,
    title,
    status,
    genres,
    imbd_id,
    runtime,
    revenue,
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
  } = data;

  // Get Movie Credits
  const creditData = await getMovieCredits(id);
  console.log(creditData);

  const cast = creditData.cast
  const crew = creditData.crew
  
  // find the director for each movie
  const director = crew.find(member => member.job === 'Director')

  console.log(director)

  const {
    profile_path,
    character,
    cast_id,
    gender,
    order,
    name,
  } = creditData

  // console.log(data);
  mainAbout.innerHTML = `
    <div class="d-flex align-items-center justify-content-center h-100 flex-column">
      <div class="container-fluid d-flex align-items-center justify-content-between w-75 m-auto">
        <div class="mov-poster" id="movPoster"></div>
        <div class="details" style="width: 65%">
          <div class="m-overview d-flex flex-column justify-content-between">
            
            <div style="text-align: justify;" class="my-3">
              <h3 class="text-white">Storyline</h3>
              <small class="text-white">${overview}</small>
            </div>
            <div class="genre" id="genreId"><span class="text-white">Genres:</span> ${genres
              .map(
                (item, index) =>
                  `<button class="genreBtn border-0 bg-dark rounded-1 text-warning fw-bold">${item.name}</button>`
              )
              .join(" ")}</div>
           
            <div class="mov-items d-flex gap-5 text-white mt-5">
              <ul class="d-flex gap-3 flex-column">
                <li class="d-flex gap-4"><span class="text-light opacity-50">Released</span> ${release_date.split("-").join("/")}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Director</span> <a class="dir">${director.name}</a></li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Revenue</span> <a>${revenue}</a></li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Status</span> ${status}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Production</span>
                 ${filterNull(production_companies)} 
                </li>
              </ul>

              <ul class="d-flex gap-3 flex-column">
                <li class="runtime d-flex gap-4" id="runtime"><span class="text-light opacity-50">Runtime: </span>${convertRuntime(
                  runtime
                )}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Language</span> <a class="dir">${original_language}</a></li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Revenue</span> <a>${formatNumber(revenue)}</a></li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Status</span> ${status}</li>
              </ul>
            </div>
          </div>
        </div>
      </div> 
      <div class="cast d-flex gap-5 overflow-scroll">
       ${creditData.cast.map((cst, index) => `<div>${cst.original_name}</div>`).join(" ")}
        
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

  // console.log(creditsData);
  return creditsData;
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

  return `${hrs}h ${mins}mins`;
}

async function watchProvider(watch_id) {
  const watchRespose = await fetch(
    ` https://api.themoviedb.org/3/movie/${watch_id}/watch/providers`
  );
  const watchData = await watchRespose.json();
}

function filterNull(production_companies) {
  const prod_companies = production_companies.filter(
    (company, index) => company.logo_path !== null
  );

  return prod_companies.map(
    (company, idx) =>
      `<img class="filterNull" width="100" src="${
        img_path + company.logo_path
      }">`
  ).join(" ");
}

function formatNumber(num) {
  const formattedNumber = num.toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0
  })

  console.log(formattedNumber)
  return formattedNumber
}

function displayActiveTab(evt, tab) {
  let i, tabContent, tabLink;
}

async function getMoviesId(mov_detail_id) {
  const resp = await fetch(`
  https://api.themoviedb.org/3/movie/${mov_detail_id}?api_key=${api_key}`);
  const data = await resp.json();

  const details = data;
  return details;

}

// Production Companies

{
  /* <div class="m-watch">
    <div class="d-flex flex-wrap align-items-center ">${filterNull(production_companies)}</div>
    </div> */
}

// Title
{
  /* <h1 class="m-title text-white">${title}</h1> */
}
