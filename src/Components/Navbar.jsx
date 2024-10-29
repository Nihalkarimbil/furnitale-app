
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { UserContext } from '../context/Usercontext';
import { Cartcon } from '../context/Cartcontext';

const Navbar = () => {
  const { notification,wishnotification } = useContext(Cartcon);
  const { activeuser } = useContext(UserContext);
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  
  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  const handleUserClick = () => {
    if (!activeuser) {
      navigate('/login');
    }
  };

  return (
    <div className='position fixed w-full z-50 mb-11'>
        <div className=" flex flex-wrap w-full">
      <section className="relative mx-auto w-full">
        <nav className="flex justify-between bg-red-50 text-gray-600 shadow-md w-full sticky top-0 z-50">
          <div className="px-4 xl:px-12 py-3 flex w-full items-center justify-between">
            <NavLink to="/" id="myhead" className="text-2xl font-serif font-heading text-red-700">
              FurniTales
            </NavLink>
            {/* Nav Links */}
            <ul className={`md:flex ${isOpen ? 'block' : 'hidden'} px-4 mx-auto font-semibold font-heading space-x-12`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-gray-800 ml-12 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                  }
                  id="navname"
                >
                  Home
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Livingroom"
                  className={({ isActive }) =>
                    `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                  }
                  id="navname"
                >
                  Living Room
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Bedroom"
                  className={({ isActive }) =>
                    `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                  }
                  id="navname"
                >
                  Bed Room
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Dining"
                  className={({ isActive }) =>
                    `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                  }
                  id="navname"
                >
                  Dining
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/Decor"
                  className={({ isActive }) =>
                    `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                  }
                  id="navname"
                >
                  Decor
                </NavLink>
              </li>
            </ul>
            {/* Header Icons */}
            <div className="flex space-x-5">
              {activeuser && (
                <>
                  <NavLink
                    className={({ isActive }) =>
                      `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                    }
                    to="/cart"
                  >
                    <div className="relative">
                      <FaShoppingCart />
                      {notification > 0 && (
                        <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                          {notification}
                        </span>
                      )}
                    </div>
                  </NavLink>
                  <NavLink
                    className={({ isActive }) =>
                      `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                    }
                    to="/wishlist"
                  >
                    <div className="relative">
                    <FaHeart />
                      {wishnotification > 0 && (
                        <span className="absolute top-0 right-0 -mt-2 -mr-3 bg-red-500 text-white rounded-full text-xs w-4 h-4 flex items-center justify-center">
                          {wishnotification}
                        </span>
                      )}
                    </div>
                    
                  </NavLink>
                </>
              )}
              {/* User Icon */}
              <NavLink
                to={activeuser ? '/user' : '/login'}
                className={({ isActive }) =>
                  `text-gray-800 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                }
                onClick={handleUserClick}
              >
                <FaUser />
              </NavLink>

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
    </div>
    
  );
};

export default Navbar;


