import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'

export const Procontext=createContext()

// fetching the products from the API

function Productcontext({children}) {
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
  
  return (
    <div>
        <Procontext.Provider value={{products,Costomers}}>
            {children}
        </Procontext.Provider>
    </div>
  )
}

export default Productcontext