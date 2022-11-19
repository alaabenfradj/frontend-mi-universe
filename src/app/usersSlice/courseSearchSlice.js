import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  level: null,
  language:null,
  categorie:null,

};

const SearchsSlice = createSlice({
  name: "Search",
  initialState,
  reducers: {
    getfield(state, action) {
      if(action.payload.level==='all')
      return({...state,level:null})
      return { ...state, level: action.payload.level };
      
    }
}});
export const { getfield } =
  SearchsSlice.actions;
export default SearchsSlice.reducer;
