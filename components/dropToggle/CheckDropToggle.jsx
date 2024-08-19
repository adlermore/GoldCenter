'use client'
import { lgList } from "@/utils/data/settingsData";
import React, { useState } from "react";

function CheckDropToggle({dropList}) {

  // Set the initial active button to the first language's lg value.
  const [activeButton, setActiveButton] = useState(dropList[0].lg || '');

  const activeDrop = (e, activeItem) => {
    e.preventDefault();
    // Update the active button to the selected language.
    console.log('_____________', activeItem);
    setActiveButton(activeItem);
  }

  return (
    <div className="drop_block">
      <div className="drop_btn">{activeButton}</div>
      <div className="drop_wrapper">
        {dropList.map((item, i) => (
          <a key={i} href="/" onClick={(e) => activeDrop(e, item.lg)}>
            {item.lg}
          </a>
        ))}
      </div>
    </div>
  );
}

export default CheckDropToggle;
