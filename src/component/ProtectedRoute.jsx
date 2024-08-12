import React, { useContext } from 'react'
import { UserContext } from './context/Usercontext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
   
    const{activeuser}=useContext(UserContext)
    if(activeuser){
        return <Navigate to={"/"}/>
    }

  return (
    children
  )
}

export default ProtectedRoute