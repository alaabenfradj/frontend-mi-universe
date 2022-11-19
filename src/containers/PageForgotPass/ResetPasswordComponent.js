import React, { useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../axiosInstance";
import { useHistory, useParams } from "react-router-dom";
import { useDispatch } from "react-redux";
import { getCurrentSeller, getCurrentStudent, getCurrentTeacher, login } from "app/slices/userSlice";
import jwt_decode from "jwt-decode";


const RestPasswordComponent = ({ className = "" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const params = useParams();
  const RestPassword = () => {
    const validationSchema = Yup.object({
      code: Yup.string()
        .required("code is required")
        .length(8, "Recuperation code must contain 8 characters"),
      password: Yup.string()
        .required("password is required")
        .min(6, "Password must contain at least 6 characters")
        .matches(/\d/, "Password must contain a number"),
      password2: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
    const onSubmit = async (values) => {
      const user = {
        email: params.email,
        password: values.password,
        confirmPassword: values.password2,
        code: values.code
      };
      axios
        .put("/authentication/reset", user)
        .then((res) => {
          setErrors(null);
          setSuccess(res.data.message);
          dispatch(login(res.data.token));
          const decoded = jwt_decode(res.data.token);

          if (decoded.user_role.includes("seller")) {
            dispatch(getCurrentSeller());
          }
          if (decoded.user_role.includes("student")) {
            dispatch(getCurrentStudent());
          }
          if (decoded.user_role.includes("teacher")) {
            dispatch(getCurrentTeacher());
          }
         
          setTimeout(() => { history.push("/mi") }, 1000)
        })
        .catch((err) => {
          setErrors(err.response.data.message);
          setSuccess(null);
          console.log(err.response.data);
        });
    };

    const formik = useFormik({
      initialValues: {
        code: "",
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
            <span className="text-neutral-800 dark:text-neutral-200">
              Recuperation code
            </span>
            <Input
              id="code"
              name="code"
              type="text"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.code}
            />
          </label>
          {formik.touched.code && formik.errors.code ? (
            <Alert severity="error">{formik.errors.code}</Alert>
          ) : null}
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
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
            <span className="text-neutral-800 dark:text-neutral-200">
              Confirm password
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
    <div
      className={`nc-PageForgotPass ${className}`}
      data-nc-id="PageForgotPass"
    >
      <Helmet>
        <title>Forgot Password </title>
      </Helmet>
      <LayoutPage
        subHeading="We will sent reset password instruction to your email"
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          <RestPassword />

          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Go back for {` `}
            <NcLink to="/login">Sign in</NcLink>
            {` / `}
            <NcLink to="/signup">Sign up</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default RestPasswordComponent;
