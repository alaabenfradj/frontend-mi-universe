import React from "react";
import { BrowserRouter, Switch, Route } from "react-router-dom";
import { Page } from "./types";
import ScrollToTop from "./ScrollToTop";
import Footer from "components/Footer/Footer";
import Page404 from "containers/Page404/Page404";
import PageArchive from "containers/PageArchive/PageArchive";
import PageAuthor from "containers/PageAuthor/PageAuthor";
import PageSearch from "containers/PageSearch/PageSearch";
import PageSingle from "containers/PageSingle/PageSingle";
import PageSingleHasSidebar from "containers/PageSingle/PageSingleHasSidebar";
import PageSingleTemplate2 from "containers/PageSingle/PageSingleTemp2";
import PageSingleTemp2Sidebar from "containers/PageSingle/PageSingleTemp2Sidebar";
import PageSingleTemplate3 from "containers/PageSingle/PageSingleTemp3";
import PageSingleTemp3Sidebar from "containers/PageSingle/PageSingleTemp3Sidebar";
import PageAbout from "containers/PageAbout/PageAbout";
import PageContact from "containers/PageContact/PageContact";
import PageLogin from "containers/PageLogin/PageLogin";
import PageSignUp from "containers/PageSignUp/PageSignUp";
import PageForgotPass from "containers/PageForgotPass/PageForgotPass";
import PageDashboard from "containers/PageDashboard/PageDashboard";
import PageSubcription from "containers/PageSubcription/PageSubcription";
import HeaderContainer from "containers/HeaderContainer/HeaderContainer";
import PageHome from "containers/PageHome/PageHome";
// import PageHomeDemo2 from "containers/PageHome/PageHomeDemo2";
// import PageHomeDemo3 from "containers/PageHome/PageHomeDemo3";
// import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
// import PageHomeDemo4 from "containers/PageHome/PageHomeDemo4";
import PageSearchV2 from "containers/PageSearch/PageSearchV2";
import MediaRunningContainer from "containers/MediaRunningContainer/MediaRunningContainer";
import PageSingleGallery from "containers/PageSingleGallery/PageSingleGallery";
import PageSingleProduct from "containers/PageSingleGallery/PageSingleProduct";
import PageSingleAudio from "containers/PageSingleAudio/PageSingleAudio";
import PageSingleVideo from "containers/PageSingleVideo/PageSingleVideo";
import PageArchiveVideo from "containers/PageArchive/PageArchiveVideo";
import PageArchiveAudio from "containers/PageArchive/PageArchiveAudio";
// import PageHomeDemo5 from "containers/PageHome/PageHomeDemo5";
// import PageHomeDemo6 from "containers/PageHome/PageHomeDemo6";
import MediaRunningContainerForSafari from "containers/MediaRunningContainer/MediaRunningContainerForSafari";
import isSafariBrowser from "utils/isSafariBrowser";
import PageHomeDemo7 from "containers/PageHome/PageHomeDemo7";

import RestPasswordComponent from "../containers/PageForgotPass/ResetPasswordComponent.js";
import PagePassword from "containers/PageSignUp/PagePassword";
import PageSeller from "../components/SectionBecomeAnSeller/BecomeAnSeller";
import PageBecomeStudent from "../components/SectionBecomeAnStudent/PageBecomeStudent";
import PageTeacher from "../components/SectionBecomeAnTeacher/BecomeAnTeacher.js";

