/**
 * API url
 */
// Requests are routed through the server-side proxy so the TMDB API key
// never gets bundled into client-side JavaScript (Vite inlines VITE_* vars
// into the shipped bundle, which would leak the key to any visitor).
const TMDB_API_URL = "https://movies-proxy.vercel.app/tmdb";
const imgBaseURL = "https://movies-proxy.vercel.app/ipx";

const TMDB_API_PARAMS = {
  language: "en",
};

export { TMDB_API_URL, TMDB_API_PARAMS, imgBaseURL };
