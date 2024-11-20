import { createSlice } from '@reduxjs/toolkit';

const categorySlice = createSlice({
  name: 'category',
  initialState: {
    selectedCategory: '그림', // 기본 카테고리를 "그림"으로 설정
    auctions: [] // 경매 데이터를 저장할 배열 추가
  },
  reducers: {
    setCategory: (state, action) => {
      state.selectedCategory = action.payload;
    },
    setAuctions: (state, action) => {
      state.auctions = action.payload;
    }
  },
});

export const { setCategory, setAuctions } = categorySlice.actions;
export default categorySlice.reducer;
