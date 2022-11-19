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
import { getProductUser } from "../../app/productReviews/productReviews";
import { selectrecommandprod } from 'app/productslice/Productsliceseller';
export interface Card11Props {
  className?: string;
  product;
  ratio?: string;
  hiddenAuthor?: boolean;
}

const Card11Product: FC<Card11Props> = ({
  className = "h-full",
  product,
  hiddenAuthor = false,
  ratio = "aspect-w-4 aspect-h-3",
}) => {
  const dispatch = useDispatch();

  const { label, createdAt, category, price, productImage, _id } = product;
  const [rate, setrating] = useState(0);

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
          dispatch(selectrecommandprod(product));
          /*insights('clickedObjectIDsAfterSearch', {
            eventName: ' Search Result Clicked'
          })*/
        }}
        to={`/mi/single-gallery/${product._id}`}
        className="absolute inset-0"
      ></Link>
      <span className="absolute top-3 inset-x-3">
        <Badge name={category} />
      </span>

      <div className="p-4 flex flex-col flex-grow space-y-3">
        <PostCardMeta meta={product} />

        {<span className="text-xs text-neutral-500">{date}</span>}

        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100 ">
          {label + " " + price + " $"}
        </h2>
        <div className="flex items-end justify-between mt-auto">
          <ProductCardLikeAndComment className="relative" postData={product} />
          <ProductCardSaveAction className="relative" postData={product} />

          <ModalProduct product={product} open={isOpen} />
        </div>
      </div>
    </div>
  );
};

export default Card11Product;
