import { PostDataType } from "data/types";
import React, { FC } from "react";
import Badge from "components/Badge/Badge";


const CategoryBadgeListProduct = ({
  className = "flex flex-wrap space-x-2",
  itemClass,
  categories,
}) => {
  return (
    <div
      className={`nc-CategoryBadgeList ${className}`}
      data-nc-id="CategoryBadgeList"
    >
      
        <Badge
          
          
          name={categories}
          color="blue"
        />
     
    </div>
  );
};

export default CategoryBadgeListProduct;
