const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
const search_api = `https://api.themoviedb.org/3/search/movie?api_key=${api_key}&query="`;
const img_path = "https://image.tmdb.org/t/p/w1280";

const form = document.getElementById("search-form");
const search = document.getElementById('search')
const searchSection = document.getElementById('searchSection')

searchMovies(api_url)
form.addEventListener("submit", (e) => {
  e.preventDefault()

  const searchTerm = search.value
  if(searchTerm && searchTerm !== '') {
    searchMovies(search_api + searchTerm)
    search.value = ''
  }
  console.log(searchTerm)

});

async function searchMovies(url) {
  const movieRes = await fetch(url)
  const data = await movieRes.json()

  console.log(data.results)
  let searchResArr = data.results
  // searchResArr.push(data.results)
  const { title, backdrop_path, poster_path  } = searchResArr
  searchSection.innerHTML = ''
  searchResArr.forEach((item) => {
    searchSection.innerHTML += `
    <div class="movie-card">
    <img width="300" src="${img_path + item.backdrop_path}" alt="Movie Poster" class="movie-poster">
    <div class="movie-details">
        <div class="movie-title">${item.title}</div>
        <div class="movie-release-year">Release Year: 2022</div>
        <div class="movie-description">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed cursus ultrices urna ut consectetur. Nulla nec massa auctor, porttitor justo eu, auctor elit.</div>
    </div>
  </div>
    `
  })
}
