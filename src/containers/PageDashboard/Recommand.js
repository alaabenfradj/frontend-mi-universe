import React from "react";
import { useSelector } from "react-redux";
import aa from "search-insights";
import SearchPage from "./Searchpage";
//import SearchPage from "./Searchpage"


const Recommand = () => {
    const currentUser = useSelector(
        (state) => state.user.userLogedIn
      );
      aa('init',{
        appId:'1RY92FSHMF',
        apiKey:'2a5deb3323c4edb2ecbcc46687c2c216'
        })
        aa('setUserToken',currentUser._id);

    return (
      <>
    <SearchPage/>
      </>
    );
  };
  
  export default Recommand;