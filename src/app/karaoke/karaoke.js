import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";

export const KaraokeSlice = createSlice({
  name: "karaoke",
  initialState: {
    searchedSong: {},
    songs: [],
  },
  reducers: {
    getSong: (state, action) => {
      state.searchedSong = state.songs.filter((s) => s.song === action.payload);
    },
    setSongs: (state, action) => {
      state.songs = action.payload;
    },
  },
});

export const { getSong, setSongs } = KaraokeSlice.actions;
export default KaraokeSlice.reducer;
