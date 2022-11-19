import NcImage from "components/NcImage/NcImage";
import SectionLargeSlider from "containers/PageHome/SectionLargeSlider";
import { DEMO_POSTS } from "data/posts";
import { Helmet } from "react-helmet";
import Badge from "components/Badge/Badge";
import ButtonSecondary from "components/Button/ButtonSecondary";
import StreamSidebar from "./StreamSidebar";
import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import short from "short-uuid";
import ButtonCircle from "components/Button/ButtonCircle";
import axios from "axios";
import env from "react-dotenv";
import { useHistory } from "react-router-dom";
import Input from "components/Input/Input";
import SectionLageSliderRoom from "./components/SectionLageSliderRoom";
import Label from "components/Label/Label";
import Textarea from "components/Textarea/Textarea";
import ButtonPrimary from "components/Button/ButtonPrimary";
const domain = "https://api.daily.co/v1/";
const API_KEY_AlAA = env.daily_API_KEY_AlAA;
const headers = {
  Accept: "application/json",
  "Content-Type": "application/json",
  Authorization: "Bearer " + API_KEY_AlAA,
};

const StreamHomePage = () => {
  const [userName, setUserName] = useState("");
  const [activeRooms, setActiveRooms] = useState([]);

  const history = useHistory();
  const handleClickCreateRoom = () => {
    const roomId = short.generate();
    userName.length > 0 &&
      history.push(`/mi/live-stream/${roomId}/?userName=${userName}`);
  };
  const getActiveRoomsFromDaily = async () => {
    await axios
      .get(`${domain}presence`, {
        headers: headers,
      })
      .then((response) => {
        const rooms = Object.entries(response.data);
        setActiveRooms(rooms);
      })
      .catch((err) => {
        console.log(err);
      });
  };
  useEffect(() => {
    getActiveRoomsFromDaily();
  }, []);
  const [rec, setRec] = useState("");
  const [loading, setLoading] = useState(false);
  const textArea = document.querySelector(".textArea");
  const handleSubmit = async (event) => {
    setLoading(true);
    event.preventDefault();
    await axios
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
    <>
      <div
        className={`nc-PageSingleHasSidebar pt-5 lg:pt-16 `}
        data-nc-id="PageSingleHasSidebar"
      >
        <Helmet>
          <title>Stream || MI Stream</title>
        </Helmet>
        {/* SINGLE HEADER */}

        <div className="w-full px-2 xl:max-w-screen-2xl mx-auto">
          <div className="rounded-3xl relative aspect-w-16 aspect-h-12 sm:aspect-h-7 lg:aspect-h-6 xl:aspect-h-5 2xl:aspect-h-4 overflow-hidden ">
            <NcImage
              containerClassName="absolute inset-0"
              src="https://images.pexels.com/photos/417458/pexels-photo-417458.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1"
              className="object-cover w-full h-full"
            />
            <div className="absolute inset-0 bg-black text-white bg-opacity-30 flex flex-col items-center justify-center">
              <div className="flex justify-between">
                <Badge className="" color="yellow" name="Free" />
              </div>

              <h2 className="inline-block align-middle ml-3 text-5xl font-semibold md:text-7xl ">
                Start Streaming Now
              </h2>
              <div className="relative w-1/2 mt-8 sm:mt-11 text-left">
                <label
                  htmlFor="search-input"
                  className="text-neutral-500 dark:text-neutral-300"
                >
                  <span className="sr-only">UserName to Stream with ..</span>
                  <Input
                    id="search-input"
                    type="text"
                    required
                    placeholder="Provide a valid User-Name"
                    sizeClass="pl-14 py-5 pr-5 md:pl-16"
                    onChange={(e) => {
                      setUserName(e.target.value);
                    }}
                    onKeyDown={(e) => {
                      if (e.key === "Enter") {
                        handleClickCreateRoom();
                      }
                    }}
                  />

                  <ButtonCircle
                    className="absolute right-2.5 top-1/2 transform -translate-y-1/2"
                    size=" w-11 h-11"
                    onClick={handleClickCreateRoom}
                  >
                    <i className="las la-arrow-right text-xl"></i>
                  </ButtonCircle>
                  <span className="absolute left-5 top-1/2 transform -translate-y-1/2 text-2xl md:left-6">
                    <svg width="24" height="24" fill="none" viewBox="0 0 24 24">
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
              <ButtonSecondary onClick={handleClickCreateRoom}>
                Start a Room
              </ButtonSecondary>
            </div>
          </div>
        </div>
        {/* FEATURED IMAGE */}

        {/* SINGLE MAIN CONTENT */}
        {activeRooms.length > 0 ? (
          <div className="container flex flex-col my-10 lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
              <div className="max-w-screen-md mx-auto">
                <SectionLageSliderRoom
                  className="pt-10 pb-16 md:py-16 lg:pb-28 lg:pt-24 "
                  // posts={POSTS.filter((_, i) => i < activeRooms.length)}
                  activeRooms={activeRooms}
                />
              </div>
            </div>

            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
              <StreamSidebar rooms={activeRooms} />
            </div>
          </div>
        ) : (
          <div className="container flex flex-col my-10 lg:flex-row ">
            <div className="w-full lg:w-3/5 xl:w-2/3 xl:pr-20">
              <div className="max-w-screen-md mx-auto">
                <div className="gap-2 my-5"></div>
                <h2 className="inline-block align-middle ml-3 text-5xl  md:text-7xl ">
                  Be kind
                </h2>
                Giving constructive feedback is good. Being unnecessarily mean
                isn’t what we do here. Make sure you take the time to evaluate
                which you are doing before you post.
                <div className="gap-2 my-5"></div>
                <h2 className="inline-block align-middle ml-3 text-5xl  md:text-7xl ">
                  Respect
                </h2>
                other humans.We know our broadcasters are fine specimens of
                humanity. Complimenting them is good. Sexually objectifying,
                creeping on, describing violent actions toward, describing your
                physical reactions to, or otherwise dehumanizing them is not.
                <div className="gap-2 my-5"></div>
                <h2 className="inline-block align-middle ml-3 text-5xl  md:text-7xl ">
                  Include
                </h2>
                everyone .We want this channel to be a safe and welcoming place
                for everyone. Don't do anything that might make someone feel
                like they don't belong. This includes but is not limited to
                generalizations of types of people, hate speech, or
                discriminatory language based on gender, religion, ethnicity,
                sex or socioeconomic background.
                <div className="gap-2 my-5"></div>
                <h2 className="inline-block align-middle ml-3 text-5xl  md:text-7xl ">
                  Listen
                </h2>
                to the moderation team .Our mods are in place because we trust
                their judgement. Remember that these rules exist not only to the
                letter, but in spirit. If our mods feel like you have violated
                or circumvented even the intention of these rules, you may face
                disciplinary action. Follow the instructions of mods, and
                communicate with them with professionalism about any concerns.
              </div>
            </div>

            <div className="w-full mt-12 lg:mt-0 lg:w-2/5 lg:pl-10 xl:pl-0 xl:w-1/3">
              <div>
                <form
                  className="grid grid-cols-1 gap-6"
                  action="#"
                  method="post"
                >
                  <label className="block">
                    <Label>Contact Admin</Label>

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
                    Send
                  </ButtonPrimary>

                  <ButtonPrimary onClick={() => history.push("/mi")}>
                    Home
                  </ButtonPrimary>
                </form>
              </div>
            </div>
          </div>
        )}
        {/* RELATED POSTS */}
      </div>
    </>
  );
};

export default StreamHomePage;
