import React, { useEffect, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";
import { useFormik } from "formik";
import { Alert } from "@mui/material";
import jwt_decode from "jwt-decode";
import * as Yup from "yup";
import { useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentSeller, getCurrentStudent, getCurrentTeacher, login } from "app/slices/userSlice";

const PagePassword = ({ className = "" }) => {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [token, setToken] = useState(null);
  const [id, setId] = useState(null);
  const search = useLocation().search;
  const dispatch = useDispatch();
  const history = useHistory();
  useEffect(() => {
    setToken(new URLSearchParams(search).get("token"));
    setId(new URLSearchParams(search).get("id"));
  }, [token, id]);

  const RegisterPassport = () => {
    const validationSchema = Yup.object({
      password: Yup.string()
        .required("password is required")
        .min(6, "Password must contain at least 6 characters")
        .matches(/\d/, "Password must contain a number"),
      password2: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
    const onSubmit = async (values) => {
      let config = {
        headers: {
          Authorization: token,
        },
      };
      const response = await axios
        .put(`/authentication/setpassword/${id}`, values, config)
        .catch((err) => {
          if (err && err.response) {
            setErrors(err.response.data.message);
            setSuccess(null);
          }
        });
      if (response && response.data) {
        setErrors(null);
        setSuccess(response.data.message);
        dispatch(login(response.data.token));
        const decoded: any = jwt_decode(response.data.token);

        if (decoded.user_role.includes("seller")) {
          dispatch(getCurrentSeller());
        }
        if (decoded.user_role.includes("student")) {
          dispatch(getCurrentStudent());
        }
        if (decoded.user_role.includes("teacher")) {
          dispatch(getCurrentTeacher());
        }
        setTimeout(() => {
          history.push("/mi");
        }, 500);
        formik.resetForm();
      }
    };

    const formik = useFormik({
      initialValues: {
        password: "",
        password2: "",
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema,
    });
    return (
      <div>
        {errors && <Alert severity="warning">{errors ? errors : ""}</Alert>}
        {success && <Alert severity="success">{success ? success : ""}</Alert>}
        <form className="grid grid-cols-1 gap-6" onSubmit={formik.handleSubmit}>
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
            </span>
            <Input
              id="password"
              name="password"
              type="password"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? (
            <Alert severity="error">{formik.errors.password}</Alert>
          ) : null}
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Confirm Password
            </span>
            <Input
              id="password2"
              name="password2"
              type="password"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password2}
            />
          </label>
          {formik.touched.password2 && formik.errors.password2 ? (
            <Alert severity="error">{formik.errors.password2}</Alert>
          ) : null}

          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </form>
      </div>
    );
  };

  return (
    <div className={`nc-PageSignUp ${className}`} data-nc-id="PageSignUp">
      <Helmet>
        <title>Sign up || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="User was registered successfully!  Please enter your password to continue 	&#128578;"
        headingEmoji="🎉"
        heading="Sign up"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <RegisterPassport />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PagePassword;
