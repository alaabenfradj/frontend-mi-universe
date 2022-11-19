import CategoryBadgeList from "components/CategoryBadgeList/CategoryBadgeList";
import React, { FC, useEffect } from "react";
import SingleTitle from "./SingleTitle";

import { Helmet } from "react-helmet";
import Badge from "components/Badge/Badge";
import ProductCardLikeAndComment from "components/PostCardLikeAndComment/ProductCardLikeAndComment";
import ProductCardSaveAction from "components/PostCardSaveAction/ProductCardSaveAction";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import NcImage from "components/NcImage/NcImage";

function SingleHeaderProduct(props) {
  const product = props.product;
  const user = props.user;
  useEffect(() => {
    console.log(user);
  }, []);
  const { category, reference, label, marque } = product;
  return (
    <>
      <Helmet>
        <title>product || MI Universe</title>
      </Helmet>
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {PAGE_DATA.name}
            </h2>
            <span className="block mt-4 text-neutral-300">
              {products.length} Articles
            </span>
          </div>
        </div>
      </div>
      <div className={`nc-SingleHeader `}>
        <div className="space-y-5">
          <Badge className="" name={category} />
          <SingleTitle mainClass="" title={label} />
          {!!reference && !false && (
            <span className="block text-base text-neutral-500 md:text-lg dark:text-neutral-400 pb-1">
              {reference}
            </span>
          )}
          <div className="w-full border-b border-neutral-100 dark:border-neutral-800"></div>
          <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
            <PostCardMeta meta={product} />
            <ProductCardLikeAndComment
              className="relative"
              postData={product}
            />
            <ProductCardSaveAction className="relative" postData={product} />
          </div>
        </div>
      </div>
    </>
  );
}

export default SingleHeaderProduct;
