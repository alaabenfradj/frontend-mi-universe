import React, { FC } from "react";
import PostCardCommentBtn from "components/PostCardCommentBtn/PostCardCommentBtn";
import ProductCardCommentBtn from "components/PostCardCommentBtn/ProductCardCommentBtn";
import PostCardLikeContainer from "containers/PostCardLikeContainer/PostCardLikeContainer";
import { PostDataType } from "data/types";
import ProductCardLikeContainer from "containers/PostCardLikeContainer/ProductCardLikeContainer";
export interface PostCardLikeAndCommentProps {
  className?: string;
  itemClass?: string;
  postData;
  hiddenCommentOnMobile?: boolean;
  onClickLike?: (id: number) => void;
}

const ProductCardLikeAndComment: FC<PostCardLikeAndCommentProps> = ({
  className = "",
  itemClass = "px-3 h-8 text-xs",
  hiddenCommentOnMobile = true,
  postData,
  onClickLike = () => {},
}) => {
  return (
    <div
      className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
      data-nc-id="PostCardLikeAndComment"
    >
      <ProductCardLikeContainer
        className={itemClass}
        like={postData.likesCount}
        onClickLike={onClickLike}
        productId={postData._id}
        product={postData}
      />
      <ProductCardCommentBtn
        href={postData._id}
        commentCount={postData.reviewsCount}
        className={`${
          hiddenCommentOnMobile ? "hidden sm:flex" : "flex"
        }  ${itemClass}`}
      />
    </div>
  );
};

export default ProductCardLikeAndComment;
