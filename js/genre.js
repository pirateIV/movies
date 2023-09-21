// let genre_id = 28;

// const genreOption = `https://api.themoviedb.org/3/discover/movie?api_key=###&with_genres=`
const api_key = "5e750355564957a2353604d8a9344e94";
const genreListContainer = document.getElementById("genre-list");
const movieListContainer = document.getElementById("movie-list");

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
          fetchMoviesByGenre(genre.id);
        });
        genreListContainer.appendChild(genreButton);
      });
    })
    .catch(error => console.error("Error fetching genres:", error));
}

// Function to fetch and display movies by genre
function fetchMoviesByGenre(genreId) {
  fetch(
    `https://api.themoviedb.org/3/discover/movie?api_key=${api_key}&with_genres=${genreId}`
  )
    .then(response => response.json())
    .then(data => {
      const movies = data.results;

      // Display movies
      movieListContainer.innerHTML = ""; // Clear previous movie list
      movies.forEach(movie => {
        const movieItem = document.createElement("div");
        movieItem.textContent = movie.title;
        movieListContainer.appendChild(movieItem);
      });
    })
    .catch(error => console.error("Error fetching movies:", error));
}

// Fetch and display movie genres when the page loads
window.addEventListener("load", () => {
  fetchMovieGenres();
});
