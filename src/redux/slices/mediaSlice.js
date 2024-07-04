import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import { listMedia, getMedia, getMediaRecommended } from "services/tmdbAPI";

export const fetchMediaCollection = createAsyncThunk(
  "media/fetchCollection",
  async () => {
    const [movies, tvShows] = await Promise.all([
      listMedia("movie", "popular"),
      listMedia("tv", "popular"),
    ]);
    return { movies: movies.data.results, tv: tvShows.data.results };
  },
);

export const fetchHeroMedia = createAsyncThunk(
  "media/fetchHeroMedia",
  async ({ type, id }) => {
    const response = await getMedia(type, id);
    return response.data;
  },
);

export const fetchRecommendedMovies = createAsyncThunk(
  "media/fetchRecommendedMovies",
  async ({ movieId }) => {
    const response = await getMediaRecommended("movie", movieId);
    return response.data.results;
  },
);

const mediaSlice = createSlice({
  name: "media",
  initialState: {
    heroMedia: null,
    mediaCollection: { movies: [], tv: [] },
    selectedMovie: null,
    recommended: null,
    loading: false,
    error: null,
  },
  reducers: {
    getSelectedMedia(state, _) {
      return state.heroMedia;
    },
  },
  selectors: {
    selectedMedia: (state) => state.heroMedia,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchMediaCollection.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchMediaCollection.fulfilled, (state, action) => {
        state.loading = false;
        state.mediaCollection = action.payload;
      })
      .addCase(fetchHeroMedia.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message;
      })
      .addCase(fetchHeroMedia.fulfilled, (state, action) => {
        state.loading = false;
        state.heroMedia = action.payload;
      })
      .addCase(fetchRecommendedMovies.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error;
        console.log(state.error);
      })
      .addCase(fetchRecommendedMovies.fulfilled, (state, action) => {
        state.loading = false;
        console.log(action.payload);
        state.recommended = action.payload;
      });
  },
});

export const getHeroMedia = (state) => state.media.heroMedia;
export const getRecommendedMedia = (state) => state.media.recommended;

export default mediaSlice.reducer;
