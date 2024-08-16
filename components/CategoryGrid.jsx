import { categoryGrid } from "@/utils/data/homeData";
import Image from "next/image";
import Link from "next/link";
import React from "react";

function CategoryGrid() {
  return (
    <div className="grid gap-[15px] grid-cols-4 w-full">
      {categoryGrid.map((category, i) => (
        <Link
          href="/"
          key={i}
          className="h-[420px] w-full block relative category_block"
        >
          <Image
            src={category.image}
            unoptimized={true}
            alt="category_Image"
            fill
            sizes="100vw"
            className="h-full w-full object-cover"
          />
          <span className="absolute bottom-[16px] left-[30px] text-[32px] text-white">
            {category.title}
          </span>
        </Link>
      ))}
    </div>
  );
}

export default CategoryGrid;
