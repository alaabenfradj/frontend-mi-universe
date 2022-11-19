import { Input } from "@material-ui/core";
import { Alert } from "@mui/material";
import { setUserLogedIn, userId } from "app/slices/userSlice";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../axiosInstance";
import TacherCardSettings from "./TacherCardSettings";
// import { format } from 'date-fns';
// components

export default function CardSettings() {
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  var currentUser = useSelector((state) => state.user.userLogedIn);
  const dispatch = useDispatch();
  const UpdateProfile = () => {
    const validationSchema = Yup.object({
      firstName: Yup.string()
        .required("First name is required")
        .min(4, "First name must contain at least 6 characters")
        .max(15, "First name must contain at most 15 characters"),
      userName: Yup.string()
        .required("Username name is required")
        .min(3, "Username must contain at least 3 characters"),

      phoneNumber: Yup.number().required("Phone number is required"),

      birthDate: Yup.date().required("Required").nullable(),

      lastName: Yup.string()
        .required("Last name is required")
        .min(4, "Last name must contain at least 6 characters")
        .max(15, "Last name must contain at most 15 characters"),
      email: Yup.string()
        .email("Invalid email address")
        .required("Email is required"),
      password: Yup.string()
        .min(6, "Password must contain at least 6 characters")
        .matches(/\d/, "Password must contain a number"),
    });
    const onSubmit = async (values) => {
      let user = {
        userName: values.userName,
        firstName: values.firstName,
        lastName: values.lastName,
        email: values.email,
        birthDate: values.birthDate,
        phoneNumber: values.phoneNumber,
        address: values.city + "-" + values.country + "-" + values.codePostale,
        aboutMe: values.aboutMe,
      };
      if (values.password !== "") {
        user.password = values.password;
      }

      const response = await axios
        .put(`/users/updateprofile/${currentUser._id}`, user)
        .catch((err) => {
          if (err && err.response) {
            setErrors(err.response.data.message);
            setSuccess(null);
          }
        });
      if (response && response.data) {
        dispatch(setUserLogedIn());
        setErrors(null);
        setSuccess(response.data.message);
        currentUser = user;
        currentUser.password = "";
        const timer = setTimeout(() => {
          setSuccess(null);
        }, 2000);
        return () => clearTimeout(timer);
      }
    };
    let text = currentUser.address !== undefined ? currentUser.address : "";
    const myArray = text.split("-");
    const formik = useFormik({
      initialValues: {
        firstName: currentUser.firstName,
        lastName: currentUser.lastName,
        userName: currentUser.userName,
        email: currentUser.email,
        password: "",
        birthDate:
          currentUser.birthDate !== undefined
            ? currentUser.birthDate.slice(0, 10)
            : "",
        address: currentUser.address,
        phoneNumber: currentUser.phoneNumber,
        aboutMe: currentUser.aboutMe,

        city: myArray[0],
        country: myArray[1],
        codePostale: myArray[2],
      },
      validateOnBlur: true,
      onSubmit,
      validationSchema,
    });
    return (
      <div>
        {errors && <Alert severity="warning">{errors ? errors : ""}</Alert>}
        {success && <Alert severity="success">{success ? success : ""}</Alert>}
        <form onSubmit={formik.handleSubmit}>
          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            User Information
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Username
                </label>
                <input
                  id="userName"
                  name="userName"
                  type="text"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="Username"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.userName}
                />
                {formik.touched.userName && formik.errors.userName ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.userName}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Email address
                </label>
                <input
                  disabled={true}
                  id="email"
                  name="email"
                  type="email"
                  placeholder="Email address"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.email}
                />
                {formik.touched.email && formik.errors.email ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.email}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  First Name
                </label>
                <input
                  id="firstName"
                  name="firstName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.firstName}
                  placeholder="First Name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                {formik.touched.firstName && formik.errors.firstName ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.firstName}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Last Name
                </label>
                <input
                  id="lastName"
                  name="lastName"
                  type="text"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.lastName}
                  placeholder="Last Name"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                {formik.touched.lastName && formik.errors.lastName ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.lastName}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Date of Birth
                </label>
                <input
                  type="date"
                  id="birthDate"
                  name="birthDate"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.birthDate === undefined
                      ? ""
                      : formik.values.birthDate
                  }
                  placeholder="Date of Birth"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                />
                {formik.touched.birthDate && formik.errors.birthDate ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.birthDate}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-6/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Phone number
                </label>
                <input
                  id="phoneNumber"
                  name="phoneNumber"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.phoneNumber === undefined
                      ? ""
                      : formik.values.phoneNumber
                  }
                  type="number"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="phone number"
                />
                {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.phoneNumber}
                  </Alert>
                ) : null}
              </div>
            </div>
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  Password
                </label>
                <input
                  id="password"
                  name="password"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={formik.values.password}
                  type="password"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  placeholder="************"
                />
                {formik.touched.password && formik.errors.password ? (
                  <Alert className="mt-1" severity="error">
                    {formik.errors.password}
                  </Alert>
                ) : null}
              </div>
            </div>
          </div>

          <hr className="mt-6 border-b-1 border-blueGray-300" />

          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
            About Me
          </h6>
          <div className="flex flex-wrap">
            <div className="w-full lg:w-12/12 px-4">
              <div className="relative w-full mb-3">
                <label
                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                  htmlFor="grid-password"
                >
                  About me
                </label>
                <textarea
                  id="aboutMe"
                  name="aboutMe"
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                  value={
                    formik.values.aboutMe === undefined
                      ? ""
                      : formik.values.aboutMe
                  }
                  type="text"
                  placeholder="About me"
                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                  rows="4"
                ></textarea>
              </div>
            </div>
          </div>
          <ButtonPrimary type="submit">Save</ButtonPrimary>
        </form>
      </div>
    );
  };

  return (
    <>
      {currentUser && (
        <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
          <div className="rounded-t bg-white mb-0 px-6 py-6">
            <div className="text-center flex justify-between">
              <h6 className="text-blueGray-700 text-xl font-bold">
                My account
              </h6>
              <button
                className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                type="button"
              >
                Settings
              </button>
            </div>
          </div>
          <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
            <UpdateProfile />
          </div>
        </div>
      )}
      {/* <TacherCardSettings /> */}
    </>
  );
}
