const urlParams = new URLSearchParams(window.location.search)
const videoKey = urlParams.get(videoKey)

const videoContainer = document.getElementById('videoContainer');
videoContainer.innerHTML = `
  <iframe
    width="560"
    height="315"
    src="https://www.youtube.com/embed/${videoKey}"
    frameborder="0"
    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
    allowfullscreen
  ></iframe>
`;