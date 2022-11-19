import CardLarge from "components/CardLarge1/CardLarge";
import Heading from "components/Heading/Heading";
import { useState } from "react";

const SectionLargeSliderMi = ({
  products,
  heading = "Most Liked Products",
  className = "",
}) => {
  const [indexActive, setIndexActive] = useState(0);

  const handleClickNext = () => {
    setIndexActive((state) => {
      if (state >= products.length - 1) {
        return 0;
      }
      return state + 1;
    });
  };

  const handleClickPrev = () => {
    setIndexActive((state) => {
      if (state === 0) {
        return products.length - 1;
      }
      return state - 1;
    });
  };

  return (
    <div className={`nc-SectionLargeSlider relative ${className}`}>
      {!!heading && <Heading>{heading}</Heading>}
      {products.map((item, index) => (
        <CardLarge
          key={index}
          isShowing={indexActive === index}
          onClickNext={handleClickNext}
          onClickPrev={handleClickPrev}
          product={item}
        />
      ))}
    </div>
  );
};

export default SectionLargeSliderMi;
