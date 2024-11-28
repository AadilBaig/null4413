import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    // checks if email is valid
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return;
    }

    // Send login info to the server for verification
    
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

            <div style={{width: '177px', margin: "1rem"}}>
              <button className="submitButton" type="submit">Sign In</button>
            </div>

            <div>
              Don't have an account? 
              <a href="./register" style={{ marginLeft: '10px'}}>Create a Account</a>
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default LoginPage
