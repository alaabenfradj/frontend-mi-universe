import React, { FC, useState } from "react";
import LayoutPage from "components/LayoutPage/LayoutPage";
import Input from "components/Input/Input";
import ButtonPrimary from "components/Button/ButtonPrimary";
import NcLink from "components/NcLink/NcLink";
import { Helmet } from "react-helmet";
import { Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
import axios from "../../axiosInstance";
import { useHistory } from "react-router-dom";
export interface PageForgotPassProps {
  className?: string;
}

const PageForgotPass: FC<PageForgotPassProps> = ({ className = "" }) => {
  const [errors, setErrors] = useState(null);
  const history = useHistory();
  const ForgetPasswordForm = () => {
    const validationSchema = Yup.object({
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
    });
    const onSubmit = async (values) => {
      const response = await axios
        .put(`/authentication/resetpassword/${values.email}`)
        .catch((err) => {
          if (err && err.response) {
            setErrors(err.response.data.message);
          }
        });
      if (response && response.data) {
        console.log(response.data.email);
        history.push(`forgot-pass/${response.data.email}`);
        // formik.resetForm();
      }
    };

    const formik = useFormik({
      initialValues: {
        email: "",
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
        <title>Forgot Password || Blog Magazine React Template</title>
      </Helmet>
      <LayoutPage
       
        headingEmoji="🔐"
        heading="Forgot password"
      >
        <div className="max-w-md mx-auto space-y-6">
          {/* FORM */}
          <ForgetPasswordForm />

          {/* ==== */}
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

export default PageForgotPass;
