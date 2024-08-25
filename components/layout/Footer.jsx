'use client'

import IconToTop from "@/public/icons/IconToTop"
import { FooterSocials, PaymentIcons } from "@/utils/data/settingsData"
import Image from "next/image"
import Link from "next/link"

async function Footer({ settingsData }) {

  const handleScrollToTop = (e) => {
    e.preventDefault()
    window.scrollTo({
      top: 0,
      behavior: 'smooth',
    });
  }

  return (
    <div className='footer py-[120px] bg-[#0C1B20] text-white relative'>
      <div className='custom_container '>
        <div className='flex footer_menu items-center gap-20 justify-between laptopHorizontal:flex-wrap'>
          <div className="menu_block">
            <h2 className="text-xl uppercase text-siteCrem pb-[2px]">Categories</h2>
            <Link href="/">Men</Link>
            <Link href="/">Women</Link>
            <Link href="/">Kids</Link>
            <Link href="/">Accessories</Link>
            <Link href="/">Bullion</Link>
            <Link href="/">Occasions</Link>
          </div>
          <div className="menu_block">
            <h2 className="text-xl uppercase text-siteCrem pb-[2px]">Information</h2>
            <Link href="/">About us</Link>
            <Link href="/">Best sellers</Link>
            <Link href="/">How to become a partner</Link>
            <Link href="/">Privacy policy</Link>
            <Link href="/">Our terms</Link>
          </div>
          <div className="menu_block">
            <h2 className="text-xl uppercase text-siteCrem pb-[2px]">Payment methods</h2>
            <Link href="/" className="pay_title">Visa \ Master \ Idram \ easypay</Link>
            <div className='flex items-center gap-[15px] laptopHorizontal:absolute laptopHorizontal:right-0 laptopHorizontal:top-[calc(-100%+20px)] laptop:left-1/2 laptop:-translate-x-1/2 laptop:justify-center tablet:top-[calc(-100%+45px)] laptop:top-[calc(-100%+30px)] mobile:w-full '>
              {PaymentIcons.map((icons, i) => (
                <div key={i} className='w-[40px] h-[25px] relative'>
                  <Image
                    src={icons.image}
                    alt="Ricardo portrait"
                    width="auto"
                    height="auto"
                    quality="100"
                    priority={true}
                    className="h-full w-full"
                  />
                </div>
              ))}
            </div>
            <Link href="/">Social Media</Link>
            <div className='flex items-center gap-[18px] laptopHorizontal:absolute laptopHorizontal:right-0 laptopHorizontal:top-[calc(-100%+20px)] laptop:left-1/2 laptop:-translate-x-1/2 laptop:justify-center tablet:top-[calc(-100%+45px)] laptop:top-[calc(-100%+30px)] mobile:w-full '>
              {FooterSocials.map((icons, i) => (
                <Link href="/" key={i} className='w-[35px] h-[35px] relative'>
                  <Image
                    src={icons.image}
                    alt="Ricardo portrait"
                    width="auto"
                    height="auto"
                    quality="100"
                    priority={true}
                    className="h-full w-full"
                  />
                </Link>
              ))}
            </div>
          </div>
        </div>
        <div className='pt-[16px] mt-[60px] relative laptopHorizontal:mt-[30px] laptop:mt-[60px]'>
          <div className='flex justify-center text-center items-center gap-20 laptopHorizontal:flex-col'>
            @Copyright 2024
          </div>
        </div>
        <a href="/"
          onClick={e => handleScrollToTop(e)}
          className="absolute right-[70px] bottom-[70px]">
          <IconToTop />
        </a>
      </div>
    </div>
  )
}

export default Footer