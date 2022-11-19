import { Input } from "@material-ui/core";
import { Alert } from "@mui/material";
import { setUserLogedIn, userId } from "app/slices/userSlice";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { Formik, useFormik } from "formik";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";
import axios from "../../axiosInstance";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import makeAnimated from "react-select/animated";
import { selectopen } from "app/productslice/Productslice";
import { addProduct } from "app/productslice/Productsliceseller";
import Label from "components/Label/Label";
import Textarea from "components/Textarea/Textarea";
// import { format } from 'date-fns';
// components

export default function Cardproducts() {
  const dispatch = useDispatch();
  const history = useHistory();
  const [errors, setErrors] = useState(null);
  const [success, setSuccess] = useState(null);
  const [productImage, setimagesfiles] = useState("");
  const [face, setFace] = useState("");
  const [body, setBody] = useState("");
  const [chords, setChords] = useState("");
  const [piano, setPiano] = useState("");
  const [keys, setKeys] = useState("");
  const [hinges, setHinges] = useState("");
  const [circulos, setCirculos] = useState("");
  const [upper, setUpper] = useState("");
  const [stick, setStick] = useState("");
  const validationSchema = Yup.object({
    label: Yup.string()
      .required("label is required")
      .min(4, "label contain 4 charachters at least")
      .max(15, "label contain 15 charachters at most"),
    category: Yup.string().required("Category is required"),
    description: Yup.string()
      .required("Description is required")
      .min(30, "Description must contain at least 30 characters")
      .max(300, "Description must contain at most 300 characters"),
    marque: Yup.string().required("Marque is required"),
    price: Yup.number("Price contains just number ").required(
      "Price is required"
    ),
    reference: Yup.string().required("Reference is required"),
    state: Yup.string().required("Degrees are required"),
    type: Yup.string().required("Type are required"),
  });

  const [selectedOptiontype, setSelectedOptiontype] = useState([]);
  const [selectedOptioncategory, setSelectedOptincategory] = useState([]);
  const [selectedOptionmarque, setSelectedOptionmarque] = useState([]);
  const [selectedOptionstate, setSelectedOptionstate] = useState([]);
  const animatedComponents = makeAnimated();
  const handleInputChangetype = (selectedOptiontype) => {
    setSelectedOptiontype(selectedOptiontype);
  };
  const handleInputChangecategory = (selectedOptioncategory) => {
    setSelectedOptincategory(selectedOptioncategory);
  };

  const handleInputChangestate = (selectedOptionstate) => {
    setSelectedOptionstate(selectedOptionstate);
  };

  const handleInputChangemarque = (selectedOptionmarque) => {
    setSelectedOptionmarque(selectedOptionmarque);
  };

  const colors = [
    {value: "blue", label: "Blue"},
    {value: "red", label: "Red"},
    {value: "black", label: "Black"},
    {value: "yellow", label: "Yellow"},
    {value: "white", label: "White"},
    {value: "gray", label: "Gray"},
    {value: "green", label: "Green"},
    {value: "cyan", label: "Cyan"},
    {value: "magenta", label: "Magenta"},
    {value: "darkgray", label: "Darkgray"},
    {value: "lightblue", label: "Light Blue"},
    {value: "lightred", label: "Light Red"},
    {value: "lightblack", label: "Light Black"},
    {value: "lightyellow", label: "Light Yellow"},
    {value: "lightgreen", label: "Light Green"},
    {value: "lightcyan", label: "Light Cyan"}
  ]

  const optionscategory = [
    { value: "guitars", label: "guitars" },
    { value: "keyboards", label: "keyboards" },
    { value: "strings", label: "strings" },
    { value: "brass", label: "brass" },
    { value: "percussions", label: "percussions" },
    { value: "woodwind", label: "woodwind" },
    { value: "guitarElectrique", label: "guitar Electrique" },
    { value: "others", label: "others" },
  ];
  const optionstype = [
    { value: "instrument", label: "instrument" },
    { value: "gear", label: "gear" },
  ];
  const optionsmarque = [
    { value: "yamaha", label: "yamaha" },
    { value: "shure", label: "shure" },
    { value: "gibson", label: "gibson" },
    { value: "harman", label: "harman" },
    { value: "fender", label: "fender" },
    { value: "steinway", label: "steinway" },
    { value: "roland", label: "roland" },
    { value: "others", label: "others" },
  ];
  const optionsstate = [
    { value: "new", label: "new" },
    { value: "used", label: "used" },
  ];

  const onSubmit = async (values, { resetForm }) => {
    var colors = { face: "", body: "", chords: "",
      piano: "",keys:"",hinges: "",circulos: "",
      upper: "", stick: ""};
    if(face.value) colors.face = face.value
    if(body.value) colors.body = body.value
    if(chords.value) colors.chords = chords.value
    if(piano.value) colors.piano = piano.value
    if(keys.value) colors.keys = keys.value
    if(hinges.value) colors.hinges = hinges.value
    if(circulos.value) colors.circulos = circulos.value
    if(upper.value) colors.upper = upper.value
    if(stick.value) colors.stick = stick.value
    var formData = new FormData();
    formData.append("label", values.label);
    formData.append("description", values.description);
    formData.append("reference", values.reference);
    formData.append("price", values.price);

    formData.append("category", selectedOptioncategory.value.toString());
    formData.append("marque", selectedOptionmarque.value.toString());
    formData.append("type", selectedOptiontype.value.toString());
    formData.append("state", selectedOptionstate.value.toString());
    for (const key of Object.keys(productImage)) {
      formData.append("files", productImage[key]);
    }
    //== console.log(values);
    // console.log(selectedOptioncategory.value);
    // console.log(selectedOptionstate.value);
    // console.log(selectedOptiontype.value);
    // console.log(selectedOptionmarque.value);
    console.log(formData)
    const response = await axios
      .post("/products/add-product", formData)
      .catch((err) => {
        if (err && err.response) {
          setErrors(err.response.data.message);
          setSuccess(null);
          console.log(err);
        }
      });
    if (response && response.data) {
      // onSubmitProps.resetForm();
      resetForm();
      dispatch(addProduct(response.data.products));
      dispatch(selectopen(false));
      setErrors(null);
      setSuccess(response.data.message);
    }
  };

  return (
    <div>
      <Formik
        initialValues={{
          label: "",
          price: "",
          reference: "",
          description: "",
          state: "new",
          type: "gear",
          marque: "yamaha",
          category: "guitars",

          productImage: [],
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
          <form className="grid md:grid-cols-2 gap-6" onSubmit={handleSubmit}>
            <label className="block">
              <Label>Label</Label>
              <Input
                id="label"
                name="label"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.label}
                placeholder="Example Doe"
                type="text"
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
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.price}
                className="mt-1"
              />
            </label>
            {touched.price && errors.price ? (
              <Alert severity="error">{errors.price}</Alert>
            ) : null}
            <label className="block">
              <Label>Reference</Label>
              <Input
                type="text"
                id="reference"
                name="reference"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.reference}
              />
            </label>
            {touched.reference && errors.reference ? (
              <Alert severity="error">{errors.reference}</Alert>
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
                value={selectedOptioncategory}
                onChange={handleInputChangecategory}
                components={animatedComponents}
                options={optionscategory}
              />
            </label>
            {touched.category && errors.category ? (
              <Alert severity="error">{errors.category}</Alert>
            ) : null}

            <label className="block md:col-span-2">
              <Label> Marque</Label>
              <Select
                name="marque"
                id="marque"
                value={selectedOptionmarque}
                onChange={handleInputChangemarque}
                components={animatedComponents}
                options={optionsmarque}
              />
            </label>
            {touched.marque && errors.marque ? (
              <Alert severity="error">{errors.marque}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> Type</Label>
              <Select
                name="type"
                id="type"
                value={selectedOptiontype}
                onChange={handleInputChangetype}
                components={animatedComponents}
                options={optionstype}
              />
            </label>
            {touched.type && errors.type ? (
              <Alert severity="error">{errors.marque}</Alert>
            ) : null}
            <label className="block md:col-span-2">
              <Label> State</Label>
              <Select
                name="state"
                id="state"
                value={selectedOptionstate}
                onChange={handleInputChangestate}
                components={animatedComponents}
                options={optionsstate}
              />
            </label>
            {touched.state && errors.state ? (
              <Alert severity="error">{errors.state}</Alert>
            ) : null}

            <Input
              id="productImage"
              name="productImage"
              type="file"
              className="mt-1 form-control form-control-sm"
              style={{ border: "1px solid #D1D1D1" }}
              onChange={(event) => {
                setFieldValue("productImage", event.currentTarget.files);
                setimagesfiles(event.target.files);
              }}
              multiple
            />
            {touched.productImage && errors.productImage ? (
              <Alert severity="error">{errors.productImage}</Alert>
            ) : null}

            {selectedOptioncategory.value === "guitars" || selectedOptioncategory.value === "guitarElectrique" ? (
            <label className="block md:col-span-2">
              <Label> Face</Label>
              <Select
                name="face"
                id="face"
                value={face}
                onChange={(e) => setFace(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null} 


            {selectedOptioncategory.value === "violin" || selectedOptioncategory.value === "guitars" 
            || selectedOptioncategory.value === "strings"? (
            <label className="block md:col-span-2">
              <Label> Body</Label>
              <Select
                name="body"
                id="body"
                value={body}
                onChange={(e) => setBody(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null} 
            {selectedOptioncategory.value === "guitars" || selectedOptioncategory.value === "guitarElectrique"? (
            <label className="block md:col-span-2">
              <Label> Chords</Label>
              <Select
                name="chords"
                id="chords"
                value={chords}
                onChange={(e) => setChords(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null} 
            {selectedOptioncategory.value === "guitarElectrique"? (
            <label className="block md:col-span-2">
              <Label> Upper</Label>
              <Select
                name="upper"
                id="upper"
                value={upper}
                onChange={(e) => setUpper(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null} 
            {selectedOptioncategory.value === "guitarElectrique" || selectedOptioncategory.value === "percussions" ? (
            <label className="block md:col-span-2">
              <Label> Circulos</Label>
              <Select
                name="circulos"
                id="circulos"
                value={circulos}
                onChange={(e) => setCirculos(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null}
            {selectedOptioncategory.value === "keyboards" ?(
            <label className="block md:col-span-2">
              <Label> Piano</Label>
              <Select
                name="piano"
                id="piano"
                value={piano}
                onChange={(e) => setPiano(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null}
            {selectedOptioncategory.value === "keyboards" ?(
            <label className="block md:col-span-2">
              <Label> Keys</Label>
              <Select
                name="keys"
                id="keys"
                value={keys}
                onChange={(e) => setKeys(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null}
            {selectedOptioncategory.value === "keyboards" ?(
            <label className="block md:col-span-2">
              <Label> Hinges</Label>
              <Select
                name="hinges"
                id="hinges"
                value={hinges}
                onChange={(e) => setHinges(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null}
            {selectedOptioncategory.value === "strings" ?(
            <label className="block md:col-span-2">
              <Label> Stick</Label>
              <Select
                name="stick"
                id="stick"
                value={stick}
                onChange={(e) => setStick(e)}
                components={animatedComponents}
                options={colors}
              />
            </label>): null}

            <ButtonPrimary className="md:col-span-2" type="submit">
              Add product
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
}
