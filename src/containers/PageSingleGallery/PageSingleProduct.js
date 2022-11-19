import { useEffect, useState, useRef } from "react";
import axios from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";
import { Helmet } from "react-helmet";
import Badge from "components/Badge/Badge";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";
import { removeLike, addNewLike } from "app/productLikes/productLikes";
import ProductComment from "components/CommentCard/ProductComment";
import ButtonPrimary from "components/Button/ButtonPrimary";
import ButtonSecondary from "components/Button/ButtonSecondary";
import NcImage from "components/NcImage/NcImage";
import ModalPhotos from "./ModalPhotos";
import Productrecommand from "containers/PageDashboard/Productrecommand";

import {
  addReview,
  getProductReviews,
} from "../../app/productReviews/productReviews";
import ModalPhotosProd from "./ModalPhotosProd";
import { StarIcon } from "@heroicons/react/solid";
import FrequentlyBought from "containers/PageDashboard/FrequentlyBought";
/**
 *
 *
 */
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}
function PageSingleProduct() {
  const myRef = useRef(null);
  const executeScroll = () => myRef.current.scrollIntoView();
  /**
   *
   */
  const base_url = "http://localhost:5050/";
  const dispatch = useDispatch();
  /**
   *
   */
  const [comment, setComment] = useState("");
  const [reviews, setReviews] = useState([]);

  /***
   *
   */
  const userToComment = useSelector((state) => state.user.currentUser);
  const [seller, setUser] = useState({});
  // const seller = useSelector((state) => state.productReviews.user);
  /**
   *
   */
  const [product, setProduct] = useState({});
  const prod = useSelector((state) => state.product.selectedProduct);
  const produ = useSelector((state) => state.product.selectedProduct);
  const likedProd = useSelector(
    (state) => state.productLikes.likedProducts
  ).find((prod) => prod._id === produ._id);
  /**
   *
   */

  const [isOpen, setIsOpen] = useState(false);
  const [rate, setrating] = useState(0);
  const [hover, sethoverrating] = useState(null);
  const [openFocusIndex, setOpenFocusIndex] = useState(0);

  const { category, reference, label, marque } = product;
  const { userName, phoneNumber, profilePicture } = seller;
  const likedProducts = useSelector(
    (state) => state.productLikes.likedProducts
  );
  const className = "";
  const size = "large";
  const hiddenAvatar = false;
  const textArea = document.querySelector("#comment_content");

  useEffect(() => {
    axios.get(`/products/getratingbyuser/${prod._id}`).then((response) => {
      console.log(response.data.rate);
      setrating(response.data.rate - 1);
    });
  }, [rate]);

  const Onmouseenter = (index) => {
    sethoverrating(index);
  };
  const onMouseLeave = () => {
    sethoverrating(0);
  };
  const onsaverating = (index) => {
    setrating(index);
  };
  const addrate = (rate) => {
    var FormData = {
      rate: rate + 1,
    };

    axios.put(`/products/rating/${prod._id}`, FormData).then((response) => {
      console.log(response.data);
    });
  };
  const addLikeDB = async () => {
    await axios
      .put(`/products/add-like/${product._id}`)
      .then((response) => {
        // console.log(response.data.success);
      })
      .catch((err) => {
        // console.log(err.response.data.success);
      });
    dispatch(addNewLike(product));
    setProduct({
      ...product,
      likesCount: product.likesCount + 1,
      isLiked: true,
    });
  };
  const removeLikeDB = async () => {
    await axios
      .put(`/products/remove-like/${product._id}`)
      .then((response) => {
        // console.log(response.data.success);
      })
      .catch((err) => {
        //console.log(err.response.data.success);
      });
    dispatch(removeLike(product._id));
    setProduct({
      ...product,
      likesCount: product.likesCount - 1,
      isLiked: false,
    });
  };
  const getSellerOfTheProduct = () => {
    axios
      .get(`/products/seller/${prod.seller}`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => {
        //  console.log(err.response.data);
      });
  };
  const handleCLickLike = () => {
    if (!isLiked(product._id)) {
      addLikeDB();
    } else {
      removeLikeDB();
    }
  };

  const isLiked = () => {
    var productsIds = [];
    likedProducts.forEach((product) => {
      productsIds.push(product._id);
    });
    return productsIds.includes(product._id);
  };
  const getProductReviewsFun = (prod) => {
    axios
      .get("/product_reviews/get-prod-reviews/" + prod._id)
      .then((response) => {
        dispatch(getProductReviews(response.data.reviews));
        setReviews(response.data.reviews);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    setProduct(prod);
    getProductReviewsFun(prod);
    getSellerOfTheProduct();
    console.log(product);
  }, [dispatch]);
  const handleOpenModal = (index) => {
    setIsOpen(true);
    setOpenFocusIndex(index);
  };

  const handleCloseModal = () => setIsOpen(false);
  const [disabled, setDisabled] = useState(false);
  const onClickSubmit = async (e) => {
    e.preventDefault();
    if (textArea.value === "") {
      setDisabled(true);
      textArea.placeholder = "provide us with a valid comment first ";
      setDisabled(false);
    } else {
      await axios
        .put(`/product_reviews/add-review/${product._id}`, {
          content: comment,
        })
        .then((response) => {
          setReviews([...reviews, response.data.review]);
          dispatch(addReview(response.data.review));
          textArea.value = "";
          setDisabled(false);
        })
        .catch((error) => {
          //console.log(error.response);
        });
    }
  };
  const onClickCancel = (e) => {
    textArea.value = "";
  };
  return (
    <>
      <div
        className={`nc-PageSingleGallery pt-8 lg:pt-16 `}
        data-nc-id="PageSingleGallery"
      >
        <Helmet>
          <title>product || MI Universe</title>
        </Helmet>
        <header className="container rounded-xl">
          <div className={`nc-SingleHeader`}>
            {/* HEADER */}
            <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
              <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
                <NcImage
                  containerClassName="absolute inset-0"
                  src="https://images.pexels.com/photos/144429/pexels-photo-144429.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
                  className="object-cover w-full h-full"
                />
                <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                  <div className="flex justify-between">
                    <Badge className="" name={category} />
                  </div>

                  <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                    {product.label}
                  </h2>

                  {!!reference && !false && (
                    <h4 className="inline-block align-middle ml-5 text-3xl md:text-2xl px-8 py- text-center">
                      {reference}
                    </h4>
                  )}
                </div>
                <ButtonPrimary href="/mi/archive/the-demo-archive-slug">
                  return
                </ButtonPrimary>
              </div>
            </div>

            {/* ====================== END HEADER ====================== */}

            <div className="gap-2 my-10"></div>
            <div className="flex flex-col sm:flex-row justify-between sm:items-end space-y-5 sm:space-y-0 sm:space-x-5">
              <div
                className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
                  size === "normal" ? "text-xs" : "text-base"
                } ${className}`}
                data-nc-id="PostCardMeta"
              >
                <Link to="#" className="relative flex items-center space-x-2">
                  {!hiddenAvatar && (
                    <Avatar
                      radius="rounded-full"
                      sizeClass="h-10 w-10 text-xl"
                      imgUrl={base_url + profilePicture}
                      userName={userName}
                    />
                  )}
                  <span className="block text-neutral-900 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
                    {userName}
                  </span>
                  <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium"></span>
                </Link>

                <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
                  {phoneNumber}
                </span>
              </div>
              <div className="flex items-center">
                {[0, 1, 2, 3, 4].map((rating, index) => (
                  <div
                    key={index}
                    onMouseEnter={() => {
                      Onmouseenter(rating);
                    }}
                    onMouseLeave={() => {
                      onMouseLeave();
                    }}
                    onClick={() => {
                      onsaverating(rating);
                    }}
                  >
                    {rate >= rating ? (
                      <StarIcon
                        color="yellow"
                        key={rating}
                        className={classNames(
                          rate >= rating
                            ? "text-gray-900 star"
                            : "text-gray-200 emptyStar",
                          "h-7 w-7 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    ) : (
                      <StarIcon
                        key={rating}
                        className={classNames(
                          hover >= rating
                            ? "text-gray-900 star"
                            : "text-gray-200 emptyStar",
                          "h-7 w-7 flex-shrink-0"
                        )}
                        aria-hidden="true"
                      />
                    )}
                  </div>
                ))}
              </div>
              {/* <ProductCardLikeAndComment className="relative" postData={prod} /> */}

              {/* <div
                className={`nc-PostCardLikeAndComment flex items-center space-x-2 ${className}`}
                data-nc-id="PostCardLikeAndComment"
              >
                <button
                  className={`nc-PostCardLikeAction relative min-w-[68px] flex items-center rounded-full leading-none group transition-colors ${className} ${twFocusClass()} ${
                    isLiked()
                      ? "text-rose-600 bg-rose-50 dark:bg-rose-100"
                      : "text-neutral-700 bg-neutral-50 dark:text-neutral-200 dark:bg-neutral-800 hover:bg-rose-50 dark:hover:bg-rose-100 hover:text-rose-600 dark:hover:text-rose-500"
                  }`}
                  onClick={() => handleCLickLike()}
                  title="Liked"
                  data-nc-id="PostCardLikeAction"
                >
                  <svg
                    width="24"
                    height="24"
                    fill={isLiked ? "currentColor" : "none"}
                    viewBox="0 0 24 24"
                  >
                    <path
                      fillRule="evenodd"
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="1"
                      d="M11.995 7.23319C10.5455 5.60999 8.12832 5.17335 6.31215 6.65972C4.49599 8.14609 4.2403 10.6312 5.66654 12.3892L11.995 18.25L18.3235 12.3892C19.7498 10.6312 19.5253 8.13046 17.6779 6.65972C15.8305 5.18899 13.4446 5.60999 11.995 7.23319Z"
                      clipRule="evenodd"
                    ></path>
                  </svg>

                  <span
                    className={`ml-1 ${
                      isLiked()
                        ? "text-rose-600"
                        : "text-neutral-900 dark:text-neutral-200"
                    }`}
                  >
                    {product.likesCount}
                  </span>
                </button>
              </div> */}
              <ButtonPrimary
                onClick={() => addrate(rate)}
                href="/mi/archive/the-demo-archive-slug"
              >
                Shop More
              </ButtonPrimary>
            </div>

            <div className="relative grid grid-cols-3 sm:grid-cols-4 gap-2 my-10">
              <div
                className="col-span-2 row-span-2 relative rounded-xl overflow-hidden cursor-pointer"
                onClick={() => handleOpenModal(0)}
              >
                <NcImage
                  containerClassName="aspect-w-2 aspect-h-1"
                  className="object-cover w-full h-full rounded-xl"
                  src={base_url + prod.productImage[0]}
                />
                <div className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity"></div>
              </div>
              {prod.productImage
                .filter((_, i) => i >= 1 && i < 5)
                .map((item, index) => (
                  <div
                    key={index}
                    className={`relative rounded-xl overflow-hidden ${
                      index >= 2 ? "hidden sm:block" : ""
                    }`}
                  >
                    <NcImage
                      containerClassName="aspect-w-6 aspect-h-5"
                      className="object-cover w-full h-full rounded-xl "
                      src={base_url + item || ""}
                    />

                    {/* OVERLAY */}
                    <div
                      className="absolute inset-0 bg-neutral-900 bg-opacity-20 opacity-0 hover:opacity-100 transition-opacity cursor-pointer"
                      onClick={() => handleOpenModal(index + 1)}
                    />
                  </div>
                ))}
              <div
                className="absolute hidden md:flex md:items-center md:justify-center right-3 bottom-3 px-4 py-2 rounded-full bg-neutral-100 text-neutral-500 cursor-pointer hover:bg-neutral-200 z-10"
                onClick={() => handleOpenModal(0)}
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  className="h-5 w-5"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={1.5}
                    d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z"
                  />
                </svg>
                <button onClick={() => setIsOpen(true)}>
                  <span className="ml-2 text-neutral-800 text-sm font-medium">
                    Show all photos
                  </span>
                </button>
              </div>
            </div>
          </div>
        </header>
        {/* MODAL PHOTOS */}
        <ModalPhotosProd
          imgs={prod.productImage}
          isOpen={isOpen}
          onClose={handleCloseModal}
          initFocus={openFocusIndex}
        />

        <div className={"container"}>
          {reviews.map((review) => (
            <div className="gap-2 my-10" key={review._id} ref={myRef}>
              <ProductComment key={review._id} review={review} />
            </div>
          ))}

          <form className={`nc-SingleCommentForm mt-5`}>
            <textarea
              placeholder="Add to review or give us a feedBack ..."
              id="comment_content"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              className={`block w-full text-md rounded-xl border-neutral-200 focus:border-primary-300 focus:ring focus:ring-primary-200 focus:ring-opacity-50 bg-white dark:border-neutral-700 dark:focus:ring-primary-6000 dark:focus:ring-opacity-25 dark:bg-neutral-900 ${className}`}
              rows={4}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  onClickSubmit(e);
                }
              }}
            ></textarea>
            <div className="mt-2 space-x-3">
              <ButtonPrimary
                onClick={(e) => onClickSubmit(e)}
                disabled={disabled}
                type="submit"
              >
                Submit
              </ButtonPrimary>
              <ButtonSecondary type="button" onClick={(e) => onClickCancel(e)}>
                Cancel
              </ButtonSecondary>
            </div>
          </form>

          <Productrecommand />

          <FrequentlyBought />
        </div>
      </div>
    </>
  );
}

export default PageSingleProduct;
