import Link from "next/link";
import ChildSlider from "@/components/slider/ChildSlider";
import ParentSlider from "@/components/slider/ParentSlider";
import MainSlider from "@/components/slider/MainSlider";
import SiteSwitch from "@/components/SiteSwitch";
import CategoryGrid from "@/components/CategoryGrid";
import ProductSlider from "@/components/slider/ProductSlider";
import FooterHero from "@/components/footerHero/FooterHero";
import { homeSliderData } from "@/utils/data/homeData";
import { categoryGrid } from "@/utils/data/homeData";
import { bestProducts } from "@/utils/data/homeData";
import { newStores } from "@/utils/data/homeData";

export default function Home() {
  return (
    <div className="home_page">
      <MainSlider sliderData={homeSliderData} />
      <div className="custom_container">
        <div className="my-[42px] flex items-center justify-center">
          <SiteSwitch />
        </div>
      </div>
      <CategoryGrid category={categoryGrid} />
      <ProductSlider sliderContent={bestProducts} />
      <ParentSlider>
        {newStores.map((store, i) => (
          <div key={i}>
            <ChildSlider gallery={store.gallery} />
            <div className="mt-[30px] laptop:mt-20 text-[20px] text-center">
              {store.title}
            </div>
            <Link
              href="/"
              className="visitStore_btn flex items-center w-[215px] mx-auto h-[50px] text-[#916D50] text-[24px] bg-[#F8F6F5] justify-center mt-[25px] laptop:mt-15  laptop:text-base"
            >
              Visit Store
            </Link>
          </div>
        ))}
      </ParentSlider>
      <ProductSlider sliderContent={bestProducts} />
      <FooterHero />
    </div>
  );
}
