import React, { createContext, useState, useContext, useEffect } from "react";
import Cookies from "js-cookie";

// Cookie Context
const CookieContext = createContext();

// Provider
export const CookieProvider = ({ children }) => {
  const [cookieData, setCookieData] = useState(null);

  // Will be called on initial load
  useEffect(() => {
    const storedCookie = Cookies.get("userSession");
    // Checks if the cookie storing access token already exists for the current user
    if (storedCookie) {
      setCookieData(JSON.parse(storedCookie));
    }
  }, []);

  // Method for saving cookie data (access token)
  const saveCookieData = (data) => {
    // th newly created cookie will expire in one day
    Cookies.set("userSession", JSON.stringify(data), { expires: 1 });
    setCookieData(data);
  };

  // Method for destroying cookie
  const clearCookieData = () => {
    Cookies.remove("userSession");
    setCookieData(null);
  };

  return (
    <CookieContext.Provider
      value={{ cookieData, saveCookieData, clearCookieData }}
    >
      {children}
    </CookieContext.Provider>
  );
};

// Export CookieContext has a custom hook that can be used by any class
export const useCookie = () => useContext(CookieContext);
