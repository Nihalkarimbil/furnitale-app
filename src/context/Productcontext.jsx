import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import axiosinstance from '../axiosinstance'

export const Procontext = createContext()

// fetching the products from the API

function Productcontext({ children }) {
  const navigate = useNavigate()
  const [living, setliving] = useState([])
  const [products, setProduct] = useState([])

  const [decor, setDecor] = useState([])
  const [bed, setBed] = useState([])
  const [dining, setDining] = useState([])

  useEffect(() => {
    const fetch = async () => {
      try {
        const respons = await axiosinstance.get("/user/products/livingroom")
        setliving(respons.data);
      } catch (error) {
        console.error("eror fetching data", error)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        const respons = await axiosinstance.get("/user/product")
        setProduct(respons.data);
        console.log(respons.data);

      } catch (error) {
        console.error("eror fetching data", error)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        const respons = await axiosinstance.get("/user/products/decor")
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
        const respons = await axiosinstance.get("/user/products/bedroom")
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
        const respons = await axiosinstance.get("/user/products/dining")
        setDining(respons.data);
      } catch (error) {
        console.error("eror fetching data", error)
      }
    }
    fetch()
  }, [])

  //fetching user from API

 


  //admin delete product function
 

  return (
    <div>
      <Procontext.Provider value={{  dining, bed, decor, products, living   }}>
        {children}
      </Procontext.Provider>
    </div>
  )
}

export default Productcontext