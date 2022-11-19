import { createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import {populateProducts} from "../productslice/Productslice"
import { RootState } from "app/store";
// let initialState = {
//   marque: "",
// };

export const filterSlice = createSlice({
  name: 'filter',
  initialState: {
    marque: "",
    category: ""
  },
  reducers: {
    filterByMarque: (state, action) => {
      state.marque = action.payload;
    },
    filterByCategory: (state, action) => {
      state.category = action.payload;
    },
  },
});


export const fetchProducts = (state) => (dispatch) => {
    axios
      .get(`/products/fiter/marque?marque=${state.marque}`)
      .then((res) => {
        dispatch(populateProducts(res));
      })
      .catch((err) => {
        console.log(err.message)
      });
    };
export const { filterByMarque, filterByCategory} = filterSlice.actions;
export default filterSlice.reducer;
