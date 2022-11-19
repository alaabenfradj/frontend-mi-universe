import { useState, useEffect } from "react";
import Avatar from "components/Avatar/Avatar";
import { Link } from "react-router-dom";
import axios from "axiosInstance";
import { useDispatch, useSelector } from "react-redux";

function ProductComment(props) {
  const base_url = "http://localhost:5050/";

  const className = "";
  const { review } = props;
  const [user, setUser] = useState({});
  const { profilePicture, userName, email } = user;
  useEffect(() => {
    axios
      .get(`users/get-by-id/${review.user}`)
      .then((user) => {
        setUser(user.data);
      })
      .catch((error) => {
        console.error(error);
      });
  }, []);
  return (
    <div>
      <div
        className={`nc-CommentCard flex ${className}`}
        data-nc-id="CommentCard"
        data-comment-id={review._id}
      >
        <Avatar
          imgUrl={base_url + profilePicture}
          userName={userName}
          sizeClass={`h-6 w-6 text-base sm:text-lg sm:h-8 sm:w-8`}
          radius="rounded-full"
          containerClassName="mt-4"
        />
        <div className="flex-grow flex flex-col p-4 ml-2 text-sm border border-neutral-200 rounded-xl sm:ml-3 sm:text-base dark:border-neutral-700">
          {/* AUTHOR INFOR */}
          <div className="relative flex items-center pr-6">
            <Link
              className="flex-shrink-0 font-semibold text-neutral-800 dark:text-neutral-100"
              to={"author.href"}
            >
              {userName}
            </Link>
            <span className="mx-2">·</span>
            <span className="text-neutral-500 dark:text-neutral-400 text-xs line-clamp-1 sm:text-sm">
              {review.createdAt}
            </span>
          </div>

          {/* CONTENT */}
          <span className="block text-neutral-700 mt-2 mb-3 sm:mt-3 sm:mb-4 dark:text-neutral-300">
            {review.content}
          </span>

          {/* ACTION LIKE REPLY */}
        </div>
      </div>
    </div>
  );
}

export default ProductComment;
