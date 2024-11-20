import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

// 초기 상태 설정
const initialState = {
  partyPostList: [],
  status: "idle", // 상태: 'idle', 'loading', 'succeeded', 'failed'
  error: null,
};

// 슬라이스 생성
const partyPostSlice = createSlice({
  name: "partyPosts",
  initialState,
  reducers: {
    setPartyPostList: (state, action) => {
      state.partyPostList = action.payload;
    },
    setLoadingStatus: (state, action) => {
      state.status = action.payload;
    },
    setError: (state, action) => {
      state.error = action.payload;
    },
  },
});

// 리듀서 export
export const { setPartyPostList, setLoadingStatus, setError } =
  partyPostSlice.actions;
export default partyPostSlice.reducer;
