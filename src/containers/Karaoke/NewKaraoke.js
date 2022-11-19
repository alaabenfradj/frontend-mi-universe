import React, { useEffect, useState } from "react";

import { Helmet } from "react-helmet";
import Input from "components/Input/Input";
import NcImage from "components/NcImage/NcImage";
import Badge from "components/Badge/Badge";
import BgGlassmorphism from "components/BgGlassmorphism/BgGlassmorphism";
import ButtonSecondary from "components/Button/ButtonSecondary";
import { v4 as uuidV4 } from "uuid";
import { useHistory } from "react-router-dom";
import ButtonCircle from "components/Button/ButtonCircle";
import { useSelector } from "react-redux";
import { isAuthenticated } from "app/slices/userSlice";

const NewKaraoke = () => {
  const isAuth = useSelector(isAuthenticated);
  const userConnected = useSelector((s) => s.user.currentUser._id);
  const [roomId, setRoomId] = useState("");
  const history = useHistory();

  useEffect(() => {
    !isAuth && history.push("/mi");
  }, []);
  const handleCreateRoom = (e) => {
    e.preventDefault();
    const room = uuidV4();
    history.push(`/mi/live-stream/${userConnected}`);
  };
  const handleJoinRoom = () => {
    history.push(`/mi/watch-stream/${roomId}`);
  };
  return (
    <div>
      <div className={`nc-PageSearch `} data-nc-id="PageSearch">
        <Helmet>
          <title>MI || Karaoke</title>
        </Helmet>
        <BgGlassmorphism />
        {/* HEADER */}
      </div>
      <div className="gap-2 my-5"></div>
      <header className="container rounded-xl">
        <div className={`nc-SingleHeader`}>
          <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
            <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
              <NcImage
                containerClassName="absolute inset-0"
                src="https://images.pexels.com/photos/2918997/pexels-photo-2918997.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                <div className="flex justify-between">
                  <Badge className="" name="Join" color="pink" />
                </div>

                <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                  Join a Room
                </h2>

                <div className="relative w-1/2 mt-8 sm:mt-11 text-left">
                  <label
                    htmlFor="search-input"
                    className="text-neutral-500 dark:text-neutral-300"
                  >
                    <span className="sr-only">Search for a room</span>
                    <Input
                      id="search-input"
                      type="text"
                      placeholder="Paste a Room Id"
                      sizeClass="pl-14 py-5 pr-5 md:pl-16"
                      defaultValue={roomId}
                      onChange={(e) => {
                        setRoomId(e.target.value);
                      }}
                    />

                    <ButtonCircle
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                      size=" w-11 h-11"
                      onClick={() => handleJoinRoom()}
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
                <div className="gap-2 my-5"></div>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="gap-2 my-5"></div>
      <header className="container rounded-xl">
        <div className={`nc-SingleHeader`}>
          <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
            <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
              <NcImage
                containerClassName="absolute inset-0"
                src="https://images.pexels.com/photos/164879/pexels-photo-164879.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                  Or Just ...
                </h2>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="gap-2 my-5"></div>
      <header className="container rounded-xl">
        <div className={`nc-SingleHeader`}>
          <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
            <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
              <NcImage
                containerClassName="absolute inset-0"
                src="https://images.pexels.com/photos/3783471/pexels-photo-3783471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
                className="object-cover w-full h-full"
              />
              <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
                <div className="flex justify-between">
                  <Badge className="" color="yellow" name="Free" />
                </div>

                <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                  Start Streaming Now
                </h2>

                {/* <div className="relative w-1/2 mt-8 sm:mt-11 text-left">
                  <label
                    htmlFor="search-input"
                    className="text-neutral-500 dark:text-neutral-300"
                  >
                    <span className="sr-only">Search all icons</span>
                    <Input
                      id="search-input"
                      type="text"
                      placeholder=""
                      sizeClass="pl-14 py-5 pr-5 md:pl-16"
                      defaultValue={roomId}
                      onChange={(e) => {
                        setRoomId(e.target.value);
                      }}
                    />

                    <ButtonCircle
                      className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                      size=" w-11 h-11"
                      onClick={() => handleJoinRoom()}
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
                */}
                <div className="gap-2 my-5"></div>
                <ButtonSecondary onClick={(e) => handleCreateRoom(e)}>
                  Create a Room
                </ButtonSecondary>
              </div>
            </div>
          </div>
        </div>
      </header>
      <div className="gap-2 my-5"></div>
    </div>
  );
};

export default NewKaraoke;
