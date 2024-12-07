import React, {useState, useEffect} from 'react'
import NavBar from "../components/navBar"
import { useCookie } from '../global/CookieContext';

const HomePage = () => {
  // Get cookie methods from our context api class "CookieContext"
  const { cookieData, saveCookieData, clearCookieData } = useCookie();

  // set user access token to local storage on change -> used for session management
  // useEffect(() => {
  //   if (accessToken) {
  //     localStorage.setItem('accessToken', accessToken);
  //   }
  // }, [accessToken]);

  // retrieves user access token if it exists -> used for session management
  useEffect(() => {
      console.log(JSON.stringify(cookieData));
  }, []);

  return (
    <div>
      <NavBar />
      Home Page
    </div>
  )
}

export default HomePage
