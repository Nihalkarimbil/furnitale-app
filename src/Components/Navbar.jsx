
import React, { useContext, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaUser, FaShoppingCart, FaHeart } from 'react-icons/fa';
import { UserContext } from '../context/Usercontext';
import { Cartcon } from '../context/Cartcontext';

const Navbar = () => {
  const { notification } = useContext(Cartcon);
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
    <div className="flex flex-wrap ">
      <section className="relative mx-auto w-full">
        <nav className="flex justify-between bg-red-50 text-gray-600 shadow-md w-full sticky top-0 z-50">
          <div className="px-4 xl:px-12 py-3 flex w-full items-center justify-between">
            <NavLink to="/" className="text-2xl font-serif font-heading text-red-700">
              FurniTale
            </NavLink>
            {/* Nav Links */}
            <ul className={`md:flex ${isOpen ? 'block' : 'hidden'} px-4 mx-auto font-semibold font-heading space-x-12`}>
              <li>
                <NavLink
                  to="/"
                  className={({ isActive }) =>
                    `text-gray-800 ml-12 ${isActive ? 'text-red-500' : 'hover:text-green-500'} transition duration-200`
                  }
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
                >
                  Decor
                </NavLink>
              </li>
            </ul>
            {/* Header Icons */}
            <div className="flex items-center space-x-5">
              {activeuser && (
                <>
                  <NavLink className="flex items-center hover:text-gray-200" to="/cart">
                    <FaShoppingCart />
                    {notification > 0 && (
                      <span className="absolute w-4 ml-3 mb-4 flex items-center justify-center text-white bg-red-500 rounded-full text-xs">
                        {notification}
                      </span>
                    )}
                  </NavLink>
                  <NavLink className="flex items-center hover:text-gray-200" to="/wishlist">
                    <FaHeart />
                  </NavLink>
                </>
              )}
              {/* User Icon */}
              <NavLink
                to={activeuser ? '/user' : '/login'}
                className={({ isActive }) =>
                  `text-gray-500 font-semibold ${isActive ? 'text-green-700' : 'hover:text-green-700'} transition duration-200 py-2`
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
  );
};

export default Navbar;


