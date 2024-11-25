import React from 'react'
import './components.css';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";

const navBar = () => {
  return (
    <div>
        <nav className="navbar">
          <a href="/">Home</a>
          <div className="navbar-right">
          <FaRegUser size={"40"}/>
            <div>
              <div><a href="/login">Login</a></div>
              <div><a href="/register">Register</a></div>
            </div>
            <IoCartOutline size={"40"}/>
            <a href="/cart">Cart</a>
          </div>
      </nav>
    </div>
  )
}

export default navBar
