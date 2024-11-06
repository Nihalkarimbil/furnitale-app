import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosinstance from '../axiosinstance'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'

export const admincontext = createContext()


function AdminContext({ children }) {

    const [products, setProduct] = useState([])
    const [Costomers, setCostomers] = useState([])
    const [Orders, setOrders] = useState([])
    const [userOrders, setuserOrder] = useState([])
    const [revenew, setRevenew] = useState({})
    const [Decor, setDecor] = useState([])
    const [Bed, setBed] = useState([])
    const [Dining, setDining] = useState([])
    const [Living, setliving] = useState([])
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate()


    const fetchpro = async () => {


        try {

            const respons = await axiosinstance.get("/admin/products")
            setProduct(respons.data);

        } catch (error) {
            console.error("eror fetching data", error)
        }

    }



    const fetchuser = async () => {
        try {

            const respons = await axiosinstance.get("/admin/users")
            setCostomers(respons.data)
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

    const allorders = async () => {
        try {

            const res = await axiosinstance.get('/admin/orders')
            setOrders(res.data)
        } catch (error) {
            toast.error('error on finding orders')
            console.log(error);

        }
    }

    const finduserOrder = async (userID) => {
        try {

            const response = await axiosinstance.get(`/admin/orderofuser/${userID}`)
            setuserOrder(response.data)


        } catch (error) {
            console.log(error)

        }
    }

    const updateShippingStatus = async (orderId, newStatus) => {

        try {

            const response = await axiosinstance.put(`/admin/shipupdate/${orderId}`, { newStatus });
            return response.data;
        } catch (error) {
            console.error('Error updating shipping status:', error);
            throw error;
        }

    };

    const totalrevenew = async () => {
        try {

            const res = await axiosinstance.get('/admin/revenew')
            setRevenew(res.data)
        } catch (error) {
            throw new Error
        }

    }

    useEffect(() => {
        const fetch = async () => {
            try {

                const respons = await axiosinstance.get("/admin/productss/bedroom")
                setBed(respons.data);
            } catch (error) {
                console.error("eror fetching data", error)
            }

        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            try {

                const respons = await axiosinstance.get("/admin/productss/decor")
                setDecor(respons.data);
            } catch (error) {
                console.error("eror fetching data", error)
            }

        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            try {

                const respons = await axiosinstance.get("/admin/productss/dining")
                setDining(respons.data);
            } catch (error) {
                console.error("eror fetching data", error)
            }
        }
        fetch()
    }, [])

    useEffect(() => {
        const fetch = async () => {
            try {
                const respons = await axiosinstance.get("/admin/productss/livingroom")
                setliving(respons.data);
            } catch (error) {
                console.error("eror fetching data", error)
            }
        }
        fetch()
    }, [])




    return (
        <div>
            <admincontext.Provider value={{ loading, Living, Decor, Bed, Dining, totalrevenew, revenew, updateShippingStatus, finduserOrder, userOrders, Orders, allorders, fetchpro, products, Costomers, fetchuser, deletepro }}>
                {children}
            </admincontext.Provider>
        </div>
    )


}
export default AdminContext