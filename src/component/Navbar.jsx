
import React, { useContext, useState } from 'react';
import { Navigate, NavLink } from 'react-router-dom';
import { FaUser } from 'react-icons/fa'; 
import { UserContext } from './context/Usercontext';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const {activeuser}=useContext(UserContext)
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="flex flex-wrap ">
      <section className="relative mx-auto w-full">
        <nav className="flex justify-between bg-red-50 text-gray-600 shadow-md  w-full sticky top-0 z-50">
          <div className="px-4 xl:px-12 py-3 flex w-full items-center justify-between">
            <NavLink to="/" className="text-2xl font-serif font-heading text-red-700">
                FurnisH
            </NavLink>
            {/* Nav Links */}
             <ul className=  {`md:flex ${isOpen ? 'block' : 'hidden'} px-4 mx-auto font-semibold font-heading space-x-12`}>
              <li><NavLink
                to="/"
                className={({ isActive }) => `text-gray-800 ml-12 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`}
                
              >
                Home
              </NavLink></li>
              <li><NavLink
                to="/Livingroom"
                className={({ isActive }) => `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`}
                
              >
                Living Room
              </NavLink></li>
              <li><NavLink
                to="/Bedroom"
                className={({ isActive }) => `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`}
                
              >
                Bed Room
              </NavLink></li>
              <li><NavLink
                to="/Dining"
                className={({ isActive }) => `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`}
                
              >
                Dining
              </NavLink></li>
              <li><NavLink
                to="/Decor"
                className={({ isActive }) => `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`}
                
              >
                Decor
              </NavLink></li>
            </ul>
            {/* Header Icons */}
            <div className="flex items-center space-x-5">
              
              <NavLink className="flex items-center hover:text-gray-200" to="/cart">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="flex absolute -mt-5 ml-4">
                  <span className="animate-ping absolute inline-flex h-3 w-3 rounded-full bg-pink-400 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-3 w-3 bg-pink-500"></span>
                </span>
              </NavLink>
              {/* Sign In / Register */}
              <NavLink 
                
                to="/user"
                className={({ isActive }) => `text-gray-500 font-semibold ${isActive ? 'text-green-700' : 'hover:text-green-700'} transition duration-200  py-2 `}
                onClick={() => setIsOpen(false)}
              >
                <FaUser/>
             
              </NavLink>
              
              {/* <NavLink 
              
                to="/login"
                className={({ isActive }) => `text-gray-500 font-semibold ${isActive ? 'text-green-700' : 'hover:text-green-700'} transition duration-200  py-2 `}
                onClick={() => setIsOpen(false)}
              >
                Sign In
              
              </NavLink> */}
              {/* Responsive navbar toggle */}
              <button onClick={toggleMenu} className="xl:hidden flex items-center hover:text-gray-200">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              </button>
            </div>
          </div>
        </nav>
      </section>
    </div>
  );
};

export default Navbar;

