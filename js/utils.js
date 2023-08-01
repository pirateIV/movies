const navToggle = document.getElementById("nav-toggle");
const navUl = document.querySelector("#nav-links")
const navLinks = document.querySelectorAll("#nav-links li")
const navLinksAnchor = document.querySelectorAll("#nav-links li a")


navToggle.addEventListener('click', (e) => {
  console.log(e.target)
  // const navLinkHeight = navLinks.getBoundingClientRect().height
  navLinks.forEach((link) => {
    const linkHeight = link.getBoundingClientRect().height
    console.log(linkHeight)
  })
})
