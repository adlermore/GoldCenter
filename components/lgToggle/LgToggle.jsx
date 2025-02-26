
import React, { useContext, useEffect, useRef, useState } from "react";
import IconArrowBottom from "@/public/icons/IconArrowBottom";
import { lgList } from "@/utils/data/settingsData";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";
import { JsonContext } from "@/context/jsonContext";

function LgToggle() {
  
  const [dropActive, setDropActive] = useState(false);
  const { activeLg, setActiveLg } = useContext(JsonContext);
  const ref = useRef(); 

  useEffect(() => {
    
    const locale = document.cookie
      .split('; ')
      .find(row => row.startsWith('locale='))
      ?.split('=')[1] || 'en-US';       
    setActiveLg(locale);
  }, []);

  const changeActiveLg = (e, item) => {
    e.preventDefault();
    e.stopPropagation();
    setActiveLg(item.lg);
    document.cookie = `locale=${item.lg}; path=/; SameSite=Lax;`;
    setDropActive(false); 
    window.location.reload();
  };

  const dropToggle = () => {
    setDropActive(!dropActive);
  };

  useOnClickOutside(ref, () => {
    if (dropActive) {
      setDropActive(false);
    }
  });
  
  function getTitleByLg(lg) {
    const language = lgList.find(item => item.lg === lg);
    return language ? language.title : 'EN';
  }

  return (
    <div className={`lg_toggle ${dropActive && "drop_opened"}`}  ref={ref}>
      <div
        className="lg_button  mr-[-8px] font-light text-[15px] flex items-center cursor-pointer duration-300 hover:opacity-70 text-white gap-[7px]"
        onClick={dropToggle}
      >
        { getTitleByLg(activeLg)} 
      <IconArrowBottom />
      </div>
      <div className="lg_list">
        <div className="lg_inner">
          {lgList.map((item, i) => (
            <div
              key={i}
              className={`lg_item font-light text-[15px] borderSilver	${item.lg === activeLg && "active_lg"}`}
            >
              <a href="/" onClick={(e) => changeActiveLg(e, item)}>
                {item.title}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LgToggle;
