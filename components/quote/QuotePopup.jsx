'use client'

import React, { useContext, useRef } from 'react'
import IconClose from '@/public/icons/IconClose.jsx';
import QuoteForm from './QuoteForm.jsx';
import useOnClickOutside from '../../utils/hooks/useOnClickOutside.js';
import { JsonContext } from '@/context/jsonContext';

function QuotePopup() {

  const ref = useRef();
  const { setActivePopup, serActiveService, activePopup } = useContext(JsonContext);

  //Close Popup after outside click
  useOnClickOutside(ref, () => {
    if (document.body.classList.contains("quote_opened")) {
      document.body.classList.remove("quote_opened");
      document.body.style.overflowY = "scroll";
      setTimeout(() => {
        setActivePopup(null);
        serActiveService(null)
      }, 500);
    }
  });

  return (
    <>
      {activePopup === 'quote' &&
        <div className="quote_popup fixed left-0 right-0 bottom-0 flex items-center justify-center pl-[17px] duration-500 transition-[top] top-[-100%] w-full h-full z-[999] overflow-x-hidden overflow-y-auto bg-black bg-opacity-20 tablet:!p-20 tablet:h-[100dvh]">
          <div className="popup_container mobile:h-full mobile:overflow-x-hidden mobile:overflow-y-auto bg-white relative p-20 w-full max-w-[550px] z-30 mx-auto" ref={ref}>
            <div className="title_line flex items-center w-full gap-10">
              <div className="popup_title flex-1 text-center font-bold text-2xl ">Registration</div>
              <a
                href="/#"
                className="popup_close w-[40px] h-[40px] flex items-center justify-center border-2 border-blueDark1 gropu hover:bg-blueDark1 hover:opacity-100 hover:[&>svg&>path]:fill-white "
                onClick={(e) => {
                  e.preventDefault();
                  document.body.classList.remove("quote_opened");
                  document.body.style.overflowY = "scroll";
                  setTimeout(() => {
                    setActivePopup(null);
                  }, 500);
                }}
              >
                <IconClose />
              </a>
            </div>
            <div className="quote_form">
              <QuoteForm />
            </div>
          </div>
        </div>
      }
    </>
  )
}

export default QuotePopup