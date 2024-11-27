import { configureStore } from "@reduxjs/toolkit";
import partyPostReducer from "./slice/partyPostSlice";
import activeIdSlice from "./Slice/ActiveIdSlice";
import signUpSlice from "./slice/signUpSlice";
import isModalSlice from "./slice/isModalSlice";
import isNestSlice from "./slice/isNestSlice";
import { isPhoneAuthSlice } from "./slice/isPhoneAuthSlice";

const store = configureStore({
  reducer: {
    partyPosts: partyPostReducer,
    activeIds: activeIdSlice.reducer,
    signUp: signUpSlice.reducer,
    isNest: isNestSlice.reducer,
    isModal: isModalSlice.reducer,
    phoneAuth: isPhoneAuthSlice.reducer,
  },
});

export default store;
