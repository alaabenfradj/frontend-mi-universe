import React, { FC } from "react";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import Avatar from "components/Avatar/Avatar";

const CardAuthor2Mi = ({
  className = "",
  user,
  seller,
  date,
  hoverReadingTime = true,
}) => {
  const { userName, profilePicture } = user;
  const base_url = "http://localhost:5050/";

  return (
    <Link
      to=""
      className={`nc-CardAuthor2 relative inline-flex items-center ${className}`}
      data-nc-id="CardAuthor2"
    >
      <Avatar
        sizeClass="h-10 w-10 text-base"
        containerClassName="flex-shrink-0 mr-3"
        radius="rounded-full"
        imgUrl={base_url + profilePicture}
        userName={userName}
      />
      <div>
        <h2
          className={`text-sm text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium`}
        >
          {userName}
        </h2>
        <span
          className={`flex items-center mt-1 text-xs text-neutral-500 dark:text-neutral-400`}
        >
          <span>{date.substr(0, 10)}</span>
        </span>
      </div>
    </Link>
  );
};

export default CardAuthor2Mi;
