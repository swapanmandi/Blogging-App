import React, { useContext, useEffect, useState } from "react";
import { useRef } from "react";
import { usePostContext } from "../store/PostContext-store";

export default function Carousel() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [caroLength, setCaroLength] = useState(5);
  const slideIntervalRef = useRef(null);
  const [isPaused, setIsPaused] = useState(false);
  const { posts } = usePostContext();

  // const card = [
  //   { title: "First Post" },
  //   { title: "Second Post" },
  //   { title: "Third Post" },
  //   { title: "Fourth Post" },
  //   { title: "Fifth Post" },
  // ];

  const CarouselData = posts.slice(0, caroLength);

  const len = CarouselData.length;

  const nextSlide = () => {
    setCurrentIndex(currentIndex === len - 1 ? 0 : currentIndex + 1);
  };

  const prevSlide = () => {
    setCurrentIndex(currentIndex === 0 ? len - 1 : currentIndex - 1);
  };

  useEffect(() => {
    if (!isPaused) {
      slideIntervalRef.current = setInterval(() => {
        nextSlide();
      }, 5000);

      return () => clearInterval(slideIntervalRef.current);
    }
  }, [currentIndex, isPaused]);

  const handleMouseEnter = () => {
    setIsPaused(true);
  };
  const handleMouseLeave = () => {
    setIsPaused(false);
  };
  return (
    <div className=" w-full flex justify-center">
      <div className=" w-11/12 lg:h-60 bg-slate-500 rounded-md m-4 flex items-center justify-between">
        <button className=" mx-3" onClick={prevSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-chevrons-left"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M16 15l-3 -3l3 -3" />
            <path d="M11 15l-3 -3l3 -3" />
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
          </svg>
        </button>
        <div
          className=" m-2 rounded cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div className=" w-full overflow-hidden flex flex-col p-1 lg:flex-row justify-center items-center">
            {CarouselData.length > 0 && (
              <img
                src={`${CarouselData[currentIndex]?.featuredImage}`}
                className=" h-40 w-36 m-2"
              ></img>
            )}
            <div className=" flex flex-col">
              <h2 className=" h-8 w-fit p-1 font-bold overflow-hidden">
                {CarouselData[currentIndex]?.title}
              </h2>
              <p className=" w-full h-24 lg:h-32 lg:w-80 p-2 overflow-hidden">
                {CarouselData[currentIndex]?.description}
              </p>
            </div>
          </div>
          <div className=" flex justify-center ">
            {Array.from({ length: len }, (_, index) => index + 1).map(
              (item, index) => (
                <div key={index}>
                  <span
                    className={` ${
                      currentIndex === item - 1 ? " bg-green-500" : "bg-white"
                    } h-12 w-12 m-1 rounded-full`}
                  ></span>
                </div>
              )
            )}
          </div>
        </div>
        <button className=" mx-3" onClick={nextSlide}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="24"
            height="24"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="icon icon-tabler icons-tabler-outline icon-tabler-square-chevrons-right"
          >
            <path stroke="none" d="M0 0h24v24H0z" fill="none" />
            <path d="M8 9l3 3l-3 3" />
            <path d="M13 9l3 3l-3 3" />
            <path d="M3 5a2 2 0 0 1 2 -2h14a2 2 0 0 1 2 2v14a2 2 0 0 1 -2 2h-14a2 2 0 0 1 -2 -2v-14z" />
          </svg>
        </button>
      </div>
    </div>
  );
}
