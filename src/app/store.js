import { configureStore } from "@reduxjs/toolkit";
import loaderSlice from "@/features/loaderSlice";

export const store = configureStore({
  reducer: {
    loader: loaderSlice,
  },
});
