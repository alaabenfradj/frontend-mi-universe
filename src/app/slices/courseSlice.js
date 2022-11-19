import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
export const CourseSlice = createSlice({
  name: "CourseSlice",
  initialState: {
    change: false,
    selectedCourse: {
      label: "",
      price: "",
      duration: "",
      description: "",
      level: "",
      languages: "",
      category: "",
    },
    resources: [],
    chapter: { description: "", title: "" },
  },
  reducers: {
    setChange: (state) => {
      state.change = !state.change;
    },
    setSelected: (state, action) => {
      state.selectedCourse = { ...action.payload };
    },
    setresources: (state, action) => {
      state.resources = action.payload;
    },
    setChapter: (state, action) => {
      state.chapter = action.payload;
    },
  },
});

export const { setChange, setSelected, setresources, setChapter } =
  CourseSlice.actions;
export default CourseSlice.reducer;
