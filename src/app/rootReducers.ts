import bookmarkReducer from "./bookmarks/bookmarksSlice";
import postLikesReducer from "./postLikes/postLikes";
import commentLikesReducer from "./commentLikes/commentLikes";
import darkmodeReducer from "./darkmode/darkmode";
import pagesReducer from "./pages/pages";
import mediaRunningReducer from "./mediaRunning/mediaRunning";
import userSlice from "./slices/userSlice";
import Productslice from "./productslice/Productslice";

import carteslics from "../app/cartslice/carteslics";
import productLikeSlice from "../app/productLikes/productLikes";
import productReviewsSlice from "./productReviews/productReviews";
import UsersSlice from "./usersSlice/adminSlice";
import filterSlice from "./filterSlice/filterSlice";
import Productsliceseller from "./productslice/Productsliceseller";
import RecSlice from "./reclamations/recSlice";
import KaraokeSlice from "./karaoke/karaoke";
import filterCourseSlice from "./slices/courseFilter";
import CoursemodalSlice from "./slices/modalSlice";
import courseSlice from "./slices/courseSlice";
import StreamSlice from "./streamSlice/liveRooms";
import InvoiceSlice from "./invoices/InvoiceSlice";

const rootReducers = {
  bookmark: bookmarkReducer,
  postLike: postLikesReducer,
  darkmode: darkmodeReducer,
  commentLikes: commentLikesReducer,
  pages: pagesReducer,
  mediaRunning: mediaRunningReducer,
  product: Productslice,
  productseller: Productsliceseller,
  user: userSlice,
  productLikes: productLikeSlice,
  productReviews: productReviewsSlice,
  usersManagement: UsersSlice,
  reclamationsManagement: RecSlice,
  invoices: InvoiceSlice,
  carteslics: carteslics,
  filterSlice: filterSlice,
  karaoke: KaraokeSlice,
  filterCourseSlice: filterCourseSlice,
  CoursemodalSlice: CoursemodalSlice,
  courseSlice: courseSlice,
  stream: StreamSlice,
};

export default rootReducers;
