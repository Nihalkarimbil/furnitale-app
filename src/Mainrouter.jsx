import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Userreg from './component/Userreg'
import Login from './component/Login'
import Home from './component/Home'
import Navbar from './component/Navbar'
import Living from './component/Types/Living'
import Bed from './component/Types/Bed'
import Dining from './component/Types/Dining'
import Decor from './component/Types/Decor'
import Footer from './component/First/footer'
import Details from './component/Details'
import Cart from './component/Cart'
import User from './component/User'
import ProtectedRoute from './component/ProtectedRoute'
import Payment from './component/Payment'
import { UserContext } from './component/context/Usercontext'
import Mainadmin from './component/Admin/Main'


function Mainrouter() {
  const { isadmin } = useContext(UserContext)

  return (
    <>
      {!isadmin ? (
        <>
          <Navbar />
          <Routes>
            <Route path='/login' element={
              <ProtectedRoute>
                <Login />
              </ProtectedRoute>} />
            <Route path='/register' element={
              <ProtectedRoute>
                <Userreg />
              </ProtectedRoute>} />
            <Route path='/' element={<Home />} />
            <Route path='/Livingroom' element={<Living />} />
            <Route path='/Bedroom' element={<Bed />} />
            <Route path='/Dining' element={<Dining />} />
            <Route path='/Decor' element={<Decor />} />
            <Route path='Livingroom/:id' element={<Details />} />
            <Route path='Bedroom/:id' element={<Details />} />
            <Route path='Dining/:id' element={<Details />} />
            <Route path='Decor/:id' element={<Details />} />
            <Route path='/:id' element={<Details />} />
            <Route path='/cart' element={<Cart />} />
            <Route path='/user' element={<User />} />
            <Route path='/payment' element={<Payment />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <Routes>
          <Route path='/admin' element={<Mainadmin />}/>
        </Routes>
      )}

    </>
  )
}

export default Mainrouter