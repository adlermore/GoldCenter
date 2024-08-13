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
    slidesToScroll: 3
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='multiSlider_container'>
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