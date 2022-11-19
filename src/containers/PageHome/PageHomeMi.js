import React, { useEffect, useState } from "react";
import SectionLatestPosts from "./SectionLatestPosts";
import SectionSliderPosts from "./SectionSliderPosts";
import SectionMagazine1 from "./SectionMagazine1";
import SectionVideos from "./SectionVideos";
import SectionLargeSlider from "./SectionLargeSlider";
import { Helmet } from "react-helmet";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridAuthorBox from "components/SectionGridAuthorBox/SectionGridAuthorBox";
import { PostDataType } from "data/types";
import jwt_decode from "jwt-decode";
import {
  DEMO_POSTS,
  DEMO_POSTS_AUDIO,
  DEMO_POSTS_GALLERY,
  DEMO_POSTS_VIDEO,
} from "data/posts";
import { DEMO_CATEGORIES } from "data/taxonomies";
import { DEMO_AUTHORS } from "data/authors";
import SectionSliderNewCategories from "components/SectionSliderNewCategories/SectionSliderNewCategories";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import SectionMagazine4 from "./SectionMagazine4";
import SectionAds from "./SectionAds";
import SectionGridPosts from "./SectionGridPosts";
import SectionMagazine7 from "./SectionMagazine7";
import SectionMagazine8 from "./SectionMagazine8";
import SectionMagazine9 from "./SectionMagazine9";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useLocation } from "react-router-dom";
import {
  getCurrentSeller,
  getCurrentStudent,
  getCurrentTeacher,
  isAuthenticated,
  login,
  setUserLogedIn,
  userRoles,
} from "app/slices/userSlice";
import {
  getLikedProducts,
  getBookmarkedProducts,
} from "app/productLikes/productLikes";
import { resetStateLikes } from "app/productLikes/productLikes";
import { resetStateReviews } from "app/productReviews/productReviews";
import { getAllUsers } from "app/usersSlice/adminSlice";
import SectionBecomeAnTeacher from "components/SectionBecomeAnTeacher/SectionBecomeAnTeacher";
import SectionBecomeAnStudent from "components/SectionBecomeAnStudent/SectionBecomeAnStudent";
import SectionBecomeAnSeller from "components/SectionBecomeAnSeller/SectionBecomeAnSeller";
import axios from "axiosInstance";
import { selectProducts } from "app/productslice/Productslice";
import SectionLargeSliderMi from "./SectionLargeSliderMi";
//
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/hero-right.png";
import SectionSliderproduct from "./SectionSliderproduct";
//
const MAGAZINE1_TABS = ["all", "Garden", "Fitness", "Design"];
const MAGAZINE1_POSTS = DEMO_POSTS.filter((_, i) => i >= 8 && i < 16);
const MAGAZINE2_POSTS = DEMO_POSTS.filter((_, i) => i >= 0 && i < 7);
//

