import { createSlice } from "@reduxjs/toolkit";
import axios from "axiosInstance";
let initialState = {
    invoices: [],
};
const InvoiceSlice = createSlice({
    name: "invoices",
    initialState,
    reducers: {
        getInvoices(state, action) {
            state.invoices = action.payload;
        },
        deleteInvoices() {

        }
    },
});

export const getAllInvoice = () => (dispatch) => {
    axios
        .get("/payment/invoices")
        .then((res) => {
            dispatch(getInvoices(res.data.invoices));
        })
        .catch((err) => {
            dispatch(getInvoices([]));
        });
};

export const deleteInvoice = (id) => (dispatch) => {
    axios
        .delete(`/payment/${id}`)
        .then((res) => {
            if (res.data.success) {
                dispatch(getAllInvoice());
            }
        })
        .catch((err) => {
            console.log(err)
        });
};
export const { getInvoices } = InvoiceSlice.actions;
export default InvoiceSlice.reducer;
