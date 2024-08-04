"use client";

import React, { createContext, useState } from "react";

const JsonContext = createContext();

const JsonContextProvider = ({ children }) => {
  
  const [activeService, serActiveService] = useState(null);
  const [activePopup, setActivePopup] = useState(null);

  return (
    <JsonContext.Provider
      value={{
        activeService,
        activePopup,
        setActivePopup,
        serActiveService,
      }}
    >
      {children}
    </JsonContext.Provider>
  );
};

export { JsonContext, JsonContextProvider };
