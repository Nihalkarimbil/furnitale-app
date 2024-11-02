import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosinstance from '../axiosinstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const admincontext = createContext()


function AdminContext({ children }) {

    const [products, setProduct] = useState([])
    const [Costomers, setCostomers] = useState([])
    const [Orders,setOrders]=useState([])
    const [userOrders,setuserOrder]=useState([])
    const navigate=useNavigate()


    const fetchpro = async () => {
        try {
            const respons = await axiosinstance.get("/admin/products")
            setProduct(respons.data);
            console.log(respons.data);

        } catch (error) {
            console.error("eror fetching data", error)
        }
    }



    const fetchuser = async () => {
        try {
            const respons = await axiosinstance.get("/admin/users")
            setCostomers(respons.data);
            console.log('fdtfyfyf', respons.data)
        } catch (error) {
            console.error("eror fetching data", error)
        }
    }

    const deletepro = async (item) => {
        try {
            await axiosinstance.delete(`/admin/deleteproduct/${item._id}`)
            toast.success(`${item.name} succesfully deteted`)
            navigate('/products')
        } catch (error) {
            console.error('error on deleting product' + error)
            toast.error('failed to delete product')
        }

    }

    const allorders =async ()=>{
        try {
            const res=await axiosinstance.get('/admin/orders')
            setOrders(res.data)
        } catch (error) {
            toast.error('error on finding orders')
            console.log(error);
            
        }
    }

    const finduserOrder=async(userID)=>{
        try {
            const response=await axiosinstance.get(`/admin/orderofuser/${userID}`)
            setuserOrder(response.data)
            

        } catch (error) {
            console.log(error)
           
        }
    }

    const updateShippingStatus = async (orderId, newStatus) => {
        console.log('33333',orderId)
        try {
          const response = await axiosinstance.put(`/admin/shipupdate/${orderId}`, { newStatus });
          return response.data; // Return the response data from the server
        } catch (error) {
          console.error('Error updating shipping status:', error);
          throw error; // Rethrow the error for handling in the calling component
        }
      };
    
    return (
        <div>
            <admincontext.Provider value={{  updateShippingStatus,finduserOrder,userOrders,Orders,allorders,fetchpro, products, Costomers, fetchuser, deletepro }}>
                {children}
            </admincontext.Provider>
        </div>
    )

}

export default AdminContext