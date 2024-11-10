import React from 'react';
import { RiTruckLine, RiRefund2Line } from 'react-icons/ri';
import { MdSupportAgent } from 'react-icons/md';

function Specialities() {
  return (
    <div className="bg-gray-100 py-8 mb-8 group relative" data-aos="fade-up">
      <div className="pt-10 max-w-5xl mx-auto px-4 flex flex-col sm:flex-row justify-around items-center sm:space-x-6 space-y-6 sm:space-y-0">
        
        <div className="flex flex-col items-center text-center space-y-2">
          <RiTruckLine className="text-4xl text-blue-500" />
          <h4 className="text-lg font-semibold">Free Shipping</h4>
          <p className="text-sm text-gray-600">Enjoy fast and free shipping on all orders, no minimum required!</p>
        </div>

    
        <div className="hidden sm:block h-20 border-l-2 border-gray-300"></div>
        
    
        <div className="flex flex-col items-center text-center space-y-2">
          <MdSupportAgent className="text-4xl text-blue-500" />
          <h4 className="text-lg font-semibold">24/7 Support</h4>
          <p className="text-sm text-gray-600">Our team is here to help you anytime, day or night.</p>
        </div>
        
        
        <div className="hidden sm:block h-20 border-l-2 border-gray-300"></div>

        <div className="flex flex-col items-center text-center space-y-2">
          <RiRefund2Line className="text-4xl text-blue-500" />
          <h4 className="text-lg font-semibold">Money Back Guarantee</h4>
          <p className="text-sm text-gray-600">Shop with confidence, with guaranteed returns on every purchase.</p>
        </div>
      </div>
    </div>
  );
}

export default Specialities;
