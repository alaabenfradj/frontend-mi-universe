
import ButtonPrimary from "components/Button/ButtonPrimary";
import CardProfile from "components/Cards/CardProfile";
import CardSettings from "components/Cards/CardSettings";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React, { useState } from "react";
import Tablesproducts from "views/admin/Tablesproducts";
import ProductsContainer from "components/Cards/ProductsContainer";
const Manageproduct = () => {
  return (
    <>
      <div className="flex flex-wrap mt-4">
        <div className="w-full mb-12 px-4">
         <ProductsContainer color="light" />
        </div>
      </div>
    </>
  );
};

export default Manageproduct;
