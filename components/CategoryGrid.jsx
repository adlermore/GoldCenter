'use client'

import { JsonContext } from "@/context/jsonContext";
import IconArrowBottom from "@/public/icons/IconArrowBottom";
import Image from "next/image";
import Link from "next/link";
import React, { useContext } from "react";

function CategoryGrid({ category, subcategory }) {
  const { silverMode } = useContext(JsonContext);

  return (
    <div className="grid gap-[15px] grid-cols-4 w-full laptop:grid-cols-2 mobile:gap-[5px] ">
      {category && category.map((category, i) => (
        <Link
          href={`/productListing?type=${category.title !== 'Accessories' ? category.title.toLowerCase().slice(0, -1) : category.title.toLowerCase()}`}
          key={i}
          className="h-[420px] w-full block relative category_block laptopHorizontal:h-[350px] mobile:h-[200px]"
        >
          <Image
            src={silverMode ? category.imageSilver : category.image}
            unoptimized={true}
            alt="category_Image"
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <span className="absolute left-[30px] text-[32px] text-white category_info mobile:text-[20px] ">
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

export default CategoryGrid;
