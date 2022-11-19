import { isAuthenticated, userRoles } from "app/slices/userSlice";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BecomeTeacherRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(isAuthenticated);
  const roles = useSelector(userRoles);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return isAuth === true && !roles.includes("teacher") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/mi" />
          );
        }}
      />
    </div>
  );
};

export default BecomeTeacherRoute;
