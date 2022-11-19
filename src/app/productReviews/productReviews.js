import { createSlice } from "@reduxjs/toolkit";
let initialState = {
  productsReviews: [],
  user: {},
};
const ProductReviewsSlice = createSlice({
  name: "productsReviews",
  initialState,
  reducers: {
    getProductReviews(state, action) {
      state.productsReviews = action.payload;
    },
    getProductUser(state, action) {
      state.user = action.payload;
    },
    addReview(state, action) {
      state.productsReviews = [...state.productsReviews, action.payload];
    },
    resetStateReviews: (state) => {
      return (state = initialState);
    },
  },
});
export const { getProductReviews, addReview, getProductUser, resetStateReviews } =
  ProductReviewsSlice.actions;
export default ProductReviewsSlice.reducer;
