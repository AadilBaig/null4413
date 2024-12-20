import React, {useEffect, useState} from 'react'
import { useNavigate, useParams} from 'react-router-dom'
import { useCookie } from '../global/CookieContext'
import axios from "axios"
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

    const [isChecked, setIsChecked] = useState(false);
    const [userAddr, setUserAddr] = useState({});

    const [isSubmitted, setIsSubmitted] = useState(false);


    // Get cookie methods from our context api class "CookieContext"
    const { cookieData, saveCookieData, clearCookieData, appendToCart, updateItemQtyInCart } = useCookie();

    const navigate = useNavigate();

    // checks if user is permitted to view this page 
    useEffect(() => {
        if (!cookieData) {
            return;
        }
        else if (cookieData.role === 'guest'){
            alert("You must sign in to proceed to this page");
            navigate("/");
        }
        console.log(cookieData.email)
        // if user is permitted then fetch user's address (including their credit care number)
        const fetchUserAddress = async() => {
            try {
                const response = await axios.get(`http://localhost:3001/api/users/getAddress?id=${id}`, {
                    headers: {
                      'Content-Type': 'application/json',
                    }
                });

                if (!response.data) {
                    console.log("User does not have an address");
                    return;
                }

                console.log(response.data)

                // User does have an address, thus eligble for auto completing form 
                setUserAddr(response.data);
            }
            catch (error) {
                console.error("Error in fetching user address", error);
            }
        }

        // invoke
        fetchUserAddress();
    }, [cookieData])

    // performs autocomplete
    useEffect(() => {
        if (!isChecked) {
            // reset everything 
            setStreetName("");
            setProvince("");
            setCountry("");
            setZip("");
            setPhone("");
            setCardNum("");
            return;
        }

        // console.log(isChecked);
        setStreetName(userAddr.street);
        setProvince(userAddr.province);
        setCountry(userAddr.country);
        setZip(userAddr.zip);
        setPhone(userAddr.phoneNum);
        setCardNum(userAddr.creditcard);

    }, [isChecked]);

    // function to add orders to order collection
    const postOrder = async() => {
        // try{

        // }
        // catch (error) {
        //     console.error("Error in posting order to order collection")
        // }
    }

    // function to update inventory
    const postUpdateItems = async() => {
        // update inventory
        try {
            const reqBody = { 
                orderList: cookieData.cart
            }
            console.log(cookieData.cart);
            const response = await axios.post(`http://localhost:3001/api/users/updateInventory`, reqBody, {
                headers: {
                'Content-Type': 'application/json',
                }
            });

            if (!response.data){
                console.log("Inventory failed to update");
                return;
            }

            // add order to orders collection
            postOrder();
        }
        catch (error) {
            console.log("Error in updating inventory and orders view", error);
        }
    }


    // on submit, update user's address info, subtract inventory, and add order to orderView collection
    useEffect(() => {
        if (!isSubmitted || !cookieData)
            return;
        console.log(userAddr)
        // add user's address to address collection
        if (JSON.stringify(userAddr) === '{}') {
            const postAddress = async() => {
                try{
                    const reqBody = {
                        userid: id,
                        street: streetName,
                        province: province,
                        country: country,
                        zip: zip,
                        phoneNum: phone,
                        creditcard: cardNum
                    }

                    const response = await axios.post(`http://localhost:3001/api/users/addAddress`, reqBody, {
                        headers: {
                          'Content-Type': 'application/json',
                        }
                    });

                    if (!response.data){
                        console.log("Address failed to be added");
                        return
                    }

                    console.log(response.data);
                    setUserAddr(response.data)

                    // After address is added, update inventory and orders
                     postUpdateItems();

                }
                catch (error) {
                    console.log("Error in posting address", error)
                }
            }

            // invoke
            postAddress();
        }
        else {

            // update user address
            const postUpdateAddress = async() => {
                try{
                    const reqBody = {
                        userid: id,
                        street: streetName,
                        province: province,
                        country: country,
                        zip: zip,
                        phoneNum: phone,
                        creditcard: cardNum
                    }
                    const response = await axios.post(`http://localhost:3001/api/users/updateAddress`, reqBody, {
                        headers: {
                        'Content-Type': 'application/json',
                        }
                    });

                    if (!response.data) {
                        console.log("address update failed");
                        return;
                    }

                        // After address is updated, update inventory and orders
                        postUpdateItems();
                }
                catch (error) {
                    console.error("Error in posting user address", error);
                }
            }

            // subtract inventory and add order to orderView db


        // rememebr to clear cart data 
        // alert("Order has been submitted, Thank you.");
        // navigate("/");

            // invoke
            postUpdateAddress();
        }

    }, [isSubmitted])

    const handleSubmit = (e) => {
        e.preventDefault(); // Prevents page reload
        setIsSubmitted(true);
        
    }
  return (
    <>
        <a href="/cart" style={{position: "absolute", padding: "3rem"}}>Back To Cart</a>
        <div className="mainContainer">
            <div className="fillCheckOutContainer">
                <h1 style={{textAlign: "center"}}>Checkout</h1>
            <form onSubmit={handleSubmit} className="inputContainer"> 
                <div>
                    <label>Street Name</label>
                    <div>
                    <input className="inputBox" name="streetName" type="text" required  value={streetName} onChange={(e) => setStreetName(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Province</label>
                    <div>
                    <input className="inputBox" name="province" type="text" required value={province} onChange={(e) => setProvince(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Country</label>
                    <div>
                    <input className="inputBox" name="country" type="text" required value={country} onChange={(e) => setCountry(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Zip</label>
                    <div>
                    <input className="inputBox" name="zip" type="text" required value={zip} onChange={(e) => setZip(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Phone Number</label>
                    <div>
                    <input className="inputBox" name="phoneNumber" type="text" required value={phone} onChange={(e) => setPhone(e.target.value)}/>
                    </div>
                </div>
                <div>
                    <label>Credit Card Number</label>
                    <div>
                    <input className="inputBox" name="creditCard" type="text" required value={cardNum} onChange={(e) => setCardNum(e.target.value)}/>
                    </div>
                </div>
                
                    <div style={{width: '225px', margin: "1rem"}}>
                    <button className="submitButton" type="submit">Submit</button>
                    </div>

                    {JSON.stringify(userAddr) !== '{}' ? (<div>
                        <label>
                            Auto Complete
                        </label>
                        <input type="checkbox" id='autocomplete' checked={isChecked} onChange={() => setIsChecked(prev => !prev)} />
                    </div>) : <></>}
            </form>
            </div>
        </div>
    </>
  )
}

export default CheckoutPage