"use client";

import Link from "next/link";
import Slider from "react-slick";
import IconArrowLeft from "@/public/icons/IconArrowLeft";
import IconArrowRight from "@/public/icons/IconArrowRight";
import Product from "../product/Product";

function ProductSlider({ sliderContent }) {
  
  let dragging = false;

  function SampleNextArrow(props) {
    const { style, onClick } = props;
    return (
      <div
        className="custom_slider_arr_right"
        style={{ ...style }}
        onClick={onClick}
      >
        <IconArrowRight />
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
        {" "}
        <IconArrowLeft />
      </div>
    );
  }

  const settings = {
    infinite: true,
    dots: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    swipeToSlide: true,
    slidesToScroll: 4,
    beforeChange: () => (dragging = true),
    afterChange: () => (dragging = false),
    nextArrow: <SampleNextArrow />,
    prevArrow: <SamplePrevArrow />,
  };

  return (
    <div className="w-full relative product_slider py-[130px]">
      <div className="custom_container">
        <div className="  text-[32px] text-black uppercase mb-[50px]">
          Best Sellers
        </div>
        <Slider {...settings}>
          {sliderContent && sliderContent.map((product, i) => (
            <Product  key={i}  product={product} onClick={(e) => dragging && e.preventDefault()} />
          ))}
        </Slider>
        <Link
          href="/"
          className="mt-[58px] h-[50px] w-full max-w-[276px] bg-transparent border-white text-xl flex items-center justify-center border-2 text-white mx-auto  cursor-pointer hover:bg-siteCrem hover:border-siteCrem duration-300"
        >
          Load More
        </Link>
      </div>
    </div>
  );
}

export default ProductSlider;
