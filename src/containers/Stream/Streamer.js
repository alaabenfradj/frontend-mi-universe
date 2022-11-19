import React, { useEffect, useState } from "react";
import axios from "axiosInstance";
import SectionHero from "components/SectionHero/SectionHero";
import rightImg from "images/about-hero-right.png";
import { Helmet } from "react-helmet";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import DailyIframe from "@daily-co/daily-js";
import Iframe from "react-iframe";
import { useLocation } from "react-router-dom";

const Streamer = ({ match }) => {
  const id = match.params.id;
  const search = useLocation().search;

  useEffect(() => {
    getStream();
  }, [id]);
  const getStream = async () => {
    const userName = new URLSearchParams(search).get("userName");
    const callFrameContainer = document.getElementById("frameContainer");
    const domain = "https://mi-universe.daily.co/";
    const frameStyles = {
      position: "relative",
      top: 0,
      left: 0,
      width: "100%",
      height: "80vh",
      border: "0",
      zIndex: 9999,
    };
    const callFrame = DailyIframe.createFrame(callFrameContainer, {
      iframeStyle: frameStyles,
      customLayout: true,
      showLeaveButton: true,
      showFullscreenButton: true,
    });
    await axios
      .get(`/stream/video-call/${id}/${userName}`)
      .then((res) => {
        console.log(res.data);
        if (res.status === 200) {
          if (!res.data.token) {
            callFrame.join({
              url: `${domain}${id}`,
            });
          } else {
            const { token } = res.data.token;
            console.log(token);
            callFrame.join({
              url: `${domain}${id}?t=${token}`,
            });
          }
        }
      })
      .catch((err) => console.log(err, "this is the error"));
  };

  return (
    <div
      className={`nc-PageAbout overflow-hidden relative `}
      data-nc-id="PageAbout"
    >
      <Helmet>
        <title>Live || MI Universe</title>
      </Helmet>

      {/* ======== BG GLASS ======== */}
      <BgGlassmorphism />

      <div className="container py-16 lg:py-28 space-y-16 lg:space-y-28">
        <div
          id="frameContainer"
          style={{ height: "auto", padding: "10px" }}
          className="container py-16"
        ></div>
      </div>
    </div>
  );
};

export default Streamer;
