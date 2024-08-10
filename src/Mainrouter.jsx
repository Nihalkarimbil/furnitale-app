import React from 'react'
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

function Mainrouter() {
  return (
    <div>
      <Navbar />
      <Routes>
        <Route path='/login' element={<Login />} />
        <Route path='/register' element={<Userreg />} />
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
        <Route path='/user' element={<User/>} />

      </Routes>
      <Footer />
    </div>
  )
}

export default Mainrouter