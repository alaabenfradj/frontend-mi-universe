import ButtonPrimary from "components/Button/ButtonPrimary";
import CardProfile from "components/Cards/CardProfile";
import CardSettings from "components/Cards/CardSettings";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import React, { useState } from "react";

const DashboardEditProfile = () => {
  return (
    <div className="rounded-xl md:border md:border-neutral-100 dark:border-neutral-800 md:p-6">
      <div className="flex flex-wrap">
        <div className="w-full lg:w-8/12 px-4">
          <CardSettings />
        </div>
        <div className="w-full pt-10 lg:w-4/12 px-4">
          <CardProfile />
        </div>
      </div>
    </div>
  );
};

export default DashboardEditProfile;
