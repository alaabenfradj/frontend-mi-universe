import React, { FC, useState, useEffect } from "react";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Input from "components/Input/Input";
import Label from "components/Label/Label";
import LayoutPage from "components/LayoutPage/LayoutPage";
import SocialsList from "components/SocialsList/SocialsList";
import Textarea from "components/Textarea/Textarea";
import { Helmet } from "react-helmet";
import SectionSubscribe2 from "components/SectionSubscribe2/SectionSubscribe2";
import { useSelector } from "react-redux";
import axios from "axiosInstance";
const info = [
  {
    title: "🗺 FeedBack",
    desc: "We appreciate the time you took to share your feedback",
  },
  {
    title: "💌 Join us",
    desc: "we would really like to see you as a member of our community ",
  },
];

const PageContactMi = ({ className = "" }) => {
  const [rec, setRec] = useState("");
  const [loading, setLoading] = useState(false);
  const textArea = document.querySelector(".textArea");
  const handleSubmit = (event) => {
    setLoading(true);
    event.preventDefault();
    axios
      .post("reclamations/send-rec", { content: rec })
      .then((res) => {
        console.log(res);
        setLoading(false);
        setRec("");
        textArea.placeholder = "thank you for your feedback";
      })
      .catch((err) => {
        console.log(err.message);
        setLoading(false);
        setRec("");
        textArea.placeholder = "you need to sign in first ! ";
      });
  };
  return (
    <div className={`nc-PageContact ${className}`} data-nc-id="PageContact">
      <Helmet>
        <title>Contact || MI Universe</title>
      </Helmet>
      <LayoutPage
        subHeading="Drop us message and we will get back for you."
        headingEmoji=""
        heading="Contact us"
      >
        <div className="grid gap-8 lg:grid-cols-2">
          <div className="max-w-sm space-y-6">
            {info.map((item, index) => (
              <div key={index}>
                <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                  {item.title}
                </h3>
                <span className="block mt-2 text-neutral-500 dark:text-neutral-400">
                  {item.desc}
                </span>
              </div>
            ))}
            <div>
              <h3 className="uppercase font-semibold text-sm dark:text-neutral-200 tracking-wider">
                🌏 SOCIALS
              </h3>
              <SocialsList className="mt-2" />
            </div>
          </div>
          <div className="border border-neutral-100 dark:border-neutral-700 lg:hidden"></div>
          <div>
            <form className="grid grid-cols-1 gap-6" action="#" method="post">
              <label className="block">
                <Label>Contact Us</Label>

                <Textarea
                  onChange={(e) => setRec(e.target.value)}
                  className="mt-1 textArea"
                  rows={6}
                  value={rec}
                />
              </label>
              <ButtonPrimary
                onClick={handleSubmit}
                disabled={loading}
                type="submit"
              >
                Send Feedback
              </ButtonPrimary>
            </form>
          </div>
        </div>
      </LayoutPage>

      {/* OTHER SECTIONS */}
      <div className="container pb-16 lg:pb-28">
        <SectionSubscribe2 />
      </div>
    </div>
  );
};

export default PageContactMi;
