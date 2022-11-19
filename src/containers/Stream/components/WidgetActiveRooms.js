import Card3Small from "components/Card3Small/Card3Small";
import WidgetHeading1 from "components/WidgetHeading1/WidgetHeading1";
import { PostDataType } from "data/types";
import React, { FC } from "react";
import Card3RoomSmall from "./Card3RoomSmall";

const WidgetActiveRooms = ({ rooms }) => {
  return (
    <div
      className={`nc-WidgetPosts rounded-3xl overflow-hidden`}
      data-nc-id="WidgetPosts"
    >
      <WidgetHeading1
        title="🎯 Active Rooms"
        viewAll={{ label: "View all", href: "/#" }}
      />
      <div className="flex flex-col divide-y divide-neutral-200 dark:divide-neutral-700 ">
        {rooms.map((room) => (
          <Card3RoomSmall
            className="p-4 xl:p-5 hover:bg-neutral-200 dark:hover:bg-neutral-700"
            key={room[0]}
            room={room[0]}
            participants={room[1]}
          />
        ))}
      </div>
    </div>
  );
};

export default WidgetActiveRooms;
