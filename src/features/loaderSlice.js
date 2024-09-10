import { createSlice } from "@reduxjs/toolkit";

const loaderSlice = createSlice({
  name: "loader",
  initialState: { loading: false },
  reducers: {
    setLoadingState(state, action) {
      state.loading = action.payload;
    },
  },
});

export const { setLoadingState } = loaderSlice.actions;

export default loaderSlice.reducer;
