import React, { useContext, useState, useEffect } from 'react';
import { Procontext } from '../context/Productcontext';
import { Link } from 'react-router-dom';
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Cartcon } from '../context/Cartcontext';
import AOS from 'aos'; 
import 'aos/dist/aos.css';

function Newcoll() {
  const { products } = useContext(Procontext);
  const [coll, setColl] = useState([]);
  const { addtowishlist, addtocart } = useContext(Cartcon);

  useEffect(() => {
    if (products) {
      setColl(products.filter(item => item.newCollections === true));
    }
    
  }, [products]);

  AOS.init({ duration: 600, easing: 'ease-in-out' });
  const handlecart = (prod) => {
    addtocart(prod);
  };

  const handlewish = (prod) => {
    addtowishlist(prod);
  };

  return (
    <div className="bg-gray-100 py-8">
      <div className="text-center">
        <h1 className="text-3xl text-gray-800 mb-2" id="neww">New Arrival</h1>
        <div className="w-24 h-1 mx-auto bg-gray-500 mb-12"></div> {/* Line under heading */}
      </div>

      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {coll.map((product) => (
            <div key={product.id} className="group relative" data-aos="fade-up">
              <Link to={`/product/${product.id}`} className="block aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.image}
                  alt={product.description}
                  className="h-[300px] w-full object-cover object-center group-hover:opacity-75 transition-transform transform scale-100 hover:scale-105"
                />
              </Link>
              <div className="mt-4 flex justify-between items-center">
                <div className="flex flex-col">
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.new_price}</p>
                </div>

                <div className="flex space-x-2">
                  <button
                    className="p-2 rounded-full bg-gray-100 hover:bg-red-300 text-gray-600 hover:text-red-800 transition-colors duration-300 ease-in-out"
                    onClick={() => handlewish(product)}
                  >
                    <FaHeart size={17} />
                  </button>
                  <button 
                    onClick={() => handlecart(product)}
                    className="p-2 rounded-full bg-gray-100 hover:bg-green-300 text-gray-600 hover:text-green-800 transition-colors duration-300 ease-in-out"
                  >
                    <FaShoppingCart size={17} />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newcoll;
