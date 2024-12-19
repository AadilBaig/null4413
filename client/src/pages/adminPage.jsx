import React, { useState, useEffect } from 'react'
import NavBar from '../components/navBar'
import { useCookie } from '../global/CookieContext'
import './pages.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const AdminPage = () => {

    return (
        <div>
            <NavBar />
            
        </div>
    )
}

export default AdminPage