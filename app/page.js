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
import PageLoader from "@/components/PageLoader";
import request from "@/utils/hooks/request";
import { JsonContext } from "@/context/jsonContext";

export default function Home() {

  const [productResponse , setProductResponse] = useState(null);
  const [brandsData , setBrandsData] = useState(null);
  const { silverMode } = useContext(JsonContext);

  useEffect(()=>{
    request(`${process.env.NEXT_PUBLIC_DATA_API}/catalog/top/${silverMode ? 'silver' : 'gold' }`)
    // request(`${process.env.NEXT_PUBLIC_DATA_API}/catalog/top`)
    .then((data) => {
      setProductResponse(data);
    })
    request(`${process.env.NEXT_PUBLIC_DATA_API}/brands`)
    .then((data) => {
      setBrandsData(data.brands);
    })
    .catch(error => {
        console.log(error);
    })
  },[silverMode])

  if(!productResponse || !setBrandsData){
    return <PageLoader />
  }
  
  return (
    <div className="home_page">
      <MainSlider sliderData={homeSliderData} />
      
      <div className="custom_container">
        <div className="my-[42px] flex items-center justify-center">
          <SiteSwitch />
        </div>
      </div>

      <CategoryGrid category={categoryGrid} />
      <ProductSlider sliderContent={productResponse.best_sales} title='BEST SALES' />
      <ParentSlider>
        {brandsData && brandsData.map((store, i) => (
          <div key={i}>

            <ChildSlider gallery={[store.logo , ...store.pictures]} />
            <div className="mt-[30px] laptop:mt-20 text-[20px] text-center">
              {store.company_name}
            </div>
            <Link
              href={`/brand/${store?.id}`}
              className="visitStore_btn flex items-center w-[215px] mx-auto h-[50px] text-[#916D50] text-[24px] bg-[#F8F6F5] justify-center mt-[25px] laptop:mt-15  laptop:text-base"
            >
              Visit Store
            </Link>
          </div>
        ))}
      </ParentSlider>
      <ProductSlider sliderContent={productResponse.most_viewed} title='MOST VIEWED' />
      <FooterHero />
    </div>
  );
}
