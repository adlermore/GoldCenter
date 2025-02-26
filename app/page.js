'use client'

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
import { useContext, useEffect, useState } from "react";
import request from "@/utils/hooks/request";
import { JsonContext } from "@/context/jsonContext";
import SliderSceleton from "@/components/slider/SliderSceleton";
import HomeSearch from "@/components/search/HomeSearch";

export default function Home() {

  const [productResponse, setProductResponse] = useState(null);
  const [brandsData, setBrandsData] = useState(null);

  const { silverMode } = useContext(JsonContext);

  useEffect(() => {
    request(`${process.env.NEXT_PUBLIC_DATA_API}/catalog/top/${silverMode ? 'silver' : 'gold'}`)
      .then((data) => {
        setProductResponse(data);
      })
    request(`${process.env.NEXT_PUBLIC_DATA_API}/brands`)
      .then((data) => {
        setBrandsData(data.brands);
      })
  }, [silverMode])


  return (
    <div className="home_page">
      <MainSlider sliderData={homeSliderData} />
       <div className="custom_container">
        <div className="mt-[50px] flex items-center justify-center">
          <HomeSearch />
        </div>
        <div className="my-[40px] flex items-center justify-center">
          <SiteSwitch />
        </div>
      </div>
      <CategoryGrid category={categoryGrid} />
      {productResponse ?
        <ProductSlider sliderContent={productResponse.best_sales} title='BEST SELLERS' />
        :
        <SliderSceleton title='BEST SELLERS' />
      }
      {brandsData && <ParentSlider>
        {brandsData.map((store, i) => (
          <Link
            className="inactive_link"
            key={i}
            href={`/brand/${store?.id}`}
          >
            <ChildSlider gallery={[store.logo, ...store.pictures]} />
            <div className="mt-[20px] laptop:mt-20  text-[18px] text-center">
              {store.company_name}
            </div>
          </Link>
        ))}



        
      </ParentSlider>}
      {productResponse ?
        <ProductSlider sliderContent={productResponse.most_viewed} title='MOST VIEWED' />
        :
        <SliderSceleton title='MOST VIEWED' />
      }
      <FooterHero />
    </div>
  );
}
