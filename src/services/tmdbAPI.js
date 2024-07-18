import axios from "axios";
import { TMDB_API_PARAMS, TMDB_API_URL } from "@/config/tmdbAPI";

async function fetchTMDB(url, params = {}) {
  return axios.get(`${TMDB_API_URL}/${url}`, {
    params: { ...TMDB_API_PARAMS, ...params },
  });
}

export async function listMedia(type, query, page = 1) {
  return fetchTMDB(`${type}/${query}`, { page });
}

export async function getMedia(type, id) {
  return fetchTMDB(`${type}/${id}`);
}
