'use client'

import IconToTop from "@/public/icons/IconToTop";
import React, { useEffect, useRef, useState } from "react";

function ScrollProgress() {
  const containerRef = useRef(null);
  const progressBarRef = useRef(null);
  const [disableBtn, setDisableBtn] = useState(true);

  useEffect(() => {
    const progressBar = progressBarRef.current;
    const totalLength = progressBar.getTotalLength();

    // Set initial stroke values
    progressBar.style.strokeDasharray = totalLength;
    progressBar.style.strokeDashoffset = totalLength;

    const handleScroll = () => {
      const scrollTop = document.documentElement.scrollTop;
      const clientHeight = document.documentElement.clientHeight;
      const scrollHeight = document.documentElement.scrollHeight;

      const scrollPercentage = scrollTop / (scrollHeight - clientHeight);
      const progressOffset = totalLength - totalLength * scrollPercentage;

      // Update progress bar and percentage value
      progressBar.style.strokeDashoffset = progressOffset;
      
      
      if(scrollTop < 120){
        setDisableBtn(true)
      }else{
        setDisableBtn(false)
      }
    };

    // Add scroll event listener
    window.addEventListener("scroll", handleScroll);


    // Cleanup event listener on component unmount
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const handleScrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: "smooth",
    });
  };

  return (
    <div className={`circle_anim ${disableBtn ? 'disable_circle' : ''}`} onClick={handleScrollToTop}> 
      <div className="container"  ref={containerRef}>
        <svg
          className="complete"
          width="60"
          height="60"
          viewport="0 0 60 60"
          xmlns="https://www.w3.org/2000/svg"
        >
          <defs>
            <linearGradient id="grad">
              <stop offset="0%" stopColor="#fbc2eb" />
              <stop offset="100%" stopColor="#a6c1ee" />
            </linearGradient>
          </defs>
          <circle
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="#e5e5e5"
            strokeWidth="2"
          />
          <circle
            className="progress-bar"
            ref={progressBarRef}
            cx="30"
            cy="30"
            r="25"
            fill="none"
            stroke="url(#grad)"
            strokeWidth="2"
            strokeLinecap="round"
            style={{ transition: "stroke-dashoffset 0.1s ease" }}
          />
        </svg>
      </div>
      <span className="to_top_svg">
        <IconToTop />
      </span>
    </div>

  );
}

export default ScrollProgress;
