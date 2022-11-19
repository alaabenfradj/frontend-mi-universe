import { PostActionDropdownProps } from "components/PostActionDropdown/PostActionDropdown";
import React, { FC } from "react";
import ProductBookmarkContainer from "containers/BookmarkContainer/ProductBookmarkContainer.jsx";
export interface PostCardSaveActionProps
  extends Pick<PostActionDropdownProps, "dropdownPositon"> {
  className?: string;
  classBgIcon?: string;
  readingTime?: number;
  hidenReadingTime?: boolean;
  postData;
}

const ProductCardSaveAction: FC<PostCardSaveActionProps> = ({
  className = "",
  hidenReadingTime = false,
  classBgIcon,
  readingTime,
  postData,
}) => {
  return (
    <div
      className={`nc-PostCardSaveAction flex items-center space-x-2 text-xs text-neutral-700 dark:text-neutral-300 ${className}`}
      data-nc-id="PostCardSaveAction"
    >
      <ProductBookmarkContainer
        initBookmarked={false}
        containerClassName={classBgIcon}
        postId={postData._id}
        product={postData}
      />
    </div>
  );
};

export default ProductCardSaveAction;
