import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosinstance from '../axiosinstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const admincontext = createContext()


function AdminContext({ children }) {

    const [products, setProduct] = useState([])
    const [Costomers, setCostomers] = useState([])
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

    return (
        <div>
            <admincontext.Provider value={{ fetchpro, products, Costomers, fetchuser, deletepro }}>
                {children}
            </admincontext.Provider>
        </div>
    )

}

export default AdminContext