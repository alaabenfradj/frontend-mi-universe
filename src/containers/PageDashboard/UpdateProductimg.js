import React, { useState } from "react";
import Dropzone from "react-dropzone";
import axios from "../../axiosInstance";

import PhotoCamera from "@material-ui/icons/PhotoCamera";
import { useSelector } from "react-redux";
import { userId } from "app/slices/userSlice";
const UploadProductimg = (props) => {
  const [image, setImage] = useState("");
  //const id = useSelector(userId);

  const onDrop = (file) => {
    let formData = new FormData();
    const config = {
      header: { "content-type": "multipart/form-data" },
    };

    formData.append("picture", file[0]);
    axios
      .put(`/products/updateProductimg/${props.id}`, formData, config)
      .then((response) => {
        if (response.data.success) {
          setImage(response.data.image);
          props.refrechFunction(response.data.image);
        } else {
          alert("Failed to save the image in server");
        }
      })
      .catch((err) => {
        alert("Only png ,jpeg or jpg images are allowed !");
      });
  };

  return (
    <div>
      <Dropzone
        accept=".png, .jpg, .jpeg"
        image={image}
        onDrop={onDrop}
        multiple={false}
        maxSize={8000000}
      >
        {({ getRootProps, getInputProps }) => (
          <div
            style={{
              display: "flex",
              marginTop: 15,
              alignItmes: "center",
              justifyContent: "center",
              borderRadius: "50%",
              height: 35,
              width: 35,
              outline: "none",
              cursor: "pointer",
            }}
            {...getRootProps()}
          >
            <input {...getInputProps()} />
            <PhotoCamera
              style={{ outline: "none", fontSize: "2rem", color: "#292b2c" }}
            />
          </div>
        )}
      </Dropzone>
    </div>
  );
};

export default UploadProductimg;
