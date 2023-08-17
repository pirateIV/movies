const api_key = "5e750355564957a2353604d8a9344e94";
const ID = JSON.parse(localStorage.getItem("cast-id"));

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();
  return data;
}

async function getPersonCombinedCredits(id) {
    const url = `https://api.themoviedb.org/3/person/${id}/combined_credits`
    const data = await fetchData(url)
    console.log("Combined credits", data)
}

async function getPersonMovies(id) {
  const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`;
  const data = await fetchData(url);
  console.log("Similar Movies:", data);
}

async function getPersonImages(id) {
  const url = `https://api.themoviedb.org/3/person/${id}/images?api_key=${api_key}`;
  const data = await fetchData(url);
  console.log("Person Images:", data);
}

async function getPersonDetails(details_id) {
  const url = `https://api.themoviedb.org/3/person/${details_id}?api_key=${api_key}`;
  const data = await fetchData(url);
  console.log("Person Details:", data);
}

async function getPersonMovieCredits(id) {
    const url = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`
    const data = await fetchData(url)
    console.log("Person Credits", data)
}

async function main() {
  try {
    await getPersonImages(ID);
    await getPersonDetails(ID);
    await getPersonMovies(ID);
    await getPersonMovieCredits(ID)
    await getPersonCombinedCredits(ID)
  } catch (error) {
    console.error("An error occurred:", error);
  }
}

main();