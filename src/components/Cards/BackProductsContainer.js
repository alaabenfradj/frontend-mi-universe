import React, { useEffect, useState } from "react";
import PropTypes from "prop-types";
import axios from "axiosInstance";
// components
import {
    
    populatesellerProducts,
  } from "app/productslice/Productsliceseller";
import { useDispatch, useSelector } from "react-redux";
import PaginationSimple from "components/Pagination/PaginationSimple";
import TableOfProducts from "./TableOfProducts";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Cardproducts from "./Cardproducts";
import Addproducts from "containers/PageDashboard/addproducts";
import { selectopen } from "app/productslice/Productslice";
import TableOfProductsBack from "./TableOfProductsBack";

export default function BackProductsContainer({ color }) {
    
const openn = useSelector((state) => state.product.open);
//console.log(openn);
const [open, setopen] = useState(openn);

const dispatch=useDispatch();
 

  const products1 = useSelector(
    (state) => state.product.products
  );
  
  const [loading, setLoading] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [postsPerPage] = useState(5);

  
  const indexOfLastPost = currentPage * postsPerPage;
  const indexOfFirstPost = indexOfLastPost - postsPerPage;
  const currentPosts = products1.slice(indexOfFirstPost, indexOfLastPost);
  const lastPage = Math.ceil(products1.length / postsPerPage);
  // Change page
  const paginateFront = () => setCurrentPage(currentPage + 1);
  const paginateBack = () => setCurrentPage(currentPage - 1);
  return (
    <>
    
      <TableOfProductsBack prod={currentPosts} color={color}/>
      <PaginationSimple
        lastPage={lastPage}
        postsPerPage={postsPerPage}
        totalPosts={products1.length}
        paginateBack={paginateBack}
        paginateFront={paginateFront}
        currentPage={currentPage}
      ></PaginationSimple>
      
    </>
  );
}

BackProductsContainer.defaultProps = {
  color: "light",
};

BackProductsContainer.propTypes = {
  color: PropTypes.oneOf(["light", "dark"]),
};