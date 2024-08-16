import React, { useContext } from 'react'
import { UserContext } from './context/Usercontext';
import { Navigate } from 'react-router-dom';

function ProtectedRoute({children}) {
   
    const{activeuser,isadmin}=useContext(UserContext)
    if(activeuser){
        return <Navigate to={"/"}/>
    }if (isadmin) {
  
    }

  return (
    children
  )
}

export default ProtectedRoute