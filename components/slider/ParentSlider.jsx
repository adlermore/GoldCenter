'use client'

import React from 'react';
import Slider from "react-slick";

function ParentSlider({ children }) {
  const parentSettings = {
    dots: false,
    infinite: false,
    arrows: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 3,
    slidesToScroll: 3,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        }
      },
      {
        breakpoint: 575,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        }
      },
    ]
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='multiSlider_container'>
      <div className='custom_container'>
        <div className="  text-[32px] text-black laptopHorizontal:text-[24px] uppercase mb-[50px]">New stores</div>
      </div>
      <Slider {...parentSettings}>
        {React.Children.map(children, (child, index) => (
          <div key={index} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
            {child}
          </div>
        ))}
      </Slider>
    </div>
  )
}

export default ParentSlider