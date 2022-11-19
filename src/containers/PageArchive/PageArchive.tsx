import React, { FC, useEffect, useState, Fragment, useRef } from "react";
import Pagination from "components/Pagination/Pagination";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import NcImage from "components/NcImage/NcImage";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SellersSlider from "components/SectionSliderNewAthors/SellersSlider";
import { DEMO_AUTHORS } from "data/authors";
import axios from "axiosInstance";
import Card11Product from "components/Card11/Card11Product";
import { useDispatch, useSelector } from "react-redux";
import { populateProducts } from "app/productslice/Productslice";
import background from "../../images/shop5.jpg";
import { isAuthenticated } from "app/slices/userSlice";
import {
  getLikedProducts,
  getBookmarkedProducts,
} from "app/productLikes/productLikes";
import { Popover, Transition } from "@headlessui/react";
import Input from "components/Input/Input";
import Slider from "@material-ui/core/Slider";
import { RootState } from "../../app/store";

import Modalcart from "./Modalcart";
import Marque from "../../components/Tag/Marque";
import NcModal from "../../components/NcModal/NcModal";
import { Link } from "react-router-dom";
import Heading from "../../components/Heading/Heading";
import CardCategory from "../../components/CardCategory2/CardCategory";
import aa from "search-insights";
import {Hits,InstantSearch,Configure} from "react-instantsearch-dom"
import algoliasearch from "algoliasearch/lite";


// import MyRouter from "routers/MyRouter";

export interface PageArchiveProps {
  className?: string;
}

