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
    } else {
      // For guests, initialize the cookie data with an empty cart
      const guestSession = { role: "guest", cart: [] };
      saveCookieData(guestSession);
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

  // Method to updateQuantity of an item in a cart
  const updateItemQtyInCart = (data) => {
    if (cookieData) {
      // Update the cart by mapping over the items
      // console.log(data.itemName + " " + data.quantity);
      const updatedCart = cookieData.cart.map((cartItem) => {
        if (cartItem.name === data.itemName) {
          // Return a new object with updated quantity
          return {
            ...cartItem,
            qty: data.quantity,
          };
        }
        // Return the item unchanged if it doesn't match
        return cartItem;
      });

      // Create a new cookieData object with the updated cart
      const updatedCookieData = { ...cookieData, cart: updatedCart };

      // Save the updated cookie data
      saveCookieData(updatedCookieData);
    }
  };

  // Method to reset cart
  const resetCart = () => {
    if (cookieData) {
      // Create a new object with an empty cart
      const updatedCookieData = { ...cookieData, cart: [] };

      // Save the updated cookie data
      saveCookieData(updatedCookieData);
    }
  };

  // Method to remove an item from cart
  const removeItem = (itemName) => {
    if (cookieData) {
      // Filter the cart to exclude the item with the specified name
      const updatedCart = cookieData.cart.filter(
        (cartItem) => cartItem.name !== itemName
      );

      // Create a new cookieData object with the updated cart
      const updatedCookieData = { ...cookieData, cart: updatedCart };

      // Save the updated cookie data
      saveCookieData(updatedCookieData);
    }
  };

  return (
    <CookieContext.Provider
      value={{
        cookieData,
        saveCookieData,
        clearCookieData,
        appendToCart,
        updateItemQtyInCart,
        resetCart,
        removeItem,
      }}
    >
      {children}
    </CookieContext.Provider>
  );
};

// Export CookieContext has a custom hook that can be used by any class
export const useCookie = () => useContext(CookieContext);
