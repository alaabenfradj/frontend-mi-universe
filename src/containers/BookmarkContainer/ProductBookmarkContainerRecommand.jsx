import BookmarkProduct from "components/NcBookmark/BookmarkProduct";
import { addBookmark, removeBookmark } from "app/productLikes/productLikes";
import { useDispatch, useSelector } from "react-redux";
import axios from "../../axiosInstance";
import { useState } from "react";
import { isAuthenticated } from "app/slices/userSlice";

const ProductBookmarkContainerRecommand = (props) => {
  const [product, setProduct] = useState(props.product);
  const dispatch = useDispatch();
  const bookmarkedProducts = useSelector(
    (state) => state.productLikes.bookmarkedProducts
  );
  const isAuth = useSelector(isAuthenticated);

  const addBookMarkDB = async () => {
    await axios
      .put(`/products/add-bookmark/${product.id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(addBookmark(product));
  };
  const removeBookMarkDB = async () => {
    await axios
      .put(`/products/remove-bookmark/${product.id}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
    dispatch(removeBookmark(product.id));
    // setProduct({
    //   ...product,
    //   likesCount: product.likesCount - 1,
    //   isLiked: false,
    // });
  };

  const isBookmarked = () => {
    var productsIds = [];
    if (!bookmarkedProducts) return false;
    else {
      bookmarkedProducts.forEach((product) => {
        productsIds.push(product.id);
      });
      return productsIds.includes(product.id);
    }
  };

  const handleClickBookmark = () => {
    if (!isBookmarked()) {
      addBookMarkDB();
    } else {
      removeBookMarkDB();
    }
  };

  return (
    <BookmarkProduct
      onClick={handleClickBookmark}
      isBookmarked={isBookmarked()}
      {...props}
    />
  );
};

export default ProductBookmarkContainerRecommand;
