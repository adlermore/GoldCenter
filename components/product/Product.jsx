'use client';

import { JsonContext } from "@/context/jsonContext";
import IconHeartFill from "@/public/icons/IconHeartFill";
import IconProductCard from "@/public/icons/IconProductCard";
import IconProductHeart from "@/public/icons/IconProductHeart";
import { addToCart } from "@/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";
import { useDispatch, useSelector } from "react-redux";

function Product({ product, onClick }) {

  const dispatch = useDispatch();
  const wishlist = useSelector(state => state.wishlist.items);

  const { activeLg, currency } = useContext(JsonContext);

  // Check if the product is in the wishlist
  const isInWishlist = wishlist.some(item => item.id === product.id);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const handleAddToCart = () => {
    dispatch(addToCart(product));
  };

  const detectScrollBarWidth = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    const scrollBarWidth = windowWidth - documentWidth;
    return scrollBarWidth;
  };

  //Login Popup Open
  const loginPopupOpen = () => {
    const scrollBarWidth = detectScrollBarWidth();
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.classList.add("login_opened");
    const fixedElements = document.querySelectorAll(".fixed-element");
    fixedElements.forEach((el) => {
      el.style.paddingRight = `${scrollBarWidth}px`;
    });
  };

  const handleAddToWishlist = () => {
    if (isAuth) {
      if (isInWishlist) {
        dispatch(removeFromWishlist(product));
      } else {
        dispatch(addToWishlist(product));
      }
    } else {
      loginPopupOpen()
    }
  };

  const getProductName = () => {
    switch (activeLg) {
      case 'EN':
        return product.translation_data?.en.name ||  product.name;
      case 'RU':
        return product.translation_data?.ru.name ||  product.name;
      case 'AM':
        return product.translation_data?.am.name ||  product.name;
      default:
        return product.name;
    }
  };

  const getProductCurrency = () => {
    const formattedPrice = product.price.toLocaleString('en-US') + ' ֏'; 
    switch (currency) {
      case 'amd':
        return product.price.toLocaleString('en-US') + ' ֏';
      case 'rub':
        return (product.price_rub?.toLocaleString('en-US') || formattedPrice) + ' ₽';
      case 'usd':
        return (product.price_usd?.toLocaleString('en-US') || formattedPrice) + ' $';
      case 'eur':
        return (product.price_eur?.toLocaleString('en-US') || formattedPrice) + ' €';
      default:
        return formattedPrice;
    }
  };
  

  return (
    <div className="slider_block">
      <div className="product_image h-[388px] mobile:h-[230px] laptopHorizontal:h-[350px] tablet:h-[300px] overflow-hidden laptop:h-[320px] bg-white w-full flex justify-center items-center relative">
        <Link
          href={`/product/${product.link}`}
          onClick={onClick}
          className="w-full h-full flex justify-center items-center relative !opacity-1"
        >
          <Image
            src={product?.pictures[0]?.path}
            unoptimized
            alt={product.name}
            priority
            // fill
            width={220}
             layout="responsive"
            height={220}
            className="object-cover"
          />
          <span className="product_inner">
            <Image
              src={
                product?.pictures[2]?.is_video === false ?
                  product?.pictures[2]?.path :
                  product?.pictures[0]?.path}
              unoptimized
              alt={product.name}
              priority
              fill
              className="product_inner_img object-cover"
            />
          </span>
        </Link>
        <span className="product_links z-[999] flex flex-col items-center mobile:top-[10px] mobile:right-[10px] absolute top-20 right-15">
          <button
            className={`block`}
            aria-label={isInWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
            onClick={handleAddToWishlist}
          >
            {isInWishlist ? <IconHeartFill className='!w-[18px] h-auto' /> : <IconProductHeart className='w-[18px]' />}
          </button>
          <button
            className="mt-[15px] block"
            onClick={handleAddToCart}
            aria-label="Add to Cart"
          >
            <IconProductCard className='color-[##6a6969] fill-none' />
          </button>
        </span>
      </div>
      <div className="mt-[12px] text-black text-[18px] mobile:text-[14px] mobile:max-w-[120px] truncate">
        {getProductName()}
      </div>
      <div className="font-bold mt-[5px] mobile:text-[14px] text-black">{getProductCurrency()}</div>
    </div>
  );
}

export default Product;
