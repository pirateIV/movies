const api_key = "5e750355564957a2353604d8a9344e94";
const api_url =
  "https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=5e750355564957a2353604d8a9344e94&page=1";
const img_path = "https://image.tmdb.org/t/p/w1280";
const SEARCH_API =
  'https://api.themoviedb.org/3/search/movie?api_key=cdbfc8803073dbfaf418825d7b632341&query="';

// const search = document.getElementById('')
const contentInfo = document.getElementById("content-info");
const moviesHeader = document.getElementById("moviesHeader");

getMovies(api_url);
setInterval(() => {
  getMovies(api_url);
}, 10000);
async function getMovies(url) {
  const res = await fetch(url);
  const data = await res.json();

  console.log(data.results);
  // setInterval(updateHeader(data.results), 1000)
  updateHeader(data.results);
}

let currentIndex = 0;
let setTimeOut = 100000;
function updateHeader(contents) {
  // setInterval(()=> {
  //   currentIndex++
  // },10000)
  currentIndex++
  if(currentIndex >= contents.length) {
    currentIndex = 0
  }
  contentInfo.innerHTML = "";
  const content = contents[currentIndex];
  const { title, vote_average, overview, poster_path } = content;

  moviesHeader.innerHTML = `
    <div class="container-mov content-container m-auto  position-relative" id="content-info">
      <div class="content mt-5" style="width: 50%">
      <div class="logo-header py-2 px-4" style="width: 200px">
        <img class="img-fluid" src="img/logo.png" alt="" />
      </div>

      <div class="mov-info">
        <div class="movie-info-header-text mt-3">
          <h1 class="fw-200">${title}</h1>
        </div>
        <div class="movie-info nav align-items-center gap-3">
          <small id="rating" class="rating badge bg-light text-danger">${vote_average}</small>
          <h5 class="mov-type text-white" id="mov-type"></h5>
        </div>
        <div class="info mt-3">
          <p class="mov-info text-white">${overview}</p>
        </div>
      </div>
    </div>
    </div>
    <img class="position-absolute br-30 shd" style="right: 60px; top: 90px" src="${
      img_path + poster_path
    }" width="450" alt="" />
    `;

  header.style.background = `
    linear-gradient(to right,
    rgba(${0}, ${0}, ${0}, ${0.9}) 30%,
    rgba(${0}, ${0}, ${0}, ${0.2}),
    rgba(${0}, ${0}, ${0}, ${0.8})),
    url(${img_path + poster_path})`;
  // });
}
