import React, { useContext } from "react";
import Image from "next/image";
import footerBanner from "@/public/images/footerBanner.png";
import footerSilverBanner from "@/public/images/footerSilverBanner.png";
import IconFooterHero1 from "@/public/icons/IconFooterHero1";
import IconFooterHero2 from "@/public/icons/IconFooterHero2";
import IconFooterHero3 from "@/public/icons/IconFooterHero3";
import IconFooterHero4 from "@/public/icons/IconFooterHero4";
import { JsonContext } from "@/context/jsonContext";

function FooterHero() {
  
  const { silverMode } = useContext(JsonContext);


  return (
    <div className="flex bg-white relative tablet:pb-[40px]">
      <div className="custom_container flex justify-between overflow-hidden h-[650px] laptopHorizontal:h-[500px] tablet:flex-col tablet:h-auto">
        <div className="py-[60px] max-w-[520px] laptopHorizontal:max-w-[50%] laptop:py-40 tablet:max-w-none tablet:pl-10">
          <div className=" uppercase text-[25px] laptopHorizontal:text-[20px]  ">Our Advantages</div>
          <div className="mt-[30px] text-base laptopHorizontal:mt-20">
            The platform features a wide selection of jewelry from only
            registered sellers and manufacturers. Here you can find all the
            jewelry related services you need.
          </div>
          <div className="flex items-center text-xl mt-[35px] gap-[30px] laptopHorizontal:mt-20 laptopHorizontal:gap-20 laptopHorizontal:text-base">
            <IconFooterHero1 />A Pre-qualified & Trusted Network
          </div>
          {/* <div className="flex items-center text-xl mt-[35px] gap-[30px] laptopHorizontal:mt-20 laptopHorizontal:gap-20 laptopHorizontal:text-base">
            <IconFooterHero2 />
            Item Quality Assurance
          </div> */}
          <div className="flex items-center text-xl mt-[35px] gap-[30px] laptopHorizontal:mt-20 laptopHorizontal:gap-20 laptopHorizontal:text-base">
            <IconFooterHero3 />
            Rich Abundance of Choices
          </div>
          <div className="flex items-center text-xl mt-[35px] gap-[30px] laptopHorizontal:mt-20 laptopHorizontal:gap-20 laptopHorizontal:text-base">
            <IconFooterHero4 />
            Empowering Customer Experience
          </div>
        </div>
        <div className="absolute right-0 top-0 overflow-hidden bottom-0 h-full w-[47%] tablet:relative tablet:w-full tablet:h-[300px]">
          <Image
            src={silverMode ? footerSilverBanner : footerBanner  }
            alt="Ricardo portrait"
            priority={true}
            unoptimized = {true}
            fill
            sizes="50vw"
            style={{
              objectFit: "cover",
            }}
          />
        </div>
      </div>
    </div>
  );
}

export default FooterHero;
