import { createSlice } from "@reduxjs/toolkit";

const getTotalAmmount = (state) => {
  const items = state.cartItems;
  items.forEach((i) => {
    return i.price * i.qte;
  });
};
const carteslics = createSlice({
  name: "carteslics",
  initialState: {
    cartItems: [],

    total: 0,
  },
  reducers: {
    DeselectItems:(state)=>{
     
      state.cartItems=[];
      state.total=0;      
  },
    removeitem: (state, action) => {
      return {
        ...state,
        cartItems: state.cartItems.filter(
          (x) => x.productid !== action.payload
        ),
      };
    },
    updateqte: (state, action) => {},
    addtotal: (state, action) => {
      state.total = action.payload;
    },
    additem: (state, action) => {
      //state.quantity+=1;
      let item = {
        label: action.payload.label,
        price: action.payload.price,
        productImage: action.payload.productImage,
        remise: action.payload.discountPercent,
        productid: action.payload.productid,
        qte: action.payload.qte,
      };
      const existItem = state.cartItems.find(
        (x) => x.productid === item.productid
      );
      if (existItem) {
        return {
          ...state,
          cartItems: state.cartItems.map((x) =>
            x.productid === existItem.productid ? item : x
          ),
        };
      } else {
        return { ...state, cartItems: [...state.cartItems, item] };
      }
    },

    getTotal: (state) => {
      return {
        ...state,
        total: getTotalAmmount(state),
      };
    },
  },
});

export const { additem, removeitem, getTotal, updateqte, addtotal,DeselectItems } =
  carteslics.actions;
export default carteslics.reducer;
