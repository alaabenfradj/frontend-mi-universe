import React, { FC, Suspense, useEffect, useState } from "react";
import { DEMO_POSTS } from "data/posts";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { DEMO_AUTHORS } from "data/authors";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import Avatar from "components/Avatar/Avatar";
import SocialsList from "components/SocialsList/SocialsList";
import ArchiveFilterListBox from "components/ArchiveFilterListBox/ArchiveFilterListBox";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import { DEMO_CATEGORIES } from "data/taxonomies";
import ButtonSecondary from "components/Button/ButtonSecondary";
import NcImage from "components/NcImage/NcImage";
import axios from "../../../src/axiosInstance";
import { useSelector } from "react-redux";
import { isAuthenticated, logoutUser, userRoles } from "app/slices/userSlice";
//import Card11Product from "components/Card11/Card11Product";
const Card11Product = React.lazy(() =>
  import("components/Card11/Card11Product")
);

const posts = DEMO_POSTS.filter((_, i) => i < 12);
const AUTHOR = DEMO_AUTHORS[0];
const FILTERS = [
  { name: "Most Recent" },
  { name: "Curated by Admin" },
  { name: "Most Appreciated" },
  { name: "Most Discussed" },
  { name: "Most Viewed" },
];
const TABS = ["Articles", "Favorites", "Saved"];

const ProfileSeller = ({ className = "" }) => {
  const params = new Proxy(new URLSearchParams(window.location.search), {
    get: (searchParams, prop) => searchParams.get(prop),
  });
  const [iscurrentseller, cuurrentseller] = useState(false);

  const seller1 = useSelector((state) => state.user.currentSeller);

  const base_url = "http://localhost:5050/";

  const [tabActive, setTabActive] = useState(TABS[0]);

  const handleClickTab = (item) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  const [seller, setSeller] = useState({});
  const [products, setProducts] = useState([]);

  const verifyseller = (sellerid, currentsellerid) => {

    if (sellerid === currentsellerid)

      return true;
    else
      return false;

  }

  const getProducts = () => {
    axios
      .get(`/products/filter`)
      .then((res) => {
        setProducts(
          res.data.products.filter(
            (product) => product.seller === params.seller
          )
        );
      })
      .catch((err) => console.log(err.message));
  };

  const getSeller = () => {
    axios
      .get(`/products/seller/${params.seller}`)
      .then((seller) => {
        setSeller(seller.data);

      })
      .catch((err) => console.error(err.message));
  };

  useEffect(() => {
    getSeller();
    getProducts();

  }, []);
  //verifyseller(seller._id,seller1.user._id);

  return (
    <div className={`nc-PageAuthor  ${className}`} data-nc-id="PageAuthor">
      <Helmet>
        <title>Author || Blog Magazine React Template</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            src="https://images.pexels.com/photos/459225/pexels-photo-459225.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            className="object-cover w-full h-full"
          />
        </div>
        <div className="relative container -mt-20 lg:-mt-48">
          <div className=" bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex flex-col sm:flex-row sm:items-center">
            <Avatar
              containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
              imgUrl={base_url + seller.profilePicture}
              sizeClass="w-20 h-20 text-xl lg:text-2xl lg:w-36 lg:h-36"
              radius="rounded-full"
            />
            <div className="mt-5 sm:mt-0 sm:ml-8 space-y-4 max-w-lg">
              <h2 className="inline-block text-2xl sm:text-3xl md:text-4xl font-semibold">
                {seller.userName}
              </h2>
              <span className="block text-sm text-neutral-6000 dark:text-neutral-300 md:text-base">
                {AUTHOR.desc}
              </span>
              <SocialsList />
            </div>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <main>
          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <Nav className="sm:space-x-2">
              {TABS.map((item, index) => (
                <NavItem
                  key={index}
                  isActive={tabActive === item}
                  onClick={() => handleClickTab(item)}
                >
                  {item}
                </NavItem>
              ))}
            </Nav>
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            {seller1 !== null && (<div className="flex justify-end">
              {verifyseller(seller._id, seller1.user._id) && (<ButtonSecondary href="/Mi/manageproduct">ManageProduct</ButtonSecondary>)}

            </div>)}
          </div>

          <Suspense fallback={<div>Loading..</div>}>
            {/* LOOP ITEMS */}
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
              {products.map((product) => (
                <Card11Product key={product._id} product={product} />
              ))}
            </div>
          </Suspense>

          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </main>

        {/* === SECTION 5 === */}
        <div className="relative py-16">
          <BackgroundSection />
          <SectionGridCategoryBox
            categories={DEMO_CATEGORIES.filter((_, i) => i < 10)}
          />
          <div className="text-center mx-auto mt-10 md:mt-16">
            <ButtonSecondary>Show me more</ButtonSecondary>
          </div>
        </div>

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default ProfileSeller;
