const navToggle = document.querySelector("#nav-toggle");
const navLinks = document.querySelector(".nav-links");


function displayLinks() {}

navToggle.addEventListener("click", () => {
  //   alert();
  navLinks.classList.toggle("open");
});

const pages = document.querySelectorAll(".page")
const translateAmount = 100
let translate = 0;

function slide(direction) {
    if(direction === 'next') {
        translate -= translateAmount
    }else if(direction === 'previous') {
        translate += translateAmount
    }

    pages.forEach((page) => {
        page.style.transform = `translateX(${translate}%)`
    })
}