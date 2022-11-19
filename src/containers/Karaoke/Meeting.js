import { Helmet } from "react-helmet";

import image from "images/dance.jpg";
import { useSelector } from "react-redux";
import axios from "axiosInstance";

import NcImage from "components/NcImage/NcImage";

import { useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import { Alert } from "@mui/material";
import { useFormik } from "formik";
import * as Yup from "yup";
function Meeting() {
    const [token, setToken] = useState(null)
    const [errors, setErrors] = useState(null);
    const [success, setSuccess] = useState(null);
    const id = Math.random().toString(36).substring(2, 7);
    const [room, setRoom] = useState(null)

    const getToekn = async () => {
        const response = await axios.post(`create-token/${id}`)
        if (response.data.status) {
            setRoom(id);
            setToken(response.data.token)
        }
    }
    const createRoom = async () => {
        if (token != null) {
            history.push(`/mi/karaoke/${room}/${token}`)
        }
    }
    useEffect(() => {
        getToekn();
    }, [])
    const onSubmit = (values) => {
        const data = {
            email: values.email,
            name: userName,
            token: token,
            room: room
        }
        axios.post("/karaokeinvi", data)
            .then(response => {
                setErrors(null);
                formik.resetForm();
                setSuccess(response.data.message);
                setTimeout(() => {
                    setSuccess("")
                }, 1500)
            })
            .catch(err => {
                setErrors(err.response.data.message);
                setSuccess(null);
                setTimeout(() => {
                    setErrors("")
                }, 1500)
            })
    }
    const validationSchema = Yup.object({
        email: Yup.string()
            .email("Invalid email address")
            .required("Email is required"),

    });
    const formik = useFormik({
        initialValues: {
            email: "",

        },
        validateOnBlur: true,
        onSubmit,
        validationSchema,
    });
    let className = "";
    const history = useHistory();
    const userName = useSelector((state) => state.user.userLogedIn.firstName);
    return (
        <>
            <div style={{ marginBottom: "20px" }} className={`nc - PageSearch ${className}`} data-nc-id="PageSearch">
                <Helmet>
                    <title>MI || Karaoke</title>
                </Helmet>
                {/* HEADER */}
                <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
                    <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-5 overflow-hidden ">
                        <NcImage
                            containerClassName="absolute inset-0"
                            src={image}
                            className="object-cover w-full h-full"
                        />
                    </div>
                    {/* CONTENT */}
                    <div className="relative container -mt-20 lg:-mt-48">
                        <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
                            <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
                                <h2 className="text-2xl sm:text-4xl font-semibold">
                                    Make a Karaoke
                                </h2>
                            </header>
                        </div>
                    </div>
                </div>
                {/* ====================== END HEADER ====================== */}
            </div>

            <div className="container mt-20 grid grid-cols-2 gap-4 mb-10">

                <div className="block p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    {errors && <Alert severity="warning">{errors ? errors : ""}</Alert>}
                    {success && <Alert severity="success">{success ? success : ""}</Alert>}
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">New room</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">Hello {userName}!
                        Start by calling a friend by sending them a invittion .</p>
                    <form onSubmit={formik.handleSubmit}>
                        <label htmlFor="email-adress-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Invite friends</label>
                        <div className="relative">
                            <div className="flex absolute inset-y-0 left-0 items-center pl-3 pointer-events-none">
                                <svg className="w-5 h-5 text-gray-500 dark:text-gray-400" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" /><path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" /></svg>
                            </div>
                            <input
                                id="email"
                                name="email"
                                type="email"
                                onChange={formik.handleChange}
                                onBlur={formik.handleBlur}
                                value={formik.values.email}
                                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="name@flowbite.com" />
                        </div>
                        {formik.touched.email && formik.errors.email ? (
                            <Alert className="mt-3" severity="error">{formik.errors.email}</Alert>
                        ) : null}
                        <button type="submit" style={{ backgroundColor: '#1976D2' }} className="mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900"
                        >Send Invitation</button>
                        <input type="button" value='Create room' style={{ backgroundColor: '#1976D2' }} className="mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900 ml-5"
                            onClick={() => createRoom()}
                        />
                    </form>
                </div>

                <div className="block p-6  bg-white rounded-lg border border-gray-200 shadow-md hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
                    <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">Join room</h5>
                    <p className="font-normal text-gray-700 dark:text-gray-400">To join a room please past the url .</p>
                    <label htmlFor="email-adress-icon" className="block mb-2 text-sm font-medium text-gray-900 dark:text-gray-300">Room url</label>
                    <div className="relative">
                        <input type="text" id="email-adress-icon" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full pl-10 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="https://miuniverse.daily.co/" />
                    </div>
                    <button style={{ backgroundColor: '#1976D2' }} className="mt-3 focus:outline-none text-white bg-purple-700 hover:bg-purple-800 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-5 py-2.5 mb-2 dark:bg-purple-600 dark:hover:bg-purple-700 dark:focus:ring-purple-900">Join room</button>

                </div>

            </div>
        </>
    );
}

export default Meeting;
