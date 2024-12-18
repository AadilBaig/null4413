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
    else {
            // For guests, initialize the cookie data with an empty cart
            setCookieData({ cart: [] });
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

    // Method to append an item to the cart
    const appendToCart = (newItem) => {
      // Ensure cookieData is not null and has a cart property
      if (cookieData) {
        // Create a new object with the updated cart
        const updatedCart = [...cookieData.cart, newItem];
  
        // Update the cookie data with the new cart
        const updatedCookieData = { ...cookieData, cart: updatedCart };
  
        // Save updated data to cookie and update state
        saveCookieData(updatedCookieData);
      }
    };

  return (
    <CookieContext.Provider
      value={{ cookieData, saveCookieData, clearCookieData, appendToCart }}
    >
      {children}
    </CookieContext.Provider>
  );
};

// Export CookieContext has a custom hook that can be used by any class
export const useCookie = () => useContext(CookieContext);
