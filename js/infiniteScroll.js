document.addEventListener("DOMContentLoaded", () => {
  const scrollContainer = document.querySelector(".scroll-container");
  const apiKey = "5e750355564957a2353604d8a9344e94";
  const baseUrl = `https://api.themoviedb.org/3/discover/movie?api_key=${apiKey}`;

  let currentPage = 1;

  const loadMovies = async () => {
    const response = await fetch(`${baseUrl}&page=${currentPage}`);
    const data = await response.json();

    const movies = data.results;
    movies.forEach(movie => {
      const movieElement = document.createElement("div");
      movieElement.classList.add("movie");
      movieElement.innerHTML = `<img class="lazy-image" src="https://image.tmdb.org/t/p/w500/${movie.poster_path}" alt="${movie.title}">`;
      scrollContainer.appendChild(movieElement);
    });

    currentPage++;
  };

  const options = {
    root: scrollContainer,
    rootMargin: "0px",
    threshold: 0.1,
  };

  const imageObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const lazyImage = entry.target;
        lazyImage.src = lazyImage.dataset.src;
        imageObserver.unobserve(lazyImage);
      }
    });
  }, options);

  scrollContainer.addEventListener("scroll", () => {
    loadMovies();
  });

  loadMovies(); // Initial loading of movies
});