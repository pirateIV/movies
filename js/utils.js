const navToggle = document.getElementById("nav-toggle");
const navUl = document.querySelector("#nav-links")
const navLinks = document.querySelectorAll("#nav-links li")
const navLinksAnchor = document.querySelectorAll("#nav-links li a")

navToggle.addEventListener('click', (e) => {
  // navUl.style.height = 0
  navLinks.forEach((link, idx) => {
    link.style.height = 0;
    console.log(link.getBoundingClientRect().height)
  })
  navLinksAnchor.forEach((anchor, idx) => {
    console.log(anchor.getBoundingClientRect().height)
  })

  e.preventDefault()
})
