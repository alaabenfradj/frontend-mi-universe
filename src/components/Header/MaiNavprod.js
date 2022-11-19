import React, { FC } from "react";
import Logo from "components/Logo/Logo";
import Navigation from "components/Navigation/Navigation";
import SearchDropdown from "./SearchDropdown";
import ButtonPrimary from "components/Button/ButtonPrimary";
import MenuBar from "components/MenuBar/MenuBar";
import DarkModeContainer from "containers/DarkModeContainer/DarkModeContainer";
import NcImage from "components/NcImage/NcImage";
import { Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import ShoppingCartIcon from "@material-ui/icons/ShoppingCart";
import Badge from "@material-ui/core/Badge";
import { isAuthenticated, logoutUser } from "app/slices/userSlice";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";

const MaiNnavprod = ({ isTop }) => {
  const isAuth = useSelector(isAuthenticated);
  const dispatch = useDispatch();
  const cart = useSelector((state) => state.carteslics.cartItems);

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
            <div className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
              <Link to="/mi/dashboard/posts">
                <Badge color="secondary" badgeContent={cart.length}>
                  <ShoppingCartIcon />{" "}
                </Badge>
              </Link>
            </div>

            <div className="text-2xl md:text-[28px] w-12 h-12 rounded-full text-neutral-700 dark:text-neutral-300 hover:bg-neutral-100 dark:hover:bg-neutral-800 focus:outline-none flex items-center justify-center">
              <Link to="/back-office/dashboard">
                <Badge color="secondary">
                  <ManageAccountsIcon />
                </Badge>
              </Link>
            </div>

            <div className="px-1" />
            {isAuth ? (
              <ButtonPrimary onClick={() => dispatch(logoutUser())}>
                Logout
              </ButtonPrimary>
            ) : (
              <ButtonPrimary href="/mi/login">Sign up</ButtonPrimary>
            )}
          </div>
          <div className="flex items-center xl:hidden">
            {isAuth ? (
              <ButtonPrimary onClick={() => dispatch(logoutUser())}>
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
    </div>
  );
};

export default MaiNnavprod;
