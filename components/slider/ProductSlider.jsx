'use client'
import Slider from "react-slick";
import Image from "next/image";
import { bestProducts } from "@/utils/data/homeData";
import Link from "next/link";

function ProductSlider() {
  let dragging = false;
  const settings = {
    infinite: true,
    dots: false,
    autoplay: false,
    speed: 500,
    slidesToShow: 4,
    arrows: true,
    swipeToSlide: true,
    slidesToScroll: 4,
    beforeChange: () => dragging = true,
    afterChange: () => dragging = false,
  };

  return (
    <div className="w-full relative product_slider py-[130px]">
      <div className="custom_container">
        <div className="  text-[32px] text-black uppercase mb-[50px]">Best Sellers</div>
        <Slider {...settings} >
          {bestProducts.map((product, i) => (
            <dliv key={i} className="slider_block">
              <Link href='/2212' onClick={(e) => dragging && e.preventDefault()} className='prudcut_image h-[388px] bg-white w-full flex justify-center items-center relative'>
                <Image
                  src={product.image}
                  unoptimized={true}
                  alt='category_Image'
                  priority
                />
                <span className="product_inner">
                  <Image
                    src={product.innerImage}
                    unoptimized={true}
                    alt='category_Image'
                    priority
                    fill
                    className="product_inner_img"
                  />
                </span>
              </Link>
              <div className="mt-[12px] text-black text-[18px]">{product.title}</div>
              <div className="font-bold mt-[5px] text-black">{product.price}</div>
            </dliv>
          ))}
        </Slider>
        <Link href="/" className="mt-[58px] h-[50px] w-full max-w-[276px] bg-transparent border-white flex items-center justify-center border-2 text-white mx-auto uppercase cursor-pointer hover:bg-siteCrem hover:border-siteCrem duration-300" >load more</Link>
      </div>
    </div>
  )
}

export default ProductSlider