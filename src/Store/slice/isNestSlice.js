import { createSlice } from "@reduxjs/toolkit";

const isNestSlice = createSlice({
  name: "isNest",
  initialState: {
    emailNest: false,
    nicknameNest: false,
    emailNestMessage: "",
    emailNestError: false,
  },
  reducers: {
    setEmailNest(state) {
      state.emailNest = true;
    },
    setNicknameNest(state) {
      state.nicknameNest = true;
    },
    setEmailNestMessage(state, action) {
      state.emailNestMessage = action.payload.message;
      state.emailNestError = action.payload.error;
    },
  },
});

export default isNestSlice;
export const isNestActions = isNestSlice.actions;
