const headerElement = `
<section class="w-100">
<nav class="d-flex pt-4 pe-5 align-items-center justify-content-between w-100 flex-nowrap">
  <a href="./index.html" class="header-logo order-lg-0 order-1" href="index.html">
    <img class="navbar-brand ms-9" width="160" src="../img/logo.png" /></a>

  <i class="fas fa-bars text-white ps-4  d-lg-none d-flex order-lg-0" id="nav-toggle"></i>
  <ul class="nav-links nav align-items-center gap-0 gap-lg-4 order-lg-0">
    <li>
      <a class="text-uppercase text-decoration-none text-danger active" href="./index.html">Home
        <i class="fas fa-angle-down"></i>
      </a>
    </li>
    <li>
      <a class="text-uppercase text-decoration-none text-white" href="./html/genres.html">Genres
        <i class="fas fa-angle-down"></i>
      </a>
    </li>
    <li>
      <a class="text-uppercase text-decoration-none text-white" href="./html/movie.html">Movies
        <!-- <i class="fas fa-angle-down"></i> -->
      </a>
    </li>

    <li class="d-none">
      <a class="text-uppercase text-decoration-none text-white" href="./html/news.html">News
      </a>
    </li>
    <li>
     <li>
      <a class="text-uppercase text-decoration-none text-white" href="./html/contact.html">Contact</a>
    </li>
  </ul>

  <ul class="nav-icons nav gap-3 align-items-center flex-nowrap order-md-3 order-3">
    <li class="position-relative">
      <a href="html/genres.html#searchSection"><i class="fas fa-search text-white"></i></a>

      <div class="search-bar d-none bg-white br-30 position-absolute p-5" style="z-index: 40">

      </div>
    </li>
    <li>
      <a href=""><i class="fas fa-bell text-white"></i></a>
    </li>
    <li>
      <a href=""><img src="img/user.png" width="30" alt="user" /></a>
    </li>
  </ul>
</nav>
<section id="moviesHeader" class="info-mov mt-90">
  <div class="container-mov content-container m-auto" id="content-info"></div>
  <img class="br-30" src="" alt="" />
</section>
</section>
`

// const main = document.getElementsByTagName("main")[0]
const header = document.getElementById("header")

// main.insertAdjacentHTML('afterbegin', headerElement) 
header.insertAdjacentHTML('afterbegin', headerElement) 
