'use client'

import React from 'react';
import Slider from "react-slick";

function ParentSlider({ children }) {
  const parentSettings = {
    dots: true,
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 3
  };

  const stopPropagation = (e) => {
    e.stopPropagation();
  };
  return (
    <div className='multiSlider_container'>
      <Slider {...parentSettings}>
        <div>2</div>
        {React.Children.map(children, (child, index) => (
          <div key={index} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
            {child}
          </div>
        ))}
        <div>3</div>
        <div>4</div>
      </Slider>
    </div>
  )
}

export default ParentSlider