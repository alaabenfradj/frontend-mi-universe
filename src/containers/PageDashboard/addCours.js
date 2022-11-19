import { useState } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import Textarea from "components/Textarea/Textarea";
import axios from "../../axiosInstance";
import { Alert } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import makeAnimated from "react-select/animated";
import Select from "react-select";
import { useHistory } from "react-router-dom";
const customStyles = {
  width: "60%",
  marginLeft: "20%",
};

const AddCours = () => {
  const history = useHistory();
  const validationSchema = yup.object().shape({
    label: yup.string().min(2).max(15).required().trim(),
    description: yup.string().max(255).required().trim(),
    level: yup
      .string()
      .oneOf(["beginner", "intermediate", "advanced"])
      .default("beginner"),
    languages: yup
      .string()
      .oneOf(["english", "french", "arabic"])
      .default("english"),
    price: yup.number().integer().min(0).required(),
    duration: yup.number().integer().min(0).required(),
    category: yup
      .string()
      .oneOf([
        "voice",
        "guitar",
        "keyboards",
        "strings",
        "percussions",
        "brass",
        "woodwind",
        "others",
      ])
      .default("others"),
    CourseImage: yup
      .string()
      .notRequired()
      .default("1648931926897--téléchargement.jpg"),
  });
  const animatedComponents = makeAnimated();
  const optionscategory = [
    { value: "voice", label: "voice" },
    { value: "guitar", label: "guitar " },
    { value: "keyboards", label: "keyboards" },
    { value: "strings", label: "strings" },
    { value: "percussions", label: "percussions" },
    { value: "brass", label: "brass" },
    { value: "woodwind", label: "woodwind" },
    { value: "others", label: "others" },
  ];
  const optionslevel = [
    { value: "beginner", label: "beginner" },
    { value: "intermediate", label: "intermediate" },
    { label: "advanced", value: "advanced" },
  ];
  const optionslanguages = [
    { value: "english", label: "english" },
    { value: "french", label: "french" },
    { value: "arabic", label: "arbic" },
  ];

  const onSubmit = async (values) => {
    var formData = new FormData();
    formData.append("label", values.label);
    formData.append("price", values.price);
    formData.append("duration", values.duration);
    formData.append("description", values.description);
    formData.append("languages", values.languages);
    formData.append("category", values.category);
    formData.append("level", values.level);

    if (values.image !== null) formData.append("image", values.image);
    await axios.post("courses/add", formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    });
    history.replace("/mi/classroom/teacher");
  };

  return (
    <div
      className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-4 modal-body m-5"
      style={customStyles}
    >
      <Formik
        initialValues={{
          label: "",
          price: "",
          duration: "",
          description: "",
          level: "beginner",
          languages: "english",
          category: "others",
          image: null,
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
            className="grid md:grid-cols-2 gap-6 overflow-auto my-5"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <Label>Label</Label>
              <Input
                id="label"
                name="label"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
                placeholder="Example Doe"
                level="text"
                className="mt-1"
              />
            </label>
            {touched.label && errors.label ? (
              <Alert severity="error">{errors.label}</Alert>
            ) : null}

            <label className="block">
              <Label>Price</Label>
              <Input
                id="price"
                name="price"
                level="Number"
                type="number"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className="mt-1"
                min="0"
              />
            </label>
            {touched.price && errors.price ? (
              <Alert severity="error">{errors.price}</Alert>
            ) : null}
            <label className="block">
              <Label>Duration</Label>
              <Input
                level="text"
                id="duration"
                name="duration"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.duration}
                type="number"
                min="0"
              />
            </label>
            {touched.duration && errors.duration ? (
              <Alert severity="error">{errors.duration}</Alert>
            ) : null}
            <label className="block">
              <Label>Description</Label>
              <Textarea
                id="description"
                name="description"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                rows={6}
              />
            </label>
            {touched.description && errors.description ? (
              <Alert severity="error">{errors.description}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> Category</Label>
              <Select
                name="category"
                id="category"
                onChange={(e) => setFieldValue("category", e.value.toString())}
                components={animatedComponents}
                options={optionscategory}
                defaultValue={{ value: "others", label: "others" }}
              />
            </label>
            {touched.category && errors.category ? (
              <Alert severity="error">{errors.category}</Alert>
            ) : null}

            <label className="block md:col-span-2">
              <Label> Language</Label>
              <Select
                name="languages"
                id="languages"
                onChange={(e) => setFieldValue("languages", e.value.toString())}
                components={animatedComponents}
                options={optionslanguages}
                defaultValue={{ value: "english", label: "english" }}
              />
            </label>
            {touched.languages && errors.languages ? (
              <Alert severity="error">{errors.languages}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> Level</Label>
              <Select
                name="level"
                id="level"
                onChange={(e) => setFieldValue("level", e.value.toString())}
                components={animatedComponents}
                options={optionslevel}
                defaultValue={{ value: "beginner", label: "beginner" }}
              />
            </label>
            {touched.level && errors.level ? (
              <Alert severity="error">{errors.languages}</Alert>
            ) : null}
            <Input
              id="image"
              name="image"
              type="file"
              accept=".png, .jpg, .jpeg"
              className="mt-1 form-control form-control-sm"
              style={{ border: "1px solid #D1D1D1" }}
              onChange={(e) => setFieldValue("image", e.currentTarget.files[0])}
            />
            <ButtonPrimary className="md:col-span-2" type="submit">
              Add Cours
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
};

export default AddCours;
