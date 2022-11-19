import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  reclamations: [],
};
const RecSlice = createSlice({
  name: "reclamations",
  initialState,
  reducers: {
    getReclamations(state, action) {
      state.reclamations = action.payload;
    },
    setRecOk(state, action) {
      state.reclamations.forEach((rec) => {
        if (rec._id === action.payload) {
          rec.status = true;
        }
      });
    },
  },
});

export const getAllRecs = () => (dispatch) => {
  axios
    .get("/reclamations/get-recs")
    .then((res) => {
      dispatch(getReclamations(res.data));
    })
    .catch((err) => {
      dispatch(getReclamations([]));
    });
};
export const { getReclamations, setRecOk } = RecSlice.actions;
export default RecSlice.reducer;
