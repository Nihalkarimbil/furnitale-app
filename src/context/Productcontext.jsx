import React, { useEffect, useState } from 'react'
import { createContext } from 'react'
import axiosinstance from '../axiosinstance'

export const Procontext = createContext()

function Productcontext({ children }) {

  const [living, setliving] = useState([])
  const [products, setProduct] = useState([])
  const [decor, setDecor] = useState([])
  const [bed, setBed] = useState([])
  const [dining, setDining] = useState([])
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetch = async () => {

      try {
        setLoading(true)
        const respons = await axiosinstance.get("/user/products/livingroom")
        setliving(respons.data);
      } catch (error) {
        console.error("eror fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const respons = await axiosinstance.get("/user/product")
        setProduct(respons.data);
        console.log(respons.data);
        
      } catch (error) {
        console.error("eror fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const respons = await axiosinstance.get("/user/products/decor")
        setDecor(respons.data);
      } catch (error) {
        console.error("eror fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {
      try {
        setLoading(true)
        const respons = await axiosinstance.get("/user/products/bedroom")
        setBed(respons.data);
      } catch (error) {
        console.error("eror fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])

  useEffect(() => {
    const fetch = async () => {

      try {
        setLoading(true)
        const respons = await axiosinstance.get("/user/products/dining")
        setDining(respons.data);
      } catch (error) {
        console.error("eror fetching data", error)
      } finally {
        setLoading(false)
      }
    }
    fetch()
  }, [])



  return (
    <div>
      <Procontext.Provider value={{ loading, dining, bed, decor, products, living }}>
        {children}
      </Procontext.Provider>
    </div>
  )
}

export default Productcontext