"use client";

import Link from "next/link";
import Slider from "react-slick";
import IconArrowLeft from "@/public/icons/IconArrowLeft";
import IconArrowRight from "@/public/icons/IconArrowRight";
import Image from "next/image";

function StoreSlider({ sliderContent, title }) {

  let dragging = false;

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom_slider_arr_right ${className.includes("slick-disabled") ? "disabled" : ""}`}
        style={{ ...style }}
        onClick={onClick}
      >
        <IconArrowRight />
      </div>
    );
  }

  function SamplePrevArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom_slider_arr_left ${className.includes("slick-disabled") ? "disabled" : ""}`}
        style={{ ...style }}
        onClick={onClick}
      >
        <IconArrowLeft />
      </div>
    );
  }

  const settings = {
    infinite: false,
    dots: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    swipeToSlide: true,
    slidesToScroll: 1,
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
    responsive: [
      {
        breakpoint: 1320,
        settings: {
          arrows: false
        }
      },
      {
        breakpoint: 991,
        settings: {
          arrows: false,
          slidesToShow: 3,
        }
      },
      {
        breakpoint: 767,
        settings: {
          arrows: false,
          slidesToShow: 2,
        }
      },
      {
        breakpoint: 575,
        settings: {
          infinite: false,
          arrows: false,
          slidesToShow: 1.3,
        }
      }
    ]
  };

  return (
    <div className="w-full relative mt-[30px] mb-[50px] tablet:mb-[30px]">
      <div className="custom_container store_slider">
        <Slider {...settings}>
          {sliderContent && sliderContent.map((brand, index) => (
            <Link href={`/brand/${brand?.store_id}`} scroll={true} key={index} className='relative store_inline flex items-center justify-center'>
              <span className="image_wrapper">
                <span className="image_block  bg-white flex items-center justify-center ">
                  <Image
                    src={brand.logo}
                    alt="Ricardo portrait"
                    fill
                    quality="100"
                    priority={true}
                    className="h-full w-full object-contain"
                  />
                </span>
              </span>
              <span className="text-base mt-[20px] uppercase block">{brand.company_name}</span>
            </Link>
          ))}
        </Slider>
      </div>
    </div>
  );
}

export default StoreSlider;
