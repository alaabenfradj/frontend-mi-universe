import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
  products: [],
  selectedProduct: {},
  loading: true,
  show: false,
  changedProduct: {},
  colors: {},
  category: "",
  errors: "",
  prod:""
};

const ProductsSliceseller = createSlice({
  name: "product",
  initialState,
  reducers: {
    populatesellerProducts(state, action) {
      state.products = action.payload;
    },
    deslecetsellerproducts(state) {
      state.products = [];
    },
    //productdetail
    selectsellerProduct(state, action) {
      state.selectedProduct = action.payload;
    },
    unselectProduct(state) {
      state.selectedProduct = null;
    },
    deletesellerProduct: (state, action) => {
      //payload :id
      const payload = action.payload;
      const index = state.products.findIndex((item) => item._id === payload);
      if (index !== -1) {
        state.products.splice(index, 1);
      }
    },
    updatesellerProduct: (state, action) => {
      const payload = action.payload;
      const index = state.products.findIndex(
        (item) => item._id === payload._id
      );
      if (index !== -1) {
        state.products[index] = payload;
      }
    },
    showText: (state, action) =>{
      state.text = action.payload;
    },
    showForm: (state, action) => {
      state.show = action.payload;
    },
    addProduct: (state, action) => {
      const payload = action.payload;
      state.products.push(payload);
    },
    selectrecommandprod:(state,action)=>{
state.prod=action.payload;
    },
    setErrors(state, action) {
      state.errors = action.payload;
    },
    updateProduct: (state, action) => {
      state.changedProduct = action.payload;
    },
    colorFilter: (state, action) => {
      state.colors = action.payload;
    },
    changeCategory: (state, action) => {
      state.category = action.payload;
    }
  },
});
/*export const fetchProducts = () => (dispatch) => {
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
}
};*/
export const selectProducts = (state) => {
  return [state.products.products, state.products.errors];
};
export const selectSelectedProduct = (state) => {
  return state.products.selectedProduct;
};

export const {
  populatesellerProducts,
  selectsellerProduct,
  unselectProduct,
  setErrors,
  deslecetsellerproducts,
  deletesellerProduct,
  updatesellerProduct,
  addProduct,
  selectrecommandprod,
  showForm,
  showText,
  updateProduct,
  colorFilter,
  changeCategory
} = ProductsSliceseller.actions;
export default ProductsSliceseller.reducer;
