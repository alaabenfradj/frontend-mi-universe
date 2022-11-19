import React, { FC, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import facebookSvg from "images/Facebook.svg";
import twitterSvg from "images/Twitter.svg";
import googleSvg from "images/Google.svg";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";
import { useFormik } from "formik";
import { Alert } from "@mui/material";
import * as Yup from "yup";

export interface PageSignUpProps {
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

const PageSignUp: FC<PageSignUpProps> = ({ className = "" }) => {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);

  const SignupForm = () => {
    const validationSchema = Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(4, "First name must contain at least 6 characters")
        .max(15, "Password must contain at most 15 characters"),
      lastName: Yup.string()
        .required("First name is required")
        .min(4, "First name must contain at least 6 characters")
        .max(15, "Password must contain at most 15 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .required("password is required")
        .min(6, "Password must contain at least 6 characters")
        .matches(/\d/, "Password must contain a number"),
      password2: Yup.string()
        .required("confirm password is required")
        .oneOf([Yup.ref("password"), null], "Passwords must match"),
    });
    const onSubmit = async (values) => {
      const response = await axios
        .post("/authentication/register", values)
        .catch((err) => {
          if (err && err.response) {
            setErrors(err.response.data.message);
            setSuccess(null);
          }
        });
      if (response && response.data) {
        setErrors(null);
        setSuccess(response.data.message);
        formik.resetForm();
      }
    };

    const formik = useFormik({
      initialValues: {
        firstName: "",
        lastName: "",
        email: "",
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
              First Name
            </span>
            <Input
              id="firstName"
              name="firstName"
              type="text"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.firstName}
            />
          </label>
          {formik.touched.firstName && formik.errors.firstName ? (
            <Alert severity="error">{formik.errors.firstName}</Alert>
          ) : null}
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Last Name
            </span>
            <Input
              id="lastName"
              name="lastName"
              type="text"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.lastName}
            />
          </label>
          {formik.touched.lastName && formik.errors.lastName ? (
            <Alert severity="error">{formik.errors.lastName}</Alert>
          ) : null}
          <label className="block">
            <span className="text-neutral-800 dark:text-neutral-200">
              Email Address
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
        subHeading="Welcome to our blog magazine Community"
        headingEmoji="🎉"
        heading="Sign up"
      >
        <div className="max-w-md mx-auto space-y-6">
          <div className="grid gap-3">
            {loginSocials.map((item, index) => (
              <a
                href={item.href}
                key={index}
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
          <SignupForm />

          {/* ==== */}
          <span className="block text-center text-neutral-700 dark:text-neutral-300">
            Already have an account? {` `}
            <NcLink to="/mi/login">Sign in</NcLink>
          </span>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSignUp;
