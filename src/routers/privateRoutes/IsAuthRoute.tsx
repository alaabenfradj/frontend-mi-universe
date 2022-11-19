import { isAuthenticated } from "app/slices/userSlice";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const IsAuthRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(isAuthenticated);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return isAuth === true ? (
            <Component {...props} />
          ) : (
            <Redirect to="/mi/login" />
          );
        }}
      />
    </div>
  );
};

export default IsAuthRoute;
