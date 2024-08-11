'use client'

import React, { useRef, useEffect } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

function ChildSlider() {
  const sliderContainerRef = useRef(null);
  const sliderRef = useRef(null);

  const childSettings = {
    dots: true,
    infinite: true,
    arrow: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };

  const handleWheel = (e) => {
    e.preventDefault();
    if (e.deltaY < 0) {
      sliderRef.current.slickPrev();
    } else {
      sliderRef.current.slickNext();
    }
  };

  useEffect(() => {
    const sliderElement = sliderContainerRef.current;
    if (sliderElement) {
      sliderElement.addEventListener('wheel', handleWheel);
    }
    return () => {
      if (sliderElement) {
        sliderElement.removeEventListener('wheel', handleWheel);
      }
    };
  }, []);

  return (
    <div className="multyChild_slider" ref={sliderContainerRef}>
      <Slider ref={sliderRef} {...childSettings}>
        <div>Child Slide 1</div>
        <div>Child Slide 2</div>
        <div>Child Slide 3</div>
      </Slider>
    </div>
  );
}

export default ChildSlider;
