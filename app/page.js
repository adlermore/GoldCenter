// 'use client'

import ChildSlider from "@/components/slider/ChildSlider";
import ParentSlider from "@/components/slider/ParentSlider";
import MainSlider from "@/components/slider/MainSlider";
import SiteSwitch from "@/components/SiteSwitch";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSlider from "@/components/slider/ProductSlider";
import { newStores } from "@/utils/data/homeData";
import Link from "next/link";
import IconProductCard from "@/public/icons/IconProductCard";
import footerBanner from "@/public/images/footerBanner.png"
import Image from "next/image";
import IconFooterHero1 from "@/public/icons/IconFooterHero1";
import IconFooterHero2 from "@/public/icons/IconFooterHero2";
import IconFooterHero3 from "@/public/icons/IconFooterHero3";
import IconFooterHero4 from "@/public/icons/IconFooterHero4";

export default function Home() {
  return (
    <div className="home_page">
      <MainSlider />
      <div className="custom_container">
        <div className="my-[42px] flex items-center justify-center">
          <SiteSwitch />
        </div>
      </div>
      <CategoryGrid />
      <ProductSlider />
      <ParentSlider>
        {newStores.map((store, i) => (
          <div key={i}>
            <ChildSlider gallery={store.gallery} />
            <div className="mt-[30px] text-[20px] text-center">{store.title}</div>
            <Link href='/' className="flex items-center w-[215px] mx-auto h-[50px] text-[#916D50] text-[24px] bg-[#F8F6F5] justify-center mt-[25px] ">Visit Store</Link>
          </div>
        ))}
      </ParentSlider>
      <ProductSlider />
      <div className="flex bg-white relative">
        <div className="custom_container flex justify-between overflow-hidden h-[650px]">
          <div className="py-[60px] max-w-[520px]">
            <div className=" uppercase text-[25px]  ">Our Advantages</div>
            <div className="mt-[30px] text-base">
              The platform features a wide selection of jewelry from only registered sellers and manufacturers. Here you can find all the jewelry related services you need.
            </div>
            <div className="flex items-center text-xl mt-[35px] gap-[30px]">
              <IconFooterHero1 />
              A Pre-qualified & Trusted Network
            </div>
            <div className="flex items-center text-xl mt-[35px] gap-[30px]">
              <IconFooterHero2 />
              Item Quality Assurance
            </div>
            <div className="flex items-center text-xl mt-[35px] gap-[30px]">
              <IconFooterHero3 />
              Rich Abundance of Choices
            </div>
            <div className="flex items-center text-xl mt-[35px] gap-[30px]">
              <IconFooterHero4 />
              Empowering Customer Experience
            </div>
          </div>
          <div className="absolute right-0 top-0 bottom-0 h-full w-[47%] overflow-hidden">
            <Image
              src={footerBanner}
              alt="Ricardo portrait"
              priority={true}
              fill
              style={{
                objectFit: 'cover',
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
