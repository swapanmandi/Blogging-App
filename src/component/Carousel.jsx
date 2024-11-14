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
      <div className=" w-11/12 lg:h-60 bg-slate-500 rounded-md m-4 lg:flex lg:items-center lg:justify-between">
        <button className=" mx-3" onClick={prevSlide}>{`<<`}</button>
        <div
          className=" m-2 rounded cursor-pointer"
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <div
            className={`overflow-hidden flex flex-col p-3 lg:flex-row justify-center items-center`}
          >
            {CarouselData.length >0 && <img
              src={`${CarouselData[currentIndex]?.featuredImage}`}
              className=" h-40 w-36"
            ></img>}
            <div className=" flex flex-col">
              <h2 className=" h-8 m-2 w-fit p-1 rounded-md font-bold">
                {CarouselData[currentIndex]?.title}
              </h2>
              <p className=" h-32 w-80 m-2 p-2 overflow-hidden">
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
                    } h-2 w-2 m-1 rounded-full`}
                  ></span>
                </div>
              )
            )}
          </div>
        </div>
        <button className=" mx-3" onClick={nextSlide}>{`>>`}</button>
      </div>
    </div>
  );
}
