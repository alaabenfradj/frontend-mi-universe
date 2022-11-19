import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import env from "react-dotenv";
const domain = "https://api.daily.co/v1/";
const API_KEY_AlAA = env.daily_API_KEY_AlAA;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY_AlAA,
};
let initialState = {
  rooms: [],
  activeRooms: [],
};

const StreamSlice = createSlice({
  name: "stream",
  initialState,
  reducers: {
    getRooms(state, action) {
      state.rooms = action.payload;
    },
    getActiveRooms(state, action) {
      state.activeRooms = action.payload;
    },
    removeRoom: (state, action) => {
      return {
        ...state,
        rooms: state.rooms.filter((room) => room.name !== action.payload),
      };
    },
  },
});
export const getRoomsFromDaily = () => async (dispatch) => {
  await axios
    .get(`${domain}rooms`, {
      headers: headers,
    })
    .then((response) => {
      dispatch(getRooms(response.data.data));
    })
    .catch((err) => {
      dispatch(getRooms([]));
    });
};
export const getActiveRoomsFromDaily = () => async (dispatch) => {
  await axios
    .get(`${domain}presence`, {
      headers: headers,
    })
    .then((response) => {
      console.log(response.data);
      dispatch(getActiveRooms(response.data));
    })
    .catch((err) => {
      console.log(err);
      dispatch(getActiveRooms([]));
    });
};
export const { getRooms, removeRoom, getActiveRooms } = StreamSlice.actions;
export default StreamSlice.reducer;
