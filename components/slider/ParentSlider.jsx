'use client'

import IconArrowLeft from '@/public/icons/IconArrowLeft';
import IconArrowRight from '@/public/icons/IconArrowRight';
import React from 'react';
import Slider from "react-slick";

function ParentSlider({ children }) {

  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="custom_slider_arr_right"
        style={{ ...style }}
        onClick={onClick}
      >
        <IconArrowRight className='[&>path]:stroke-blakc' />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="custom_slider_arr_left"
        style={{ ...style }}
        onClick={onClick}
      >
        <IconArrowLeft className='[&>path]:stroke-blakc' />
      </div>
    );
  }

  const parentSettings = {
    dots: false,
    infinite: true,
    arrows: true,
    speed: 500,
    autoplay: true,
    slidesToShow: 5,
    slidesToScroll: 5,
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 991,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 3,
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
        <div className="  text-[32px] section_title text-black laptopHorizontal:text-[24px] uppercase mb-[50px]">New stores</div>
      </div>
      <div className='custom_container'>
        <Slider {...parentSettings}>
          {React.Children.map(children, (child, index) => (
            <div key={index} onMouseDown={stopPropagation} onTouchStart={stopPropagation}>
              {child}
            </div>
          ))}
        </Slider>
      </div>
    </div>
  )
}

export default ParentSlider