'use client'

import ChildSlider from "@/components/slider/ChildSlider";
import ParentSlider from "@/components/slider/ParentSlider";
import MainSlider from "@/components/MainSlider";

export default function Home() {

  return (
    <div className="home_page">
      <MainSlider />
      <ParentSlider>
        <ChildSlider />
      </ParentSlider>
    </div>
  );
}
