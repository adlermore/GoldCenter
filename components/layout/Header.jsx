'use client'

import React, { useEffect, useState } from 'react'
import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { Twirl as Hamburger } from "hamburger-react";
import SiteSwitch from '../SiteSwitch'
import IconHeart from '@/public/icons/IconHeart'
import mainLogo from '@/public/images/logoImage.png'
import AccountToggle from '../account/AccountToggle'
import LgToggle from '../lgToggle/LgToggle'
import { useDispatch, useSelector } from 'react-redux'
import { initializeAuth } from '@/redux/authSlice'
import PriceToggle from '../priceToggle/PriceToggle'
import SearchToggle from '../search/SearchToggle'
import CardCanvas from '../card/CardCanvas'
import Image from 'next/image'
import IconGroup from '@/public/icons/IconGroup'
import { initializeCart } from '@/redux/cartSlice'
import { useRouter } from 'next/navigation';
import { initializeWishlist } from '@/redux/wishlistSlice'
import HeaderMenu from '../menu/HeaderMenu'

function Header() {

  const dispatch = useDispatch();
  const pathname = usePathname();
  const router = useRouter();
  const isAuth = useSelector((state) => state.auth.isAuthenticated);
  const wishListItems = useSelector((state) => state.wishlist.items);
  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (document.body.classList.contains('menu_opened')) {
      setOpen(false)
    }
    if (window.scrollY > 10) {
      setIsScrolled(true);
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu_opened');
    } else {
      document.body.classList.remove('menu_opened');
      document.body.style.overflow = "visible";
    }

    dispatch(initializeAuth());
    dispatch(initializeCart());
    dispatch(initializeWishlist());

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else if (pathname == '/') {
        setIsScrolled(false);
      }
    };

    if (pathname !== '/' || window.scrollY > 10) {
      setIsScrolled(true);
    } else {
      setIsScrolled(false);
    }

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [isOpen, pathname, dispatch]);


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


  const handelFavoriteDirect = () => {
    if (isAuth) {
      router.push('/account/wishList');
    } else {
      loginPopupOpen()
    }
  }

  // Trigger animation when cartItems.length changes
  useEffect(() => {
    if (wishListItems.length > 0) {
      setAnimate(true); // Start animation
      const timer = setTimeout(() => setAnimate(false), 500); 
      return () => clearTimeout(timer); // Cleanup timer
    }
  }, [wishListItems.length]);

  return (
    <header className={`fixed fixed-element duration-500 transition-colors ${isScrolled && 'bg-[#0C1B20]'} top-0 h-[85px] tablet::h-[70px] left-0 right-0 z-[9999] laptop:bg-[#0C1B20]`}>
      <div className='cover_container header_inner h-full justify-between flex items-center  gap-20 '  >
        <Link href='/' className='z-20'>
          <Image
            width={67}
            height={44}
            src={mainLogo}
            alt="Ricardo portrait"
            priority={true}
          />
        </Link>
        <SiteSwitch isHeader />
        <div className={isOpen ? 'menu-open laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-full laptop:ml-0   laptop:h-full laptop:bottom-0  laptop:right-0  duration-[0.7s] mobile:duration-[0.5s]  ' : ' mobile:duration-[0.5s] duration-[0.7s] laptop:right-0 laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-0 laptop:ml-0   laptop:h-full laptop:bottom-0  '}>
          <div className='ml-auto header_wrapp laptop:w-full  w-full laptop:m-0 laptop:flex laptop:justify-end laptop:z-[-1] tablet:w-[calc(100vw)] laptop:left-0 laptop:h-full z-20 laptop:bg-blueDark1 laptop:bg-opacity-35   tablet:bg-white mobile:bg-transparent tablet:text-black laptop:top-[86px] tablet:top-[100px] relative  '>
            <HeaderMenu isScrolled={isScrolled} />
          </div>
        </div>
        <div className='flex items-center ml-auto gap-[20px]  action_block'>
          <div className='duration-300 relative cursor-pointer hover:opacity-70'>
            <Link
              href='/account/personalList'
              className={pathname === '/account/personalList' ? ' pointer-events-none' : ''}
            >
              <IconGroup />
            </Link>
          </div>
          <div className='tablet:hidden'><SearchToggle /> </div>
          <div onClick={handelFavoriteDirect} className='favorite_btn duration-300 relative cursor-pointer hover:opacity-70'>
            <div className={animate ? "animate-icon" : ""}>
              <IconHeart
                className='text-white [&>path]:fill-white'
              />
              {wishListItems.length > 0 &&
                <span className="red_count">{wishListItems.length}</span>
              }
            </div>
          </div>
          <CardCanvas />
          <AccountToggle />
          <LgToggle />
          <PriceToggle />
        </div>
        <div className="hidden z-20 laptop:flex  items-center justify-center relative before:absolute before:w-40 before:bg-blueDark1 before:h-40 mobile:right-[-5px]">
          <Hamburger
            toggled={isOpen}
            toggle={setOpen}
            size={22}
            color="#fff"
          />
        </div>
      </div>
    </header>
  )
}

export default Header