import { configureStore } from "@reduxjs/toolkit";
import partyPostReducer from "./slice/partyPostSlice";

const store = configureStore({
  reducer: {
    partyPosts: partyPostReducer,
  },
});

export default store;
