// // Movie Credits
// const api_credits = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=5e750355564957a2353604d8a9344e94`;
// // https://api.themoviedb.org/3/movie/298618/credits?api_key=5e750355564957a2353604d8a9344e94

// ----- Enter search query----------------------------//
const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
const api_mov_details = `
https://api.themoviedb.org/3/movie/{movie_id}`;
const img_path = "https://image.tmdb.org/t/p/w1280";

const mainSection = document.getElementById("mainSection");
const mainAbout = document.getElementById("mainAbout");

let currentIndex = 2;
getMovies(api_url);
async function getMovies(url) {
  let allMovies = [];
  const totalPages = 15;

  for (let page = 1; page <= totalPages; page++) {
    const pageUrl = `${url}&page=${page}`;
    const resp = await fetch(pageUrl);
    const data = await resp.json();

    const movies = data.results;
    allMovies = allMovies.concat(movies);

    if (allMovies.length >= 200) {
      break;
    }
  }

  console.log(allMovies);
  displayMovie(allMovies[currentIndex]);

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

  mainSection.style.background = ` linear-gradient(to right, rgba(0, 0, 0, 1) 43%, rgba(0,0,0,0.1)) , url(${
    img_path + movie.backdrop_path
  })`;
  mainSection.innerHTML = `
      <div class="container-section">
        <div style="background: linear-gradient(white, rgba(255, 255, 255, 0.8)); -webkit-text-fill-color: transparent; -webkit-background-clip: text;">
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

  getSimilarMovies(id);

  // Get Movie Credits
  const creditData = await getMovieCredits(id);
  console.log(creditData);

  const cast = creditData.cast;
  const crew = creditData.crew;

  // find the director for each movie
  const director = crew.find((member) => member.job === "Director");

  const formattedRevenue = formatNumber(revenue);

  console.log(formattedRevenue);

  // console.log(director);

  const { profile_path, character, cast_id, gender, order, name } = creditData;

  // console.log(data);
  mainAbout.innerHTML = `
    <div class="d-flex align-items-center justify-content-center h-100 flex-column">
      <div class="about-container-section container-fluid d-flex align-items-center h-auto justify-content-between m-auto">
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
           
            <div class="mov-items d-flex gap-5 text-white mt-5 flex-row">
              <ul class="d-flex gap-3 flex-column">
                <li class="d-flex gap-4"><span class="text-light opacity-50">Released</span> ${release_date
                  .split("-")
                  .join("/")}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Director</span> <a class="dir">${
                  director.name
                }</a></li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Revenue</span> ${
                  document.createTextNode(formattedRevenue).textContent
                }</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Status</span> ${status}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Production</span>

                </li>
              </ul>

              <ul class="d-flex gap-3 flex-column">
                <li class="runtime d-flex gap-4" id="runtime"><span class="text-light opacity-50">Runtime: </span>${convertRuntime(
                  runtime
                )}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Language</span> <a class="dir">${original_language}</a></li>
                <li class="d-flex gap-4"><span class="text-light opacity-50">Spoken  Languages</span> ${spoken_languages
                  .map((item, index) => `<a>${item.english_name}</a>`)
                  .join(" ")}</li>
                <li class="d-flex gap-4"><span class="text-light opacity-50 ">Production companies</span>
                  ${production_companies
                    .map(
                      (comp, index) =>
                        `<li id="compName" class="ms-5 text-warning ff-roboto">${comp.name}</li> `
                    )
                    .join(" ")}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div> 
      <div>
      <h1 class="text-white mt-3">Cast</h1>
       <section class="casts d-flex gap-5 overflow-scroll overflow-hidden position-relative" style="width: 90vw; height: 50vh">
          <div class="d-flex flex-row gap-4 text-center">
          ${creditData.cast
            .map(
              (cst, index) =>
                `<div class="cast-img rounded-2">
                    <div>
                      ${`<img src="${
                        img_path + cst.profile_path
                      }" class="border border-2 border-secondary rounded-2 z-2 position-relative" id="castImg" width="180" loading="lazy" alt="${
                        cst.original_name
                      }">`}
                    </div>
                    <div class="z-2 position-relative text-white">
                      ${cst.original_name}
                      <small class="d-block opacity-50">${cst.character}</small>
                  </div>
                </div>`
            )
            .join(" ")}
          </div>

          <div>
            <button class="position-absolute top-50"><i class="fas fa-angle-left fs-1"></i></button>
            <button class="position-absolute top-50"><i class="fas fa-angle-right fs-1"></i></button>
          </div>
       </section>

       <h1 class="text-white">Crew</h1>
       <section class="casts d-flex gap-5 overflow-scroll overflow-hidden position-relative" style="width: 90vw; height: 50vh">
          <div class="d-flex flex-row gap-4 text-center">
          ${creditData.crew
            .map(
              (cst, index) =>
                `<div class="cast-img rounded-2">
                    <div>
                      ${`<img src="${
                        img_path + cst.profile_path
                      }" class="border border-2 border-secondary rounded-2 z-2 position-relative" id="crewImg" width="180" loading="lazy" alt="${
                        cst.original_name
                      }">`}
                    </div>
                    <h6 class="text-white">${cst.original_name}</h6>
                    <small class="opacity-50 d-block">${cst.department}</small>
                </div>`
            )
            .join(" ")}
          </div>

          <div>
            <button class="position-absolute top-50"><i class="fas fa-angle-left fs-1"></i></button>
            <button class="position-absolute top-50"><i class="fas fa-angle-right fs-1"></i></button>
          </div>
       </section>
      </div> 
    </div>

  `;
  // Data for Each cas
  const castImg = document.querySelectorAll("#castImg");
  const crewImg = document.querySelectorAll("#crewImg");
  castImg.forEach((cstImg, index) => {
    cstImg.addEventListener("click", async (e) => {
      let castid = creditData.cast[index].id;
      console.log(castid);
      
      localStorage.setItem('cast-id', JSON.stringify(castid))

      // get other movies acted by the particular cast or crew
      const res = await fetch(
        `https://api.themoviedb.org/3/person/${castid}/movie_credits?api_key=${api_key}`
      );
      const data = await res.json();

      console.log(data);
      // -------------------- navigate to page  ------------------------ //
      window.location.href = '../html/pages.html'

    });
  });

  // Data for Each crew
  crewImg.forEach((crwImg, index) => {
    crwImg.addEventListener("click", async (e) => {
      const crewId = creditData.crew[index].id;

      const res = await fetch(
        `https://api.themoviedb.org/3/person/${crewId}/movie_credits?api_key=${api_key}`
      );
      const data = res.json();
    });
  });
  // --- creditData - array that contains both cast and the crew for current movie

  const compImg = document.querySelectorAll("#compImg");
  const compName = document.getElementById("compName");
  compName.addEventListener("mouseover", (e) => {
    compImg.forEach((img) => {
      img.classList.remove("d-none");
      img.classList.add("d-block");
    });
  });
  compName.addEventListener("mouseleave", (e) => {
    compImg.forEach((img) => {
      img.classList.remove("d-block");
      img.classList.add("d-none");
    });
  });
  movPoster.style.backgroundImage = `url(${img_path + poster_path})`;
}

async function getSimilarMovies(similar_id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${similar_id}/similar?api_key=${api_key}`
  );
  const data = await resp.json();

  console.log(data);
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

  // console.log(personData);
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

  return prod_companies
    .map(
      (company, idx) =>
        `<img class="filterNull" width="100" src="${
          img_path + company.logo_path
        }">`
    )
    .join(" ");
}

function formatNumber(num) {
  const formattedNumber = num.toLocaleString("en-US", {
    style: "currency",
    currency: "USD",
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  });

  return formattedNumber;
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

function getCastDetails(cast) {}

async function searchPerson(name) {
  const nameSearcheResp = await fetch(
    `https://api.themoviedb.org/3/search/person?query=`
  );
  const personData = await nameSearcheResp.json();
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
