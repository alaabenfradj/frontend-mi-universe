import {Highlight,connectHitInsights}from 'react-instantsearch-dom'
import aa from 'search-insights';
import { Link, useParams } from 'react-router-dom';
import React, { useEffect, useState } from 'react';
import { useSelector } from "react-redux";
import algoliasearch from "algoliasearch/lite";

const ProductPage = () => {
    const currentUser = useSelector(
        (state) => state.user.userLogedIn
      );
      const client = algoliasearch(
        '1RY92FSHMF',
        "2a5deb3323c4edb2ecbcc46687c2c216",
   )
  const index=client.initIndex('products');
  const products1 = useSelector((state) => state.productseller.objectID);
  const {objectID,queryID}=useParams();
  console.log(objectID);
  
  const [product,setproduct]=useState({});
  useEffect(()=>{
    
      index.search(products1).then(({hits})=>setproduct(hits[0]))
  },[])
    
    return (
      <>
      <Link to={`/mi/products1/${objectID}`}> relatedproducts</Link>
       <button onClick={()=>{

aa("convertedObjectIDsAfterSearch",{
    index:'products',
    eventName:'Product added to cart',
    userToken:currentUser._id,
    objectIDs:[objectID],
    queryID:queryID

  })

       }} >addtocart</button>
      </>
    );
  };
  
  export default ProductPage;