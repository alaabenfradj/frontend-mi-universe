import React, { useEffect } from "react";
import axios from "../../axiosInstance"
// components

import CardTable from "components/Cards/CardTable.js";
import TableOfProducts from "components/Cards/TableOfProducts";
import ProductsContainer from "components/Cards/ProductsContainer";
import { useDispatch } from "react-redux";
import { populateProducts } from "app/productslice/Productslice";
import BackProductsContainer from "components/Cards/BackProductsContainer";

export default function TablesproductsBack() {
    const dispatch = useDispatch()
    useEffect(() => {
        axios.get("/products/filter").then((res) => {
            console.log(res.data.products)
            dispatch(populateProducts(res.data.products));

        });
    }, []);
    return (
        <>
            <div className="flex flex-wrap mt-4">
                <div className="w-full mb-12 px-4">
                    <BackProductsContainer color="light" />
                </div>
            </div>
        </>
    );
}
