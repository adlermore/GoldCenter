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
      className="absolute toTop_btn right-[70px] bottom-[70px] mobile:right-[30px] mobile:bottom-30"
    >
      <IconToTop />
    </a>
  );
}

export default ScrollToTop;
