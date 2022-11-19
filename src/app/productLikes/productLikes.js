import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  likedProducts: [],
  bookmarkedProducts: [],
};

export const ProductLikeSlice = createSlice({
  name: "productLikes",
  initialState,
  reducers: {
    getLikedProducts: (state, action) => {
      state.likedProducts = action.payload;
    },
    addNewLike: (state, action) => {
      state = {
        ...state,
        likedProducts: [...state.likedProducts, action.payload],
      };
      return state;
    },
    removeLike: (state, action) => {
      const likedProds = state.likedProducts.filter(
        (likedProd) => likedProd._id !== action.payload
      );
      state = {
        ...state,
        likedProducts: likedProds,
      };
      return state;
    },

    getBookmarkedProducts: (state, action) => {
      state.bookmarkedProducts = action.payload;
    },
    addBookmark: (state, action) => {
      state = {
        ...state,
        bookmarkedProducts: [...state.bookmarkedProducts, action.payload],
      };
      return state;
    },
    removeBookmark: (state, action) => {
      const bookmarkedProducts = state.bookmarkedProducts.filter(
        (likedProd) => likedProd._id !== action.payload
      );
      state = {
        ...state,
        bookmarkedProducts: bookmarkedProducts,
      };
      return state;
    },
    resetStateLikes: (state) => {
      return (state = initialState);
    },
  },
});

export const {
  addNewLike,
  removeLike,
  getLikedProducts,
  getBookmarkedProducts,
  addBookmark,
  removeBookmark,
  resetStateLikes,
} = ProductLikeSlice.actions;

export default ProductLikeSlice.reducer;
