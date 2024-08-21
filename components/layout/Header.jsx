'use client'

import React, { useContext, useEffect, useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { JsonContext } from '@/context/jsonContext'
import { HeaderLinks } from '@/utils/routes'
import { usePathname } from 'next/navigation'
import { Twirl as Hamburger } from "hamburger-react";
import mainLogo from '@/public/images/logoImage.png'
import SiteSwitch from '../SiteSwitch'
import IconArrowBottom from '@/public/icons/IconArrowBottom'
import IconUser from '@/public/icons/IconUser'
import IconShop from '@/public/icons/IconShop'
import IconHeart from '@/public/icons/IconHeart'
import IconSearch from '@/public/icons/IconSearch'
import { Menu, MenuButton, MenuDivider, MenuGroup, MenuItem, MenuList, useDisclosure } from '@chakra-ui/react'
import AccountToggle from '../account/AccountToggle'
import LgToggle from '../lgToggle/LgToggle'
import { useDispatch } from 'react-redux'
import { fetchUserInfo, setAuthenticated } from '@/redux/authSlice'
import PriceToggle from '../priceToggle/PriceToggle'
import SearchToggle from '../search/SearchToggle'
import CardCanvas from '../card/CardCanvas'

function Header({ settingsData }) {

  const { profileOpen, profileToggle } = useDisclosure();
  const dispatch = useDispatch();

  const pathname = usePathname();

  const [isOpen, setOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  //mobile Menu Trigger
  useEffect(() => {
    // document.body.style.overflowY = "scroll";
    if (document.body.classList.contains('menu_opened')) {
      setOpen(false)
    }
    if (isOpen) {
      document.body.style.overflow = "hidden";
      document.body.classList.add('menu_opened');
    } else {
      // document.body.style.overflowY = "scroll";
      document.body.classList.remove('menu_opened');
    }

    const token = localStorage.getItem('access_token');
    if (token) {
      dispatch(setAuthenticated(true));
      dispatch(fetchUserInfo());
    } else {
      dispatch(setAuthenticated(false));
    }

    const handleScroll = () => {
      if (window.scrollY > 10) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };

  }, [isOpen, pathname, dispatch]);



  return (
    <header className={`fixed duration-500 ${isScrolled && 'bg-black'} top-0 h-[85px] left-0 right-0 z-[99]`}>
      <div className='cover_container h-full flex items-center gap-20' >
        <Link href='/' className='z-20'>
          {/* <Image
            src={mainLogo}
            alt="Ricardo portrait"
            priority={true}
          /> */}
        </Link>
        <SiteSwitch isHeader />
        <div className={isOpen ? 'menu-open laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-full laptop:ml-0   laptop:h-full laptop:bottom-0 overflow-hidden  laptop:right-0  duration-[0.7s] mobile:duration-[0.5s]  ' : ' mobile:duration-[0.5s] duration-[0.7s] laptop:right-0 laptop:fixed  z-20 ml-auto  laptop:z-0 laptop:w-0 laptop:ml-0   laptop:h-full laptop:bottom-0 overflow-hidden  '}>
          <div className='ml-auto laptop:w-full  w-full  laptop:flex laptop:justify-end laptop:z-[-1] tablet:w-[calc(100vw)] laptop:left-0 laptop:h-full z-20 laptop:bg-blueDark1 laptop:bg-opacity-35 laptop:top-0  tablet:bg-white mobile:bg-transparent tablet:text-black laptop:pt-[96px] mobile:pt-[130px] '>
            <div className='mobile_container relative flex items-center gap-32 laptop:min-w-[350px] tablet:min-w-[calc(100%-32px)] laptop:overflow-y-auto mobile:w-[calc(100%-16px)]   laptop:bg-[#f4faff] laptopHorizontal:gap-20 laptop:flex-col laptop:pt-[30px] laptop:mr-[16px] mobile:mr-[8px] laptop:gap-[30px]'>
              {HeaderLinks.map((link, i) => (
                <Link
                  key={i}
                  href={link.href}
                  className={pathname === link.href ? ' pointer-events-none text-white text-base font-light underline laptopHorizontal:text-sm laptop:font-bold laptop:w-[350px] tablet:w-[calc(100%-16px)] whitespace-nowrap laptop:text-center flex justify-center items-center gap-[20px] laptop:text-[16px] ' : ' tablet:w-[calc(100%-16px)]  laptop:text-[16px] flex justify-center items-center gap-[20px] laptop:text-center laptop:w-[350px] whitespace-nowrap laptop:font-bold laptopHorizontal:text-sm text-white text-base '}
                >
                  {link.title}
                  <div className='laptop:block hidden'>
                    {'>'}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='flex items-center ml-auto gap-[15px]'>
                  <SearchToggle />
          <div>
            <IconHeart
              className='text-white [&>path]:fill-white'
            />
          </div>
          <CardCanvas />
          <AccountToggle />
          <LgToggle />
          <PriceToggle />
        </div>
        <div className={isOpen ? ' flex items-center gap-20 ml-auto relative z-20 mobile:bg-white  mobile:absolute mobile:p-8 mobile:justify-between mobile:top-[-100%] mobile:w-full mobile:left-0  mobile:z-[1] mobile:shadow-inner mobile:duration-[0.3s]  ' : ' mobile:duration-[0.3s]  mobile:z-[1] mobile:shadow-inner  flex items-center gap-20 ml-auto relative z-20 mobile:bg-white  mobile:absolute mobile:p-8 mobile:justify-between mobile:top-[-100%] mobile:w-full mobile:left-0 '}>

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