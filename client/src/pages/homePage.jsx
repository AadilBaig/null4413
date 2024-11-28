import React, {useState, useEffect} from 'react'
import NavBar from "../components/navBar"

const HomePage = () => {
  const [accessToken, setAccessToken] = useState("");

  // set user access token to local storage on change -> used for session management
  useEffect(() => {
    if (accessToken) {
      localStorage.setItem('accessToken', accessToken);
    }
  }, [accessToken]);

  // retrieves user access token if it exists -> used for session management
  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (token) {
      setAccessToken(token);
    }

  }, [])

  return (
    <div>
      <NavBar />
      Home Page
    </div>
  )
}

export default HomePage
