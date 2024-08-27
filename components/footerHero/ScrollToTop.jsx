"use client";

import React from "react";
import IconToTop from "@/public/icons/IconToTop";

function ScrollToTop() {
  const handleScrollToTop = (e) => {
    e.preventDefault();
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };
  return (
    <a
      href="/"
      onClick={(e) => handleScrollToTop(e)}
      className="absolute right-[70px] bottom-[70px]"
    >
      <IconToTop />
    </a>
  );
}

export default ScrollToTop;
