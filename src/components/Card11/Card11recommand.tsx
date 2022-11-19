import React, { FC, useState, lazy, useEffect } from "react";
import ProductFeaturedMedia from "components/PostFeaturedMedia/ProductFeaturedMedia";
import Badge from "components/Badge/Badge";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import { useDispatch, useSelector } from "react-redux";
import axios from "axiosInstance";
import { Link } from "react-router-dom";
import { selectProduct } from "app/productslice/Productslice";
import ProductCardLikeAndComment from "components/PostCardLikeAndComment/ProductCardLikeAndComment";
import ProductCardSaveAction from "components/PostCardSaveAction/ProductCardSaveAction";
import ModalProduct from "components/ModalProduct/ModalProduct";
import Modalproductrecommand from "components/ModalProduct/Modalproductrecommand"
import { getProductUser } from "../../app/productReviews/productReviews";
import ProductCardLikeAndcommentRecommand from "components/PostCardLikeAndComment/ProductCardLikeandcommentRecommand";
import ProductCardSaveActionRecommand from "components/PostCardSaveAction/ProductCardSaveActionRecommand";
import { TwMainColor } from "data/types";
import { green } from "@material-ui/core/colors";

export interface Card11Props {
  className?: string;
  product;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11recommand: FC<Card11Props> = ({
  className = "h-full",
  product,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const dispatch = useDispatch();
  const [product1, setproduct] = useState();
  axios
  .get(`products/product/${product.id}`)
  .then((res) => {
    setrating(res.data.rate);
  })
  .catch((err) => {
    console.log(err);
  });
  const { label, createdAt, category, price, productImage,id } = product;
  const [rate, setrating] = useState(0);

  const rating = () => {
    axios
      .get(`products/getratingbyuser/${id}`)
      .then((res) => {
        setrating(res.data.rate);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  const getUser = (prod) => {
    axios
      .get(`users/${prod.seller}`)
      .then((user) => {
        dispatch(getProductUser(user.data));
      })
      .catch((error) => {
        console.error(error);
      });
  };

  useEffect(() => {
    rating();
  }, []);
  const date = createdAt.substring(0, 10);

  const [isHover, setIsHover] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div
      className={`nc-Card11 relative flex flex-col group [ nc-box-has-hover ] [ nc-dark-box-bg-has-hover ] ${className}`}
      data-nc-id="Card11"
      onMouseEnter={() => setIsHover(true)}
      onMouseLeave={() => setIsHover(false)}
      //
    >
      <div
        className={`block flex-shrink-0 relative w-full rounded-t-xl overflow-hidden ${ratio}`}
      >
        <div>
          <ProductFeaturedMedia product={product} isHover={isHover} />
        </div>
      </div>
      <Link
        onClick={() => {
          getUser(product);
          dispatch(selectProduct({ ...product, rate }));
        }}
        to={`/mi/single-gallery/${product.id}`}
        className="absolute inset-0"
      ></Link>
      <span className="absolute top-3 inset-x-3 flex justify-between">
        <Badge name={category} />
        {product._score && (
        <Badge
          color="green"
          name={`%${product._score}`}
          className="absolute "
        />
      )}
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <PostCardMeta meta={product} />

        {<span className="text-xs text-neutral-500">{date}</span>}

        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {label + " " + price + " $"}
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <ProductCardLikeAndcommentRecommand className="relative" postData={product} />
          <ProductCardSaveActionRecommand className="relative" postData={product} />

          <Modalproductrecommand product={product} open={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Card11recommand;
