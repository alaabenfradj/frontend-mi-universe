import { useDispatch, useSelector } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { filterByDurationCourse } from "../../app/slices/courseFilter";

function DurationFilter({ details }) {
  const dispatch = useDispatch();
  return (
    <Slider
      key={`Durationslider---${details.minduration}---${details.maxduration}`}
      onChange={(e, v) => dispatch(filterByDurationCourse(v))}
      valueLabelDisplay="auto"
      defaultValue={[details.minduration, details.maxduration]}
      max={details.maxduration}
      min={details.minduration}
      marks={[
        {
          label: details.minduration + "h",
          value: details.minduration,
        },
        {
          label: details.maxduration + "h",
          value: details.maxduration,
        },
      ]}
    />
  );
}

export default DurationFilter;
