const api_key = "5e750355564957a2353604d8a9344e94";
const img_path = "https://image.tmdb.org/t/p/w1280";

const imdb_href = `https://www.imdb.com/name/`;

const ID = JSON.parse(localStorage.getItem("cast-id"));

const castName = document.querySelector(".cast-name");

const castInfo = document.getElementById("castInfo");
const birthdate = document.getElementById("birthdate");
const castHeader = document.getElementById("castHeader");
const profileImg = document.getElementById("profileImg");
const imdbPage = document.getElementById("imdbPage");
const tabOne = document.getElementById("tab1");
const tabTwo = document.getElementById("tab2");
const tabThree = document.getElementById("tab3");
// const castInfo = document.querySelector("#castInfo");

const castDetailsURL = `https://api.themoviedb.org/3/person/${ID}?api_key=${api_key}`;
const castImgsURL = `https://api.themoviedb.org/3/person/${ID}/images?api_key=${api_key}`;
const castMovieURL = `https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${api_key}`;
const castCreditsURL = `https://api.themoviedb.org/3/person/${ID}/movie_credits?api_key=${api_key}`;
const combCreditsURL = `https://api.themoviedb.org/3/person/${ID}/combined_credits?api_key=${api_key}`;
async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
castURL();
async function castURL() {
  const castImgsDATA = await fetchData(castImgsURL);
  const castMovieDATA = await fetchData(castMovieURL);
  const castCreditsDATA = await fetchData(castCreditsURL);
  const combCreditsDATA = await fetchData(combCreditsURL);
  const castDetailsDATA = await fetchData(castDetailsURL);

  getCastInfo(
    castImgsDATA,
    castMovieDATA,
    castCreditsDATA,
    combCreditsDATA,
    castDetailsDATA
  );
}
async function getCastInfo(
  personImgsDATA,
  personMovieDATA,
  personCreditsDATA,
  combCreditsDATA,
  personDetailsDATA
) {
  console.log(personImgsDATA);
  console.log(personMovieDATA);
  console.log(personCreditsDATA);
  console.log(combCreditsDATA);
  console.log(personDetailsDATA);

  getCastCredits(personCreditsDATA);
  getCastImages(personImgsDATA.profiles);

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
  } = personDetailsDATA;

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
  profileImg.src = img_path + personImgsDATA.profiles[0].file_path;
}

async function getCrewInfo() {

}

// tabs

const tabs = document.querySelectorAll(".tab");
const tabContent = document.querySelectorAll(".tab-content");

// tabContent[0].style.display = 'flex'

tabs.forEach((tab) => {
  tab.addEventListener("click", (e) => {
    const tabId = tab.getAttribute("data-tab");
    // tabOne.classList.add(
    //   "d-flex",
    // )
    tabContent.forEach((content) => {
      // content.classList.remove("d-none")
    });

    tabs.forEach((otherTab) => {
      if (otherTab !== tab) {
        otherTab.classList.remove("border-bottom");

        // document.getElementById(tabId).style.display = 'none'
      }
    });

    document.getElementById(tabId).style.display = "block";
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

  cast.forEach((item, index) => {
    tabOne.innerHTML += `
      <img width="200" class"mt-2 bg-secondary" loading="lazy" src="${
        img_path + item.poster_path
      }" alt="">
    `;
  });
}

function getCastImages(cast_images) {
  console.log(cast_images);
}
