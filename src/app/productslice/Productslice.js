import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  products: [],
  selectedProduct: {},
  loading: true,
  open:false,
  errors: "",
};

const ProductsSlice = createSlice({
  name: "product",
  initialState,
  reducers: {
    populateProducts(state, action) {
      state.products = action.payload;
    },
    //productdetail
    selectProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    unselectProduct(state) {
      state.selectedProduct = null;
    },
    selectopen(state,action){
    state.open=action.payload;
    },
    deleteProduct: (state, action) => {
      //payload :id
      const payload = action.payload;
      const index = state.products.findIndex((item) => item._id === payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updateProduct: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.products[index] = payload;
      }
    },
    addProduct: (state, action) => {
      const payload = action.payload;
      state.products.push(payload);
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
  },
});
export const fetchProducts = () => (dispatch) => {
  //const [res, error] = await queryApi("products");
  axios
    .get("/products/filter")
    .then((res) => {
      dispatch(populateProducts(res));
    })
    .catch((err) => {
      dispatch(setErrors(err));
    });
  /*if (error) {
dispatch(setErrors(error));
} else {

dispatch(populateProducts(data));
}*/
};
export const selectProducts = (state) => {
  return [state.products.products, state.products.errors];
};
export const selectSelectedProduct = (state) => {
  return state.products.selectedProduct;
};

export const deleteProducts = (id) => (dispatch) => {
  axios
      .delete(`/products/productadmin/${id}`)
     
};
export const {
  populateProducts,
  selectProduct,
  unselectProduct,
  setErrors,
  deleteProduct,
  selectopen,
  updateProduct,
  addProduct,
} = ProductsSlice.actions;
export default ProductsSlice.reducer;
