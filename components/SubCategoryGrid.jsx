import IconArrowBottom from "@/public/icons/IconArrowBottom";
import Link from "next/link";
import React from "react";

function SubCategoryGrid({ category, subcategory }) {
  
  return (
    <div className={`grid gap-[15px] grid-cols-4 w-full laptop:grid-cols-2 mobile:gap-[5px] ${subcategory === 'men' ? 'girid_men' : ''}`}>
      {category && category.map((category, i) => (
        <Link
          href={`/productListing?category=${category.title !== 'Accessories' ? category.title.toLowerCase().slice(0, -1) : category.title.toLowerCase()}&subcategory=${subcategory || ''}`}
          key={i}
          className="h-[420px] w-full block relative category_block laptopHorizontal:h-[350px] mobile:h-[200px]"
        >
          <div className="flex items-center category_icon justify-center bg-white w-full h-full">
            {category.icon}
          </div>
          <span className="absolute left-[30px] text-[32px] tablet:bottom-0 laptopHorizontal:text-[28px] tablet:text-[24px] text-black category_info mobile:text-[20px] ">
            {category.title}
            <span className="flex items-center relative  w-fit text-sm">
              Shop Now
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default SubCategoryGrid;
