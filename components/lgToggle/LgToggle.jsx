import React, { useRef, useState } from "react";
import IconArrowBottom from "@/public/icons/IconArrowBottom";
import { lgList } from "@/utils/data/settingsData";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";

function LgToggle() {
  
  const [activeLg, setActiveLg] = useState(lgList[0].lg || "EN"); 
  const [dropActive, setDropActive] = useState(false);

  const ref = useRef();

  const changeActiveLg = (e, item) => {
    e.preventDefault();
    setActiveLg(item.lg);
    setDropActive(!dropActive);
  };

  const dropToggle = () => {
    setDropActive(!dropActive);
  };

  useOnClickOutside(ref, () => {
    if (dropActive) {
      setDropActive(false);
    }
  });

  return (
    <div className={`lg_toggle ${dropActive && "drop_opened"}`}>
      <div
        className="lg_button  flex items-center cursor-pointer duration-300 hover:opacity-70 text-white gap-[7px]"
        ref={ref}
        onClick={dropToggle}
      >
        {activeLg} <IconArrowBottom />
      </div>
      <div className="lg_list">
        <div className="lg_inner">
          {lgList.map((item, i) => (
            <div
              key={i}
              className={`lg_item	${item.lg === activeLg && "active_lg"}`}
            >
              <a href="/" onClick={(e) => changeActiveLg(e, item)}>
                {item.lg}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default LgToggle;
