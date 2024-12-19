import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'
import { useCookie } from '../global/CookieContext'

const CheckoutPage = () => {

    // Get cookie methods from our context api class "CookieContext"
    const { cookieData, saveCookieData, clearCookieData, appendToCart, updateItemQtyInCart } = useCookie();

    const navigate = useNavigate();

    // checks if user is permitted to view this page 
    useEffect(() => {
        if (!cookieData) {
            console.log("Cookie is empty , redirecting to home");
            navigate("/");
        }
        else if (cookieData.role === 'guest'){
            alert("You do not have permission to proceed to this page");
            navigate("/");
        }
    }, [cookieData])
  return (
    <div>checkoutPage</div>
  )
}

export default CheckoutPage