import CardCategory from "components/CardCategory2/CardCategory";
import Heading from "components/Heading/Heading";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import {
  filterByCategory,
  changeValid,
} from "../../app/filterSlice/filterSlice";
import { populateProducts } from "../../app/productslice/Productslice";
import axios from "axiosInstance";

const SectionGridCategory = ({ products }) => {
  let categories = [
    "guitars",
    "keyboards",
    "strings",
    "brass",
    "percussions",
    "woodwind",
    "others",
  ];
  const dispatch = useDispatch();
  const filter = useSelector((state) => state.filterSlice);
  const [prod, setProducts] = useState(products);
  console.log(prod);
  let p = [];
  const filterCategory = (category) => {
    axios
      .get("products/filter")
      .then((res) => {
        p = res.data.products.filter((product) => {
          return product.category === category;
        });
        setProducts(p);
        dispatch(populateProducts(p));
        dispatch(changeValid(false));
        console.log(filter.valid);
        console.log(p);
      })
      .catch((err) => console.log(err.message));
  };

  return (
    <div className={`nc-SectionGridCategoryBox relative`}>
      <Heading
        desc="Discover over 100 Articles"
        className="inline-flex items-center mb-10"
      >
        Instruments
      </Heading>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
        {categories.map((item, index) => (
          <button
            //to ={`/mi/archive/the-demo-archive-slug?category=${item}`}
            className="inline-flex items-center"
            onClick={() => {
              //dispatch(filterByCategory(item));
              filterCategory(item);
            }}
          >
            <CardCategory key={index} category={item} products={products} />
          </button>
        ))}
      </div>
    </div>
  );
};

export default SectionGridCategory;
