'use client'

import IconProductCard from "@/public/icons/IconProductCard";
import IconProductHeart from "@/public/icons/IconProductHeart";
import { addToCart } from "@/redux/cartSlice";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { useDispatch } from "react-redux";

function Product({ product, onClick }) {

  const dispatch = useDispatch();

  const handleAddToCart = (e) => {
    e.preventDefault();
    dispatch(addToCart(product));
  };

  return (
    <div className="slider_block">
      <div className="prudcut_image h-[388px] laptopHorizontal:h-[350px] tablet:h-[300px] overflow-hidden laptop:h-[320px] bg-white w-full flex justify-center items-center relative">
        <Link
          href={`/product/${product.id}`}
          onClick={onClick}
          className="w-full h-full flex justify-center items-center relative"
        >
          <Image
            src={product.image}
            unoptimized={true}
            alt="category_Image"
            priority
            fill
            className="object-contain"
          />
          <span className="product_inner">
            <Image
              src={product.innerImage}
              unoptimized={true}
              alt="category_Image"
              priority
              fill
              className="product_inner_img object-cover"
            />
          </span>
        </Link>
        <span className="product_links z-[999] flex flex-col items-center absolute top-20 right-15">
          <button className="block" aria-label="Add to Favorite">
            <IconProductHeart className='w-[18px]' />
          </button>
          <button className="mt-[15px] block" onClick={handleAddToCart} aria-label="Add to Cart">
            <IconProductCard className='fill-none ' />
          </button>
        </span>
      </div>
      <div className="mt-[12px] text-black text-[18px] ellipsis1">{product.title}</div>
      <div className="font-bold mt-[5px] text-black">{product.price}</div>
    </div>
  );
}

export default Product;
