import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import Textarea from "components/Textarea/Textarea";
import axios from "../../axiosInstance";
import { Alert } from "@mui/material";
import * as yup from "yup";
import { Formik } from "formik";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpenChapter } from "app/slices/modalSlice";
import { useParams } from "react-router-dom";
import { setChange } from "app/slices/courseSlice";
function Updatechapter() {
  const params = useParams();
  const dispatch = useDispatch();
  const course = useSelector((state) => state.courseSlice.selectedCourse);
  const chapter = useSelector((state) => state.courseSlice.chapter);
  const validationSchema = yup.object().shape({
    title: yup.string().required().trim(),
    description: yup.string().required().trim(),
  });
  const onSubmit = async (values) => {
    await axios.put(`chapters/${chapter._id}`, {
      title: values.title,
      description: values.description,
    });
    dispatch(setIsOpenChapter(false));
    dispatch(setChange());
  };

  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-4 modal-body m-5">
      <Formik
        initialValues={{
          title: chapter.title,
          description: chapter.description,
        }}
        validationSchema={validationSchema}
        onSubmit={onSubmit}
      >
        {({
          handleSubmit,
          handleChange,
          handleBlur,
          values,
          touched,
          errors,
        }) => (
          <form
            className="grid md:grid-cols-2 gap-6 overflow-auto my-5"
            onSubmit={handleSubmit}
          >
            <label className="block">
              <Label>title</Label>
              <Input
                id="title"
                name="title"
                type="text"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.title}
                placeholder="Example Doe"
                level="text"
                className="mt-1"
              />
            </label>
            {touched.title && errors.title ? (
              <Alert severity="error">{errors.title}</Alert>
            ) : null}
            <br></br>
            <label className="block md:col-span-2">
              <Label>Description</Label>
              <Textarea
                id="description"
                name="description"
                className="mt-1"
                onChange={handleChange}
                onBlur={handleBlur}
                value={values.description}
                rows={10}
              />
            </label>
            {touched.description && errors.description ? (
              <Alert severity="error">{errors.description}</Alert>
            ) : null}
            <ButtonPrimary className="md:col-span-2" type="submit">
              update Chapter
            </ButtonPrimary>
          </form>
        )}
      </Formik>
    </div>
  );
}

export default Updatechapter;
