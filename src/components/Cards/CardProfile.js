import { setUserLogedIn, userLogedIn } from "app/slices/userSlice";
import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import UploadImage from "views/admin/UploadImage";
import img from "../../assets/img/team-2-800x800.jpg";
// components

export default function CardProfile() {
  const user = useSelector((state) => state.user.userLogedIn);

  const [image, setImage] = useState(null);
  const [address, setAddress] = useState([]);

  const dipatch = useDispatch();

  useEffect(() => {
    let text = user.address !== undefined ? user.address : "";
    const myArray = text.split("-");
    setAddress(myArray);
    setImage(user.profilePicture);
  }, [user]);

  const updateImage = (image) => {
    setImage(image);
    dipatch(setUserLogedIn());
  };
  return (
    <>
      {user != null && (
        <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg mt-16">
          <div className="px-6">
            <div className="flex flex-wrap justify-center">
              <div className="w-full px-4 flex justify-center">
                {image && (
                  <img
                    alt=""
                    style={{ width: "150px", height: "150px" }}
                    className="shadow-xl rounded-full h-auto align-middle border-none absolute -m-16 -ml-20 lg:-ml-16 max-w-180-px"
                    src={image !== null ? `http://localhost:5050/${image}` : ""}
                  />
                )}
              </div>
              <div className="w-full px-4 z-10 text-center mt-2 ml-10">
                <div className="flex justify-center  ml-10 lg:pt-4 pt-8">
                  <div className="mr-4 p-3  ml-10 text-center">
                    <UploadImage refrechFunction={updateImage} />
                  </div>
                </div>
              </div>
            </div>
            <div className="text-center mt-12">
              <h3 className="text-xl font-semibold leading-normal mb-2 text-blueGray-700 mb-2">
                {user.firstName + " " + user.lastName}
              </h3>

              {
                <div className="mb-2 text-blueGray-600 mt-10">
                  Date of Birth :{" "}
                  {user.birthDate !== undefined
                    ? user.birthDate.slice(0, 10)
                    : ""}
                </div>
              }
              {/* <div className="mb-2 text-blueGray-600">
              <i className="fas fa-university mr-2 text-lg text-blueGray-400"></i>
              University of Computer Science
            </div> */}
            </div>
            <div className="mt-10 py-10 border-t border-blueGray-200 text-center">
              <div className="flex flex-wrap justify-center">
                <div className="w-full lg:w-9/12 px-4">
                  <p className="mb-4 text-lg leading-relaxed text-blueGray-700">
                    {user.email}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
