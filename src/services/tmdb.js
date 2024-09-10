import { TMDB_API_PARAMS, TMDB_API_URL } from "@/config/tmdbAPI";

async function fetchTMDB(url, params = {}) {
  const searchParams = new URLSearchParams({
    ...TMDB_API_PARAMS,
    ...params,
  });

  try {
    const response = await fetch(`${TMDB_API_URL}/${url}?${searchParams}`);

    if (!response.ok) {
      throw new Error(`HTTP Error!, status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error("Fetch error", error);
  }
}

export async function listMedia(type, query, page = 1) {
  return fetchTMDB(`${type}/${query}`, { page });
}

export async function getMedia(type, id) {
  return fetchTMDB(`${type}/${id}`, {
    append_to_response:
      "videos,credits,images,external_ids,release_dates,combined_credits",
    include_image_language: "en",
  });
}

export async function getRecommendations(type, id, page = 1) {
  const r = await fetchTMDB(`${type}/${id}/recommendations`, { page });
  return r.results;
}
