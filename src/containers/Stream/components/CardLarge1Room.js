import { Transition } from "@headlessui/react";
import Badge from "components/Badge/Badge";
import NcImage from "components/NcImage/NcImage";
import NextPrev from "components/NextPrev/NextPrev";
import { Fragment } from "react";
import { Link } from "react-router-dom";

const CardLarge1Room = ({
  className = "",
  isShowing = true,
  room,
  onClickNext = () => {},
  onClickPrev = () => {},
}) => {
  const images = [
    "https://images.pexels.com/photos/796606/pexels-photo-796606.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1040471/pexels-photo-1040471.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
    "https://images.pexels.com/photos/1149022/pexels-photo-1149022.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=1",
  ];
  const roomToShow = {
    roomId: room[0],
    participants: room[1],
    nbrOfParticipants: room[1].length,
    image: images[Math.floor(Math.random() * 4)],
  };
  return (
    <Transition
      appear={true}
      as="div"
      className={`nc-CardLarge1 relative flex flex-col-reverse md:flex-row justify-end ${className}`}
      show={isShowing}
    >
      <div className="md:absolute z-10 md:left-0 md:top-1/2 md:transform md:-translate-y-1/2 w-full -mt-8 md:mt-0 px-3 sm:px-6 md:px-0 md:w-3/5 lg:w-1/2 xl:w-2/5">
        <Transition.Child
          as={Fragment}
          enter="transform nc-will-change-transform transition-all duration-500"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <div className="p-4 sm:p-8 xl:py-14 md:px-10 bg-white bg-opacity-40 backdrop-filter backdrop-blur-lg shadow-lg rounded-3xl space-y-3 sm:space-y-5 !border-opacity-0 --  nc-dark-box-bg">
            {/* <CategoryBadgeList categories={categories} /> */}
            <Badge name={`watchers : ` + roomToShow.nbrOfParticipants} />

            <h2 className="nc-card-title text-xl sm:text-2xl font-semibold ">
              <Link
                to={`/mi/live-stream/${roomToShow.roomId}`}
                className="line-clamp-2"
                title={`Room ID : ` + roomToShow.roomId}
              >
                {`Room ID : ` + roomToShow.roomId}
              </Link>
            </h2>

            <div className="flex items-center justify-between mt-auto">
              watch live now !
            </div>
          </div>
        </Transition.Child>
        <Transition.Child
          as="div"
          className="p-4 sm:pt-8 sm:px-10"
          enter="transform nc-will-change-transform transition-all duration-500 delay-100"
          enterFrom="translate-y-4 opacity-0"
          enterTo="translate-y-0 opacity-100"
        >
          <NextPrev
            btnClassName="w-11 h-11 text-xl"
            onClickNext={onClickNext}
            onClickPrev={onClickPrev}
          />
        </Transition.Child>
      </div>
      <Transition.Child
        as="div"
        className="w-full md:w-4/5 lg:w-2/3"
        enter="transform nc-will-change-transform transition-all duration-500 delay-200"
        enterFrom="translate-y-4 scale-105 opacity-0"
        enterTo="translate-y-0 scale-100 opacity-100"
      >
        <Link to={`/mi/live-stream/${roomToShow.roomId}`}>
          <NcImage
            containerClassName="aspect-w-16 aspect-h-12 sm:aspect-h-9 md:aspect-h-14 lg:aspect-h-10 2xl:aspect-h-9 relative"
            className="absolute inset-0 object-cover rounded-3xl"
            src={roomToShow.image}
            alt={roomToShow.roomId}
          />
        </Link>
      </Transition.Child>
    </Transition>
  );
};

export default CardLarge1Room;
