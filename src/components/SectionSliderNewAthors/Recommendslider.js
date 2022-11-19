import React, { FC, useEffect, useRef, useState } from "react";
import Heading from "components/Heading/Heading";
import Glide from "@glidejs/glide";
import { PostDataType } from "data/types";
import ncNanoId from "utils/ncNanoId";
import CardSeller from "components/CardAuthorBox2/CardSeller";
import NextPrev from "components/NextPrev/NextPrev";
import axios from "../../../src/axiosInstance";
import Card11Product from "components/Card11/Card11Product";

const Recommendslider = ({ heading, subHeading, className = "", authors ,item}) => {
  const UNIQUE_CLASS = ncNanoId("sliderNewAuthors_");

  const MY_GLIDE = new Glide(`.${UNIQUE_CLASS}`, {
    // @ts-ignore
    direction:
      document.querySelector("html")?.getAttribute("dir") === "rtl"
        ? "rtl"
        : "ltr",
    perView: 5,

    gap: 32,
    bound: true,
    breakpoints: {
      1280: {
        perView: 4,
      },
      1023: {
        gap: 24,
        perView: 3,
      },
      767: {
        gap: 20,
        perView: 2.3,
      },
      639: {
        gap: 20,
        perView: 2,
      },
      500: {
        gap: 20,
        perView: 1.3,
      },
    },
  });
  const [sellers, setSellers] = useState([]);
  useEffect(()=>{
    setSellers(item);
  },[])
  
  // setTimeout(() => {
  //   getSellers();
  // }, 20000);

  useEffect(() => {
    if (!MY_GLIDE) return;
    MY_GLIDE.mount();
  }, [MY_GLIDE]);

  let isMountedRef = useRef(null);
  useEffect(() => {
    isMountedRef.current = true;
    if (isMountedRef.current) {
     // getSellers();
    }
    return () => (isMountedRef.current = false);
  }, []);

  return (
    <div className={`nc-SectionSliderNewAuthors ${className}`}>
      <div className={`${UNIQUE_CLASS}`}>
        <Heading isCenter desc={subHeading}>
          Our Top Sellers
        </Heading>
        <div className="glide__track" data-glide-el="track">
          <ul className="glide__slides">
            
                <li  className="glide__slide pb-12 md:pb-16">
                  {/* <a href={`/mi/author/the-demo-author-slug?seller=${item._id}`}> */}
                  <Card11Product  product={sellers}></Card11Product>
                  {/* </a> */}
                </li>
             
          </ul>
        </div>
        <NextPrev
          btnClassName="w-12 h-12"
          containerClassName="justify-center"
        />
      </div>
    </div>
  );
};

export default Recommendslider;
