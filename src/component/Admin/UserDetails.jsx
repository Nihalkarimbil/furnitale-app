import React,{useContext, useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import { Procontext } from '../context/Productcontext'
function UserDetails() {
  const {id}= useParams()
  const{Costomers}=useContext(Procontext)
  const [use,setUse]=useState([])

  useEffect(()=>{
    setUse(Costomers.filter((items)=>items.id==id))
  },[Costomers])

  return (
    <div>
        
    </div>
  )
}

export default UserDetails
