import React, { FC, useEffect, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardSaveAction from "components/PostCardSaveAction/PostCardSaveAction";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import PostCardLikeAndComment from "components/PostCardLikeAndComment/PostCardLikeAndComment";
import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import PostTypeFeaturedIcon from "components/PostTypeFeaturedIcon/PostTypeFeaturedIcon";
import PostFeaturedMedia from "components/PostFeaturedMedia/PostFeaturedMedia";
import axios from "axiosInstance";
import { useDispatch } from "react-redux";
import { getProductUser } from "../../app/productReviews/productReviews";
import { selectProduct } from "app/productslice/Productslice";
import { selectrecommandprod } from 'app/productslice/Productsliceseller';
import ProductFeaturedMedia from "components/PostFeaturedMedia/ProductFeaturedMedia";
import ProductCardLikeAndComment from "components/PostCardLikeAndComment/ProductCardLikeAndComment";
import ProductCardSaveAction from "components/PostCardSaveAction/ProductCardSaveAction";
import CategoryBadgeListProduct from "components/CategoryBadgeList/CategoryBadgeListProduct";
import ModalProduct from "components/ModalProduct/ModalProduct";
export interface Card9Props {
  className?: string;
  ratio?: string;
  post: PostDataType;
product;
  hoverClass?: string;
}

const Card9product: FC<Card9Props> = ({
  className = "h-full",
  ratio = "aspect-w-3 aspect-h-3 sm:aspect-h-4",

  product,
  hoverClass = "",
}) => {

    const { label, createdAt, category, price, productImage, _id } = product;
    const date = createdAt.substring(0, 10);
    const dispatch=useDispatch();
    const [rate, setrating] = useState(0);
    const[seller,setseller]= useState({});
    const [isOpen, setIsOpen] = useState(false);
    const base_url = "http://localhost:5050/";
  const rating = () => {
    axios
      .get(`products/getrating/${_id}`)
      .then((res) => {
        setrating(res.data.rate);
      })
      .catch((err) => {
        console.log(err);
      });
  };
    const getUser = (prod) => {
        axios
          .get(`/products/seller/${prod.seller}`)
          .then((user) => {
            dispatch(getProductUser(user.data));
            setseller(user.data);
            
          })
          .catch((error) => {
            console.error(error);
          });
      };
      useEffect(()=>{
        axios
              .get(`/products/seller/${product.seller}`)
              .then((user) => {
                setseller(user.data);
                
              })
              .catch((error) => {
                console.error(error);
              });
          },[])

      
  const renderMeta = () => {
    return (
      <div className="inline-flex items-center text-xs text-neutral-300">
        <div className="block ">
          <h2 className="block text-lg font-semibold text-white ">
            <span className="line-clamp-2" title={label}>
              {label}
            </span>
          </h2>
          <Link to={`/mi/single-gallery/${_id}`} onClick={() => {
          getUser(product);
          dispatch(selectProduct({ ...product, rate }));
          dispatch(selectrecommandprod(product));
        }} className="flex mt-2.5 relative">
            <span className="block text-neutral-200 hover:text-white font-medium truncate">
              {seller.userName}
            </span>
            <span className="mx-[6px] font-medium">·</span>
            <span className="font-normal truncate">{date}</span>
          </Link>
          <ModalProduct product={product} open={isOpen} />
        </div>
      </div>
    );
  };

  return (
    <div
      className={`nc-Card9 relative flex flex-col group rounded-3xl overflow-hidden ${hoverClass} ${className}`}
      data-nc-id="Card9"
    >
      <div className="absolute inset-x-0 top-0 p-3 flex items-center justify-between transition-all opacity-0 z-[-1] group-hover:opacity-100 group-hover:z-10 duration-300">
     < ProductCardLikeAndComment className="relative" postData={product} />
          <ProductCardSaveAction className="relative" postData={product} />

      </div>
      <div className={`flex items-start relative w-full ${ratio}`}></div>
      
        <Link to={`/mi/single-gallery/${_id}`} onClick={() => {
            getUser(product);
            dispatch(selectProduct({ ...product, rate }));
            dispatch(selectrecommandprod(product));
          }}>
          <NcImage
            containerClassName="absolute inset-0 rounded-3xl"
            className="object-cover w-full h-full rounded-3xl"
            src={base_url+productImage[0]}
          />
          <PostTypeFeaturedIcon
            className="absolute top-3 left-3 group-hover:hidden"
            postType="standard"
            wrapSize="w-7 h-7"
            iconSize="w-4 h-4"
          />
          <span className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity"></span>
        </Link>
      
      <Link
        to={`/mi/single-gallery/${_id}`} onClick={() => {
            getUser(product);
            dispatch(selectProduct({ ...product, rate }));
            dispatch(selectrecommandprod(product));
          }}
        className="absolute bottom-0 inset-x-0 h-1/2 bg-gradient-to-t from-black opacity-50"
      ></Link>
      <div className="absolute bottom-0 inset-x-0 p-4 flex flex-col flex-grow">
        <Link to={`/mi/single-gallery/${_id}`} onClick={() => {
            getUser(product);
            dispatch(selectProduct({ ...product, rate }));
            dispatch(selectrecommandprod(product));
          }} className="absolute inset-0"></Link>
        <div className="mb-3">
          {<CategoryBadgeListProduct categories={category} />}
        </div>
        {renderMeta()}
      </div>
    </div>
  );
};

export default Card9product;
