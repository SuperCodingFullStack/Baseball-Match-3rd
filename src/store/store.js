import { configureStore } from "@reduxjs/toolkit";
import partyPostReducer from "./slice/partyPostSlice";
import activeIdSlice from "./Slice/ActiveIdSlice";

const store = configureStore({
  reducer: {
    partyPosts: partyPostReducer,
    activeIds: activeIdSlice.reducer,
  },
});

export default store;
