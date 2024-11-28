import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import './pages.css'

const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async(e) => {
    // Send login info to the server for verification
    //...
  };

  return (
    <div className="mainContainer">
      <div className="forumContainer">
        <div className="content">
        <div className="titleContainer">Login</div>
        <form onSubmit={handleSubmit} className="inputContainer">
            <div>
              <label>Email</label>
              <div>
                <input className="inputBox" name="username" type="text" required />
              </div>
            </div>

            <div>
              <label>Password</label>
              <div>
                <input className="inputBox" name="username" type="password" required />
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