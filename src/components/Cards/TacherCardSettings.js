import { Input } from "@material-ui/core";
import { Alert } from "@mui/material";
import { setUserLogedIn, userId } from "app/slices/userSlice";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import Label from "components/Label/Label";
import makeAnimated from 'react-select/animated';
import axios from "../../axiosInstance";
import Textarea from "components/Textarea/Textarea";

import Select from 'react-select'

// import { format } from 'date-fns';
// components

export default function TacherCardSettings() {

    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const [pdfFiles, setPdfFiles] = useState("");
    var currentUser = useSelector((state) => state.user.userLogedIn);
    const dispatch = useDispatch();
    const validationSchema = Yup.object({
        rib: Yup.string()
            .required("rib is required")
            .length(14, "rib is 14 characters long"),
        degrees: Yup.string()
            .required("degrees are required"),
        // specialties: Yup.array().length(1, "message"),
        about: Yup.string()
            .required("Description is required")
            .min(30, "Descriptionmust contain at least 30 characters")
            .max(300, "Password must contain at most 300 characters"),
    });
    const [selectedOption, setSelectedOption] = useState([])
    const handleInputChange = (selectedOption) => {
        setSelectedOption(selectedOption);
    };

    const options = [
        { value: 'guitar', label: 'guitar' },
        { value: 'piano', label: 'piano' },
        { value: 'Violin', label: 'Violin' },
        { value: 'voice', label: 'voice' }
    ]
    const animatedComponents = makeAnimated();


    const onSubmit = async (values) => {

        // var formData = new FormData();
        // formData.append("rib", values.rib);
        // formData.append("about", values.about);
        // for (let item of selectedOption) {
        //     formData.append("specialties", item.value);
        // }
        // for (const key of Object.keys(pdfFiles)) {
        //     formData.append("files", pdfFiles[key]);
        // }


        // const response = await axios.post("/teachers/register", formData).catch((err) => {
        //     if (err && err.response) {
        //         setErrors(err.response.data.message);
        //         setSuccess(null);
        //     }
        // });
        // if (response && response.data) {
        //     setErrors(null);
        //     setSuccess(response.data.message);
        //     dispatch(login(response.data.token));
        //     dispatch(getCurrentTeacher());
        //     history.push("/back-office/dashboard");
        // }
    };

    // const UpdateProfile = () => {

    //     const onSubmit = async (values) => {
    //         let user = {
    //             userName: values.userName,
    //             firstName: values.firstName,
    //             lastName: values.lastName,
    //             email: values.email,
    //             birthDate: values.birthDate,
    //             phoneNumber: values.phoneNumber,
    //             address: values.city + "-" + values.country + "-" + values.codePostale,
    //             aboutMe: values.aboutMe

    //         }
    //         if (values.password !== "") {
    //             user.password = values.password
    //         }


    //         const response = await axios
    //             .put(`/users/updateprofile/${currentUser._id}`, user)
    //             .catch((err) => {
    //                 if (err && err.response) {
    //                     setErrors(err.response.data.message);
    //                     setSuccess(null);
    //                 }
    //             });
    //         if (response && response.data) {
    //             dispatch(setUserLogedIn())
    //             setErrors(null);
    //             setSuccess(response.data.message);
    //             currentUser = user;
    //             currentUser.password = ""
    //             const timer = setTimeout(() => {
    //                 setSuccess(null);
    //             }, 2000);
    //             return () => clearTimeout(timer);

    //         }
    //     };
    //     let text = currentUser.address !== undefined ? currentUser.address : ""
    //     const myArray = text.split("-")
    //     const formik = useFormik({

    //         initialValues: {
    //             firstName: currentUser.firstName,
    //             lastName: currentUser.lastName,
    //             userName: currentUser.userName,
    //             email: currentUser.email,
    //             password: "",
    //             birthDate: currentUser.birthDate !== undefined ? currentUser.birthDate.slice(0, 10) : "",
    //             address: currentUser.address,
    //             phoneNumber: currentUser.phoneNumber,
    //             aboutMe: currentUser.aboutMe,


    //             city: myArray[0],
    //             country: myArray[1],
    //             codePostale: myArray[2]

    //         },
    //         validateOnBlur: true,
    //         onSubmit,
    //         validationSchema,
    //     });
    //     return (
    //         <div>
    //             {errors && <Alert severity="warning">{errors ? errors : ""}</Alert>}
    //             {success && <Alert severity="success">{success ? success : ""}</Alert>}
    //             <form onSubmit={formik.handleSubmit}>
    //                 <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
    //                     User Information
    //                 </h6>
    //                 <div className="flex flex-wrap">
    //                     <div className="w-full lg:w-6/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Username
    //                             </label>
    //                             <input
    //                                 id="userName"
    //                                 name="userName"
    //                                 type="text"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 placeholder="Username"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.userName}
    //                             />
    //                             {formik.touched.userName && formik.errors.userName ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.userName}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-6/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Email address
    //                             </label>
    //                             <input
    //                                 id="email"
    //                                 name="email"
    //                                 type="email"
    //                                 disabled={true}
    //                                 placeholder="Email address"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.email}
    //                             />
    //                             {formik.touched.email && formik.errors.email ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.email}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-6/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 First Name
    //                             </label>
    //                             <input
    //                                 id="firstName"
    //                                 name="firstName"
    //                                 type="text"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.firstName}
    //                                 placeholder="First Name"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                             />
    //                             {formik.touched.firstName && formik.errors.firstName ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.firstName}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-6/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Last Name
    //                             </label>
    //                             <input
    //                                 id="lastName"
    //                                 name="lastName"
    //                                 type="text"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.lastName}
    //                                 placeholder="Last Name"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                             />
    //                             {formik.touched.lastName && formik.errors.lastName ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.lastName}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-6/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Date of Birth
    //                             </label>
    //                             <input
    //                                 type="date"
    //                                 id="birthDate"
    //                                 name="birthDate"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.birthDate === undefined ? "" : formik.values.birthDate}
    //                                 placeholder="Date of Birth"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                             />
    //                             {formik.touched.birthDate && formik.errors.birthDate ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.birthDate}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-6/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Phone number
    //                             </label>
    //                             <input
    //                                 id="phoneNumber"
    //                                 name="phoneNumber"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.phoneNumber === undefined ? "" : formik.values.phoneNumber}

    //                                 type="number"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 placeholder="phone number"
    //                             />
    //                             {formik.touched.phoneNumber && formik.errors.phoneNumber ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.phoneNumber}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>

    //                     <div className="w-full lg:w-12/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Password
    //                             </label>
    //                             <input
    //                                 id="password"
    //                                 name="password"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.password}
    //                                 type="password"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 placeholder="************"
    //                             />
    //                             {formik.touched.password && formik.errors.password ? (
    //                                 <Alert className="mt-1" severity="error">{formik.errors.password}</Alert>
    //                             ) : null}
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <hr className="mt-6 border-b-1 border-blueGray-300" />

    //                 <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
    //                     Contact Information
    //                 </h6>
    //                 <div className="flex flex-wrap">
    //                     <div className="w-full lg:w-4/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 City
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 id="city"
    //                                 name="city"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.city}
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 // defaultValue="City"
    //                                 placeholder="City"
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-4/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Country
    //                             </label>
    //                             <input
    //                                 type="text"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 id="country"
    //                                 name="country"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.country}
    //                                 placeholder="Country"
    //                             />
    //                         </div>
    //                     </div>
    //                     <div className="w-full lg:w-4/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 Postal Code
    //                             </label>
    //                             <input
    //                                 id="codePostale"
    //                                 name="codePostale"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.codePostale}
    //                                 type="text"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 placeholder="Postal Code"
    //                             />
    //                         </div>
    //                     </div>
    //                 </div>

    //                 <hr className="mt-6 border-b-1 border-blueGray-300" />

    //                 <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
    //                     About Me
    //                 </h6>
    //                 <div className="flex flex-wrap">
    //                     <div className="w-full lg:w-12/12 px-4">
    //                         <div className="relative w-full mb-3">
    //                             <label
    //                                 className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
    //                                 htmlFor="grid-password"
    //                             >
    //                                 About me
    //                             </label>
    //                             <textarea
    //                                 id="aboutMe"
    //                                 name="aboutMe"
    //                                 onChange={formik.handleChange}
    //                                 onBlur={formik.handleBlur}
    //                                 value={formik.values.aboutMe === undefined ? "" : formik.values.aboutMe}
    //                                 type="text"
    //                                 placeholder="About me"
    //                                 className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
    //                                 rows="4"
    //                             ></textarea>
    //                         </div>
    //                     </div>
    //                 </div>
    //                 <ButtonPrimary type="submit">Save</ButtonPrimary>
    //             </form>
    //         </div>
    //     );
    // };


    return (
        <>
            {currentUser && <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                <div className="rounded-t bg-white mb-0 px-6 py-6">
                    <div className="text-center flex justify-between">
                        <h6 className="text-blueGray-700 text-xl font-bold">Teacher</h6>
                        <button
                            className="bg-lightBlue-500 text-white active:bg-lightBlue-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                            type="button"
                        >
                            Settings
                        </button>
                    </div>
                </div>
                <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    {/* <UpdateProfile /> */}
                    <Formik
                        initialValues={{
                            rib: "",
                            degrees: [],
                            about: "",
                        }}
                        validationSchema={validationSchema}
                        onSubmit={onSubmit}
                    >
                        {({
                            handleSubmit,
                            handleChange,
                            handleBlur,
                            setFieldValue,
                            values,
                            touched,
                            errors,
                        }) => (

                            <form
                                className="grid grid-cols-1 gap-6"
                                onSubmit={handleSubmit}
                            >
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
                                                Rib
                                            </label>
                                            <input
                                                id="rib"
                                                name="rib"
                                                type="number"
                                                className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                                onChange={handleChange}
                                                onBlur={handleBlur}
                                                value={values.rib}
                                            />
                                            {touched.rib && errors.rib ? (
                                                <Alert severity="error">{errors.rib}</Alert>
                                            ) : null}
                                        </div>
                                    </div>
                                </div>
                      
                                <label className="block">
                                    <Label>Specialties</Label>
                                    <Select
                                        name="specialties"
                                        id="specialties"
                                        value={selectedOption}
                                        onChange={handleInputChange}
                                        isMulti
                                        components={animatedComponents}
                                        closeMenuOnSelect={false} options={options} />
                                </label>
                                {touched.specialties && errors.specialties ? (
                                    <Alert severity="error">{errors.specialties}</Alert>
                                ) : null}

                                <label className="block">
                                    <Label>Certifications</Label>

                                    <Input
                                        id="degrees"
                                        name="degrees"
                                        type="file"
                                        className="mt-1 form-control form-control-sm"
                                        style={{ border: "1px solid #D1D1D1" }}
                                        accept="application/pdf"
                                        onChange={(event) => {
                                            setFieldValue("degrees", event.currentTarget.files);
                                            setPdfFiles(event.target.files);
                                        }}
                                        multiple
                                    />
                                </label>
                                {touched.degrees && errors.degrees ? (
                                    <Alert severity="error">You must add certifications (you can add mulitiple files)</Alert>
                                ) : null}
                                <label className="block">
                                    <Label>Message</Label>

                                    <Textarea
                                        id="about"
                                        name="about"
                                        className="mt-1"
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        value={values.about}
                                        rows={6}
                                    />
                                </label>
                                {touched.about && errors.about ? (
                                    <Alert severity="error">{errors.about}</Alert>
                                ) : null}
                                <ButtonPrimary type="submit">Continue</ButtonPrimary>
                            </form>
                        )}
                    </Formik>
                    
                </div>
            </div>}

        </>
    );
}
