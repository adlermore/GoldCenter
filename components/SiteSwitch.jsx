"use client";
import { JsonContext } from "@/context/jsonContext";
import React, { useContext } from "react";

function SiteSwitch({ isHeader }) {
  const { silverMode, setSilverMode } = useContext(JsonContext);

  const switchToggle = () => {
    setSilverMode(!silverMode);
  };

  return (
    <>
      {!isHeader ? (
        <div className="flex-col justify-start items-start gap-[9.33px] inline-flex">
          <div className="justify-start items-center gap-[13.06px] inline-flex">
            <div className="text-center text-[#916d50] text-[32px] capitalize">
              Gold
            </div>
            <div
              className="w-[46.65px] h-7 relative cursor-pointer bg-transparent"
              onClick={switchToggle}
            >
              <div className="w-[46.65px] h-7 left-0 top-0 absolute bg-silveGradient silverGradient rounded-[14px] shadow-custom"></div>
              <div
                className={`duration-300 w-[22.39px] h-[22.39px] shadow-inner ${
                  silverMode ? "left-[21px]" : "left-[3.31px]"
                } top-[2.26px] absolute bg-[#f6f6f6] rounded-[46.65px] shadow`}
              ></div>
            </div>
            <div className="text-center text-[#8d8e8e] text-[32px] capitalize">
              Silver
            </div>
          </div>
        </div>
      ) : (
        <div className="tablet:ml-0 justify-start  laptop:ml-20  items-center gap-[8px] ml-auto inline-flex pt-[5px] ">
          <div className="text-center text-[#d3b987]">Gold</div>
          <div
            className="w-[22.08px] h-[13.25px] relative cursor-pointer"
            onClick={switchToggle}
          >
            <div className="w-[22.08px] h-[13.25px] left-0 top-0 absolute bg-gradient-to-t from-[#f7f8f8] via-[#bababa] to-[#afafae] rounded-md" />
            <div
              className={`w-[10.60px] duration-300 h-[10.60px] ${
                silverMode ? "left-[9px]" : "left-[1.57px]"
              } top-[1.07px] absolute bg-[#f6f6f6] rounded-[22.08px] shadow`}
            />
          </div>
          <div className="text-center text-[#d0d3d6]">Silver</div>
        </div>
      )}
    </>
  );
}

export default SiteSwitch;
