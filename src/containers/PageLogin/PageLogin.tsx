import LayoutPage from "components/LayoutPage/LayoutPage";
import React, { FC, useState } from "react";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import jwt_decode from "jwt-decode";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";
import { useDispatch } from "react-redux";
import {
  getCurrentSeller,
  getCurrentStudent,
  getCurrentTeacher,

  login,
} from "app/slices/userSlice";
import { useFormik } from "formik";
import * as Yup from "yup";
import { Alert } from "@mui/material";
import { useHistory } from "react-router-dom";

export interface PageLoginProps {
  className?: string;
}

const loginSocials = [
  {
    name: "Continue with Facebook",
    href: "http://localhost:5050/authentication/facebook",
    icon: facebookSvg,
  },
  {
    name: "Continue with Github",
    href: "http://localhost:5050/authentication/github",
    icon: twitterSvg,
  },
  {
    name: "Continue with Google",
    href: "http://localhost:5050/authentication/google",
    icon: googleSvg,
  },
];

const PageLogin: FC<PageLoginProps> = ({ className = "" }) => {
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const dispatch = useDispatch();

  const SigninForm = () => {
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("password is required")
        .min(6, "Password must contain at least 6 characters")
        .matches(/\d/, "Password must contain a number"),
    });
    const onSubmit = async (values) => {
      const response = await axios
        .post("/authentication/login", values)
        .catch((err) => {
          if (err && err.response) {
            setErrors(err.response.data.message);
          }
        });
      if (response && response.data) {
        setErrors(null);
        dispatch(login(response.data.token));
        const decoded: any = await jwt_decode(response.data.token);

        if (decoded.user_role.includes("seller")) {
          dispatch(getCurrentSeller());
        }
        if (decoded.user_role.includes("student")) {
          dispatch(getCurrentStudent());
        }
        if (decoded.user_role.includes("teacher")) {
          dispatch(getCurrentTeacher());
        }
        history.push("/mi");
      }
    };

    const formik = useFormik({
      initialValues: {
        email: "",
        password: "",
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema,
    });
    return (
      <div>
        {errors && <Alert severity="warning">{errors ? errors : ""}</Alert>}
        <form className="grid grid-cols-1 gap-6" onSubmit={formik.handleSubmit}>
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email address
            </span>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="example@example.com"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? (
            <Alert severity="error">{formik.errors.email}</Alert>
          ) : null}
          <label className="block">
            <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
              Password
              <NcLink to="/mi/forgot-pass" className="text-sm">
                Forgot password?
              </NcLink>
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
          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </form>
      </div>
    );
  };

  return (
    <div className={`nc-PageLogin ${className}`} data-nc-id="PageLogin">
      <Helmet>
        <title>Login || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🔑"
        heading="Login"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                key={index}
                href={item.href}
                className="nc-will-change-transform flex w-full rounded-lg bg-primary-50 dark:bg-neutral-800 px-4 py-3 transform transition-transform sm:px-6 hover:translate-y-[-2px]"
              >
                <img
                  className="flex-shrink-0"
                  src={item.icon}
                  alt={item.name}
                />
                <h3 className="flex-grow text-center text-sm font-medium text-neutral-700 dark:text-neutral-300 sm:text-sm">
                  {item.name}
                </h3>
              </a>
            ))}
          </div>
          {/* OR */}
          <div className="relative text-center">
            <span className="relative z-10 inline-block px-4 font-medium text-sm bg-white dark:text-neutral-400 dark:bg-neutral-900">
              OR
            </span>
            <div className="absolute left-0 w-full top-1/2 transform -translate-y-1/2 border border-neutral-100 dark:border-neutral-800"></div>
          </div>
          {/* FORM */}
          <SigninForm />
          {/* <form
            className="grid grid-cols-1 gap-6"
            onSubmit={(e) => onSubmit(e)}
          >
            <label className="block">
              <span className="text-neutral-800 dark:text-neutral-200">
                Email address
              </span>
              <Input
                onChange={(e) => onchange(e)}
                name="email"
                value={user.email}
                type="email"
                placeholder="example@example.com"
                className="mt-1"
              />
            </label>
            <label className="block">
              <span className="flex justify-between items-center text-neutral-800 dark:text-neutral-200">
                Password
                <NcLink to="/forgot-pass" className="text-sm">
                  Forgot password?
                </NcLink>
              </span>
              <Input
                onChange={(e) => onchange(e)}
                name="password"
                value={user.password}
                type="password"
                className="mt-1"
              />
            </label>
            <ButtonPrimary type="submit">Continue</ButtonPrimary>
          </form> */}

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            New user? {` `}
            <NcLink to="/mi/signup">Create an account</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageLogin;
