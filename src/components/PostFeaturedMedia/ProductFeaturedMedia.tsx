import React, { FC, useRef } from "react";
import NcImage from "components/NcImage/NcImage";
import { ProductDataType } from "data/types";
import useIntersectionObserver from "hooks/useIntersectionObserver";

const base_url = "http://localhost:5050/";
export interface ProductFeaturedMediaProps {
  className?: string;
  isHover?: boolean;
  product;
}

// CHECK FOR VIDEO CARD ON VIEW
let PREV_RATIO = 0.0;

const ProductFeaturedMedia: FC<ProductFeaturedMediaProps> = ({
  className = " w-full h-full ",
  product,
  isHover = false,
}) => {
  const { productImage } = product;

  const videoRef = useRef(null);

  let IS_MOBILE = false;
  if (
    /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
      navigator.userAgent
    )
  ) {
    IS_MOBILE = true;
  }
  const cardIntersectionObserver = useIntersectionObserver(videoRef, {
    freezeOnceVisible: false,
    threshold: 0.999,
    rootMargin: "20px",
  });
  const IN_VIEW =
    (cardIntersectionObserver?.intersectionRatio || -1) > PREV_RATIO;
  PREV_RATIO = cardIntersectionObserver?.intersectionRatio || 0;

  return (
    <div
      className={`nc-PostFeaturedMedia relative ${className}`}
      data-nc-id="PostFeaturedMedia"
      ref={videoRef}
    >
      <NcImage
        containerClassName="absolute inset-0"
        src={base_url + productImage[0]}
        alt="image"
      />

      {/* {renderContent()} */}
    </div>
  );
};

export default ProductFeaturedMedia;
