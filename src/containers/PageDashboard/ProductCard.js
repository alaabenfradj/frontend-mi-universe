
import {Highlight,connectHitInsights}from 'react-instantsearch-dom'
import aa from 'search-insights';
import { Link } from 'react-router-dom';
import React from 'react';
import { useDispatch } from 'react-redux';
import { selectrecommandprod } from 'app/productslice/Productsliceseller';
import algoliasearch from "algoliasearch/lite";
const Product = ({hit ,insights}) => {
  const url =`/mi/products/${hit.objectID}queryID=${hit.__queryID}`;
  const base_url = "http://localhost:5050/";
  const dispatch=useDispatch();
  const client = algoliasearch(
    '1RY92FSHMF',
    "2a5deb3323c4edb2ecbcc46687c2c216",
)
const index=client.initIndex('products');


    return (
      <>
        <Link to ={{pathname:url}} onClick={()=>{
        insights('clickedObjectIDsAfterSearch', {
         eventName: ' Search Result Clicked'
       })
       dispatch(selectrecommandprod(hit));

        }}>   <h1>
          {hit.category}
          
          </h1>
          <h1>
            {hit.price}
            
          </h1>
          
         {/* <div className="aspect-w-2 aspect-h-3 rounded-lg bg-gray-100 overflow-hidden sm:col-span-4 lg:col-span-5">
                     <img
                        src={`http://localhost:5050/${hit.productImage[0]}`}
                        alt={hit.label}
                        className="object-center object-cover"
      />
                    </div>*/}
          </Link>
      </>
    );
  };
  const ProductCard =connectHitInsights(aa)(Product);
  export default ProductCard;