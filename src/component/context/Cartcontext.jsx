import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { UserContext } from './Usercontext'
import axios from 'axios'


export const Cartcon = createContext()

function Cartcontext({ children }) {

  const { activeuser,userid } = useContext(UserContext)
  const [cartitem, setCartitem] = useState([])

  useEffect(()=>{
    const getCartItems = async ()=>{
      // console.log(activeuser);
      const res = await axios.get(`http://localhost:5000/user/${activeuser.id}`)
      setCartitem(res.data.input.cart)
    }
    getCartItems()
  },[])

  
  const addtocart = async (items) => {
    if (activeuser) {
      try {
        const itemWithQTY={...items,qty:1}
        const res = await axios.get(`http://localhost:5000/user/${activeuser.id}`)
        const user1 = res.data
        const updatecart = [...user1.input.cart, itemWithQTY]

        await axios.put(`http://localhost:5000/user/${activeuser.id}`, {
          ...user1, input: { ...user1.input, cart: updatecart }
        })
        setCartitem(updatecart)
      } catch (error) {
        console.error('fetching eror', error)
      }
    }
    else {
      alert("login please")
    }

  }

  const deletecart = async (item, index) => {
    try {
      const response = await axios.get(`http://localhost:5000/user/${userid}`);
      const userData = response.data;
      const updatedCart = userData.input.cart.filter(cartItem => cartItem.id !== item.id);
      await axios.patch(`http://localhost:5000/user/${userid}`, {
        input: {
          ...userData.input,
          cart: updatedCart
        }
      });
      const newCartItem = [...cartitem];
      newCartItem.splice(index, 1);
      setCartitem(newCartItem);
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };

  return (
    <div>
      <Cartcon.Provider value={{ cartitem, addtocart, deletecart }}>
        {children}
      </Cartcon.Provider>
    </div>
  )
}

export default Cartcontext