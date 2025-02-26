"use client";

import React, { useEffect, useRef, useState } from "react";
import "@/styles/card.scss";
import IconClose from "@/public/icons/IconClose";
import IconShop from "@/public/icons/IconShop";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import Image from "next/image";
import IconProductHeart from "@/public/icons/IconProductHeart";
import { useDispatch, useSelector } from "react-redux";
import { removeFromCart } from "@/redux/cartSlice";
import { addToWishlist, removeFromWishlist } from "@/redux/wishlistSlice";
import IconHeartFill from "@/public/icons/IconHeartFill";
import { useRouter } from "next/navigation";

function CardCanvas() {
  const ref = useRef();
  const dispatch = useDispatch();
  const router = useRouter();
  const cartItems = useSelector((state) => state.cart.items);
  const totalAmount = useSelector((state) => state.cart.totalAmount);
  const isAuth = useSelector((state) => state.auth.isAuthenticated);

  const [animate, setAnimate] = useState(false);

  const handleRemoveFromCart = (product) => {
    dispatch(removeFromCart(product));
  };

  const detectScrollBarWidth = () => {
    const documentWidth = document.documentElement.clientWidth;
    const windowWidth = window.innerWidth;
    return windowWidth - documentWidth;
  };

  const cardOpen = () => {
    const scrollBarWidth = detectScrollBarWidth();
    document.body.style.overflow = "hidden";
    if (scrollBarWidth > 0) {
      document.body.style.paddingRight = `${scrollBarWidth}px`;
    }
    document.body.classList.add("shopping_opened");
    const fixedElements = document.querySelectorAll(".fixed-element");
    fixedElements.forEach((el) => {
      el.style.paddingRight = `${scrollBarWidth}px`;
    });
  };

  useOnClickOutside(ref, () => {
    if (document.body.classList.contains("shopping_opened")) {
      closeCard();
    }
  });

  const closeCard = (e) => {
    if (e) {
      e.preventDefault();
    }
    document.body.style.overflow = "";
    document.body.style.paddingRight = "";
    document.body.classList.remove("shopping_opened");
    const fixedElements = document.querySelectorAll(".fixed-element");
    fixedElements.forEach((el) => {
      el.style.paddingRight = "";
    });
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

  const wishlist = useSelector(state => state.wishlist.items);

  const handleAddToWishlist = (product, callback) => {
    if (isAuth) {
      if (callback) {
        dispatch(removeFromWishlist(product));
      } else {
        dispatch(addToWishlist(product));
      }
    } else {
      loginPopupOpen()
    }
  };

  const handleDirectToCard = () => {
    router.push('/shoppingCart');
    setTimeout(() => {
      closeCard()
    }, 300);
    // if (isAuth) {
    //   router.push('/account/myCart');
    // } else {
    //   loginPopupOpen()
    // }
  }
  
  const handleDirectToPay = () => {
    router.push('/checkout');
    setTimeout(() => {
      closeCard()
    }, 300);
    // if (isAuth) {
    //   router.push('/account/myCart');
    // } else {
    //   loginPopupOpen()
    // }
  }

  

  // Trigger animation when cartItems.length changes
  useEffect(() => {
    if (cartItems.length > 0) {
      setAnimate(true); // Start animation
      const timer = setTimeout(() => setAnimate(false), 500); // Reset after animation
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [cartItems.length]);


  return (
    <>
      <div className="duration-300 cursor-pointer hover:opacity-70 relative" onClick={cardOpen}>
        <div className={animate ? "animate-icon" : ""}>
          <IconShop
            className={`text-white [&>path]:fill-white`}
          />
          {cartItems.length > 0 &&
            <span className="red_count">{cartItems.length}</span>
          }
        </div>
      </div>
      <div className="shopping_bag_block">
        <div className="shoping_inner_block" ref={ref}>
          <div className={`shoping_container ${cartItems.length === 0 ? 'empty' : ''}`}>
            <div className="top_block">
              <div className="block_title">
                Shopping Cart (<span>{cartItems.length}</span>)
              </div>
              <button className="icon_menu_close shopping_close" onClick={e => closeCard(e)}>
                <IconClose />
              </button>
            </div>
            <div className="shoping_bag_list">
              {cartItems.length === 0 ? (
                <div className="empty_block">
                  <div className="empty_inner">
                    <div className="icon_cart"></div>
                    <div className="empty_title">Your Shopping Bag is Empty</div>
                    <div className="empty_desc">Add items</div>
                  </div>
                </div>
              ) : (
                <div className="shoping_list_inner">
                  {cartItems && cartItems.map((product, index) => (
                    <div key={index} className="product_block">
                      <div className="image_block relative">
                        <Image
                          src={product.pictures[0]?.path || product.images[0].path}
                          unoptimized={true}
                          alt="category_Image"
                          fill
                          priority
                        />
                        <button onClick={() => handleAddToWishlist(product, wishlist.some(item => item.id === product.id))} className="card_heart z-[999999] cursor-pointer flex flex-col items-center">
                          {wishlist.some(item => item.id === product.id) ? <IconHeartFill className='!w-[18px] h-auto' /> : <IconProductHeart className='w-[18px]' />}
                        </button>
                      </div>
                      <div className="info_block">
                        <div className="top_ineer_block">
                          <div className="product_name">{product.name}</div>
                          <div className="product_code">Product code: <span>AL0456</span></div>
                        </div>
                        <div className="bottom_ineer_block flex items-center w-full">
                          <div className="product_price">
                            <div className="active_price">{product.price?.toLocaleString('en-US')}֏</div>
                          </div>
                          <button className="remove_btn" onClick={() => handleRemoveFromCart(product)}>REMOVE</button>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="bottom_block">
              <div className="subtotal_block">
                <div className="inner_title">Total</div>
                <div className="total_sum">{totalAmount.toLocaleString('en-US')}<span>AMD</span></div>
              </div>
              <div className="shipping_block">
                <div className="inner_title">
                  Delivery in Yerevan is carried out within 3 working days.
                </div>
              </div>
              <div className="card_buttons">
                <button className="checkout_button " onClick={handleDirectToCard} >Go to Cart</button>
                <button onClick={handleDirectToPay} className="pay_button">Pay</button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default CardCanvas;
