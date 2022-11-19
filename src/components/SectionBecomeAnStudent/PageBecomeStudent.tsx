import React, { FC, useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";

import Label from "components/Label/Label";
import LayoutPage from "components/LayoutPage/LayoutPage";
import SocialsList from "components/SocialsList/SocialsList";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";

import { Alert } from "@mui/material";
import * as Yup from "yup";
import { useFormik } from "formik";
import axios from "../../axiosInstance";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { STUDENT_TAGS } from "data/taxonomies";

import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import TagStudent from "components/Tag/TagStudent";
import { WidgetTagsProps } from "components/WidgetTags/WidgetTags";
import { getCurrentStudent, login } from "app/slices/userSlice";

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

const tagsStudent = STUDENT_TAGS.filter((_, i) => i > 5);
const PageBecomeStudent = ({ className = "", tags = tagsStudent }) => {
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [studentTags, setTags] = useState([]);
  const dispatch = useDispatch();
  const WidgetStudentTags: FC<WidgetTagsProps> = ({
    className = "bg-neutral-100 dark:bg-neutral-800",
    tags,
  }) => {
    const onClick = (tag) => {
      if (studentTags.includes(tag)) {
        setTags(studentTags.filter((item) => item !== tag));
      } else {
        setTags([...studentTags, tag]);
      }
    };

    return (
      <div
        className={`nc-WidgetTags rounded-3xl overflow-hidden ${className}`}
        data-nc-id="WidgetTags"
      >
        <WidgetHeading1
          title="🏷 Interested In"
          viewAll={{ label: "View all", href: "/#" }}
        />
        <div className="flex flex-wrap p-4 xl:p-5">
          {tags.map((tag, i) => (
            <div key={tag.id} onClick={() => onClick(tag.name)}>
              <TagStudent
                studentTags={studentTags}
                className="mr-2 mb-2"
                key={tag.id}
                tag={tag}
              />
            </div>
          ))}
        </div>
      </div>
    );
  };

  const StudentForm = () => {
    const validationSchema = Yup.object({
      interestedIn: Yup.array().min(3, "You must choose at least 3 options"),
      about: Yup.string()
        .required("Description is required")
        .min(30, "Description must contain at least 30 characters")
        .max(300, "Password must contain at most 300 characters"),
    });
    const onSubmit = async (values) => {
      const response = await axios
        .post("/students/register", values)
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
        dispatch(getCurrentStudent());
        history.push("/back-office/dashboard");
        
      }
    };

    const formik = useFormik({
      initialValues: {
        interestedIn: studentTags,
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
          <WidgetStudentTags tags={tags} />
          {formik.touched.interestedIn && formik.errors.interestedIn ? (
            <Alert severity="error">{formik.errors.interestedIn}</Alert>
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
        <title>Become Student</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us request and we will get back for you."
        headingEmoji=""
        heading="Become Student"
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
            <StudentForm />
          </div>
        </div>
      </LayoutPage>
    </div>
  );
};

export default PageBecomeStudent;
