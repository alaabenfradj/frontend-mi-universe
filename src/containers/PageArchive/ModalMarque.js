import React, { FC } from "react";
import NcModal from "components/NcModal/NcModal";

import { TaxonomyType } from "data/types";
import Marque from "components/Tag/Marque";

const marques = [
  "yamaha",
  "shure",
  "gibson",
  "harman",
  "fender",
  "steinway",
  "roland",
  "others",
];

const ModalMarque = () => {
  
  const renderModalContent = () => {
    return (
      <div className="flex flex-wrap dark:text-neutral-200">
        {marques.map((tag) => (
          <Marque key={tag} tag={tag} className="mr-2 mb-2" />
        ))}
      </div>
    );
  };

  return (
    <div className="nc-ModalTags">
      <NcModal
        contentExtraClass="max-w-screen-md"
        triggerText={
          <span>
            <span className="hidden sm:inline">Marques</span>
          </span>
        }
        modalTitle="Discover other tags"
        renderContent={renderModalContent}
      />
    </div>
  );
};

export default ModalMarque;
