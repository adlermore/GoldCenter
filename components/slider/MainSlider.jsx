"use client"

import Slider from "react-slick";
import Image from "next/image";
import { JsonContext } from "@/context/jsonContext";
import { useContext } from "react";

function MainSlider({sliderData}) {

  const { silverMode} = useContext(JsonContext);
  
  const settings = {
    fade: true,
    infinite: true,
    dots: true,
    autoplay: true,
    speed: 500,
    slidesToShow: 1,
    arrows: false,
    autoplaySpeed: 4000,
    slidesToScroll: 1,
    pauseOnHover: false
  };

  return (
    <div className="w-full relative slick_wrapper laptop:mt-[80px] tablet:mt-[110px] ">
      <Slider {...settings} >
        {sliderData.map((slider , index ) => (
          <div key={index} className='slider_container h-[606px] w-full relative laptopHorizontal:h-[500px] laptop:h-[400px] mobile:h-[300px]'>
            <div className="slider_background relative h-full w-full ">
              <Image
                src={silverMode && slider.imageSilver ? slider.imageSilver  : slider.image}
                alt='future_Image'
                fill
                unoptimized={true}
                sizes="100vw"
                className="h-full w-full object-cover"
              />
            </div>
            <div className="slider_content">
              <div className="slider_title">{slider.title}</div>
              <div className="slider_description">{slider.description}</div>
            </div>
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default MainSlider