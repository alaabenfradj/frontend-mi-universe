import { createSlice } from "@reduxjs/toolkit";
export const filterCourseSlice = createSlice({
  name: "filterCourseSlice",
  initialState: {
    level: null,
    languages: null,
    maxprice: null,
    maxduration: null,
    minprice: null,
    minduration: null,
    category: null,
  },
  reducers: {
    filterByLevelCourse: (state, action) => {
      if (action.payload === "all") state.level = null;
      else state.level = action.payload;
    },
    filterByCategoryCourse: (state, action) => {
      if (action.payload === "all") state.category = null;
      else state.category = action.payload;
    },
    filterByLanguageCourse: (state, action) => {
      if (action.payload === "all") state.languages = null;
      else state.languages = action.payload;
    },
    filterByPriceCourse: (state, action) => {
      state.maxprice = action.payload[1];
      state.minprice = action.payload[0];
    },
    filterByDurationCourse: (state, action) => {
      state.maxduration = action.payload[1];
      state.minduration = action.payload[0];
    },
    intialCourseSearch: (state, action) => {
      state = { ...state, ...action.payload };
    },
  },
});

export const {
  filterByLevelCourse,
  filterByCategoryCourse,
  filterByLanguageCourse,
  filterByPriceCourse,
  filterByDurationCourse,
  intialCourseSearch,
} = filterCourseSlice.actions;
export default filterCourseSlice.reducer;
