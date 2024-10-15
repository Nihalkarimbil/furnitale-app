import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import Userreg from '../Components/Userreg'
import Login from  '../Components/Login'
import Home from '../Components/Home'
import Navbar from '../Components/Navbar'
import Living from '../Types/Living'
import Bed from '../Types/Bed'
import Dining from '../Types/Dining'
import Decor from '../Types/Decor'
import Footer from '../First/footer'
import Details from '../Components/Details'
import Cart from '../Components/Cart'
import User from '../Components/User'
import ProtectedRoute from '../Components/ProtectedRoute'
import Payment from '../Components/Payment'
import { UserContext } from '../context/Usercontext'
import Mainadmin from '../Admin/Main'
import Sidenav from '../Admin/Sidenav'
import NAvbar from '../Admin/Navbar'
import Product from '../Admin/Product'
import Users from '../Admin/Users'
import UserDetails from '../Admin/UserDetails'
import Prodetails from '../Admin/Prodetails'
import Newpro from '../Admin/Newpro'
import Editpro from '../Admin/Editpro'
import Wishlist from '../Components/Wishlist'


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
              </ProtectedRoute>}/>
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
            <Route path='/cart' element={<Cart /> } />
            <Route path='/user' element={<User />} />
            <Route path='/payment' element={<Payment />} />
            <Route path='/wishlist' element={<Wishlist/>} />
          </Routes>
          <Footer />
        </>
      ) : (
        <div className='flex  bg-slate-50 overflow-hidden'
        >
          <NAvbar/>
          <Sidenav/>
          <Routes>
            <Route path='/admin' element={<Mainadmin />} />
            <Route path='/products' element={<Product />}/>
            <Route path='/users' element={<Users/>}/>
            <Route path='users/:id' element={<UserDetails/>}/>
            <Route path='products/:id' element={<Prodetails />}/>
            <Route path='/add' element={<Newpro />}/>
            <Route path='/products/:id/edit' element={<Editpro/>}/>
          </Routes>
        </div>

      )}
 
    </>
  )
}

export default Mainrouter