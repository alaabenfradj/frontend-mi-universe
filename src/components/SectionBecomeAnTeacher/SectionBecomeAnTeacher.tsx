import React, { FC } from "react";
import NcImage from "components/NcImage/NcImage";
import rightImgDemo from "images/BecomeAnAuthorImg.png";
import ButtonPrimary from "components/Button/ButtonPrimary";
import { useHistory } from "react-router-dom";

export interface SectionBecomeAnAuthorProps {
  className?: string;
  rightImg?: string;
}

const SectionBecomeAnTeacher: FC<SectionBecomeAnAuthorProps> = ({
  className = "",
  rightImg = rightImgDemo,
}) => {
  const history = useHistory();
  return (
    <div
      className={`nc-SectionBecomeAnAuthor relative flex flex-col lg:flex-row items-center  ${className}`}
      data-nc-id="SectionBecomeAnAuthor"
    >
      <div className="flex-shrink-0 mb-14 lg:mb-0 lg:mr-10 lg:w-2/5">
        <h2 className="font-semibold text-3xl sm:text-4xl mt-3">
          Become a teacher and share your great courses
        </h2>
        <span className="block mt-8 text-neutral-500 dark:text-neutral-400">
          Become a teacher you can earn extra income by adding courses. Read and
          share new perspectives on just about any topic. Everyone’s welcome.
        </span>
        <ButtonPrimary
          onClick={() => history.push("mi/become-teacher")}
          className="mt-8"
        >
          Become a teacher
        </ButtonPrimary>
      </div>
      <div className="flex-grow">
        <NcImage src={rightImg} />
      </div>
    </div>
  );
};

export default SectionBecomeAnTeacher;
