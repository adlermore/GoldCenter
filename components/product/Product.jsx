import IconProductCard from "@/public/icons/IconProductCard";
import IconProductHeart from "@/public/icons/IconProductHeart";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function Product({ product, onClick }) {
  return (
    <dliv className="slider_block">
      <Link
        href="/"
        onClick={onClick}
        className="prudcut_image h-[388px] bg-white w-full flex justify-center items-center relative"
      >
        <Image
          src={product.image}
          unoptimized={true}
          alt="category_Image"
          priority
        />
        <span className="product_links z-[99999] flex flex-col items-center absolute top-20 right-15">
          <IconProductHeart />
          <span className="mt-[15px] block">
            <IconProductCard />
          </span>
        </span>
        <span className="product_inner">
          <Image
            src={product.innerImage}
            unoptimized={true}
            alt="category_Image"
            priority
            fill
            className="product_inner_img"
          />
        </span>
      </Link>
      <div className="mt-[12px] text-black text-[18px]">{product.title}</div>
      <div className="font-bold mt-[5px] text-black">{product.price}</div>
    </dliv>
  );
}

export default Product;
