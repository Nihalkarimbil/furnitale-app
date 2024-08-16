import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

export const Procontext=createContext()

// fetching the products from the API

function Productcontext({children}) {
  const navigate=useNavigate()
  const [Costomers,setCostomers]=useState([])
  const [products,setProducts] =useState([])
  useEffect(()=>{
    const fetch= async ()=>{
      try {
        const respons=await axios.get("http://localhost:5000/products")
        setProducts(respons.data);
      } catch (error) {
        console.error("eror fetching data",error)        
      }
    }
    fetch()
  },[])

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
  
  const deletepro=async(item)=>{
    const deleteconform=window.confirm("are you sure to delete this product")
    if(deleteconform){
      try {
        const pr=await axios.delete(`http://localhost:5000/products/${item.id}`)
        console.log(pr)
        alert("product succesfully deteted")
        navigate('/products')
      } catch (error) {
        console.error('error on deleting product'+error)
        alert('failed to delete product')
      }
    }
   
  }
  
  return (
    <div>
        <Procontext.Provider value={{products,Costomers,deletepro}}>
            {children}
        </Procontext.Provider>
    </div>
  )
}

export default Productcontext