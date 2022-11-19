import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import { TaxonomyType, TwMainColor } from "data/types";
import { Link } from "react-router-dom";
import Badge from "components/Badge/Badge";
import axios from "axiosInstance";
import { useEffect, useState } from "react";

const CardCategory = ({ category, products }) => {
  const [nbr, setNbrParCategory] = useState(0);
  const [name, setName] = useState("Article");
  const [image, setImage] = useState();
  const base_url = "http://localhost:5050/";
  useEffect(() => {
    axios
      .get(`products/fiter?category=${category}`)
      .then((res) => {
        if (res.data.length !== 0) {
          setImage(base_url + res.data[0].productImage[0]);
        }
        setName(category);
        setNbrParCategory(res.data.length);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div className="text-center">
      <NcImage
        containerClassName={`flex-shrink-0 w-20 h-20 rounded-full overflow-hidden`}
        src={image}
      />
      <div className="my-3 ">
        <span>{name}</span>
        <span
          className={`block mt-[2px] text-sm text-neutral-500 dark:text-neutral-400`}
        >
          {nbr} Articles
        </span>
      </div>
    </div>
  );
};
export default CardCategory;
