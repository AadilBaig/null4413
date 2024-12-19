import React, {useState, useEffect} from 'react'
import NavBar from '../components/navBar'
import { useCookie } from '../global/CookieContext'
import './pages.css'
import { useNavigate } from 'react-router-dom'
import axios from "axios"

const CartPage = () => {

    // Get cookie methods from our context api class "CookieContext"
    const { cookieData, saveCookieData, clearCookieData, appendToCart, updateItemQtyInCart } = useCookie();

    const [qtyInputValues, setQtyInputValues] = useState({});

    const [price, setPrice] = useState(0);

    // navigate
    const navigate = useNavigate();

    // cart items of visitor (containing the actual item objects)
    const [cartItems, setCartItems] = useState([]);

    // fetch user's cart from database if they are logged in
    useEffect(() => {
        if (!cookieData || !cookieData.cart || cookieData.cart.length === 0) {
            console.log("Cookie data or cart is empty, skipping fetch.");
            return;  // Exit early if cookieData or cart is not available
          }
        const fetchCartItems = async() => {

            const reqBody =  {
              cart: cookieData ? cookieData.cart : []
            }
      
            try {
              const response = await axios.post(`http://localhost:3001/api/catalogues/getCartItems`, reqBody, {
                headers: {
                  'Content-Type': 'application/json',
                }}
              );
      
              if (!response.data) {
                console.log("Failed to fetch cart items");
                return;
              }
              console.log(response.data);
              setCartItems(response.data)
            }
            catch (error) {
              console.error("Error in calling the api", error)
            }
          }

        // invoke
        fetchCartItems();
    }, [cookieData])

    // init the qtyInputValues object with the names of each cart item as well as the default entered qty of 1
    useEffect(() => {
        if (!cookieData || !cookieData.cart || cookieData.cart.length === 0) {
            console.log("Cookie data or cart is empty, skipping fetch.");
            return;  // Exit early if cookieData or cart is not available
          }

            // console.log(cookieData.cart)
            const initialQuantities = cookieData.cart.reduce((acc, item) => {
                acc[item.name] = item.qty || 1;
                return acc;
            }, {});
            setQtyInputValues(initialQuantities);
            // console.log(initialQuantities);
        

    }, [cookieData])

    // updates user's current cart to the db
    useEffect(() => {
      if (!cookieData || !cookieData.cart || cookieData.cart.length === 0) {
        console.log("Cookie data or cart is empty, skipping fetch.");
        return;  // Exit early if cookieData or cart is not available
      }

      const postCartItems = async() => {
        const reqBody = {
          email: cookieData.email,
          cart: cookieData.cart
        }
        try {
          const response = await axios.post(`http://localhost:3001/api/users/updateCart`, reqBody, {
            headers: {
              'Content-Type': 'application/json',
            }}
          );
        }
        catch {
  
        }
      }

      // Invoke
      postCartItems();
    }, [cookieData])



    const handleQtyEnter = (itemName, qtyValue, key ,itemInventoryQty) => {

        if (key === 'Enter') {
            updateQty(itemName, qtyValue, itemInventoryQty);
        }
    }

    const updateQty = (itemName, qtyValue, itemInventoryQty) => {
         // checks if entered qty exceeds inventory of a specific item 
         if (qtyValue <= 0) {
            alert('Input must be greater than 0');
            qtyValue = 1;
        }
        else if (qtyValue > itemInventoryQty) {
            alert('Can only purchase up to ' + itemInventoryQty + ' quantities of ' + itemName);
            // console.log(qtyValue)
            qtyValue = itemInventoryQty;
        }
        // console.log(qtyValue);
        // override current entered qty valued of a specific cart item with the new input
        handleQtyChange(itemName, qtyValue);
        updateItemQtyInCart({itemName: itemName,
            quantity: Number(qtyValue) || 1
        })

    }

    const handleQtyChange = (itemName, qtyValue) => {
         // override current entered qty valued of a specific cart item with the new input
         setQtyInputValues((prevQtyInputValues) => ({
            ...prevQtyInputValues,
            [itemName]: Number(qtyValue) || 1,
        }));
    }


    // useEffect(() => {
    //     console.log(qtyInputValues)
    //     if (cookieData)
    //         console.log(cookieData.cart)
    // }, [qtyInputValues])


    // Calculate the total price when the cart or quantities change
    useEffect(() => {
        if (!cookieData || !cookieData.cart || cookieData.cart.length === 0 || cartItems.length === 0) {
            console.log("Cookie data or cart is empty, skipping fetch.");
            return;  // Exit early if cookieData or cart is not available
          }
      
            const totalPrice = cartItems.reduce((sum, item) => sum + (item.price.$numberDecimal * (qtyInputValues[item.name] || 1)), 0);
            // console.log(totalPrice)
            setPrice(isNaN(totalPrice) ? 0 : totalPrice);
        
    }, [cookieData, qtyInputValues, cartItems]);

    // checks user's permission in order to determine if they can proceed to checkout
    const checkVisitorPermissions = () => {
        if (cookieData && cookieData.role === 'guest'){
            alert('Must be signed in to checkout.');
            return;
        }

        navigate('/');
    }

  return (
    <div>
        <NavBar />
        <div className="mainContainerCart">
            <div className="cartContainer">
                {cookieData && cartItems.map((item) => (
                    <div key={item.name}>
                    <div className="cartItem">
                        <div className="placeHolder" style={{flexShrink: "0"}}>Image Placeholder</div>
                        <div style={{display: "flex", flexDirection: "column"}}>
                            <div style={{fontSize: "large", fontWeight: "bold"}}>{item.name}</div>
                            <div>Price: ${item.price.$numberDecimal}</div>
                            <div style={{ flexGrow: 1 }}></div>
                            <div style={{display: "flex", gap: "10px", marginBottom: "1rem"}}> 
                                <div style={{display: "flex", gap: "10px"}}>
                                    Quantity
                                    <input type="number" value={qtyInputValues[item.name] || 1} onChange={(e) => handleQtyChange(item.name, e.target.value)} onKeyDown={(e) => handleQtyEnter(item.name, e.target.value, e.key,item.quantity)}></input>
                                </div>
                                <button onClick={() => updateQty(item.name, qtyInputValues[item.name], item.quantity)}>Update</button>
                                <button>Remove</button>
                            </div>
                        </div>
                    </div>
                    <div style={{backgroundColor: "black", height: "0.5px", width: "100%"}}/>
                    </div>
                ))}
            </div>
            <div className="checkOutContainer">
                <div style={{fontSize: "large"}}>
                    Total Price: <strong>${price.toFixed(2)}</strong>
                </div>
                <button className="addCartButton" onClick={checkVisitorPermissions}>Checkout</button>
            </div>
        </div>
    </div>
  )
}

export default CartPage