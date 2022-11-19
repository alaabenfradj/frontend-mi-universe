import {
  MegamenuItem,
  NavItemType,
} from "components/Navigation/NavigationItem";
import ncNanoId from "utils/ncNanoId";
import __megamenu from "./jsons/__megamenu.json";

const megaMenu3ItemDemo: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1751731/pexels-photo-1751731.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Filter By Category",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: `/mi/archive/the-demo-archive-slug?category=${i.category}`,
      name: i.Corporate,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/2876659/pexels-photo-2876659.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Filter By Marque",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: `/mi/archive/the-demo-archive-slug?marque=${i.marque}`,
      name: i.CarModel,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/5809453/pexels-photo-5809453.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    title: "Filter By State",
    items: __megamenu.map((i) => ({
       id: ncNanoId(), 
       href: `/mi/archive/the-demo-archive-slug?state=${i.etat}`, 
       name: i.state 
    })),
  },
];

const megaMenu3ItemDemo2: MegamenuItem[] = [
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/1824998/pexels-photo-1824998.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500",
    title: "Flamenco",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Corporate,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/359995/pexels-photo-359995.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Jazz",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.CarModel,
    })),
  },
  {
    id: ncNanoId(),
    image:
      "https://images.pexels.com/photos/243988/pexels-photo-243988.jpeg?auto=compress&cs=tinysrgb&dpr=2&h=650&w=940",
    title: "Blues",
    items: __megamenu.map((i) => ({
      id: ncNanoId(),
      href: "#",
      name: i.Department,
    })),
  },
];

const dashboardChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/mi/dashboard/edit-profile",
    name: "Edit profile",
  },

  {
    id: ncNanoId(),
    href: "/mi/dashboard/subscription",
    name: "Subscription",
  },
  {
    id: ncNanoId(),
    href: "/mi/dashboard/submit-post",
    name: "Submit post",
  },
];

const otherPageChildMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/mi/login",
    name: "Login",
  },
  {
    id: ncNanoId(),
    href: "/mi/signup",
    name: "Signup",
  },
  {
    id: ncNanoId(),
    href: "/mi/edit-profile",
    name: "Edit profile",
  },
  {
    id: ncNanoId(),
    href: "/mi/invoices",
    name: "My Invoices",
  },
  {
    id: ncNanoId(),
    href: "/mi/forgot-pass",
    name: "Forgot Password",
  },

  {
    id: ncNanoId(),
    href: "/mi/about",
    name: "About",
  },
  {
    id: ncNanoId(),
    href: "/mi/contact",
    name: "Contact us",
  },
  {
    id: ncNanoId(),
    href: "/mi/subscription",
    name: "Subscription",
  },
];

const archviePageChildrenMenus: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/mi/archive/the-demo-archive-slug",
    name: "Archive Page",
  },
  {
    id: ncNanoId(),
    href: "/mi/archive-audio/the-demo-archive-slug",
    name: "Archive Audio",
  },
  {
    id: ncNanoId(),
    href: "/mi/archive-video/the-demo-archive-slug",
    name: "Archive Video",
  },
  {
    id: ncNanoId(),
    href: "/mi/author/the-demo-author-slug",
    name: "Author Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/mi/author/the-demo-author-slug",
        name: "Author Page 1",
      },
      {
        id: ncNanoId(),
        href: "/mi/author-v2/the-demo-author-slug",
        name: "Author Page 2",
      },
    ],
  },
  {
    id: ncNanoId(),
    href: "/mi/custom",
    name: "Custom Products Page",
  },
  {
    id: ncNanoId(),
    href: "/mi/saved-products",
    name: "Saved Products",
  },
  {
    id: ncNanoId(),
    href: "/mi/search",
    name: "Search Page",
    type: "dropdown",
    children: [
      {
        id: ncNanoId(),
        href: "/mi/search",
        name: "Seach Page 1",
      },
      {
        id: ncNanoId(),
        href: "/mi/search-v2",
        name: "Search Page 2",
      },
    ],
  },
];

const singleChildrenMenus: NavItemType = {
  id: ncNanoId(),
  href: "/mi/single/this-is-single-slug",
  name: "Single Template ",
  type: "dropdown",
  children: [
    {
      id: ncNanoId(),
      href: "/mi/single-sidebar/this-is-single-slug",
      name: "Single Template 1",
    },
    {
      id: ncNanoId(),
      name: "Template 1 sidebar",
      href: "/mi/single/this-is-single-slug-2",
    },
    {
      id: ncNanoId(),
      href: "/mi/single-template-2/this-is-single-slug-2",
      name: "Single Template 2",
    },
    {
      id: ncNanoId(),
      href: "/mi/single-2-sidebar/this-is-single-slug",
      name: "Template 2 sidebar",
    },
    {
      id: ncNanoId(),
      href: "/mi/single-template-3/this-is-single-slug-3",
      name: "Single Template 3",
    },
    {
      id: ncNanoId(),
      href: "/mi/single-3-sidebar/this-is-single-slug",
      name: "Template 3 sidebar",
    },
  ],
};

const templateChilds: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/mi/room",
    name: "Karaoke",
  },
  {
    id: ncNanoId(),
    href: "/mi/live-streaming",
    name: "Live Streaming",
  },
  {
    id: ncNanoId(),
    href: "/mi/custom",
    name: "Custom Products",
  },
  {
    id: ncNanoId(),
    href: "/mi/contact",
    name: "Feedback",
  },
];
const classroomChildren: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/mi/classroom/student",
    name: "student",
  },
  {
    id: ncNanoId(),
    name: "teacher",
    href: "/mi/classroom/teacher",
  },
];
export const NAVIGATION_DEMO: NavItemType[] = [
  {
    id: ncNanoId(),
    href: "/mi/archive/the-demo-archive-slug",
    name: "MI Shop 🏪",
    type: "megaMenu",
    megaMenu: megaMenu3ItemDemo,
  },
  {
    id: ncNanoId(),
    href: "/mi/classroom",
    name: "MI Learn 📘",
    type: "dropdown",
    children: classroomChildren,
  },
  {
    id: ncNanoId(),
    href: "/mi/room",
    name: "MI Fun 🎷",
    type: "dropdown",
    children: templateChilds,
  },
  {
    id: ncNanoId(),
    href: "/mi/edit-profile",
    name: "Profile ⚙️",
    type: "dropdown",
    children: otherPageChildMenus,
  },
];
