import React, { FC, useState } from "react";
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
import { useFormik } from "formik";
import { getCurrentSeller, login } from "app/slices/userSlice";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
export interface PageContactProps {
  className?: string;
}

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

const PageSeller: FC<PageContactProps> = ({ className = "" }) => {
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const dispatch = useDispatch();
  const TeacherForm = () => {
    const validationSchema = Yup.object({
      rib: Yup.string()
        .required("rib is required")
        .length(14, "rib is 14 characters long"),
      about: Yup.string()
        .required("Description is required")
        .min(30, "Descriptionmust contain at least 30 characters")
        .max(300, "Password must contain at most 300 characters"),
    });
    const onSubmit = async (values) => {
      const response = await axios
        .post("/sellers/register", values)
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
        dispatch(getCurrentSeller());
        history.push("/back-office/dashboard");
      
      }
    };

    const formik = useFormik({
      initialValues: {
        rib: "",
        about: "",
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
            <Label>Rib</Label>

            <Input
              id="rib"
              name="rib"
              type="number"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.rib}
            />
          </label>
          {formik.touched.rib && formik.errors.rib ? (
            <Alert severity="error">{formik.errors.rib}</Alert>
          ) : null}
          <label className="block">
            <Label>Description</Label>

            <Textarea
              id="about"
              name="about"
              className="mt-1"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.about}
              rows={6}
            />
          </label>
          {formik.touched.about && formik.errors.about ? (
            <Alert severity="error">{formik.errors.about}</Alert>
          ) : null}
          <ButtonPrimary type="submit">Continue</ButtonPrimary>
        </form>
      </div>
    );
  };

  return (
    <div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
      <Helmet>
        <title>Become Seller</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us request and we will get back for you."
        headingEmoji=""
        heading="Become Seller"
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
            <TeacherForm />
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageSeller;
