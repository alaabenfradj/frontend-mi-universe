import CardLarge1 from "components/CardLarge1/CardLarge1";
import Heading from "components/Heading/Heading";
import { PostDataType } from "data/types";
import React, { FC, useState } from "react";
import CardLarge1Room from "./CardLarge1Room";
const SectionLageSliderRoom = ({
  posts,
  heading = "Most Watched Rooms",
  className = "",
  activeRooms,
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= activeRooms.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return activeRooms.length - 1;
      }
      return state - 1;
    });
  };
  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {!!heading && <Heading>{heading}</Heading>}
      {activeRooms.map((item, index) => (
        <CardLarge1Room
          key={index}
          isShowing={indexActive === index}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          room={item}
        />
      ))}
    </div>
  );
};

export default SectionLageSliderRoom;