import BecomeTeacherRoute from "./privateRoutes/BecomeTeacherRoute";
import AuthRoute from "./privateRoutes/AuthRoute";
import BecomeSellerRoute from "./privateRoutes/BecomeSellerRoute";
import BecomeStudentRoute from "./privateRoutes/BecomeStudentRoute";
import PageAuthorV2 from "containers/PageAuthor/PageAuthorV2";
import ProfileSeller from "containers/PageAuthor/ProfileSeller";
import PageContactMi from "containers/PageContact/PageContactMi";
import CustomProductsPage from "containers/customProduct/CustomProductsPage";
import PageFavorite from "containers/PageArchive/PageFavorite";
import PageHomeMi from "containers/PageHome/PageHomeMi";
import DashboardEditProfile from "containers/PageDashboard/DashboardEditProfile";
import Karaoke from "containers/Karaoke/Karaoke";
import Manageproduct from "containers/PageDashboard/Manageproduct";
import Recommand from "containers/PageDashboard/Recommand";
import Productrecommand from "containers/PageDashboard/Productrecommand";
import ProductPage from "containers/PageDashboard/ProductPage";
//import SearchPage from "containers/PageDashboard/searchpage";
import Classroom from "./../components/classroom/classrom";
import StudentClassroom from "../components/classroom/StudentClassroom";
import TeacherClassroom from "../components/classroom/TeacherClassroom";
import AddCours from "./../containers/PageDashboard/addCours";
import UpdateCourse from "components/classroom/updateCoures";
import CourseDetails from "./../components/classroom/CourseDetails";
import IsAuthRoute from "./privateRoutes/IsAuthRoute";
import Payment from "components/Payment/Payment.js";
import PageInvoice from "components/Payment/PageInvoice";
import Meeting from "containers/Karaoke/Meeting";
import UserInvoices from "components/Payment/UserInvoices";

