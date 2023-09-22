// let genre_id = 28;

// const genreOption = `https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=`
const api_key = "5e750355564957a2353604d8a9344e94";
const img_path = "https://image.tmdb.org/t/p/w1280";
const genreListContainer = document.getElementById("genre-list");
const movieListContainer = document.getElementById("movie-list");
const resultsPerPage = 20; // Number of results per page
const totalResultsToFetch = 100; // Total results you want to fetch

const moviesArr = [
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
  '',
]

moviesArr.forEach(item => {
  movieListContainer.innerHTML += `
    <div>
      <article>
      </article>
      <mov-title class="text-white w-100">The Guardians of the Galaxy - Holiday special</mov-title>
    </div>
  `
})

// Function to fetch and display movies by genre
function fetchMoviesByGenre(genreId, page) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreId}&page=${page}`
  )
    .then(response => response.json())
    .then(data => {
      const movies = data.results;
      console.log(movies)

      // Display movies
      movies.forEach(movie => {
        movieListContainer.innerHTML += `
          <div>
            <h4>${movie.title}</h4>
            <img width="300" src="${img_path + movie.poster_path}" loading="lazy"> 
          </div>
        `
      });

      // Check if we need to fetch more results
      if (
        movies.length < resultsPerPage ||
        movieListContainer.children.length >= totalResultsToFetch
      ) {
        return; // Stop fetching more results
      }

      // Fetch the next page of results
      fetchMoviesByGenre(genreId, page + 1);
    })
    .catch(error => console.error("Error fetching movies:", error));
}

// Function to fetch and display movie genres
function fetchMovieGenres() {
  fetch(`https://api.themoviedb.org/3/genre/movie/list?api_key=${api_key}`)
    .then(response => response.json())
    .then(data => {
      const genres = data.genres;

      // Display genre buttons
      genres.forEach(genre => {
        const genreButton = document.createElement("button");
        genreButton.textContent = genre.name;
        genreButton.addEventListener("click", () => {
          // Clear previous movie list
          movieListContainer.innerHTML = "";

          // Fetch movies for the selected genre starting from page 1
          fetchMoviesByGenre(genre.id, 1);
        });
        genreListContainer.appendChild(genreButton);
      });
    })
    .catch(error => console.error("Error fetching genres:", error));
}

// Fetch and display movie genres when the page loads
window.addEventListener("load", () => {
  fetchMovieGenres();
});
