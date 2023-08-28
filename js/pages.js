const api_key = "5e750355564957a2353604d8a9344e94";
const img_path = "https://image.tmdb.org/t/p/w1280";

const imdb_href = `https://www.imdb.com/name/`;

const ID = JSON.parse(localStorage.getItem("person-id"));

const castName = document.querySelector(".cast-name");

const castInfo = document.getElementById("castInfo");
const birthdate = document.getElementById("birthdate");
const castHeader = document.getElementById("castHeader");
const profileImg = document.getElementById("profileImg");
const imdbPage = document.getElementById("imdbPage");
const tabOne = document.getElementById("tab1");
const tabTwo = document.getElementById("tab2");
const tabThree = document.getElementById("tab3");

const creditContainer = document.getElementById("creditContainer")
// const castInfo = document.querySelector("#castInfo");

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
getCastInfo(ID);
async function getCastInfo(id) {
  const castDetailsURL = `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`;
  const castImgsURL = `https://api.themoviedb.org/3/person/${id}/images?api_key=${api_key}`;
  const castMovieURL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`;
  const castCreditsURL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`;
  const combCreditsURL = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${api_key}`;

  const castImgsDATA = await fetchData(castImgsURL);
  const castMovieDATA = await fetchData(castMovieURL);
  const castCreditsDATA = await fetchData(castCreditsURL);
  const combCreditsDATA = await fetchData(combCreditsURL);
  const castDetailsDATA = await fetchData(castDetailsURL);

  console.log(castImgsDATA);
  console.log(castMovieDATA);
  console.log(castCreditsDATA);
  console.log(combCreditsDATA);
  console.log(castDetailsDATA);

  getCastCredits(castCreditsDATA);
  getCombCredits(combCreditsDATA);

  const {
    name,
    gender,
    imdb_id,
    deathday,
    birthday,
    homepage,
    biography,
    popularity,
    profile_path,
    place_of_birth,
    known_for_department,
  } = castDetailsDATA;

  const castBio = biography.split(". ");

  castName.innerHTML = name;
  birthdate.innerHTML = birthday;
  // imbdPage.href = `${imbd_href + imdb_id}`
  imdbPage.setAttribute("href", `${imdb_href}${imdb_id}`);
  castInfo.innerHTML = castBio
    .map((item) => (item = `<p>${item}.</p>`))
    .join(" ");
  birth.innerHTML = place_of_birth;
  job.innerHTML = known_for_department;
  profileImg.src = img_path + castImgsDATA.profiles[0].file_path;
}

// tabs

const tabs = document.querySelectorAll(".tab");
const tabContent = document.querySelectorAll(".tab-content");

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabId = tab.getAttribute("data-tab");

    tabContent.forEach((content) => {
      content.classList.add("d-none");
    });

    tabs.forEach((otherTab) => {
      otherTab.classList.remove("border-bottom");
    });

    tabs.forEach((otherTab) => {
      const otherTabId = otherTab.getAttribute("data-tab");
      if (otherTab !== tab) {
        document.getElementById(otherTabId).classList.add("d-none");
      }
    });

    document.getElementById(tabId).classList.add("d-flex");
    document.getElementById(tabId).classList.remove("d-none");
    tab.classList.add("border-bottom");
  });
});

// tabOne.classList.add(

// );
async function getCastCredits(castCreditsDATA) {
  const cast = castCreditsDATA.cast;
  const production = castCreditsDATA.crew;

  console.log(cast);
  console.log(production);

  cast.filter((item, index) => {
    if (item.poster_path !== null) {
      tabOne.innerHTML += `
      <img width="200" class"mt-2" loading="lazy" src="${
        img_path + item.poster_path
      }" alt="">
    `;
    }
  });
}

async function getCombCredits(combCreditsDATA) {
  console.log(combCreditsDATA);
  const cast = combCreditsDATA.cast;
  const crew = combCreditsDATA.crew;
  // combCreditsDATA =
  let item = [...cast, ...crew];
  item.forEach((item, index) => {
    creditContainer.innerHTML += 
    `
     
   `
  });
}

{/* <div>
        <img
          src="${img_path + item.backdrop_path}"
          alt="${item.title ? item.title : item.original_name}">
        <a class="d-block p-3 text-decoration-none text-white rounded-3 bg-222">${
          item.title ? item.title : item.original_name
        }</a>
      </div> */}


    //   <a class="credit credit-active">
    //   <span class="credit-title"></span>

    //   <button>
    //     <i class="fa-solid fa-chevron-down"></i>
    //     <i class="fa-solid fa-xmark"></i>
    //   </button>
    // </a>