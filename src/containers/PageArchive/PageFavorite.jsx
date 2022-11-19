import React, { FC, useEffect, useState, Fragment, useRef } from "react";
import { Helmet } from "react-helmet";
import { Link } from "react-router-dom";
import NcImage from "components/NcImage/NcImage";
import { addBookmark, removeBookmark } from "app/productLikes/productLikes";
import { useDispatch, useSelector } from "react-redux";

import {
  getLikedProducts,
  getBookmarkedProducts,
} from "app/productLikes/productLikes";
import ButtonPrimary from "components/Button/ButtonPrimary";
import axios from "axiosInstance";
function PageFavorite() {
  const bookmarkedProducts = useSelector(
    (state) => state.productLikes.bookmarkedProducts
  );
  const [savedProds, setSavedProds] = useState([]);
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();
  const removeBookMarkDB = async (product) => {
    await axios
      .put(`/products/remove-bookmark/${product._id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(removeBookmark(product._id));
    // setProduct({
    //   ...product,
    //   likesCount: product.likesCount - 1,
    //   isLiked: false,
    // });
  };
  useEffect(() => {
    axios
      .get("products/bookmarked-products")
      .then((response) => {
        console.log(response);
        setSavedProds(response.data);
        setLoading(false);
        dispatch(getBookmarkedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
  }, [dispatch]);
  return (
    <div
      className={`nc-PageArchiveAudio overflow-hidden`}
      data-nc-id="PageArchiveAudio"
    >
      <Helmet>
        <title>Saved Products || MI Universe</title>
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
              Saved Products
            </h2>
            <span className="block mt-4 text-neutral-300">
              {savedProds.length} Articles
            </span>
            <ButtonPrimary href="/mi/archive/the-demo-archive-slug">
              home
            </ButtonPrimary>
          </div>
        </div>
      </div>
      {loading ? (
        <div className="relative container ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            loading ...
          </div>
        </div>
      ) : (
        <div className="relative container ">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <table className="w-full text-sm text-left text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Product name
                  </th>
                  <th scope="col" className="px-6 py-3">
                    state
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    description
                  </th>
                  <th scope="col" className="px-6 py-3">
                    <span className="sr-only">Edit</span>
                  </th>
                </tr>
              </thead>
              <tbody>
                {bookmarkedProducts.map((prod) => (
                  <tr
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700"
                    key={prod._id}
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 dark:text-white whitespace-nowrap"
                    >
                      <Link to={`/mi/single-gallery/${prod._id}`}>
                        {prod.label}
                      </Link>
                    </th>
                    <td className="px-6 py-4">{prod.state}</td>
                    <td className="px-6 py-4">{prod.category}</td>
                    <td className="px-6 py-4">{prod.price}</td>
                    <td className="px-6 py-4">{prod.reference}</td>
                    <td className="px-6 py-4 text-right">
                      <button
                        onClick={() => removeBookMarkDB(prod)}
                        className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        <svg
                          width="24"
                          height="24"
                          fill="none"
                          viewBox="0 0 24 24"
                        >
                          <path
                            stroke="currentColor"
                            aria-hidden="true"
                            fill={true ? "currentColor" : "none"}
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="1"
                            d="M6.75 6.75C6.75 5.64543 7.64543 4.75 8.75 4.75H15.25C16.3546 4.75 17.25 5.64543 17.25 6.75V19.25L12 14.75L6.75 19.25V6.75Z"
                          ></path>
                        </svg>
                        🗑️
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default PageFavorite;
