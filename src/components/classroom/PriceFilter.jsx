import { useDispatch } from "react-redux";
import Slider from "@material-ui/core/Slider";
import { filterByPriceCourse } from "../../app/slices/courseFilter";
export default function PriceFilter({ details }) {
  const dispatch = useDispatch();
  return (
    <Slider
      key={`${details.maxprice}price${details.minprice}`}
      onChange={(e, v) => {
        dispatch(filterByPriceCourse(v));
      }}
      valueLabelDisplay="auto"
      defaultValue={[details.minprice, details.maxprice]}
      max={details.maxprice}
      min={details.minprice}
      marks={[
        { label: details.minprice + "$", value: details.minprice },
        { label: details.maxprice + "$", value: details.maxprice },
      ]}
    />
  );
}
