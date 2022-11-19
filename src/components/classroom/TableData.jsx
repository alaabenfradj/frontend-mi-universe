import React, { useState, useEffect } from "react";
import axios from "axiosInstance";
import ReactStars from "react-rating-stars-component";
import { Link } from "react-router-dom";

const base_url = "http://localhost:5050/data/image/";
function TableData({ course }) {
  const [rate, setrate] = useState(0);
  useEffect(() => {
    axios
      .get(`rate-course/${course._id}`)
      .then((value) => {
        setrate(value.data.totalRate);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <tr>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <div className="flex items-center">
          <div className="flex-shrink-0 w-10 h-10">
            <img
              className="w-full h-full rounded-full"
              src={`${base_url + course.CourseImage}`}
              alt=""
            />
          </div>
          <div className="ml-3">
            <p className="text-gray-900 whitespace-no-wrap">{course.label}</p>
          </div>
        </div>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{course.category}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{course.level}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <p className="text-gray-900 whitespace-no-wrap">{course.languages}</p>
      </td>
      <td className="px-5 py-5 border-b border-gray-200 bg-white text-sm">
        <ReactStars
          key={"star" + rate + ":" + course._id}
          value={rate}
          count={5}
          size={24}
          edit={false}
          activeColor="#ffd700"
        ></ReactStars>
      </td>
      <td className=" border-b border-gray-200 bg-white text-sm">
        <button title="View" style={{ color: "#03A9F4" }}>
          <i className="material-icons">&#xE417;</i>
        </button>
        <button title="Delete" style={{ color: "#E34724" }}>
          <i className="material-icons ">&#xE872;</i>
        </button>
      </td>
    </tr>
  );
}

export default TableData;
