import { createSlice } from "@reduxjs/toolkit";
export const CoursemodalSlice = createSlice({
  name: "CoursemodalSlice",
  initialState: {
    isOpen: false,
    isOpenResource: false,
    isOpenChapter: false,
  },
  reducers: {
    setIsOpen: (state, action) => {
      state.isOpen = action.payload;
    },
    setIsOpenResource: (state, action) => {
      state.isOpenResource = action.payload;
    },
    setIsOpenChapter: (state, action) => {
      state.isOpenChapter = action.payload;
    },
  },
});

export const { setIsOpen, setIsOpenResource, setIsOpenChapter } =
  CoursemodalSlice.actions;
export default CoursemodalSlice.reducer;
