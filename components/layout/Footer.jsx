import { FooterSocials, PaymentIcons } from "@/utils/data/settingsData"
import Image from "next/image"
import Link from "next/link"
import ScrollToTop from "../footerHero/ScrollToTop"

async function Footer({ settingsData }) {
  return (
    <div className='footer py-[120px] bg-[#0C1B20] text-white relative laptopHorizontal:py-[80px] mobile:py-[40px]'>
      <div className='custom_container '>
        <div className='flex footer_menu items-center gap-20 justify-between tablet:grid tablet:grid-cols-2 tablet:gap-40 mobile:grid-cols-1'>
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
            <div className='flex items-center gap-[15px]'>
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
            <div className='flex items-center gap-[18px]'>
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
        <div className='pt-[16px] mt-[60px] relative laptopHorizontal:mt-[30px]'>
          <div className='flex justify-center text-center items-center gap-20 laptopHorizontal:flex-col'>
            @Copyright 2024
          </div>
        </div>
       <ScrollToTop />
      </div>
    </div>
  )
}

export default Footer