const PageArchive: FC<PageArchiveProps> = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [products, setProducts] = useState([]);
  const filter = useSelector((state: RootState) => state.filterSlice);
  const prod = useSelector((state: RootState) => state.product);
  const myRef = useRef(null);
  const inputRef = React.createRef<HTMLInputElement>();
  const [value, setValue] = React.useState([0, 100]);
  const searchClient = algoliasearch(
    '1RY92FSHMF',
    "2a5deb3323c4edb2ecbcc46687c2c216",
)
  let min = value[0];
  let max = value[1];

  const currentUser = useSelector(
    (state:RootState) => state.user.userLogedIn
  );
  // import Radio from "@material-tailwind/react/Radio";
  //import ModalCategoriesprod from "./Modalcategoriesprod";
  
  const marques = [
    "yamaha",
    "shure",
    "gibson",
    "harman",
    "fender",
    "steinway",
    "roland",
    "others",
  ];

  let categories = [
    "guitars",
    "keyboards",
    "strings",
    "brass",
    "percussions",
    "woodwind",
    "others",
  ];

  const [modalIsOpen, setIsOpen] = React.useState(false);

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const rangeSelector = (event, newValue) => {
    setValue(newValue);
    axios.get(`products/price?min=${min}&max=${max}`).then((res) => {
      setProducts(res.data);
    });
  };

  const executeScroll = () => myRef.current.scrollIntoView();

  const inputHandler = (e) => {
    if (e.target.value) {
      axios
        .get("products/filter")
        .then((res) => {
          setProducts(
            res.data.products.filter((product) =>
              product.label
                .toLowerCase()
                .startsWith(e.target.value.toLowerCase())
            )
          );
        })
        .catch((err) => console.log(err.message));
    } else {
      axios.get("products/filter").then((res) => {
        setProducts(res.data.products);
      });
    }
  };
  const filterMarque = (marque) => {
    axios
      .get(`products/marque?marque=${marque}`)
      .then((res) => {
        executeScroll();
        setProducts(res.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  };
  const filterCatgory = (cat) => {
    axios
      .get("products/filter")
      .then((res) => {
        let p = res.data.products.filter((product) => {
          return product.category === cat;
        });
        setProducts(p);
        dispatch(populateProducts(p));
        // dispatch(changeValid(false));
        executeScroll();
      })
      .catch((err) => console.log(err.message));
  };
  let c,m,s;
  const params = new URLSearchParams(window.location.search)
  c = params.get('category')
  m = params.get('marque');
  s = params.get('state')
  let customCategory = params.get('custom')
  const cat = useSelector((state: RootState) => state.productseller.category)
  const colors = useSelector((state: RootState) => state.productseller.colors)

  const filterColor = async() => {
    console.log(colors)
    const cust = await axios.post(`products/custom`, colors).then(c => {
      console.log(c.data)
       axios.post(`products/custom-products`, c.data).then(r => {
        console.log(r.data)
        let products = r.data.filter((product) => {
          return product.category === customCategory;
        });
        console.log(products)
        setProducts(products)
      })
      
    })
  }

  useEffect(() => {
    if(params.has('category')){
      let c = params.get('category');
      filterCatgory(c);
    }
    if(params.has('marque')){
      let m = params.get('marque');
      filterMarque(m);
    }
    if(params.has('state')){
      let s = params.get('state');
      if(s === "used")
        getUsedProducts();
      if(s === "new")
        getNewProducts();
    }
    if(params.has('custom')){
      filterColor();
  }
  },[c,m,s]);
  function modifyState() {
    let stateObj = { id: "100" };
    window.history.replaceState(stateObj,
                "the-demo-archive-slug", "/mi/archive/the-demo-archive-slug");
}
  const getAllProduct = () => {
    axios
      .get("products/filter")
      .then((res) => {
        dispatch(populateProducts(res.data.products));
        setProducts(res.data.products);
        modifyState()
        //dispatch(changeValid(true));
      })
      .catch((err) => console.log(err.message));
  };

  const getNewProducts = () => {
    axios
      .get("products/filter")
      .then((res) => {
        setProducts(
          res.data.products.filter((product) => product.state === "new")
        );
        executeScroll();
      })
      .catch((err) => console.log(err.message));
  };

  const getUsedProducts = () => {
    axios
      .get("products/filter")
      .then((res) => {
        setProducts(
          res.data.products.filter((product) => product.state === "used")
        );
        executeScroll();
      })
      .catch((err) => console.log(err.message));
  };
  function getPathFromUrl(url) {
    return url.split("?")[0];
  }

  
  

  /* ---------------- Alaa ------------------------------ */
  const isAuth = useSelector(isAuthenticated);
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
    if(!params.get('category') && !params.get('marque') && !params.get('state') && !params.get('custom')){
      getAllProduct();
    }
  }, [dispatch]);

  const renderModalContent = () => {
    return (
      <div className="flex flex-wrap dark:text-neutral-200">
        {marques.map((tag, index) => (
          <div
            key={index}
            onClick={() => {
              filterMarque(tag);
              closeModal();
            }}
          >
            <Marque key={index} tag={tag} className="mr-2 mb-2" />
          </div>
        ))}
      </div>
    );
  };

  return (
    <div
      className={`nc-PageArchive overflow-hidden ${className}`}
      data-nc-id="PageArchive"
    >
      
      <Helmet>
        <title>Our Products || MI Universe</title>
      </Helmet>

      {/* HEADER */}
      <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
        <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-8 xl:aspect-h-6 overflow-hidden ">
          <NcImage
            containerClassName="absolute inset-0"
            //src="https://images.pexels.com/photos/2662116/pexels-photo-2662116.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=750&w=1260"
            src={background}
            className="object-cover w-full h-full"
          />
          <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
            <h2 className="inline-block align-middle text-5xl font-semibold md:text-7xl ">
              {/* {PAGE_DATA.name} */}
              Welcome
            </h2>
            <span className="block mt-4 text-neutral-300">
              {/* {products.length} Articles */}
              To Mi-Shop
            </span>
          </div>
        </div>
      </div>
      {/* ====================== END HEADER ====================== */}
      <div className="relative py-16 container">
        <div className="category">
          <BackgroundSection />
          {/* Category */}
          <div className={`nc-SectionGridCategoryBox relative`}>
            <Heading
              desc="Discover over 100 Articles"
              className="inline-flex items-center mb-10 headCategory"
            >
              Instruments
            </Heading>
            <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-5 sm:gap-6 md:gap-8">
              {categories.map((item, index) => (
                <Link
                  key={index}
                  to={`/mi/archive/the-demo-archive-slug?category=${item}`}
                  className="inline-flex items-center"
                  onClick={() => {
                    filterCatgory(item);
                  }}
                >
                  <CardCategory
                    key={index}
                    category={item}
                    products={products}
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>
      {/* <div className="relative mt-2 mx-auto search">
            <label
              htmlFor="search-input"
              className="text-neutral-500 dark:text-neutral-300"
            >
              <span className="sr-only">Search all icons</span>
              <Input
                id="search-input"
                type="search"
                placeholder="Type the label of the course"
                className="shadow-lg rounded-xl border-opacity-0"
                sizeClass="pl-14 py-5 pr-5 md:pl-16"
                
              />
              <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="1.5"
                    d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                  ></path>
                </svg>
              </span>
            </label>
          </div> */}
      {/* Marque */}
      <div
        ref={myRef}
        className="container py-16 lg:py-10 space-y-16 lg:space-y-28"
      >
        <div>
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row">
            <div className="flex space-x-2.5">
              {/*<ModalCategories categories={DEMO_CATEGORIES} />*/}
              {/*<ModalCategoriesprod/>*/}
              <NcModal
                isOpenProp={modalIsOpen}
                contentExtraClass="max-w-screen-md"
                hide={true}
                triggerText={
                  <span
                    onClick={() => openModal()}
                    className="hidden sm:inline"
                  >
                    Marques
                  </span>
                }
                modalTitle="Discover other tags"
                renderContent={renderModalContent}
              />
              {/* <button onClick={() => filterMarque()}><ModalMarque /></button> */}
              <Modalcart />
            </div>
            {/*  */}
            {/* Label */}
            <div className="block my-4 border-b w-full border-neutral-100 sm:hidden"></div>
            <div className="flex justify-end">
              {/* <ArchiveFilterListBox lists={FILTERS} /> */}
              <React.Fragment>
                <Popover className="relative">
                  {({ open }) => {
                    if (open) {
                      setTimeout(() => {
                        inputRef.current?.focus();
                      }, 100);
                    }

                    return (
                      <>
                        <Popover.Button className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                          <i className="las la-search"></i>
                        </Popover.Button>

                        <Transition
                          show={open}
                          as={Fragment}
                          enter="transition ease-out duration-200"
                          enterFrom="opacity-0 translate-y-1"
                          enterTo="opacity-100 translate-y-0"
                          leave="transition ease-in duration-150"
                          leaveFrom="opacity-100 translate-y-0"
                          leaveTo="opacity-0 translate-y-1"
                        >
                          <Popover.Panel
                            static
                            className="absolute right-0 z-10 w-screen max-w-sm mt-3"
                          >
                            <form action="" method="POST" className="relative">
                              <i className="las la-search absolute left-3 top-1/2 transform -translate-y-1/2 text-xl opacity-60"></i>
                              <Input
                                ref={inputRef}
                                type="search"
                                placeholder="Search by Label"
                                className="pl-10"
                                id="outlined-basic"
                                onChange={inputHandler}
                              />
                              <input type="submit" hidden value="" />
                            </form>
                          </Popover.Panel>
                        </Transition>
                      </>
                    );
                  }}
                </Popover>
              </React.Fragment>
            </div>
          </div>
          {/*  */}
          {/* Price */}
          <div
            style={{
              margin: "auto",
              display: "block",
              width: "fit-content",
            }}
          >
            <h3>What is your budget?</h3>
            <Slider
              value={value}
              onChange={rangeSelector}
              valueLabelDisplay="auto"
              min={0}
              max={10000}
            />
            Your range of Price is between {min}$ and {max}$
          </div>

          {/* <Link 
          to ={`/mi/archive/the-demo-archive-slug`}> */}
          <div className="flex justify-between">
            <ButtonPrimary onClick={() => getAllProduct()}>
              Show All Porducts
            </ButtonPrimary>
            <div className="radio-buttons">
              New
              <input
                id="mac"
                value="new"
                name="platform"
                type="radio"
                onChange={() => getNewProducts()}
              />
              / Used
              <input
                id="linux"
                value="used"
                name="platform"
                type="radio"
                onChange={() => getUsedProducts()}
              />
            </div>
            {/* <ButtonPrimary disabled={filter.valid}>Filter</ButtonPrimary> */}
          </div>
          {products.length===0 && params.has('custom') ? (<h1 className="flex justify-center mt-5">No products much your specification please change the category or the colors</h1>):""}
          <InstantSearch indexName="products" searchClient={searchClient}>
           <Configure clickAnalytics/> 
        
          
       
           
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 md:gap-8 mt-8 lg:mt-10">
            {products ? products.map((product) => (
              <Card11Product key={product._id} product={product} />
            )): <h3>No Products</h3>}
          </div>
          </InstantSearch>
          {/* PAGINATIONS */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
            <ButtonPrimary>Show me more</ButtonPrimary>
          </div>
        </div>
        {/* === SECTION 5 === */}
        <hr />
        <SellersSlider
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
          //products={products}
        />
        <hr />
        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageArchive;
