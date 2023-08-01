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
    search.value = ''
    searchMovies(search_api + searchTerm)
  }
  console.log(searchTerm)

});

async function searchMovies(url) {
  const movieRes = await fetch(url)
  const data = await movieRes.json()

  console.log(data.results)
  let searchResArr = data.results
  // searchResArr.push(data.results)
  searchSection.innerHTML = ''
  const { title, backdrop_path, poster_path, release_date  } = searchResArr
  searchResArr.forEach((item) => {
    searchSection.innerHTML += `
    <div class="movie-card mt-4 d-flex flex-column align-items-center justify-content-center" >
      <img  src="${img_path + item.poster_path}" alt="Movie Poster" class="movie-poster rounded-3">
      <div class="movie-details">
          <h5 class="movie-title text-white text-center">${item.title}</div>
          <div class="movie-release-year text-danger">${item.release_date}</div>
      </div>
    </div>
    `

  })
}
