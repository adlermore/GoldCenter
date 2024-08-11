"use client";

import React, { createContext, useState } from "react";

const JsonContext = createContext();

const JsonContextProvider = ({ children }) => {

  const [activePopup, setActivePopup] = useState(null);
  const [silverMode, setSilverMode] = useState(false);

  return (
    <JsonContext.Provider
      value={{
        activePopup,
        setActivePopup,
        silverMode,
        setSilverMode
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

export { JsonContext, JsonContextProvider };
