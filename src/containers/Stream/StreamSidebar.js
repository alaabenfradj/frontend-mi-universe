import { DEMO_AUTHORS } from "data/authors";
import { DEMO_POSTS } from "data/posts";
import { DEMO_CATEGORIES, DEMO_TAGS } from "data/taxonomies";
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import WidgetActiveRooms from "./components/WidgetActiveRooms";
import WidgetActiveStreamers from "./components/WidgetActiveStreamers";
const StreamSidebar = ({ rooms }) => {
  return (
    <div className={`nc-SingleSidebar space-y-6`}>
      {rooms.length > 0 && (
        <div>
          <WidgetActiveRooms rooms={rooms} />
        </div>
      )}
    </div>
  );
};

export default StreamSidebar;
