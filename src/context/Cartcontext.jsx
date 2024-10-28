import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { UserContext } from './Usercontext'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosinstance from '../axiosinstance'

export const Cartcon = createContext()

function Cartcontext({ children }) {
  const navigate = useNavigate()

  const { activeuser, userid } = useContext(UserContext)
  const [cartitem, setCartitem] = useState([])

  const [notification, setNotification] = useState(0)
  const [wishitem, setwishitm] = useState([])

  // prevent the clearing of cart page when page refresh
  useEffect(() => {

    getCartItems()

  }, [activeuser])

  const getCartItems = async () => {
    if (activeuser) {
      try {
        const res = await axiosinstance.get("/user/cart")

        const products = res.data.products || [];
        setCartitem(products);
        setNotification(products.length);

      } catch (error) {

        console.error("Error fetching cart data:", error);
        setCartitem([]);
        setNotification(0);
      }
    }
  }
  // 
  //functions for add and delete the cart item
  const addtocart = async (items) => {
    console.log('kviub',items);
    
    if (activeuser) {
      try {
        const res = await axiosinstance.post('/user/addtocart', {
          productId: items._id,
          quantity: 1
        });

        await getCartItems()
        toast.success(`${items.name} added to cart`)
        setNotification((prevCount) => prevCount + 1)

      } catch (error) {
        console.error('Fetching error', error);
        toast.error('Fetching error')
      }
    } else {
      toast.error("Please login");
      navigate('/login');
    }
  };


  const deletecart = async (item, index) => {
    try {
        await axiosinstance.delete('/user/deletecart',{
        productId: item._id
      });
      await getCartItems()
      setNotification((prevCount) => prevCount - 1)
    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  // 
  const addtowishlist = (product) => {
    // Check if the item is already in the wishlist
    const alreadyInWishlist = wishitem.some(item => item.id === product.id);

    if (!alreadyInWishlist) {
      setwishitm([...wishitem, product]);
      toast.success(`${product.name} added to wishlist`)
    } else {
      toast.error('Product is already in your wishlist!');
    }
  };

  return (
    <div>
      <Cartcon.Provider value={{ cartitem, addtocart, deletecart, notification, addtowishlist, wishitem }}>
        {children}
      </Cartcon.Provider>
    </div>
  )
}

export default Cartcontext