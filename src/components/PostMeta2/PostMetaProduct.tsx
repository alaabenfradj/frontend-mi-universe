import React, { FC, useState, useEffect } from "react";
import Avatar from "components/Avatar/Avatar";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
import axios from "axiosInstance";
export interface PostCardMetaProps {
  className?: string;
  meta;
  hiddenAvatar?: boolean;
  size?: "large" | "normal";
}
const base_url = "http://localhost:5050/";

const PostMetaProduct: FC<PostCardMetaProps> = ({
  className = "leading-none",
  meta,
  hiddenAvatar = false,
  size = "large",
}) => {
  const [creator, setUser] = useState({
    userName: "",
    phoneNumber: "",
    profilePicture: "",
  });

  const { userName, phoneNumber, profilePicture } = creator;
  useEffect(() => {
    console.log(meta);
    axios
      .get(`users/${meta.seller}`)
      .then((result) => {
        setUser(result.data);
      })
      .catch((err) => {
        console.log(err.message);
      });
  }, []);

  return (
    <div
      className={`nc-PostCardMeta inline-flex items-center flex-wrap text-neutral-800 dark:text-neutral-200 ${
        size === "normal" ? "text-xs" : "text-base"
      } ${className}`}
      data-nc-id="PostCardMeta"
    >
      <Link to="#" className="relative flex items-center space-x-2">
        {!hiddenAvatar && (
          <Avatar
            radius="rounded-full"
            sizeClass={
              size === "normal" ? "h-7 w-7 text-sm" : "h-10 w-10 text-xl"
            }
            imgUrl={base_url + profilePicture}
            userName={userName}
          />
        )}
        <span className="block text-neutral-700 hover:text-black dark:text-neutral-300 dark:hover:text-white font-medium">
          {userName}
        </span>
      </Link>
      <>
        <span className="text-neutral-500 dark:text-neutral-400 mx-[6px] font-medium">
          {phoneNumber}
        </span>
      </>
    </div>
  );
};

export default PostMetaProduct;
