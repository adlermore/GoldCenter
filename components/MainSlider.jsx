"use client"
import mainSlider1 from '../public/images/mainBanner1.png'
import mainSlider2 from '../public/images/mainBanner2.webp'
import mainSlider3 from '../public/images/mainBanner3.webp'
import Slider from "react-slick";
import Image from "next/image";

function MainSlider() {

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
    <div className="w-full relative slick_wrapper">
      <Slider {...settings} >
        <div className='slider_container h-[606px] w-full relative'>
          <div className="slider_background ">
            <Image
              src={mainSlider1}
              alt='future_Image'
              fill
              unoptimized={true}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="slider_content">
            <div className="slider_title ">
              Variety of SETS
              for all occasions
            </div>
            <div className="slider_description">
              express yourself by gifting your beloved one
              a character matching set
            </div>
          </div>
        </div>
        <div className='slider_container h-[606px] w-full relative'>
          <div className="slider_background ">
            <Image
              src={mainSlider2}
              alt='future_Image'
              fill
              unoptimized={true}
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="slider_content">
            <div className="slider_title ">
              The Lotus Of New Beginnings
            </div>
            <div className="slider_description">
              Discover our most-loved style.
              a character matching set
            </div>
          </div>
        </div>
        <div className='slider_container h-[606px] w-full relative'>
          <div className="slider_background ">
            <Image
              src={mainSlider3}
              alt='future_Image'
              unoptimized={true}
              fill
              sizes="100vw"
              className="h-full w-full object-cover"
            />
          </div>
          <div className="slider_content">
            <div className="slider_title ">
              Leo Season matching set
            </div>
            <div className="slider_description">
              a character matching set
              Harness the vibrant energy of this fire sign.
            </div>
          </div>
        </div>
      </Slider>
    </div>
  )
}

export default MainSlider