const PageHomeMi = () => {
  const [token, setToken] = useState(null);
  const [products, setProducts] = useState([]);
  const [topproducts, settopProducts] = useState([]);
  const dispatch = useDispatch();
  const search = useLocation().search;
  const isAuth = useSelector(isAuthenticated);
  const roles = useSelector(userRoles);
  const history = useHistory();
  const getProds = async () => {
    await axios
      .get("/products/all-products")
      .then((res) => {
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.data);
      });
  };
  const getTopratedproducts=()=>{
    axios
    .get("products/Topratedproducts")
    .then((res) => {
      //console.log(res.data);
      settopProducts(res.data);
    })
    .catch((err) => {
      console.log(err.data);
    });
  }
  useEffect(() => {
    getProds();
     getTopratedproducts();
    roles.includes("admin") && dispatch(getAllUsers());
    dispatch(resetStateLikes());
    dispatch(resetStateReviews());
    axios
      .get("/products/liked-products")
      .then((response) => {
        console.log(response);
        dispatch(getLikedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    axios
      .get("/products/bookmarked-products")
      .then((response) => {
        console.log(response);
        dispatch(getBookmarkedProducts(response.data));
      })
      .catch((error) => {
        console.error(error);
      });
    setToken(new URLSearchParams(search).get("token"));
    if (token !== null) {
      dispatch(login(token));

      const decoded = jwt_decode(token);
      if (decoded.user_role.includes("seller")) {
        dispatch(getCurrentSeller());
      }
      if (decoded.user_role.includes("student")) {
        dispatch(getCurrentStudent());
      }
      if (decoded.user_role.includes("teacher")) {
        dispatch(getCurrentTeacher());
      }
    }
    dispatch(setUserLogedIn());
    const timer = setTimeout(() => {
      history.push("/mi");
    }, 1000);
    dispatch(setUserLogedIn());
    return () => clearTimeout(timer);
  }, [token]);

  return (
    <div className="nc-PageHome relative">
      <Helmet>
        <title>Home || MI Universe</title>
      </Helmet>

      {/* ======== ALL SECTIONS ======== */}
      <div className="relative overflow-hidden">
        {/* ======== BG GLASS ======== */}
        <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
          <SectionHero
            rightImg={rightImg}
            heading="💃 Welcome To MI"
            btnText=""
            subHeading="Take a look you may find what you're looking for !"
          />
        </div>
        <BgGlassmorphism />
        {/* ======= START CONTAINER ============= */}

        <div className="container relative">
          {/* === SECTION  === */}
          <SectionLargeSliderMi
            className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 "
            products={products && products.filter((_, i) => i < 5)}
          />

          {/* === SECTION  === */}
          {/* <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderNewAuthors
              heading="Newest authors"
              subHeading="Say hello to future creator potentials"
              authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
            />
          </div> */}

          {isAuth && !roles.includes("teacher") && (
            <div className="relative py-16">
              <BackgroundSection />
              <SectionBecomeAnTeacher />
            </div>
          )}
          {isAuth && !roles.includes("seller") && <SectionBecomeAnSeller />}

          {isAuth && !roles.includes("student") && (
            <div className="relative py-16">
              <BackgroundSection />
              <SectionBecomeAnStudent className="pt-16 lg:pt-28" />
            </div>
          )}

          {/* === SECTION 5 === */}
          <SectionSliderNewCategories
            className="py-16 lg:py-28"
            heading="Top trending topics"
            subHeading="Discover 233 topics"
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
            categoryCardType="card4"
          />

          {/* === SECTION 6 === */}
          <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderproduct
              postCardName="card9"
              heading="Explore our top rated products"
             // subHeading="Click on the icon to enjoy the music or podcast 🎧"
              sliderStype="style2"
            />
          </div>

          {/* === SECTION 4 === */}
          <SectionMagazine1
            className="py-16 lg:py-28"
            posts={MAGAZINE1_POSTS}
            tabs={MAGAZINE1_TABS}
          />

          {/* === SECTION 3 === */}
          {/* <SectionAds /> */}

          {/* === SECTION 7 === */}
          {/* <SectionMagazine7
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_GALLERY.filter((_, i) => i < 6)}
          /> */}
        </div>

        {/* === SECTION 11 === */}
        {/* <div className="dark bg-neutral-900 dark:bg-black dark:bg-opacity-20 text-neutral-100">
          <div className="relative container">
            <SectionGridPosts
              className="py-16 lg:py-28"
              headingIsCenter
              postCardName="card10V2"
              heading="Explore latest video articles"
              subHeading="Hover on the post card and preview video 🥡"
              posts={DEMO_POSTS_VIDEO.filter((_, i) => i > 5 && i < 12)}
              gridClass="md:grid-cols-2 lg:grid-cols-3"
            />
          </div>
        </div> */}

        <div className="container ">
          {/* === SECTION 9 === */}
          {/* <SectionMagazine8
            className="py-16 lg:py-28"
            posts={DEMO_POSTS_AUDIO.filter((_, i) => i < 6)}
          /> */}

          {/* === SECTION 9 === */}
          {/* <div className="relative py-16">
            <BackgroundSection />
            <SectionMagazine9
              posts={DEMO_POSTS_AUDIO.filter((_, i) => i >= 6 && i < 16)}
            />
          </div> */}

          {/* === SECTION 5 === */}
          {/* <SectionGridAuthorBox
            className="py-16 lg:py-28"
            authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          /> */}

          {/* === SECTION 8 === */}

          {/* === SECTION 11 === */}
          {/* <SectionMagazine4
            className="py-16 lg:py-28"
            heading="Life styles 🎨 "
            posts={MAGAZINE2_POSTS}
            tabs={MAGAZINE1_TABS}
          /> */}

          {/* === SECTION 12 === */}
          {/* <div className="relative py-16">
            <BackgroundSection />
            <SectionSliderPosts
              postCardName="card11"
              heading=" More design articles"
              subHeading="Over 1118 articles "
              posts={DEMO_POSTS.filter(
                (p, i) => i > 3 && i < 25 && p.postType === "standard"
              )}
              sliderStype="style2"
            />
          </div> */}

          {/* === SECTION 15 === */}
          {/* <SectionVideos className="py-16 lg:py-28" /> */}

          {/* === SECTION 17 === */}
          {/* <SectionLatestPosts
            className="pb-16 lg:pb-28"
            posts={DEMO_POSTS.filter((_, i) => i > 8 && i < 16)}
            widgetPosts={DEMO_POSTS.filter((_, i) => i > 2 && i < 7)}
            categories={DEMO_CATEGORIES.filter((_, i) => i > 2 && i < 8)}
            tags={DEMO_CATEGORIES}
          /> */}
        </div>
        {/* ======= END CONTAINER ============= */}
      </div>
    </div>
  );
};

export default PageHomeMi;
