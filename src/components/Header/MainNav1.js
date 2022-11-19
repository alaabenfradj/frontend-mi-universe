import { useRef } from "react";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "components/Button/ButtonPrimary";
import MenuBar from "components/MenuBar/MenuBar";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { isAuthenticated, logoutUser, userRoles } from "app/slices/userSlice";
import { deslecetsellerproducts } from "app/productslice/Productsliceseller";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { Fragment, useState } from "react";
import { Dialog, Transition } from "@headlessui/react";
import { XIcon } from "@heroicons/react/outline";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import BookmarkAddedIcon from "@mui/icons-material/BookmarkAdded";
import { DeselectItems, removeitem } from "app/cartslice/carteslics";
import Avatar from "components/Avatar/Avatar";

/*export interface MainNav1Props {
  isTop: boolean;
}*/

const MainNav1 = ({ isTop }) => {
  const isAuth = useSelector(isAuthenticated);
  const isAdmin = useSelector(userRoles).includes("admin");

  const dispatch = useDispatch();

  const cart = useSelector((state) => state.carteslics.cartItems);
  const bookmarkedProducts = useSelector(
    (state) => state.productLikes.bookmarkedProducts
  );
  const [open, setOpen] = useState(false);
  const totale = useSelector((state) => state.carteslics.total);
  const executeScroll = () => myRef.current.scrollIntoView();
  const myRef = useRef(null);
  const base_url = "http://localhost:5050/";
  const calculTot = (items) => {
    let total = 0;
    items.map((item) => (total += item.price * item.qte));

    return total;
  };
  const currentUser = useSelector(
    (state) => state.user.userLogedIn
  );
  console.log(currentUser)
  return (
    <div
      className={`nc-MainNav1 relative z-10 ${
        isTop ? "onTop " : "notOnTop backdrop-filter"
      }`}
    >
      <div className="container py-5 relative flex justify-between items-center space-x-4 xl:space-x-8">
        <div className="flex justify-start flex-grow items-center space-x-4 sm:space-x-10 2xl:space-x-14">
          <Logo />
          <Navigation />
        </div>
        <div className="flex-shrink-0 flex items-center justify-end text-neutral-700 dark:text-neutral-100 space-x-1">
          <div className="hidden items-center xl:flex space-x-1">
            <DarkModeContainer />
            {isAuth && (
              <div className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <button
                  onClick={() => {
                    if (!open) setOpen(true);
                    else if (open) setOpen(false);
                  }}
                >
                  <Badge color="secondary" badgeContent={cart.length}>
                    <ShoppingCartIcon />{" "}
                  </Badge>
                </button>
              </div>
            )}
            {isAuth && (
              <div className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <Link to="/mi/saved-products">
                  <Badge
                    color="secondary"
                    badgeContent={bookmarkedProducts.length}
                  >
                    <BookmarkAddedIcon />
                  </Badge>
                </Link>
              </div>
            )}
            {isAdmin && (
              <div className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
                <Link to="/back-office/dashboard">
                  <Badge color="secondary">
                    <ManageAccountsIcon />
                  </Badge>
                </Link>
              </div>
            )}

            {/* <SearchDropdown /> */}
            {currentUser?(
              <>
            <Avatar
              containerClassName="ring-4 ring-white dark:ring-0 shadow-2xl"
              imgUrl={base_url + currentUser.profilePicture}
              sizeClass="w-10 h-10 text-xl lg:text-2xl lg:w-11 lg:h-11"
              radius="rounded-full"
            />
            <h5>{currentUser.lastName}</h5>
            </>):
            ""}

            <div className="px-1" />
            {isAuth ? (
              <ButtonPrimary
                onClick={() => {
                  dispatch(logoutUser());
                  
                  dispatch(deslecetsellerproducts());
                  dispatch(DeselectItems());
                }}
              >
                Logout
              </ButtonPrimary>
            ) : (
              <ButtonPrimary href="/mi/login">Sign up</ButtonPrimary>
            )}
          </div>
          <div className="flex items-center xl:hidden">
            {isAuth ? (
              <ButtonPrimary onClick={() => {dispatch(logoutUser()); dispatch(DeselectItems());}}>
                Logout
              </ButtonPrimary>
            ) : (
              <ButtonPrimary href="/mi/login">Sign up</ButtonPrimary>
            )}
            <div className="px-1" />
            <MenuBar />
          </div>
        </div>
      </div>
      <Transition.Root show={open} as={Fragment}>
        <Dialog
          as="div"
          className=" fixed inset-0 overflow-hidden"
          onClose={setOpen}
        >
          <div className="absolute modal inset-0 overflow-hidden">
            <Transition.Child
              as={Fragment}
              enter="ease-in-out duration-500"
              enterFrom="opacity-0"
              enterTo="opacity-100"
              leave="ease-in-out duration-500"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Dialog.Overlay className="absolute inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />
            </Transition.Child>

            <div className="pointer-events-none fixed inset-y-0 right-0 flex max-w-full pl-10">
              <Transition.Child
                as={Fragment}
                enter="transform transition ease-in-out duration-500 sm:duration-700"
                enterFrom="translate-x-full"
                enterTo="translate-x-0"
                leave="transform transition ease-in-out duration-500 sm:duration-700"
                leaveFrom="translate-x-0"
                leaveTo="translate-x-full"
              >
                <div className="pointer-events-auto modal w-screen max-w-md">
                  <div className="flex h-full flex-col overflow-y-scroll bg-white shadow-xl">
                    <div className="flex-1 overflow-y-auto py-6 px-4 sm:px-6">
                      <div className="flex items-start justify-between">
                        <Dialog.Title className="text-lg font-medium text-gray-900">
                          {" "}
                          Shopping cart{" "}
                        </Dialog.Title>
                        <div className="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            className="-m-2 p-2 text-gray-400 hover:text-gray-500"
                            onClick={() => setOpen(false)}
                          >
                            <span className="sr-only">Close panel</span>
                            <XIcon className="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>

                      <div className="mt-8">
                        <div className="flow-root">
                          <ul className="-my-6 divide-y divide-gray-200">
                            {cart.map((product) => (
                              <li key={product.productid} className="flex py-6">
                                <div className="h-24 w-24 flex-shrink-0 overflow-hidden rounded-md border border-gray-200">
                                  <img
                                    src={`${base_url}${product.productImage[0]}`}
                                    alt={product.label}
                                    className="h-full w-full object-cover object-center"
                                  />
                                </div>

                                <div className="ml-4 flex flex-1 flex-col">
                                  <div>
                                    <div className="flex justify-between text-base font-medium text-gray-900">
                                      <h3>{product.label}</h3>
                                      <p className="ml-4">{product.price}</p>
                                    </div>
                                    {
                                      <p className="mt-1 text-sm text-gray-500">
                                        noir
                                      </p>
                                    }
                                  </div>
                                  <div className="flex flex-1 items-end justify-between text-sm">
                                    <p className="text-gray-500">
                                      Qty {product.qte}
                                    </p>
                                    

                                    <div className="flex">
                                      <button
                                        onClick={() => {
                                          dispatch(
                                            removeitem(product.productid)
                                          );
                                        }}
                                        type="button"
                                        className="font-medium text-indigo-600 hover:text-indigo-500"
                                      >
                                        Remove
                                      </button>
                                    </div>
                                  </div>
                                </div>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </div>

                    <div className="border-t border-gray-200 py-6 px-4 sm:px-6">
                      <div className="flex justify-between text-base font-medium text-gray-900">
                        <p>Subtotal</p>
                        <p>{calculTot(cart)}</p>
                      </div>
                      <p className="mt-0.5 text-sm text-gray-500">
                        Shipping and taxes calculated at checkout.
                      </p>
                      <div className="mt-6">
                        <a
                           href="/mi/payment"
                          className="flex items-center justify-center rounded-md border border-transparent bg-indigo-600 px-6 py-3 text-base font-medium text-white shadow-sm hover:bg-indigo-700"
                        >
                          Checkout
                        </a>
                      </div>
                      <div className="mt-6 flex justify-center text-center text-sm text-gray-500">
                        <p>
                          or{" "}
                          {window.location.href ===
                          "http://localhost:3000/mi/archive/the-demo-archive-slug" ? (
                            <button
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => setOpen(false)}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          ) : (
                            <button
                              type="button"
                              href="/mi/archive/the-demo-archive-slug"
                              className="font-medium text-indigo-600 hover:text-indigo-500"
                              onClick={() => {
                                setOpen(false);
                                executeScroll();
                              }}
                            >
                              Continue Shopping
                              <span aria-hidden="true"> &rarr;</span>
                            </button>
                          )}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition.Root>
    </div>
  );
};

export default MainNav1;
