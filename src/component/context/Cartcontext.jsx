import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { UserContext } from './Usercontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'


export const Cartcon = createContext()

function Cartcontext({ children }) {
  const navigate=useNavigate()

  const { activeuser,userid } = useContext(UserContext)
  const [cartitem, setCartitem] = useState([])
  const [notification,setNotification]=useState(0)

// prevent the clearing of cart page when page refresh
  useEffect(()=>{
    const getCartItems = async ()=>{
      const res = await axios.get(`http://localhost:5000/user/${activeuser.id}`)
      setCartitem(res.data.cart)
      setNotification(res.data.cart.length)
    }
    getCartItems()
  },[])
// 
  //functions for add and delete the cart item
  const addtocart = async (items) => {
    if (activeuser) {
      try {
        const itemWithQTY = { ...items, qty: 1 };
        const res = await axios.get(`http://localhost:5000/user/${activeuser.id}`);
        const user1 = res.data;       
        // Find if the product already exists in the cart
        const existingitem = user1.cart.find((product) => product.id === items.id);
        if (existingitem) {
          alert('Item already exists in your cart');
        } else {
          const updatecart = [...user1.cart, itemWithQTY];
          await axios.put(`http://localhost:5000/user/${activeuser.id}`, {
            ...user1, cart: updatecart
          });
          setCartitem(updatecart);
          setNotification((prevCount) => prevCount + 1);
        }
      } catch (error) {
        console.error('Fetching error', error);
      }
    } else {
      alert("Please login");
      navigate('/login');
    }
  };
  

  const deletecart = async (item, index) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userid}`);
      const userData = response.data;
      const updatedCart = userData.cart.filter(cartItem => cartItem.id !== item.id);
      await axios.patch(`http://localhost:5000/user/${userid}`, {
        input: {
          ...userData.
          cart, updatedCart
        }
      });
      const newCartItem = [...cartitem];
      newCartItem.splice(index, 1);
      setCartitem(newCartItem);
      setNotification((prevCount)=>prevCount-1)
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
// 

  return (
    <div>
      <Cartcon.Provider value={{ cartitem, addtocart, deletecart,notification }}>
        {children}
      </Cartcon.Provider>
    </div>
  )
}

export default Cartcontext