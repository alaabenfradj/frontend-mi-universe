import { isAuthenticated, userRoles } from "app/slices/userSlice";
import { useSelector } from "react-redux";
import { Route, Redirect } from "react-router-dom";

const BecomeStudentRoute = ({ component: Component, ...rest }) => {
  const isAuth = useSelector(isAuthenticated);
  const roles = useSelector(userRoles);
  return (
    <div>
      <Route
        {...rest}
        render={(props) => {
          return isAuth === true && !roles.includes("student") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/mi" />
          );
        }}
      />
    </div>
  );
};

export default BecomeStudentRoute;
