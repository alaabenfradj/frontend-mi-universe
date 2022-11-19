import axios from "axiosInstance";
import ReactStars from "react-rating-stars-component";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { setChange, setSelected } from "app/slices/courseSlice";
import { useHistory } from "react-router-dom";
const base_url = "http://localhost:5050/data/image/";
function TeacherTableData({ course }) {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.courseSlice.selected);
  const history = useHistory();
  const [rate, setrate] = useState(0);
  const handaleDelete = async () => {
    await axios
      .delete(`/courses/${course._id}`)
      .then(() => {
        dispatch(setChange());
      })
      .catch((err) => console.log(err));
  };
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
          edit={false}
          key={"star" + rate + ":" + course._id}
          value={rate}
          count={5}
          size={24}
          activeColor="#ffd700"
        ></ReactStars>
      </td>
      <td className=" border-b border-gray-200  text-sm ">
        <button
          title="View"
          style={{ color: "#03A9F4" }}
          onClick={() => {
            dispatch(setSelected(course));
            history.replace(`/mi/classroom/teacher/details/${course._id}`);
          }}
        >
          <i className="material-icons">&#xE417;</i>
        </button>
        <button
          title="Edit"
          style={{ color: "#FFC107" }}
          onClick={() => {
            dispatch(setSelected(course));
            history.replace(`/mi/classroom/teacher/update`);
          }}
        >
          <i className="material-icons">&#xE254;</i>
        </button>
        <button
          title="Delete"
          style={{ color: "#E34724" }}
          onClick={() => {
            handaleDelete();
          }}
        >
          <i className="material-icons ">&#xE872;</i>
        </button>
      </td>
    </tr>
  );
}

export default TeacherTableData;
