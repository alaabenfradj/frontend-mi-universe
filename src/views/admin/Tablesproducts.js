import React from "react";

// components

import CardTable from "components/Cards/CardTable.js";
import TableOfProducts from "components/Cards/TableOfProducts";
import ProductsContainer from "components/Cards/ProductsContainer";

export default function Tablesproducts() {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
          <ProductsContainer color="light" />
        </div>
      </div>
    </>
  );
}
