import { configureStore } from "@reduxjs/toolkit";
import partyPostReducer from "./slice/partyPostSlice";
import activeIdSlice from "./Slice/ActiveIdSlice";
import signUpSlice from "./slice/signUpSlice";
import signUpErrorSlice from "./slice/signUpErrorSlice";

const store = configureStore({
  reducer: {
    partyPosts: partyPostReducer,
    activeIds: activeIdSlice.reducer,
    signUp: signUpSlice.reducer,
    signUpError: signUpErrorSlice.reducer,
  },
});

export default store;
