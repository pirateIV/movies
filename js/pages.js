const api_key = '5e750355564957a2353604d8a9344e94';
const img_path = 'https://image.tmdb.org/t/p/w1280';

const imdb_href = `https://www.imdb.com/name/`;

const ID = JSON.parse(localStorage.getItem('person-id'));

const castName = document.querySelector('.cast-name');

const castInfo = document.getElementById('castInfo');
const birthdate = document.getElementById('birthdate');
const castHeader = document.getElementById('castHeader');
const profileImg = document.getElementById('profileImg');
const imdbPage = document.getElementById('imdbPage');
const tabOne = document.getElementById('tab1');
const tabTwo = document.getElementById('tab2');
const tabThree = document.getElementById('tab3');

const creditContainer = document.getElementById('creditContainer');
// const castInfo = document.querySelector("#castInfo");

async function fetchData(url) {
  const response = await fetch(url);
  const data = await response.json();

  return data;
}
getCastInfo(ID);
async function getCastInfo(id) {
  const castDetailsURL = `https://api.themoviedb.org/3/person/${id}?api_key=${api_key}`;
  const castImgsURL = `https://api.themoviedb.org/3/person/${id}/images?api_key=${api_key}`;
  const castMovieURL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`;
  const castCreditsURL = `https://api.themoviedb.org/3/person/${id}/movie_credits?api_key=${api_key}`;
  const combCreditsURL = `https://api.themoviedb.org/3/person/${id}/combined_credits?api_key=${api_key}`;

  const castImgsDATA = await fetchData(castImgsURL);
  const castMovieDATA = await fetchData(castMovieURL);
  const castCreditsDATA = await fetchData(castCreditsURL);
  const combCreditsDATA = await fetchData(combCreditsURL);
  const castDetailsDATA = await fetchData(castDetailsURL);

  // console.log(castImgsDATA);
  console.log(castMovieDATA);
  console.log(castCreditsDATA);
  console.log(combCreditsDATA);
  console.log(castDetailsDATA);

  getCastCredits(castCreditsDATA);
  getCombCredits(combCreditsDATA);
  getProfiles(castImgsDATA) 


  const {
    name,
    gender,
    imdb_id,
    deathday,
    birthday,
    homepage,
    biography,
    popularity,
    profile_path,
    place_of_birth,
    known_for_department,
  } = castDetailsDATA;

  const castBio = biography.split('. ');

  castName.innerHTML = name;
  birthdate.innerHTML = birthday;
  // imbdPage.href = `${imbd_href + imdb_id}`
  imdbPage.setAttribute('href', `${imdb_href}${imdb_id}`);
  castInfo.innerHTML = castBio
    .map((item) => (item = `<p>${item}.</p>`))
    .join(' ');
  birth.innerHTML = place_of_birth;
  job.innerHTML = known_for_department;
  profileImg.src = img_path + castImgsDATA.profiles[0].file_path;
  
} 
// tabs

const tabs = document.querySelectorAll('.tab');
const tabContent = document.querySelectorAll('.tab-content');

tabs.forEach((tab) => {
  tab.addEventListener('click', (e) => {
    const tabId = tab.getAttribute('data-tab');

    tabContent.forEach((content) => {
      content.classList.add('d-none');
    });

    tabs.forEach((otherTab) => {
      otherTab.classList.remove('border-bottom');
    });

    tabs.forEach((otherTab) => {
      const otherTabId = otherTab.getAttribute('data-tab');
      if (otherTab !== tab) {
        document.getElementById(otherTabId).classList.add('d-none');
      }
    });

    document.getElementById(tabId).classList.add('d-flex');
    document.getElementById(tabId).classList.remove('d-none');
    tab.classList.add('border-bottom');
  });
});

// tabOne.classList.add(

// );
async function getCastCredits(castCreditsDATA) {
  const cast = castCreditsDATA.cast;
  const production = castCreditsDATA.crew;

  console.log(cast);
  console.log(production);

  cast.filter((item, index) => {
    if (item.poster_path !== null) {
      tabOne.innerHTML += `
      <div>
        <img width="200" class"mt-2 rounded-3" loading="lazy" src="${
          img_path + item.poster_path
        }" alt="">
        </div>`
      }
      // <span class="d-block text-wrap text-center width">${item.original_title}</span>
  });
}

async function getCombCredits(combCreditsDATA) {
  console.log(combCreditsDATA);
  const cast = combCreditsDATA.cast;
  const crew = combCreditsDATA.crew;
  // Clear the creditContainer before adding new items
  creditContainer.innerHTML = '';

  let item = [...cast, ...crew];
  item.forEach((item, index) => {
    const creditElement = document.createElement('a');
    creditElement.classList.add(
      'credit',
      'text-decoration-none',
      'text-white',
      'ff-roboto',
      'position-relative'
    );
    creditElement.addEventListener('click', () => {
      creditElement.classList.toggle('credit-active')
    })

    const creditTitle = document.createElement('span');
    creditTitle.classList.add(
      'credit-title',
      'text-',
      'fw-bold',
      'position-relative',
      'z-2'
    );
    creditTitle.textContent = item.title ? item.title : item.original_name;

    const toggleBtn = document.createElement('button');
    toggleBtn.id = 'toggleBtn';
    toggleBtn.classList.add(
      'border-0',
      'rounded-circle',
      'position-absolute',
      'end-0',
      'me-3',
  
    );

    const chevronIcon = document.createElement('i');
    chevronIcon.classList.add('fa-solid', 'fa-chevron-down', 'text-white');

    const xmarkIcon = document.createElement('i');
    xmarkIcon.classList.add('fa-solid', 'fa-xmark', 'text-white');

    toggleBtn.appendChild(chevronIcon);
    toggleBtn.appendChild(xmarkIcon);

    const overview = document.createElement('p');
    overview.classList.add('position-relative', 'z-3', 'overview');
    overview.textContent = item.overview;

    creditElement.appendChild(creditTitle);
    creditElement.appendChild(toggleBtn);
    creditElement.appendChild(overview);

    creditContainer.appendChild(creditElement);

    // Add click event listener to each toggleBtn
    toggleBtn.addEventListener('click', () => {
      creditElement.classList.add('credit-active');

      console.log(123);
    });
  });
}

function getProfiles(profile) {
  // console.log(profile)
  profile.profiles.forEach((imgs, index) => {
    tabThree.innerHTML += `
      <img src="${img_path + imgs.file_path}" class=" mt-2 m-auto" alt="..." width="200">
    `
  })
}