import React from 'react';
import { FaInstagram, FaFacebook, FaTwitter, FaTimes } from 'react-icons/fa';

const Footer = () => {
  const getCurrentYear = () => {
    return new Date().getFullYear();
  };

  return (
    <footer className="relative bg-gray-200 pt-8 pb-6 shadow">
      <div className="container mx-auto px-4 ">
        <div className="flex flex-wrap text-left lg:text-left">
          <div className="w-full lg:w-6/12 px-4">
            <h4 className="text-3xl font-semibold text-blueGray-700">Let's keep in touch!</h4>
            <h5 className="text-lg mt-0 mb-2 text-blueGray-600">
              Find us on any of these platforms, we respond 1-2 business days.
            </h5>
            <div className="mt-6 lg:mb-0 mb-6">
              <button className="bg-white text-lightBlue-400 shadow-lg font-normal h-10 w- items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FaTwitter size={24} className='w-10'/>
              </button>
              <button className="bg-white text-lightBlue-600 shadow-lg font-normal h-10  items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
               <FaInstagram size={24} className='w-10'/>
              </button>
              <button className="bg-white text-pink-400 shadow-lg font-normal h-10 items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
               <FaFacebook size={24}className='w-10'/>
              </button>
              <button className="bg-white text-blueGray-800 shadow-lg font-normal h-10  items-center justify-center align-center rounded-full outline-none focus:outline-none mr-2" type="button">
              <FaTimes size={24} className='w-10'/>
              </button>
            </div>
          </div>
          <div className="w-full lg:w-6/12 px-4">
            <div className="flex flex-wrap items-top mb-6">
              <div className="w-full lg:w-4/12 px-4 ml-auto">
                <p className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 hover:text-red-400 cursor-pointer">Useful Links</p>
                <ul className="list-unstyled">
                  <li>
                    <a className="text-blueGray-600  font-semibold block pb-2 text-sm hover:text-red-400 cursor-pointer" >About Us</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600  font-semibold block pb-2 text-sm hover:text-red-400 cursor-pointer">Blog</a>
                  </li>
                
                  <li>
                    <a className="text-blueGray-600  font-semibold block pb-2 text-sm hover:text-red-400 cursor-pointer" >View Products</a>
                  </li>
                </ul>
              </div>
              <div className="w-full lg:w-4/12 px-4">
                <span className="block uppercase text-blueGray-500 text-sm font-semibold mb-2 hover:text-red-400 cursor-pointer">Other Resources</span>
                <ul className="list-unstyled">
                  
                  <li>
                    <a className="text-blueGray-600  font-semibold block pb-2 text-sm hover:text-red-400 cursor-pointer">Terms &amp; Conditions</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600  font-semibold block pb-2 text-sm hover:text-red-400 cursor-pointer" >Privacy Policy</a>
                  </li>
                  <li>
                    <a className="text-blueGray-600  font-semibold block pb-2 text-sm hover:text-red-400 cursor-pointer" >Contact Us</a>
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </div>
        <hr className="my-6 border-gray-400" />
        <div className="flex flex-wrap items-center md:justify-between justify-center">
          <div className="w-full md:w-4/12 px-4 mx-auto text-center">
           <p className='text-lg font-semibold'>All Rights Reserved Copyright © {getCurrentYear()}</p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
