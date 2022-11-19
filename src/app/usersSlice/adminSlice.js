import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  users: [],
  teachers: [],
  sellers: [],
  students: [],
};

const UsersSlice = createSlice({
  name: "userManagement",
  initialState,
  reducers: {
    getUsers(state, action) {
      state.users = action.payload;
    },
    removeUser: (state, action) => {
      return {
        ...state,
        users: state.users.filter((user) => user._id !== action.payload),
      };
    },
    blockUser: (state, action) => {
      state.users.forEach((user) => {
        if (user._id === action.payload) {
          user.isBlocked = true;
        }
      });
    },
    unblockUser: (state, action) => {
      state.users.forEach((user) => {
        if (user._id === action.payload) {
          user.isBlocked = false;
        }
      });
    },
    getTeachers(state, action) {
      state.teachers = action.payload;
    },
    getStudents(state, action) {
      state.students = action.payload;
    },
    getSellers(state, action) {
      state.sellers = action.payload;
    },
  },
});
export const getAllUsers = () => (dispatch) => {
  axios
    .get("/users/get-all-users")
    .then((response) => {
      dispatch(getUsers(response.data));
    })
    .catch((err) => {
      dispatch(getUsers([]));
    });
};
export const getAllTeachers = () => (dispatch) => {
  axios
    .get("/teachers/get-all-teachers")
    .then((response) => {
      dispatch(getTeachers(response.data));
    })
    .catch((err) => {
      dispatch(getTeachers([]));
    });
};
export const getAllStudents = () => (dispatch) => {
  axios
    .get("/students/get-all-students")
    .then((response) => {
      dispatch(getStudents(response.data));
    })
    .catch((err) => {
      dispatch(getStudents([]));
    });
};
export const getAllSellers = () => (dispatch) => {
  axios
    .get("/sellers/get-all-sellers")
    .then((response) => {
      dispatch(getSellers(response.data));
    })
    .catch((err) => {
      dispatch(getSellers([]));
    });
};


export const { getTeachers, getStudents, getSellers, getUsers, updateUsersList, removeUser, blockUser, unblockUser } =
  UsersSlice.actions;
export default UsersSlice.reducer;
