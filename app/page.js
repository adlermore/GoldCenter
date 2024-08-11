'use client'

import ChildSlider from "@/components/slider/ChildSlider";
import ParentSlider from "@/components/slider/ParentSlider";
import MainSlider from "@/components/slider/MainSlider";
import SiteSwitch from "@/components/SiteSwitch";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSlider from "@/components/slider/ProductSlider";

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
      {/* <ParentSlider>
        <ChildSlider />
        <ChildSlider />
      </ParentSlider> */}
    </div>
  );
}
