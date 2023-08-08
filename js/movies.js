// // Movie Credits
// const api_credits = `https://api.themoviedb.org/3/movie/${movie_id}/credits?api_key=5e750355564957a2353604d8a9344e94`;
// // https://api.themoviedb.org/3/movie/298618/credits?api_key=5e750355564957a2353604d8a9344e94


const api_key = "5e750355564957a2353604d8a9344e94";
const api_url = `https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=${api_key}`;
const api_mov_details = `
https://api.themoviedb.org/3/movie/{movie_id}`

getMovies(api_url)
async function getMovies(url){
  const resp = await fetch(url)
  const data = await resp.json()

  console.log(data.results)
  getMovieDetails(data.results[0].id)
  getMovieCredits(data.results[0].id)
  getSimilarMovies(data.results[0].id)
}

async function getMovieDetails(mov_detail_id) {
  const resp = await fetch(`
  https://api.themoviedb.org/3/movie/${mov_detail_id}?api_key=${api_key}`)
  const data = await resp.json()

  console.log(data)
}

async function getSimilarMovies(similar_id) {
  const resp = await fetch(
    `https://api.themoviedb.org/3/movie/${similar_id}/similar?api_key=${api_key}`
  )
  const data = await resp.json()

  console.log(data)
}

async function getMovieCredits(credits_id) {
  const creditsResponse = await fetch (
    `https://api.themoviedb.org/3/movie/${credits_id}/credits?api_key=${api_key}`
  )
  const creditsData = await creditsResponse.json()

  console.log(creditsData)
}

async function getPersonMovieCredits(person_id) {
  const personCreditRes = await fetch (
   `https://api.themoviedb.org/3/person/${person_id}/movie_credits?api_key=${api_key}`
  )
  const personData = await personCreditRes.json()

  console.log(personData)
}