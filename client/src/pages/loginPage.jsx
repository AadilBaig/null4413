import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookie } from '../global/CookieContext'
import axios from "axios"
import './pages.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  // Get cookie methods from our context api class "CookieContext"
  const { cookieData, saveCookieData, clearCookieData } = useCookie();

  // Method for handling user login
  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    // Reset Error messages at beginning 
    setLoginError("");
    setEmailError("");

    // checks if email is valid
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return;
    }

    // fetch user in database
    try {
      const response = await axios.get(`http://localhost:3001/api/users/findUser?name=${email}&password=${password}`, {
        headers: {
          'Content-Type': 'application/json',
        }
      });

      // Login successful, now create a user session 
      const userSession = {
        userName: response.data.name,
        accessToken: true
      }
      saveCookieData(userSession);

      // redirect to home page
      navigate('/');

    }
    catch (error) {
      if (error.response.status === 401) {
        console.error('User does not exists: ', error);
        setLoginError('Email is not registered, try again');
      }
      return;
    }
    
    // .. if response.status is 401 it means unauthorized because the credentials don't exists
      //... if 401, then update loginError = 'invalid email or password' 

    // .. otherwise, proceed by assingning user access token and redirecting to home page

      // navigate("./Home");

  
  };

  return (
    <div className="mainContainer">
      <div className="forumContainer">
        <div className="content">
        <div className="titleContainer">Login <label className="errorLabel">{loginError}</label></div>
        <form onSubmit={handleSubmit} className="inputContainer">
            <div>
              <label>Email</label>
              <div style={{display: "flex", flexDirection: "column"}}>
                <input className="inputBox" name="username" type="text" required onChange={(e) => setEmail(e.target.value)}/>
                <label className="errorLabel">{emailError}</label>
              </div>
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
              <label>Password</label>
              <div>
                <input className="inputBox" name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <div style={{width: '225px', margin: "1rem"}}>
              <button className="submitButton" type="submit">Sign In</button>
            </div>

            <div>
              Don't have an account? 
              <a href="./register" style={{ marginLeft: '5px'}}>Create a account</a>
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
