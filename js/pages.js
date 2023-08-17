const api_key = "5e750355564957a2353604d8a9344e94";
const img_path = "https://image.tmdb.org/t/p/w1280";

const ID = JSON.parse(localStorage.getItem("cast-id"));

const castHeader = document.getElementById("castHeader");
const profileImg = document.getElementById("profileImg");
const castName = document.querySelector(".cast-name");
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

  // console.log(castDetailsDATA);
//   adult
// : 
// false
// also_known_as
// : 
// (7) ['مايكل كيتون', 'Майкл Китон', 'マイケル・キートン', 'ไมเคิล คีตัน', '米高·基頓', '마이클 키튼', 'Michael John Douglas']
// biography
// : 
// "Michael John Douglas (born September 5, 1951), known professionally as Michael Keaton, is an American actor. He is best known for portraying the DC Comics superhero Bruce Wayne / Batman in the films Batman (1989), Batman Returns (1992) and the upcoming The Flash and Batgirl (both 2022), as well as Jack Butler in Mr. Mom (1983), Betelgeuse in Beetlejuice (1988), and Adrian Toomes / Vulture in Spider-Man: Homecoming (2017) and the upcoming Morbius (2022). His breakout role was as fast-talking schemer Bill \"Blaze\" Blazejowski in the 1982 film Night Shift (which was also Ron Howard's second job as a director). He later appeared in a variety of films ranging from dramas and romantic comedies to thriller and action films, such as Clean and Sober (1989), Much Ado About Nothing (1993), The Paper (1994), Multiplicity (1996), Jackie Brown (1997), Herbie: Fully Loaded (2005), The Other Guys (2010), Spotlight (2015), The Founder (2016), Dumbo (2019), The Trial of the Chicago 7 (2020) and Worth (2021). He has also provided voices for characters in animated films such as Porco Rosso (1992), Cars (2006), Toy Story 3 (2010), and Minions (2015). In 2021, he starred in the limited series Dopesick on Hulu. In 2014, Keaton garnered critical acclaim for his performance in Alejandro González Iñárritu's black comedy film Birdman, winning a Golden Globe Award for Best Actor—Motion Picture Musical or Comedy and receiving a nomination for the Academy Award for Best Actor. He had previously received a Golden Globe Award nomination for his performance in Live from Baghdad (2002) and five Screen Actors Guild Award nominations, which ultimately yielded three wins for his performances in Birdman (2014), Spotlight (2015), and The Trial of the Chicago 7 (2020)."
// birthday
// : 
// "1951-09-05"
// deathday
// : 
// null
// gender
// : 
// 2
// homepage
// : 
// null
// id
// : 
// 2232
// imdb_id
// : 
// "nm0000474"
// known_for_department
// : 
// "Acting"
// name
// : 
// "Michael Keaton"
// place_of_birth
// : 
// "Coraopolis, Pennsylvania, USA"
// popularity
// : 
// 60.883
// profile_pat

  const {  } = castDetailsDATA

  const castBio = castDetailsDATA.biography.split(". ")
  

  castName.innerHTML = castDetailsDATA.name;
  birthday.innerHTML = castDetailsDATA.birthday;
  castInfo.innerHTML = castBio.map((item) => item  = `<p>${item}.</p>`).join(" ")
  birth.innerHTML = castDetailsDATA.place_of_birth;
  job.innerHTML = castDetailsDATA.known_for_department;
  profileImg.src = img_path + castImgsDATA.profiles[0].file_path;
}
