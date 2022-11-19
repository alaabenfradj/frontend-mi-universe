import { Helmet } from "react-helmet";
import Input from "components/Input/Input";
import ButtonCircle from "components/Button/ButtonCircle";
import { useEffect, useRef, useState } from "react";
import image from "images/dance.jpg";
import { useDispatch, useSelector } from "react-redux";
import axios from "axiosInstance";
import ReactPlayer from "react-player";
import NcPlayIcon from "components/NcPlayIcon/NcPlayIcon";
import NcImage from "components/NcImage/NcImage";
import isSafariBrowser from "utils/isSafariBrowser";

import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";

import KaraokeOneToOne from "./karaokeOneToOne";
import ButtonPrimary from "components/Button/ButtonPrimary";
import Badge from "components/Badge/Badge";
import ButtonSecondary from "components/Button/ButtonSecondary";
import DailyIframe from "@daily-co/daily-js";
import { useParams } from "react-router-dom";


/**
 *
 *
 *
 */
function Karaoke() {
  const dispatch = useDispatch();
  let className = "";
  const [search, setSearch] = useState("");

  const [songs, setSongs] = useState([]);
  const [chosenSong, setChosenSong] = useState({});
  const [isPlay, setIsPlay] = useState(false);

  const getSongFromDb = async (search) => {
    console.log(chosenSong);
    await axios
      .post(`/karaoke/songs`, { song: search })
      .then((res) => {
        setSongs(res.data);
      })
      .catch((err) => {
        setSongs([]);
      });
  };


  let { id } = useParams();

  let { token } = useParams();
  const getStream = async () => {
    const container = document.getElementById("MyContainer")

    const callFrame = DailyIframe.createFrame(container, {
      iframeStyle: {
        position: 'relative',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',

      },
      showLeaveButton: true,
      showFullscreenButton: true,
      customLayout: true,
    });
    const domain = "https://miuniverse.daily.co/";
    await axios
      .get(`/video-call/${id}`)
      .then((res) => {
        if (res.status === 200) {
          callFrame.join({
            url: `${domain}${id}?t=${token}`,
          });
        }
      })
      .catch((err) => console.log(err, "this is the error"));
  };

  useEffect(() => {
    getStream();

  }, [id]);

  const renderMainVideo = () => {
    return (
      <div className="bg-neutral-800 rounded-3xl overflow-hidden border-4 border-white dark:border-neutral-700 shadow-2xl">
        {isSafariBrowser() && chosenSong.Image && !isPlay && (
          <div
            className="absolute inset-0 z-10 cursor-pointer rounded-[18px] overflow-hidden"
            onClick={() => setIsPlay(true)}
          >
            <NcImage
              src={chosenSong.Image}
              containerClassName="absolute inset-0"
            />
            <div className="absolute inset-0 flex items-center justify-center">
              <NcPlayIcon />
            </div>
          </div>
        )}
        <ReactPlayer
          url={chosenSong.Video}
          style={{ borderRadius: 18, overflow: "hidden" }}
          className=""
          playing={isSafariBrowser() ? isPlay : true}
          width="80%"
          height="80%"
          controls
          light={isSafariBrowser() ? false : chosenSong.Image}
          playIcon={<NcPlayIcon />}
        />
      </div>
    );
  };

  return (
    <>
      <div className={`nc-PageSearch ${className}`} data-nc-id="PageSearch">
        <Helmet>
          <title>MI || Karaoke</title>
        </Helmet>
        <BgGlassmorphism />
        {/* HEADER */}
        <div className="w-screen px-2 xl:max-w-screen-2xl mx-auto">
          <div className="rounded-3xl relative aspect-w-16 aspect-h-16 sm:aspect-h-9 lg:aspect-h-5 overflow-hidden ">
            <NcImage
              containerClassName="absolute inset-0"
              src={image}
              className="object-cover w-full h-full"
            />
          </div>
          {/* CONTENT */}
          <div className="relative container -mt-20 lg:-mt-48">
            <div className="bg-white dark:bg-neutral-900 dark:border dark:border-neutral-700 p-5 lg:p-16 rounded-[40px] shadow-2xl flex items-center">
              <header className="w-full max-w-3xl mx-auto text-center flex flex-col items-center">
                <h2 className="text-2xl sm:text-4xl font-semibold">
                  Top Trending Songs
                </h2>
                <span className="block text-xs sm:text-sm mt-4 text-neutral-500 dark:text-neutral-300">
                  <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                    More Than
                  </strong>{" "}
                  5,000{" "}
                  <strong className="font-medium text-neutral-800 dark:text-neutral-100">
                    Song
                  </strong>
                </span>
                <div className="relative w-full mt-8 sm:mt-11 text-left">
                  <label
                    htmlFor="search-input"
                    className="text-neutral-500 dark:text-neutral-300"
                  >
                    <span className="sr-only">Search all icons</span>
                    <Input
                      id="search-input"
                      type="text"
                      placeholder="Type and press enter"
                      sizeClass="pl-14 py-5 pr-5 md:pl-16"
                      defaultValue={search}
                      onChange={(e) => {
                        setSearch(e.target.value);
                      }}
                      onKeyUp={(e) => {
                        getSongFromDb(e.target.value);
                      }}
                    />

                    <ButtonCircle
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                      size=" w-11 h-11"
                      onClick={(e) => getSongFromDb(search)}
                    >
                      <i className="las la-arrow-right text-xl"></i>
                    </ButtonCircle>
                    <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                      <svg
                        width="24"
                        height="24"
                        fill="none"
                        viewBox="0 0 24 24"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="1.5"
                          d="M19.25 19.25L15.5 15.5M4.75 11C4.75 7.54822 7.54822 4.75 11 4.75C14.4518 4.75 17.25 7.54822 17.25 11C17.25 14.4518 14.4518 17.25 11 17.25C7.54822 17.25 4.75 14.4518 4.75 11Z"
                        ></path>
                      </svg>
                    </span>
                  </label>
                </div>
                <div className="w-full text-sm text-left mt-4 text-neutral-500 dark:text-neutral-300">
                  <span className="mr-2.5">Related:</span>
                  {songs.length > 0 ? (
                    songs.map((s) => (
                      <button
                        key={s.id}
                        className="inline-block"
                        onClick={() => {
                          setChosenSong(s);
                        }}
                      >
                        <h2 className="mr-2.5  inline-block font-normal">
                          🎵 {s.Song} 🎵
                        </h2>
                      </button>
                    ))
                  ) : (
                    <div className="inline-block">
                      <h2 className="mr-2.5 inline-block font-normal">
                        Song not found
                      </h2>
                    </div>
                  )}
                </div>
              </header>
            </div>
          </div>
        </div>{" "}
        {/* ====================== END HEADER ====================== */}
      </div>

      <div
        className={`nc-PageSingleVideo  ${className}`}
        data-nc-id="PageSingleVideo"
        style={{ height: "80%" }}
      >
        {/* SINGLE HEADER */}
        <header style={{ width: "100%", height: "80%" }} className="container-fluid   relative py-14 lg:py-20 flex flex-col lg:flex-row lg:items-center">
          <BgGlassmorphism />
          <div style={{ width: "100%", height: "80%" }} className="relative lg:w-6/12 flex-shrink-0">
            <div className="aspect-w-16 aspect-h-16 sm:aspect-h-9 ">
              {renderMainVideo()}
            </div>
          </div>
        </header>
        <div className="container-fluid" style={{ height: "70vh" }} id="MyContainer">
        </div>
      </div>
      {/* Streaming !!! */}
      <div className="gap-2 my-10"></div>
      <header className="container rounded-xl">

        <div className={`nc-SingleHeader`}>
          <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
            <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
              <NcImage
                containerClassName="absolute inset-0"
                src="https://images.pexels.com/photos/5967960/pexels-photo-5967960.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                <div className="flex justify-between">
                  <Badge className="" name="FREE" />
                </div>

                <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                  Enjoy yourself
                </h2>

                {/* {!!reference && !false && (
                <h4 className="inline-block align-middle ml-5 text-3xl md:text-2xl px-8 py- text-center">
                  {reference}
                </h4>
              )} */}
                <ButtonSecondary href="/mi">Home</ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </header>
    </>

  );
}

export default Karaoke;
