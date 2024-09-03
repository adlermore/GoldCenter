'use client'

import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";

function ChildSlider({ gallery }) {
  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);

  const childSettings = {
    dots: true,
    infinite: true,
    arrows: false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  // const handleWheel = (e) => {
  //   e.preventDefault();
  //   if (e.deltaY < 0) {
  //     sliderRef.current.slickPrev();
  //   } else {
  //     sliderRef.current.slickNext();
  //   }
  // };

  // useEffect(() => {
  //   const sliderElement = sliderContainerRef.current;
  //   if (sliderElement) {
  //     sliderElement.addEventListener('wheel', handleWheel);
  //   }
  //   return () => {
  //     if (sliderElement) {
  //       sliderElement.removeEventListener('wheel', handleWheel);
  //     }
  //   };
  // }, []);

  return (
    <div className="multyChild_slider" ref={sliderContainerRef}>
      <Slider ref={sliderRef} {...childSettings}>
        {gallery && gallery.map((gallery, i) => (
          <div key={i} className="h-[476px] laptopHorizontal:h-[400px] tablet:h-[320px] bg-white flex items-center  justify-center w-full relative" >
            <Image
              src={gallery.image}
              unoptimized={true}
              alt='category_Image'
              priority
              fill
              className="w-full object-cover"
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ChildSlider;
