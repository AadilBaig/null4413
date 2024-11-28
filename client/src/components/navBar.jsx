import React , {useState} from 'react'
import './components.css';
import { IoCartOutline } from "react-icons/io5";
import { FaRegUser } from "react-icons/fa";
import SearchBar from './searchBar';

const NavBar = () => {
  const [accessToken, setAccessToken] = useState(localStorage.getItem("accessToken"));

  const logout = () => {
    localStorage.removeItem("accessToken");
    setAccessToken("");
  }
  return (
    <div>
        <nav className="navbar">
          <a href="/">Home</a>
          <SearchBar/>
          <div className="navbar-right">
          <FaRegUser size={"40"}/>
            <div>
              {
                accessToken ? <div><button onClick={logout}>Sign Out</button></div> : (
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
