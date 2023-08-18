const api_key = "5e750355564957a2353604d8a9344e94";
const img_path = "https://image.tmdb.org/t/p/w1280";

const ID = JSON.parse(localStorage.getItem("cast-id"));

const castName = document.querySelector(".cast-name");

const castInfo = document.getElementById("castInfo");
const birthdate = document.getElementById("birthdate");
const castHeader = document.getElementById("castHeader");
const profileImg = document.getElementById("profileImg");
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

  const {
    name,
    birthday,
    popularity,
    profile_pat,
    place_of_birth,
    known_for_department,
    homepage,
    gender,
    deathday,
    biography,
  } = castDetailsDATA;

  const castBio = castDetailsDATA.biography.split(". ");

  castName.innerHTML = name;
  birthdate.innerHTML = birthday;
  castInfo.innerHTML = castBio
    .map((item) => (item = `<p>${item}.</p>`))
    .join(" ");
  birth.innerHTML = place_of_birth;
  job.innerHTML = known_for_department;
  profileImg.src = img_path + castImgsDATA.profiles[0].file_path;
}
