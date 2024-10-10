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
// import { bestProducts } from "@/utils/data/homeData";
import { newStores } from "@/utils/data/homeData";

export default async function Home() {


  const resProduct = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/catalog/top`, { cache: 'no-cache' });
  const productResponse = await resProduct.json();
  // console.log('Product Response:', productResponse.best_sales);
  const topData = productResponse.data;

  const resBrands = await fetch(`${process.env.NEXT_PUBLIC_DATA_API}/brands`, { cache: 'no-cache' });
  const brandsResponse = await resBrands.json();
  // console.log('Brands Response:', brandsResponse);
  const brandsData = brandsResponse.brands;


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
        {brandsData.map((store, i) => (
          <div key={i}>
            <ChildSlider gallery={[store.logo , ...store.pictures]} />
            <div className="mt-[30px] laptop:mt-20 text-[20px] text-center">
              {store.company_name}
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
      <ProductSlider sliderContent={productResponse.most_viewed} title='MOST VIEWED' />
      <FooterHero />
    </div>
  );
}
