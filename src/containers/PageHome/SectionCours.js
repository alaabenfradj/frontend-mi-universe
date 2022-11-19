import React, { FC, useState } from "react";
import { PostDataType } from "data/types";
import CoursCard from "components/Card6/Card6";
import HeaderFilter from "./HeaderFilter";

const SectionCours = ({
  posts,
  tabs,
  heading = "Latest Articles 🎈 ",
  className = "",
}) => {
  const [tabActive, setTabActive] = useState(tabs[0]);

  const handleClickTab = (item) => {
    if (item === tabActive) {
      return;
    }
    setTabActive(item);
  };

  return (
    <div className={`nc-SectionMagazine1 ${className}`}>
      <HeaderFilter
        tabActive={tabActive}
        tabs={tabs}
        heading={heading}
        onClickTab={handleClickTab}
      />
      {!posts.length && <span>Nothing we found!</span>}
        <div className="grid gap-6 md:gap-8">
          {posts
             .filter((_, i) => i < 4 && i > 0)
            .map((item, index) => (
              <CoursCard key={index} post={item} />
            ))}
        </div>
    </div>
  );
};

export default SectionCours;
