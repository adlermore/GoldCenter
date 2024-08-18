'use client'

import React, {useRef } from "react";
import IconChack from "@/public/icons/IconChack.jsx";
import useOnClickOutside from "../../utils/hooks/useOnClickOutside";

function SuccessPopup() {

  const ref = useRef();

  //Close popup after Outside Click
  useOnClickOutside(ref, () => {
    if( document.body.classList.contains("success_opened")){
      document.body.classList.remove("success_opened");
      document.body.style.overflow = "visible";
    }
  });

  return (
    <div className="success_popup fixed left-0  right-0 bottom-0 flex items-center justify-center pl-[17px] duration-500 transition-[top] top-[-100%] w-full h-full z-[999] overflow-x-hidden overflow-y-auto bg-blueDark2 bg-opacity-50 mobile:!p-20">
      <div
        className="popup_container  bg-white relative p-20 w-full mobile:p-[15px] max-w-[380px] z-30 mx-auto"
        ref={ref}
      >
        <div className="flex items-center w-full h-full p-20 mobile:p-[15px] border border-1 border-blueDark1 flex-col justify-center text-center">
          <IconChack />
          <div className=" mt-[10px] text-xl mobile:text-base  text-center font-bold">
            Lorem ipsum dolor sit amet, consectetur adipiscing.
          </div>
        </div>
        <a
          href="/#"
          className="popup_close w-full h-[40px] flex items-center justify-center bg-blueDark2 text-white mt-16 font-semibold text-base"
          onClick={(e) => {
            e.preventDefault(); 
            document.body.classList.remove("success_opened");
            document.body.style.overflow = "visible";
          }}
        >Close
        </a>
      </div>
    </div>
  );
}

export default SuccessPopup;
