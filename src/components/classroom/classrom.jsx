import { useEffect, useState } from "react";
import Pagination from "components/Pagination/Pagination";
import Nav from "components/Nav/Nav";
import NavItem from "components/NavItem/NavItem";
import CourseFilter from "components/ArchiveFilterListBox/courseFilter";
import CourseFilterLanguage from "components/ArchiveFilterListBox/courseLanguagesFilter";
import Input from "components/Input/Input";
import HeadBackgroundCommon from "components/HeadBackgroundCommon/HeadBackgroundCommon";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import ButtonSecondary from "components/Button/ButtonSecondary";
import SectionGridCategoryBox from "components/SectionGridCategoryBox/SectionGridCategoryBox";
import { DEMO_CATEGORIES } from "data/taxonomies";
import BackgroundSection from "components/BackgroundSection/BackgroundSection";
import SectionSliderNewAuthors from "components/SectionSliderNewAthors/SectionSliderNewAuthors";
import { DEMO_AUTHORS } from "data/authors";
import CardCourse from "components/Card11/CardCourse";
import axios from "axiosInstance";
import CourseFilterCategory from "./../../components/ArchiveFilterListBox/courseCategoryFilter";
import { useDispatch, useSelector } from "react-redux";
import PriceFilter from "./PriceFilter";
import DurationFilter from "./DurationFilter";
import { filterByDurationCourse } from "../../app/slices/courseFilter";
import { filterByPriceCourse } from "../../app/slices/courseFilter";
const categories = [
  { name: "all" },
  { name: "voice" },
  { name: "guitar" },
  { name: "keyboards" },
  { name: "strings" },
  { name: "percussions" },
  { name: "brass" },
  { name: "woodwind" },
  { name: "others" },
];
const levels = [
  { name: "all" },
  { name: "beginner" },
  { name: "intermediate" },
  { name: "advanced" },
];
const languages = [
  { name: "all" },
  { name: "english" },
  { name: "french" },
  { name: "arabic" },
];
const TABS = [
  "Most popular",
  "Top Rated",
  "Top courses for beginner",
  "Recommended",
];
const Classroom = ({ className = "" }) => {
  const dispatch = useDispatch();
  const [label, setLabel] = useState(null);
  const [list, setList] = useState([]);
  const search = useSelector((state) => state.filterCourseSlice);
  const [details, setDetails] = useState({
    maxprice: 0,
    minprice: 0,
    maxduration: 0,
    minduration: 0,
  });
  useEffect(() => {
    axios
      .put("courses/searchCourse", { ...search, label })
      .then((course) => {
        setList(course.data);
      })
      .catch((err) => console.log(err));
  }, [search, label]);
  useEffect(() => {
    axios
      .get("courses/details")
      .then((course) => {
        dispatch(
          filterByDurationCourse([
            course.data.minduration,
            course.data.maxduration,
          ])
        );
        dispatch(
          filterByPriceCourse([course.data.minprice, course.data.maxprice])
        );
        console.log(search);
        setDetails(course.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const [tabActive, setTabActive] = useState(TABS[0]);

  const handleClickTab = (item) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };
  return (
    <div className={`nc-PageSearchV2 ${className}`} data-nc-id="PageSearchV2">
      <HeadBackgroundCommon className="h-24 2xl:h-28" />
      <Helmet>
        <title>Courses</title>
      </Helmet>
      <div className="container">
        <header className="max-w-2xl mx-auto -mt-10 flex flex-col lg:-mt-7">
          <div className="relative">
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
                onChange={(e) => {
                  if (e.target.value === "") setLabel(null);
                  else setLabel(e.target.value);
                }}
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
          </div>
          <span className="block text-sm mt-4 text-neutral-500 dark:text-neutral-300">
            We found{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100">
              1135
            </strong>{" "}
            results articles for{" "}
            <strong className="font-semibold text-neutral-800 dark:text-neutral-100"></strong>
          </span>
        </header>
      </div>
      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <main>
          <div className="row">
            <div
              style={{
                margin: "auto",
                display: "block",
                width: "fit-content",
              }}
            >
              <h3>What is your budget?</h3>
              <PriceFilter details={details} />
            </div>
            <div
              style={{
                margin: "auto",
                display: "block",
                width: "fit-content",
              }}
            >
              <h3>nomber of hours?</h3>
              <DurationFilter details={details} />
            </div>
          </div>

          {/* TABS FILTER */}
          <div className="flex flex-col sm:items-center sm:justify-between sm:flex-row ">
            <Nav
              containerClassName="w-full overflow-x-auto hiddenScrollbar "
              className=" sm:space-x-2 "
            >
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
            <div className="flex justify-end">
              <CourseFilter className="my-2" lists={levels} />
              <CourseFilterLanguage
                className="my-2"
                lists={languages}
              ></CourseFilterLanguage>
              <CourseFilterCategory
                className="my-2"
                lists={categories}
              ></CourseFilterCategory>
            </div>
          </div>
          {/* LOOP ITEMS */}
          {/* LOOP ITEMS POSTS */}
          {tabActive === "Most popular" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
              {list
                .sort((v, u) => u.subscribers - v.subscribers)
                .map((course, index) => (
                  <CardCourse key={index} course={course} />
                ))}
            </div>
          )}
          {/* {tabActive === "Top Rated" && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 md:gap-8 mt-8 lg:mt-10">
             
            </div>
          )} */}

          {/* LOOP ITEMS CATEGORIES */}
          {/* LOOP ITEMS POSTS */}
          {/* PAGINATION */}
          <div className="flex flex-col mt-12 lg:mt-16 space-y-5 sm:space-y-0 sm:space-x-3 sm:flex-row sm:justify-between sm:items-center">
            <Pagination />
          </div>
        </main>

        {/* MORE SECTIONS */}
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

        {/* === SECTION 5 === */}
        <SectionSliderNewAuthors
          heading="Top elite authors"
          subHeading="Discover our elite writers"
          authors={DEMO_AUTHORS.filter((_, i) => i < 10)}
        />

        {/* SUBCRIBES */}
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default Classroom;
