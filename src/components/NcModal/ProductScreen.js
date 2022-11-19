import { useDispatch, useSelector } from "react-redux";
import { RootState } from "app/store";
import React, { useState } from 'react';
import { additem } from "app/cartslice/carteslics";
import { Link } from "react-router-dom";
import {StarRatingComponent} from "react-star-rating-component";

export default function ProductScreen(props) {
   // const product = data.products.find((x) => x._id === props.match.params.id);
   // if (!product) {
     // return <div> Product Not Found</div>;
   // }
   const dispatch= useDispatch();
  
  const product = useSelector((state)=>state.product.selectedProduct);
  console.log(product);
  
  
   const { _id,label,createdAt, category, price, productImage,description ,reference,remise} = product;
   const [qty, setQty] = useState(1);
  /*const addToCartHandler = () => {
    props.history.push(`/dashboard/posts/${_id}?qty=${qty}`);
  };*/
   const item={
    label: label,
    price:price,
    productImage:productImage,
    productid:_id,
    qte:qty,

  }
   const base_url = "http://localhost:5050/";
    return (
      <div>
       {/*<Link to="/">Back to result</Link>*/} 
        <div className="row top">
          <div className="col-1">
            <img className="img large" src={base_url+productImage} alt={category}></img>
          </div>
          <div className="col-12">
            <ul>
              <li>
                Category:

           {` ${category}`}  
              </li>
             {/*<li>
                <Rating
                  rating={product.rating}
                  numReviews={product.numReviews}
                ></Rating>
    </li>*/} 
              <li>Pirce : ${price}</li>
              <li>Qty :
                <input type="number" value={qty}
                onChange={(e)=>{setQty(e.target.value)}}>
                  
                </input>
              </li>
              <li>
                Description:
                <p>{reference}</p>
              </li>
          
            </ul>
          </div>
          <div className="col-2">
            <div className="card card-body">
              <ul>
               {/*<li>
                  <div className="row">
                    <div>Price</div>
                    <div className="price">${price}</div>
                  </div>
  </li>*/} 
                {/*<li>
                  
                  <div className="row">
                    <div>Status</div>
                    
                  </div>
  </li>*/}
                
                <li>
                  <Link to={`/dashboard/posts/${_id}?qty=${qty}`}>
                  <button className="btn primary block"  onClick={()=>{
                    dispatch(additem(item))
                    
                  
                  }}>Add to Cart</button>
                  </Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    );
  }