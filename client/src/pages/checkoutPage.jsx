import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { useCookie } from '../global/CookieContext'
import './pages.css'

const CheckoutPage = () => {

    const { id } = useParams();

    // address info
    const [streetName, setStreetName] = useState("");
    const [province, setProvince] = useState("");
    const [country, setCountry] = useState("");
    const [zip, setZip] = useState("");
    const [phone, setPhone] = useState("");
    const [cardNum, setCardNum] = useState("");


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
            alert("You must sign in to proceed to this page");
            navigate("/");
        }

        // if user is permitted then fetch user's address (including their credit care number)
        const fetchUserAddress = async() => {

        }

        // invoke
        fetchUserAddress();
    }, [cookieData])
  return (
    <>
        <a href="/cart" style={{position: "absolute", padding: "3rem"}}>Back To Cart</a>
        <div className="mainContainer">
            <div className="fillCheckOutContainer">
                <h1 style={{textAlign: "center"}}>Checkout</h1>
            <form className="inputContainer"> 
                <div>
                    <label>Street Name</label>
                    <div>
                    <input className="inputBox" name="streetName" type="text" required onChange={(e) => setStreetName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Province</label>
                    <div>
                    <input className="inputBox" name="province" type="text" required onChange={(e) => setProvince(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Country</label>
                    <div>
                    <input className="inputBox" name="country" type="text" required onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Zip</label>
                    <div>
                    <input className="inputBox" name="zip" type="text" required onChange={(e) => setZip(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Phone Number</label>
                    <div>
                    <input className="inputBox" name="phoneNumber" type="text" required onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Credit Card Number</label>
                    <div>
                    <input className="inputBox" name="creditCard" type="text" required onChange={(e) => setCardNum(e.target.value)}/>
                    </div>
                </div>
                
                    <div style={{width: '225px', margin: "1rem"}}>
                    <button className="submitButton" type="submit">Submit</button>
                    </div>
            </form>
            </div>
        </div>
    </>
  )
}

export default CheckoutPage