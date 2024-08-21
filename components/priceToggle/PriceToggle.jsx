import React, { useRef, useState } from "react";
import IconArrowBottom from "@/public/icons/IconArrowBottom";
import { currencyList } from "@/utils/data/settingsData";
import useOnClickOutside from "@/utils/hooks/useOnClickOutside";

function PriceToggle() {

  const [activecurrency, setActivecurrency] = useState(currencyList[0].currency || "EN");
  const [dropActive, setDropActive] = useState(false);

  const ref = useRef();

  const changeActivecurrency = (e, item) => {
    e.preventDefault();
    setActivecurrency(item.currency);
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
    <div className={`currency_toggle ${dropActive && "drop_opened"}`} ref={ref}>
      <div
        className="currency_button flex items-center cursor-pointer duration-300 hover:opacity-70 text-white gap-[7px]"
        onClick={dropToggle}
      >
        {activecurrency} <IconArrowBottom />
      </div>
      <div className="currency_list">
        <div className="currency_inner">
          {currencyList.map((item, i) => (
            <div
              key={i}
              className={`currency_item	${
                item.currency === activecurrency && "active_currency"
              }`}
            >
              <a href="/" onClick={(e) => changeActivecurrency(e, item)}>
                {item.currency}
              </a>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default PriceToggle;
