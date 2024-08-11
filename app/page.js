// 'use client'

import ChildSlider from "@/components/slider/ChildSlider";
import ParentSlider from "@/components/slider/ParentSlider";
import MainSlider from "@/components/slider/MainSlider";
import SiteSwitch from "@/components/SiteSwitch";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSlider from "@/components/slider/ProductSlider";
import { newStores } from "@/utils/data/homeData";
import Link from "next/link";

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
    </div>
  );
}
