"use client";

import Link from "next/link";
import Slider from "react-slick";
import IconArrowLeft from "@/public/icons/IconArrowLeft";
import IconArrowRight from "@/public/icons/IconArrowRight";
import Product from "../product/Product";

function ProductSlider({ sliderContent, title, setmode }) {

  let dragging = false;

  function SampleNextArrow(props) {
    const { className, style, onClick } = props;
    return (
      <div
        className={`${className} custom_slider_arr_right ${className.includes("slick-disabled") ? "disabled" : ""
          }`}
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
        className={`${className} custom_slider_arr_left ${className.includes("slick-disabled") ? "disabled" : ""
          }`}
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
      }
      ,
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
    <div className="w-full relative product_slider py-[70px] laptopHorizontal:py-[60px] tablet:py-[30px]">
      <div className={` ${setmode ? 'setSilder' : ''} custom_container`}>
        <div className="  section_title text-[32px] mobile:text-[20px] text-black uppercase mb-[50px] laptopHorizontal:text-[24px]">
          {title}
        </div>
        <Slider {...settings}>
          {sliderContent && sliderContent.map((product, i) => (
            <Product key={i} product={product} onClick={(e) => dragging && e.preventDefault()} />
          ))}
          {!setmode &&
            <div className="slider_block products_link">
              <div className="product_image h-[388px] laptopHorizontal:h-[350px] tablet:h-[300px] overflow-hidden laptop:h-[320px] bg-white w-full flex justify-center items-center relative">
                <Link
                  href="/productListing?category=ring"
                  className="w-full h-full flex justify-center link_inner items-center relative !opacity-1"
                >
                  <span>Products page</span>
                </Link>
              </div>
            </div>
          }
        </Slider>
      </div>
    </div>
  );
}

export default ProductSlider;
