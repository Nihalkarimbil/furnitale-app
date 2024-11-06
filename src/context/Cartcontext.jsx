import React, { useContext, useEffect, useState } from 'react'
import { createContext } from 'react'
import { UserContext } from './Usercontext'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosinstance from '../axiosinstance'

export const Cartcon = createContext()

function Cartcontext({ children }) {
  const [clientSecret, setClientSecret] = useState('');
  const { activeuser, userid } = useContext(UserContext)
  const [cartitem, setCartitem] = useState([])
  const [wishnotification, setwishnoti] = useState(0)
  const [notification, setNotification] = useState(0)
  const [wishitem, setwishitm] = useState([])
  const [orders,setOrders]=useState([])
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate()

  useEffect(() => {

    getCartItems()
    getWishItems()
    getAllorders()

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

  const getWishItems = async () => {
    if (activeuser) {
      try {
        
        const res = await axiosinstance.get("/user/wishlist")

        const products = res.data.products || [];
        setwishitm(products);
        setwishnoti(products.length);

      } catch (error) {

        console.error("Error fetching cart data:", error);
        setwishitm([]);
        setwishnoti(0);
      }
    }
  }
  // 
  //functions for add and delete the cart item
  const addtocart = async (items) => {
    console.log('kviub', items);

    if (activeuser) {
      try {
        
        await axiosinstance.post('/user/addtocart', {
          productId: items._id,
          quantity: 1
        });

        await getCartItems()
        toast.success(`${items.name} added to cart`)

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
      await axiosinstance.delete('/user/deletecart', {
        productId: item._id
      });
      await getCartItems()

    } catch (error) {
      console.error("Error deleting item from cart:", error);
    }
  };
  // 
  const addtowishlist = async (product) => {
    if (activeuser) {
      try {
      
        const isAlreadyInWishlist = wishitem.some(item => item.productId === product._id);

        if (!isAlreadyInWishlist) {
         
          await axiosinstance.post('/user/addwish', {
            productId: product._id
          });
          getWishItems(); // Refresh wishlist items
        }

      } catch (error) {
        console.error('Error adding to wishlist:', error); // Log error for debugging
        toast.error("Error adding to wishlist");
      }
    } else {
      toast.error("Please login");
      navigate('/login');
    }
  };

  const removewish = async (item) => {
    try {
      await axiosinstance.delete(`/user/removewish`, {
        data: { productId: item }
      });
      await getWishItems(); // Refresh wishlist items after deletion
    } catch (error) {
      console.log('Error removing from wishlist:', error);
    }
};

const createOrder=async()=>{
  try{
    const resp =await axiosinstance.post('/user/addOrder')
 
    setClientSecret(resp.data.data.clientsecret)
  
    await getCartItems()
    navigate('/payment')
  }catch(error){
    toast.error('failed to creating order')

  }
}


const getAllorders = async () => {
  try {
    
    const response = await axiosinstance.get("/user/getAllorders");
     setOrders(response.data)

    
    return orders;
  } catch (error) {
    console.error("Error fetching orders:", error);
    return [];
  }
  
};

const cancelOrder=async(orderID)=>{
  try {
    await axiosinstance.delete(`/user/order/${orderID}`)
    toast.success('order canceled')

  } catch (error) {
    console.log(error);
    
  }
}



  return (
    <div>
      <Cartcon.Provider value={{ loading,cancelOrder,getAllorders,orders,clientSecret,createOrder,removewish, wishnotification, getCartItems, cartitem, addtocart, deletecart, notification, addtowishlist, wishitem }}>
        {children}
      </Cartcon.Provider>
    </div>
  )
}

export default Cartcontext