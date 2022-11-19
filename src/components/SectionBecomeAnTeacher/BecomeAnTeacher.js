import React, { useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import LayoutPage from "components/LayoutPage/LayoutPage";
import SocialsList from "components/SocialsList/SocialsList";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";
import axios from "../../axiosInstance";
import { Alert } from "@mui/material";
import * as Yup from "yup";
import { Formik } from "formik";
import makeAnimated from 'react-select/animated';
import Select from 'react-select'
import { useDispatch } from "react-redux";
import { getCurrentTeacher, login } from "app/slices/userSlice";
import { useHistory } from "react-router-dom";


const info = [
  {
    title: "🗺 ADDRESS",
    desc: "Photo booth tattooed prism, portland taiyaki hoodie neutra typewriter",
  },
  {
    title: "💌 EMAIL",
    desc: "nc.example@example.com",
  },
  {
    title: "☎ PHONE",
    desc: "000-123-456-7890",
  },
];

const PageTeacher = ({ className = "" }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [pdfFiles, setPdfFiles] = useState("");
  
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

    var formData = new FormData();
    formData.append("rib", values.rib);
    formData.append("about", values.about);
    for (let item of selectedOption) {
      formData.append("specialties", item.value);
    }
    for (const key of Object.keys(pdfFiles)) {
      formData.append("files", pdfFiles[key]);
    }


    const response = await axios.post("/teachers/register", formData).catch((err) => {
      if (err && err.response) {
        setErrors(err.response.data.message);
        setSuccess(null);
      }
    });
    if (response && response.data) {
      setErrors(null);
      setSuccess(response.data.message);
      dispatch(login(response.data.token));
      dispatch(getCurrentTeacher());
      history.push("/back-office/dashboard");
    }
  };


  return (
    <div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
      <Helmet>
        <title>Become Teacher </title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us request and we will get back for you."
        headingEmoji=""
        heading="Become Teacher"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-sm space-y-6">
            {info.map((item, index) => (
              <div key={index}>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {item.title}
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </span>
              </div>
            ))}
            <div>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                🌏 SOCIALS
              </h3>
              <SocialsList className="mt-2" />
            </div>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
          <div>
            {errors && <Alert severity="warning">{errors ? errors : ""}</Alert>}
            {success && <Alert severity="success">{success ? success : ""}</Alert>}
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
                  <label className="block">
                    <Label>Rib</Label>

                    <Input
                      id="rib"
                      name="rib"
                      type="number"
                      className="mt-1"
                      onChange={handleChange}
                      onBlur={handleBlur}
                      value={values.rib}
                    />
                  </label>
                  {touched.rib && errors.rib ? (
                    <Alert severity="error">{errors.rib}</Alert>
                  ) : null}

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
                    <Label>About</Label>

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
            {/* <TeacherForm /> */}
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageTeacher;
