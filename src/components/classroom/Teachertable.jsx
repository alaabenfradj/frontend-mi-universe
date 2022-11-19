import { useState, useEffect } from "react";
import axios from "axiosInstance";
import TeacherTableData from "./TeacherTableData";
import { useSelector } from "react-redux";
function Teachertable() {
  const change = useSelector((state) => state.courseSlice.change);
  const [list, setList] = useState([]);
  useEffect(() => {
    axios
      .get("courses/course-teacher")
      .then((course) => {
        setList(course.data);
      })
      .catch((err) => console.log(err));
  }, [change]);
  useEffect(() => {
    axios
      .get("courses/course-teacher")
      .then((course) => {
        setList(course.data);
      })
      .catch((err) => console.log(err));
  }, []);
  return (
    <div className=" p-4 rounded-md w-full">
      <div>
        <div className="-mx-4 sm:-mx-8 px-4 sm:px-8 py-4 overflow-x-auto">
          <div className="inline-block min-w-full shadow rounded-lg overflow-hidden">
            <table className="min-w-full leading-normal">
              <thead>
                <tr>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Course
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Category
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Level
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    Language
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    rate
                  </th>
                  <th className="px-5 py-3 border-b-2 border-gray-200 bg-gray-100 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">
                    edit
                  </th>
                </tr>
              </thead>
              <tbody>
                {list.map((e, i) => (
                  <TeacherTableData key={i} course={e} />
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Teachertable;
