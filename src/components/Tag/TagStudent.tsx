import { TaxonomyType } from "data/types";
import React, { FC } from "react";

export interface TagProps {
  className?: string;
  tag: TaxonomyType;
  hideCount?: boolean;
  studentTags?: any[];
}

const TagStudent: FC<TagProps> = ({
  className = "",
  tag,
  hideCount = false,
  studentTags,
}) => {
  return (
    <h1
      className={`nc-Tag inline-block bg-white text-sm text-neutral-600 py-2 px-3 rounded-lg border border-neutral-100 md:py-2.5 md:px-4 dark:bg-neutral-700 dark:border-neutral-700 hover:border-neutral-200 dark:hover:border-neutral-6000 ${className}`}
      data-nc-id="Tag"
      // to={tag.href}
      style={{ color: studentTags.includes(tag.name) ? "#8b0000" : "" }}
    >
      {`${tag.name}`}
      {!hideCount && (
        <span className="text-xs font-normal"> ({tag.count})</span>
      )}
    </h1>
  );
};

export default TagStudent;
