import React, {useState} from 'react'
import './pages.css'

const RegisterPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleSubmit = async(e) => {
    e.preventDefault(); // Prevent form from submitting and reloading the page

    // checks if email is valid
    if (!/^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/.test(email)) {
      setEmailError('Please enter a valid email')
      return;
    }
  };

  return (
    <div className="mainContainer">
      <div className="forumContainer">
        <div className="content">
        <div className="titleContainer">Sign Up<label className="errorLabel">{loginError}</label></div>
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