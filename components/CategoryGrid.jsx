import IconArrowBottom from "@/public/icons/IconArrowBottom";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryGrid({ category }) {
  return (
    <div className="grid gap-[15px] grid-cols-4 w-full laptop:grid-cols-2 mobile:gap-[5px] ">
      {category && category.map((category, i) => (
        <Link
          href="/"
          key={i}
          className="h-[420px] w-full block relative category_block laptopHorizontal:h-[350px] mobile:h-[200px]"
        >
          <Image
            src={category.image}
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
              <IconArrowBottom className="absolute  rotate-[-90deg] duration-300 mt-[2px] right-[-15px]" />
            </span>
          </span>
        </Link>
      ))}
    </div>
  );
}

export default CategoryGrid;
