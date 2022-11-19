import { ComponentType } from "react";

export interface LocationStates {
  "/mi"?: {};
  "/mi#"?: {};
  "/mi/archive/:slug"?: {};
  "/mi/archive-video/:slug"?: {};
  "/mi/archive-audio/:slug"?: {};
  //
  "/mi/author/:slug"?: {};
  "/mi/author-v2/:slug"?: {};
  //
  "/mi/single/:slug"?: {};
  "/mi/single-template-2/:slug"?: {};
  "/mi/single-template-3/:slug"?: {};
  "/mi/single-sidebar/:slug"?: {};
  "/mi/single-2-sidebar/:slug"?: {};
  "/mi/single-3-sidebar/:slug"?: {};
  "/mi/single-gallery/:slug"?: {};
  "/mi/single-audio/:slug"?: {};
  "/mi/single-video/:slug"?: {};
  //
  "/mi/custom"?: {};
  "/mi/search"?: {};
  "/mi/search-v2"?: {};
  "/mi/about"?: {};
  "/mi/contact"?: {};
  "/mi/contactUs"?: {};
  "/mi/login"?: {};
  "/mi/signup"?: {};
  "/mi/forgot-pass"?: {};
  "/mi/page404"?: {};
  "/mi/dashboard"?: {};
  "/mi/subscription"?: {};
  "/mi/saved-products"?: {};
  "/mi/edit-profile"?: {};
  "/mi/manageproduct"?: {};

  "/mi/live-streaming"?: {};
  "/mi/live-stream/:id"?: {};
  "/mi/Karaoke/:id/:token"?: {};
  //
  "/mi/theme-cyan-blueGrey"?: {};
  "/mi/theme-blue-blueGrey"?: {};
  "/mi/theme-purple-blueGrey"?: {};
  "/mi/theme-teal-blueGrey"?: {};
  "/mi/theme-blueGrey-blueGrey"?: {};
  "/mi/theme-red-warmGrey"?: {};
  "/mi/theme-cyan-warmGrey"?: {};
  "/mi/theme-blue-coolGrey"?: {};
  "/mi/theme-lightBlue-coolGrey"?: {};
  "/mi/theme-pink-coolGrey"?: {};
  "/mi/theme-green-grey"?: {};
  "/mi/theme-yellow-grey"?: {};
  "/mi/theme-orange-grey"?: {};
  "/mi/theme-fuchsia-blueGrey"?: {};
  //
  "/mi/home-demo-1"?: {};
  "/mi/home-demo-2"?: {};
  "/mi/home-demo-3"?: {};
  "/mi/home-demo-4"?: {};
  "/mi/home-demo-5"?: {};
  "/mi/home-demo-6"?: {};
  "/mi/home-demo-7"?: {};
  "/mi/forgot-pass/:email"?: {};
  "/mi/passport/register"?: {};
  "/mi/become-teacher"?: {};
  "/mi/become-seller"?: {};
  "/mi/become-student"?: {};
  "/mi/classroom"?: {};
  "/mi/classroom/teacher"?: {};
  "/mi/classroom/student"?: {};
  "/mi/classroom/teacher/details"?: {};
  "/mi/classroom/teacher/add"?: {};
  "/mi/classroom/teacher/update"?: {};
  "/mi/classroom/teacher/details/:id"?: {};
  "/mi/classroom/student/:id"?: {};
  "/mi/payment"?: {};
  "/mi/invoice/:id"?: {};
  "/mi/room"?: {};
  "/mi/invoices"?: {};

  // back-office
  "/headerback"?: {};
}

export type PathName = keyof LocationStates;

export interface Page {
  path: PathName;
  exact?: boolean;
  typeRoute?: string;
  component: ComponentType<Object>;
}
