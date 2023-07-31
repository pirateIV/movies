const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
const search_api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;

const form = document.getElementById("search-form");
const search = document.getElementById('search')

form.addEventListener("submit", (e) => {
  e.preventDefault()

  const searchTerm = search.value
  console.log(searchTerm)

});

let searchWord;
function searchMovies(movie) {}
