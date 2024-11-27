import { createSlice } from "@reduxjs/toolkit";

const isModalSlice = createSlice({
  name: "isModal",
  initialState: {
    emailModal: false,
    nicknameModal: false,
  },
  reducers: {
    setEmailModal(state) {
      state.emailModal = true;
      state.nicknameModal = false;
    },
    setEmailModalFalse(state) {
      state.emailModal = false;
      state.nicknameModal = false;
    },
    setNicknameModal(state) {
      state.emailModal = false;
      state.nicknameModal = true;
    },
    setNicknameModalFalse(state) {
      state.emailModal = false;
      state.nicknameModal = false;
    },
  },
});

export default isModalSlice;
export const isModalActions = isModalSlice.actions;
