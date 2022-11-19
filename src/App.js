import {
  getCurrentSeller,
  getCurrentStudent,
  getCurrentTeacher,
  logoutUser,
  setCurrentUser,
} from "app/slices/userSlice";
import { store } from "app/store";
import { setAuthToken } from "axiosInstance";
import jwt_decode from "jwt-decode";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import FronOfficeRoutes from "routers/FrontOfficeRoutes";
import BackOfficeRoutes from "routers/BackOfficeRoutes";
import IsAuthRoute from "routers/privateRoutes/IsAuthRoute";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./assets/styles/tailwind.css";
import IsAuthRouteAndAdmin from "routers/privateRoutes/isAuthAndAdminRoute";
import Dashboard from "views/admin/Dashboard";
import Tables from "views/admin/Tables";
import aa from "search-insights";


if (localStorage.token) {
  // Set auth token header auth
  var token = localStorage.token;
  setAuthToken(token);
  // Decode token and get user info and exp
  
  const decoded = jwt_decode(token);

  // Set user and isAuthenticated
  store.dispatch(setCurrentUser(decoded));

  // Check for expired token

  const currentTime = Date.now() / 1000; // to get in milliseconds
  if (decoded.expiresIn < currentTime) {
    // Logout user
    store.dispatch(logoutUser());
    // Redirect to login
    window.location.href = "./login";
  }
}

export default function App() {
  const dispatch = useDispatch();
  useEffect(() => {
    if (localStorage.token) {
      const decoded = jwt_decode(localStorage.token);
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
  }, [localStorage.token]);

  return (

    <BrowserRouter basename={process.env.REACT_APP_LRT_OR_RTL}>
      <Switch>
        <Route path="/mi" render={(props) => <FronOfficeRoutes {...props} />} />

        <IsAuthRoute path="/back-office" component={BackOfficeRoutes} />

        <Redirect from="*" to="/mi" />
      </Switch>
    </BrowserRouter>
  );
}
