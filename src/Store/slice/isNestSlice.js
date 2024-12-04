import { createSlice } from "@reduxjs/toolkit";

const isNestSlice = createSlice({
  name: "isNest",
  initialState: {
    isEmailNest: false,
    isNicknameNest: false,
  },
  reducers: {
    setEmailNestTrue(state) {
      state.isEmailNest = true;
    },
    setEmailNestFalse(state) {
      state.isEmailNest = false;
    },
    setNicknameNestTrue(state) {
      state.isNicknameNest = true;
    },
    setNicknameNestFalse(state) {
      state.isNicknameNest = false;
    },
  },
});

export default isNestSlice;

export const isNestActions = isNestSlice.actions;
