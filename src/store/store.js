import { configureStore } from "@reduxjs/toolkit";
import partyPostReducer from "./slice/partyPostSlice";
import activeIdSlice from "./Slice/activeIdSlice";
import signUpSlice from "./slice/signUpSlice";
import signUpErrorSlice from "./slice/signUpErrorSlice";
import signUpNestSlice from "./slice/signUpNestSlice";

const store = configureStore({
  reducer: {
    partyPosts: partyPostReducer,
    activeIds: activeIdSlice.reducer,
    signUp: signUpSlice.reducer,
    signUpError: signUpErrorSlice.reducer,
    emailNest: signUpNestSlice.reducer,
  },
});

export default store;
