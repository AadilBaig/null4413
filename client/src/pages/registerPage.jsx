import React, {useState} from 'react'
import './pages.css'
import axios from "axios"
import { useNavigate } from 'react-router-dom'

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [registerError, setRegisterError] = useState('');
  const navigate = useNavigate(); // navigation functionality

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    // Reset Error messages at beginning 
    setRegisterError("");
    setEmailError("");

    // checks if email is valid using reg ex
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email.trim())) {
      setEmailError('Please enter a valid email')
      return;
    }

    // check if user already exists in database
    try{
        const response = await axios.get(`http://localhost:3001/api/users/findUser?name=${email}`, {
          headers: {
            'Content-Type': 'application/json',
          }
        });

        // user already exists, reject
        console.log('User already exists: ', response.data);
        setRegisterError('Email already exists, Please try another');
        return;

    }
    catch (error) {
      if (error.response.status === 404)
        console.error('User does not exists, can proceed...', error);
    }

    const userData = {
      name: email,
      password: password
    }

    // Post new user data to data base
    try {
      const response = await axios.post('http://localhost:3001/api/users/register', userData, {
        headers: {
          'Content-Type': 'application/json',
        }});

        console.log('User has been successfully added: ', response.data);

        // reset 
        setEmail("");
        setPassword("");

        // redirect
        navigate("/login");
    }
    catch (error) {
      console.error('Error in registering user: ', error);
    }

  };

  return (
    <div className="mainContainer">
      <div className="forumContainer">
        <div className="content">
        <div className="titleContainer">Sign Up<label className="errorLabel">{registerError}</label></div>
        <form onSubmit={handleSubmit} className="inputContainer">
            <div>
              <label>Email</label>
                <div style={{display: "flex", flexDirection: "column"}}>
                <input className="inputBox" name="username" type="text" required onChange={(e) => setEmail(e.target.value)}/>
                </div>
                <label className="errorLabel">{emailError}</label>
            </div>

            <div style={{display: "flex", flexDirection: "column"}}>
              <label>Password</label>
              <div>
                <input className="inputBox" name="password" type="password" required onChange={(e) => setPassword(e.target.value)}/>
              </div>
            </div>

            <div style={{width: '225px', margin: "0.5rem"}}>
              <button className="submitButton" type="submit">Sign Up</button>
            </div>

            <div>
              Already have an account? 
              <a href="./login" style={{ marginLeft: '5px'}}>Login</a>
            </div>
        </form>
        </div>
      </div>
    </div>
  )
}

export default RegisterPage
