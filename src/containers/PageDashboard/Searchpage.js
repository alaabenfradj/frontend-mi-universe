import React from "react";
import {Hits,InstantSearch,Pagination,Configure} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite";
import { useSelector } from "react-redux";
import aa from "search-insights";
import ProductCard from "./ProductCard";

const searchClient = algoliasearch(
     '1RY92FSHMF',
     "2a5deb3323c4edb2ecbcc46687c2c216",
)
const SearchPage = () => {
    const currentUser = useSelector(
        (state) => state.user.userLogedIn
      );
     
    return (
      <>
        <div className="flex flex-wrap mt-4">
          <div className="w-full mb-12 px-4">
           <InstantSearch indexName="products" searchClient={searchClient}>
           <Configure clickAnalytics/> 
        
          <Hits hitComponent= {ProductCard }/>
       
           </InstantSearch>
           
           <div className="w-full mb-12 px-4">

           </div>
          </div>
        </div>
      </>
    );
  };
  
  export default SearchPage;
  