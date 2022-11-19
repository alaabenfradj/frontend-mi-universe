import React, { FC, useEffect, useRef, useState } from "react";
import NcImage from "components/NcImage/NcImage";
import PostCardMeta from "components/PostCardMeta/PostCardMeta";
import { PostDataType } from "data/types";
import { Link } from "react-router-dom";
const Card3RoomSmall = ({ room, participants }) => {
  const [streamer, setStreamer] = useState({});

  const getMinDate = (array) => {
    const dates = array.map((d) => new Date(d));
    const min = new Date(Math.min(...dates));
    return min;
  };

  useEffect(() => {
    if (participants.length === 1) {
      setStreamer(participants[0]);
    } else {
      const dates = [];
      participants.forEach((p) => {
        dates.push(new Date(p.joinTime));
      });
      const minDate = getMinDate(dates);

      const admin = participants.filter((p) => {
        return minDate.toString() === new Date(p.joinTime).toString();
      });
      setStreamer(admin[0]);
    }
  }, []);
  const className =
    "h-full p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700";

  const url = `/mi/live-stream/${room}`;
  return (
    <div
      className={`nc-Card3Small relative flex flex-col-reverse sm:flex-row sm:justify-between sm:items-center  ${className}`}
      data-nc-id="Card3Small"
    >
      {/* <Link to={url} className=" absolute inset-0" title={name}></Link> */}
      <div className="relative flex flex-col space-y-2">
        <h2 className="nc-card-title block text-base font-semibold text-neutral-900 dark:text-neutral-100">
          <Link to={url} className=" line-clamp-2" title={room}>
            {streamer.userName + ` is Streaming Live`}
          </Link>
        </h2>
        <h3 className="nc-card-title block text-base  text-neutral-700 dark:text-neutral-100">
          {/* {`Started at : ` + streamer.joinTime.substr(11, 8)} */}
        </h3>
      </div>

      <Link
        to={url}
        title={room}
        className={`block sm:w-20 flex-shrink-0 relative rounded-lg overflow-hidden mb-5 sm:ml-4 sm:mb-0 group`}
      >
        <div className={`w-full h-0 aspect-w-16 aspect-h-9 sm:aspect-h-16`}>
          <NcImage
            containerClassName="absolute inset-0"
            className="nc-will-change-transform object-cover w-full h-full group-hover:scale-110 transform transition-transform duration-300"
            src="https://unicornriot.ninja/wp-content/uploads/2018/09/LiveChannel334x212v2.png"
            // title={title}
          />
        </div>
      </Link>
    </div>
  );
};

export default Card3RoomSmall;
