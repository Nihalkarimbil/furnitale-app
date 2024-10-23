import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosinstance from '../axiosinstance'

export const Procontext=createContext()

// fetching the products from the API

function Productcontext({children}) {
  const navigate=useNavigate()
  const [Costomers,setCostomers]=useState([])
  const [living,setliving] =useState([])
  const [products,setProduct]=useState([])
 
  const [decor,setDecor]=useState([])
  const [bed,setBed]=useState([])
  const [dining,setDining]=useState([])

  useEffect(()=>{
    const fetch= async ()=>{
      try {
        const respons=await axiosinstance.get("/user/products/livingroom")
        setliving(respons.data);
      } catch (error) {
        console.error("eror fetching data",error)        
      }
    }
    fetch()
  },[])

   useEffect(()=>{
    const fetch= async ()=>{
      try {
        const respons=await axiosinstance.get("/user/product")
        setProduct(respons.data);
        console.log(respons.data);
        
      } catch (error) {
        console.error("eror fetching data",error)        
      }
    }
    fetch()
  },[])

  useEffect(()=>{
    const fetch= async ()=>{
      try {
        const respons=await axiosinstance.get("/user/products/decor")
        setDecor(respons.data);
      } catch (error) {
        console.error("eror fetching data",error)        
      }
    }
    fetch()
  },[])

  useEffect(()=>{
    const fetch= async ()=>{
      try {
        const respons=await axiosinstance.get("/user/products/bedroom")
        setBed(respons.data);
      } catch (error) {
        console.error("eror fetching data",error)        
      }
    }
    fetch()
  },[])

  useEffect(()=>{
    const fetch= async ()=>{
      try {
        const respons=await axiosinstance.get("/user/products/dining")
        setDining(respons.data);
      } catch (error) {
        console.error("eror fetching data",error)        
      }
    }
    fetch()
  },[])

//fetching user from API
  useEffect(()=>{
      const fetchuser= async ()=>{
        try {
          const respons=await axios.get("http://localhost:5000/user")
          setCostomers(respons.data);
        } catch (error) {
          console.error("eror fetching data",error)        
        }
      }
      fetchuser()
  },[])
  
  //admin delete product function
  const deletepro=async(item)=>{
    const deleteconform=window.confirm("are you sure to delete this product")
    if(deleteconform){
      try {
        const pr=await axios.delete(`http://localhost:5000/products/${item.id}`)
        toast.success("product succesfully deteted")
        navigate('/products')
      } catch (error) {
        console.error('error on deleting product'+error)
        toast.error('failed to delete product')
      }
    }
   
  }
  
  return (
    <div>
        <Procontext.Provider value={{dining,bed,decor,products,living,Costomers,deletepro}}>
            {children}
        </Procontext.Provider>
    </div>
  )
}

export default Productcontext