import Streamer from "containers/Stream/Streamer";
import StreamHomePage from "containers/Stream/StreamHomePage";
export const pages: Page[] = [
  { path: "/mi", exact: true, component: PageHomeMi },
  { path: "/mi#", exact: true, component: PageHome },
  { path: "/mi/archive/:slug", component: PageArchive },
  { path: "/mi/archive-video/:slug", component: PageArchiveVideo },
  { path: "/mi/archive-audio/:slug", component: PageArchiveAudio },
  { path: "/mi/saved-products", component: PageFavorite },
  //
  // { path: "/mi/author/:slug", component: PageAuthor },

  { path: "/mi/author/:slug", component: ProfileSeller },

  { path: "/mi/author-v2/:slug", component: PageAuthorV2 },
  //
  { path: "/mi/single/:slug", component: PageSingleTemp3Sidebar },
  {
    path: "/mi/single-sidebar/:slug",
    component: PageSingleTemplate3,
  },
  {
    path: "/mi/single-template-2/:slug",
    component: PageSingleTemplate2,
  },
  {
    path: "/mi/single-2-sidebar/:slug",
    component: PageSingleTemp2Sidebar,
  },
  {
    path: "/mi/single-template-3/:slug",
    component: PageSingle,
  },
  {
    path: "/mi/single-3-sidebar/:slug",
    component: PageSingleHasSidebar,
  },
  // {
  //   path: "/mi/single-gallery/",
  //   component: PageSingleGallery,
  // },
  {
    path: "/mi/single-gallery/:slug",
    component: PageSingleProduct,
  },
  {
    path: "/mi/single-audio/:slug",
    component: PageSingleAudio,
  },
  {
    path: "/mi/single-video/:slug",
    component: PageSingleVideo,
  },

  { path: "/mi/search", component: PageSearch },
  //{ path: "/mi/search-v2", component: Recommand },
  { path: "/mi/about", exact: true, component: PageAbout },
  { path: "/mi/contact", component: PageContactMi },
  { path: "/mi/page404", component: Page404 },
  { path: "/mi/login", typeRoute: "auth", component: PageLogin },
  { path: "/mi/signup", typeRoute: "auth", component: PageSignUp },
  {
    path: "/mi/edit-profile",
    typeRoute: "isAuth",
    component: DashboardEditProfile,
  },
  {
    path: "/mi/manageproduct",
    component: Manageproduct,
  },
  /*{
    path:'/mi/products/:objectID?queryID=:queryID',
    component:ProductPage,
   },
   {
    path:'/mi/products1/:objectID',
    component:Productrecommand,
   },*/
  {
    path: "/mi/Karaoke/:id/:token",
    component: Karaoke,
  },

  {
    path: "/mi/forgot-pass",
    exact: true,
    typeRoute: "auth",
    component: PageForgotPass,
  },
  { path: "/mi/dashboard", component: PageDashboard },
  { path: "/mi/subscription", component: PageSubcription },
  { path: "/mi/payment", component: Payment },
  { path: "/mi/forgot-pass/:email", component: RestPasswordComponent },
  { path: "/mi/passport/register", component: PagePassword },

  { path: "/mi/home-demo-7", component: PageHomeDemo7 },
  { path: "/mi/custom", component: CustomProductsPage },
  {
    path: "/mi/forgot-pass/:email",

    typeRoute: "auth",
    component: RestPasswordComponent,
  },
  {
    path: "/mi/live-streaming",
    exact: true,
    component: StreamHomePage,
  },
  {
    path: "/mi/live-stream/:id",
    exact: true,
    component: Streamer,
  },
  {
    path: "/mi/passport/register",
    typeRoute: "auth",
    exact: true,
    component: PagePassword,
  },
  {
    path: "/mi/become-teacher",
    exact: true,
    typeRoute: "teacher",
    component: PageTeacher,
  },
  {
    path: "/mi/become-seller",
    exact: true,
    typeRoute: "seller",
    component: PageSeller,
  },

  {
    path: "/mi/become-student",
    exact: true,
    typeRoute: "student",
    component: PageBecomeStudent,
  },
  {
    path: "/mi/classroom",
    exact: true,
    typeRoute: "classroom",
    component: Classroom,
  },
  {
    path: "/mi/classroom/student",
    exact: true,
    typeRoute: "classroom",
    component: StudentClassroom,
  },

  {
    path: "/mi/classroom/teacher",
    exact: true,
    typeRoute: "classroom",
    component: TeacherClassroom,
  },
  {
    path: "/mi/invoice/:id",
    typeRoute: "isAuth",
    exact: true,
    component: PageInvoice,
  },
  { path: "/mi/room", typeRoute: "isAuth", component: Meeting },
  {
    path: "/mi/invoices",
    typeRoute: "isAuth",
    exact: true,
    component: UserInvoices,
  },
  {
    path: "/mi/classroom/teacher/update",
    exact: true,
    typeRoute: "classroom",
    component: UpdateCourse,
  },
  {
    path: "/mi/classroom/teacher/details/:id",
    exact: true,
    typeRoute: "classroom",
    component: CourseDetails,
  },
  {
    path: "/mi/classroom/teacher/add",
    exact: true,
    typeRoute: "classroom",
    component: AddCours,
  },
  //back-office

  //
];

export default function FronOfficeRoutes() {
  return (
    <div className="bg-white text-base dark:bg-neutral-900 text-neutral-900 dark:text-neutral-200">
      <ScrollToTop />
      <HeaderContainer />
      <Switch>
        {pages.map(({ component, path, exact, typeRoute }) => {
          if (typeRoute === "auth") {
            return (
              <AuthRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "seller") {
            return (
              <BecomeSellerRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "student") {
            return (
              <BecomeStudentRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "teacher") {
            return (
              <BecomeTeacherRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else if (typeRoute === "isAuth") {
            return (
              <IsAuthRoute
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          } else {
            return (
              <Route
                key={path}
                component={component}
                exact={!!exact}
                path={path}
              />
            );
          }
        })}
        <Route component={Page404} />
      </Switch>
      <Footer />
      {/* MEDIA */}

      {/* //is Safari on an apple touch-screen device */}
      {isSafariBrowser() ? (
        <MediaRunningContainerForSafari />
      ) : (
        <MediaRunningContainer />
      )}
    </div>
  );
}
