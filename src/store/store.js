import { configureStore } from "@reduxjs/toolkit";
import partyPostReducer from "./slice/partyPostSlice";
import activeIdSlice from "./Slice/activeIdSlice";
import isNestSlice from "./slice/isNestSlice";

const store = configureStore({
  reducer: {
    partyPosts: partyPostReducer,
    activeIds: activeIdSlice.reducer,
    isNest: isNestSlice.reducer,
  },
});

export default store;
