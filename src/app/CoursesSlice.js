import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  courses: [],
  selectedCourse: {},
  loading: true,
  open: true,
  errors: "",
};

const CoursesSlice = createSlice({
  name: "course",
  initialState,
  reducers: {
    populatecourses(state, action) {
      state.courses = action.payload;
    },
    //coursedetail
    selectcourse(state, action) {
      state.selectedCourse = action.payload;
    },
    unselectcourse(state) {
      state.selectedCourse = null;
    },
    selectopen(state, action) {
      state.open = action.payload;
    },
    deletecourse: (state, action) => {
      //payload :id
      const payload = action.payload;
      const index = state.courses.findIndex((item) => item._id === payload);
      if (index !== -1) {
        state.courses.splice(index, 1);
      }
    },
    updatecourse: (state, action) => {
      const payload = action.payload;
      const index = state.courses.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.courses[index] = payload;
      }
    },
    addcourse: (state, action) => {
      const payload = action.payload;
      state.courses.push(payload);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
export const fetchcourses = () => (dispatch) => {
  //const [res, error] = await queryApi("courses");
  axios
    .get("/courses/filter")
    .then((res) => {
      dispatch(populatecourses(res));
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
};
export const selectcourses = (state) => {
  return [state.courses.courses, state.courses.errors];
};
export const selectSelectedcourse = (state) => {
  return state.courses.selectedcourse;
};
export const {
  populatecourses,
  selectcourse,
  unselectcourse,
  setErrors,
  deletecourse,
  selectopen,
  updatecourse,
  addcourse,
} = CoursesSlice.actions;
export default CoursesSlice.reducer;
