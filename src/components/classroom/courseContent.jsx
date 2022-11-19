import { useSelector, useDispatch } from "react-redux";
import { setIsOpenResource } from "app/slices/modalSlice";
import ResourceMoadal from "./ResourceModel";
function CourseContent() {
  const dispatch = useDispatch();
  const selected = useSelector((state) => state.courseSlice.selectedCourse);
  const chapter = useSelector((state) => state.courseSlice.chapter);
  return (
    <div>
      <h1 className="text-center">{selected.label}</h1>
      <span>{selected.description}</span>
      <h2>{chapter.title}</h2>
      <span>{chapter.description}</span>
      <br />
      <button
        onClick={() => {
          dispatch(setIsOpenResource(true));
        }}
      >
        addResource
      </button>
      <ResourceMoadal />
    </div>
  );
}

export default CourseContent;
