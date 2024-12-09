import React , {useState} from 'react'
import { useNavigate } from 'react-router-dom'
import './components.css';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import { useCookie } from '../global/CookieContext';

const NavBar = () => {
  const { cookieData, saveCookieData, clearCookieData } = useCookie();

  const navigate = useNavigate();

  const logout = (e) => {
    e.preventDefault();
    console.log("Logged out");
    clearCookieData();
    navigate("/login")
  }

  return (
    <div style={{position: "sticky", top: "0", zIndex: "3"}}>
        <nav className="navbar">
          <a href="/">Home</a>
          <div className="navbar-right">
          <FaRegUser size={"40"}/>
            <div>
              {
                cookieData ? (<div><a style={{cursor: "pointer", textDecoration: "underline", color: "blue"}} onClick={logout}>Sign Out</a></div>) : (
                <>
                  <div><a href="/login">Sign In</a></div>
                  <div><a href="/register">Register</a></div>
                  </>
                )
              }

            </div>
            <IoCartOutline size={"40"}/>
            <a href="/cart">Cart</a>
          </div>
      </nav>
    </div>
  )
}

export default NavBar
