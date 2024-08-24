"use client";

import React, { createContext, useEffect, useState } from "react";

const JsonContext = createContext();

const JsonContextProvider = ({ children }) => {
  const [silverMode, setSilverMode] = useState(false);

  useEffect(() => {
    if (silverMode) {
      document.body.classList.add("silverMode");
    } else {
      document.body.classList.remove("silverMode");
    }

    return () => {
      document.body.classList.remove("silverMode");
    };
  }, [silverMode]);

  return (
    <JsonContext.Provider
      value={{
        silverMode,
        setSilverMode,
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

export { JsonContext, JsonContextProvider };
