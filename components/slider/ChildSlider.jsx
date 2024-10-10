'use client'

import React, { useRef } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
import IconProductHeartWhite from "@/public/icons/IconProductHeartWhite";

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

  return (
    <div className="multyChild_slider" ref={sliderContainerRef}>
      <Slider ref={sliderRef} {...childSettings}>
        {gallery && gallery.map((gallery, i) => (
          <div key={i} className="h-[476px] laptopHorizontal:h-[400px] p-[40px] tablet:h-[320px] bg-white flex items-center  justify-center w-full relative" >
            <div className="relative w-full h-full">
            <Image
              src={gallery}
              unoptimized={true}
              alt='category_Image'
              priority
              fill
              className="w-full object-contain"
            />
            </div>
   
            <span className="product_links z-[999] flex flex-col items-center absolute top-20 right-15">
              <button className="block" aria-label="Add to Favorite">
                <IconProductHeartWhite className='w-[26px] ' />
              </button>
            </span>
          </div>
        ))}
      </Slider>
    </div>
  );
}

export default ChildSlider;
