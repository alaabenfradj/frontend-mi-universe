import { removeLike, addNewLike } from "app/productLikes/productLikes";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLikeAction from "components/PostCardLikeAction/ProductCardLikeAction";
import axios from "../../axiosInstance";
import { useState } from "react";
// import { isAuthenticated } from "app/slices/userSlice";
// const isAuth = useSelector(isAuthenticated);
const ProductCardLikeContainer = (props) => {
  const { productId, onClickLike, ...args } = props;
  const [product, setProduct] = useState(props.product);
  const dispatch = useDispatch();
  const likedProducts = useSelector(
    (state) => state.productLikes.likedProducts
  );

  const addLikeDB = async () => {
    setProduct({
      ...product,
      likesCount: product.likesCount + 1,
      isLiked: true,
    });
    console.log(product);
    dispatch(addNewLike(product));
    await axios
      .put(`/products/add-like/${productId}`)
      .then((response) => {
        console.log(response.data);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
  };
  const removeLikeDB = async () => {
    dispatch(removeLike(product._id));
    setProduct({
      ...product,
      likesCount: product.likesCount - 1,
      isLiked: false,
    });
    await axios
      .put(`/products/remove-like/${productId}`)
      .then((response) => {
        console.log(response.data.success);
      })
      .catch((err) => {
        console.log(err.response.data.success);
      });
  };

  const handleCLickLike = () => {
    if (!isLiked(productId)) {
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
    return productsIds.includes(productId);
  };

  return (
    <ProductCardLikeAction
      {...args}
      //isLiked={isLiked()}
      likeCount={product.likesCount}
      postId={productId}
      onClickLike={handleCLickLike}
    />
  );
};
export default ProductCardLikeContainer;
