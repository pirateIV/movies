const navToggle = document.querySelector("#nav-toggle")
const navLinks = document.querySelector(".nav-links")

navLinks.addEventListener("click", () => {
    displayLinks()
    navLinks.classList.toggle("show")
    console.log(123)
})

function displayLinks() {
}