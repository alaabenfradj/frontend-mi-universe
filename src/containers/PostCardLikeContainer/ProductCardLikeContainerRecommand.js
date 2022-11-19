import { removeLike, addNewLike } from "app/productLikes/productLikes";
import { useDispatch, useSelector } from "react-redux";
import ProductCardLikeAction from "components/PostCardLikeAction/ProductCardLikeAction";
import axios from "../../axiosInstance";
import { useEffect, useState } from "react";
import {
    getLikedProducts,
    getBookmarkedProducts,
  } from "app/productLikes/productLikes";
// import { isAuthenticated } from "app/slices/userSlice";
// const isAuth = useSelector(isAuthenticated);
const ProductCardLikeContainerRecommand = (props) => {
  const { productId, onClickLike, ...args } = props;
  const [product, setProduct] = useState(props.product);
const[likes,setlikes]=useState(0);
  const dispatch = useDispatch();
  useEffect(() => {
    axios
      .get("products/liked-products")
      .then((response) => {
        console.log(response);
        dispatch(getLikedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("products/bookmarked-products")
      .then((response) => {
        console.log(response);
        dispatch(getBookmarkedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });


  }, [dispatch]);
  useEffect(()=>{
    axios
    .get(`/products/productlikes/${productId}`)
    .then((res) => {
     // console.log(response.data);
setlikes(res.data);
console.log(res.data);
    })
    .catch((err) => {
      console.log(err.response.data.success);
    });
  },[])
     
  const likedProducts = useSelector(
    (state) => state.productLikes.likedProducts
  );

  const addLikeDB = async () => {
    setProduct({
      ...product,
      likesCount: likes + 1,
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
    dispatch(removeLike(product.id));
    setProduct({
      ...product,
      likesCount: likes - 1,
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
      productsIds.push(product.id);
    });
    return productsIds.includes(productId);
  };

  return (
    <ProductCardLikeAction
      {...args}
      isLiked={isLiked()}
      likeCount={likes}
      postId={productId}
      onClickLike={handleCLickLike}
    />
  );
};
export default ProductCardLikeContainerRecommand;
