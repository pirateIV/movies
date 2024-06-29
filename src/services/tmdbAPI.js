import axios from "axios";
import { TMDB_API_PARAMS, TMDB_API_URL } from "config/tmdbAPi";

export const fetchTMDB = (url, params = {}) => {
  return axios.get(`${TMDB_API_URL}${url}`, {
    params: { ...TMDB_API_PARAMS, ...params },
  });
};

export const listMedia = (type, query, page = 1) => {
  return fetchTMDB(`/${type}/${query}`, { page });
};

export const getMedia = (type, id) => {
  return fetchTMDB(`/${type}/${id}`, {
    append_to_response: "videos,credits,images,external_ids,release_dates",
    include_image_language: "en",
  });
};

export const getMediaRecommended = (type, id) => {
  return fetchTMDB(`/${type}/${id}/recommendations`);
};
