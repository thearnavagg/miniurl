import React, { createContext, useState } from "react";

export const NavbarContext = createContext();

export const NavbarProvider = ({ children }) => {
  const [links, setLinks] = useState([]);

  return (
    <NavbarContext.Provider value={{ links, setLinks }}>
      {children}
    </NavbarContext.Provider>
  );
};
