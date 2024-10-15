
import React, { useContext, useState, useEffect } from 'react';
import { Procontext } from '../context/Productcontext';
import { Link } from 'react-router-dom';
import { FaHeart } from 'react-icons/fa';
import { Cartcon } from '../context/Cartcontext';

function Newcoll() {
  const { products } = useContext(Procontext);
  const [coll, setColl] = useState([]);
  const {addtowishlist}=useContext(Cartcon)

  useEffect(() => {
    if (products) {
      setColl(products.filter(item => item.newCollections === true));
    }
  }, [products]);

  const handlewish=(prod)=>{
    addtowishlist(prod)
  }

  return (
    <div className="bg-orange-100 py-8">
      <h1 className="flex justify-center font-extralight text-4xl text-gray-800">New Collections</h1>
      <p className="flex justify-center font-sans text-base text-gray-700 mb-8">Explore Limitless Possibilities with Our New Collection</p>
      
      <div className="mx-auto max-w-2xl px-4 sm:px-6 lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {coll.map((product) => (
            <div key={product.id} className="group relative">
              <Link to={ product.id} className="block aspect-w-1 aspect-h-1 w-full overflow-hidden rounded-lg bg-gray-200 shadow-lg xl:aspect-w-7 xl:aspect-h-8">
                <img
                  src={product.image}
                  alt={product.description}
                  className="h-[300px] w-full object-cover object-center group-hover:opacity-75 transition-transform transform scale-100 hover:scale-105"
                />
              </Link>
              
              <div className="mt-4 flex justify-between items-center">
                <div>
                  <h3 className="text-sm text-gray-700">{product.name}</h3>
                  <p className="mt-1 text-lg font-medium text-gray-900">${product.new_price}</p>
                </div>
                <button className="text-gray-600 hover:text-red-700" onClick={()=>handlewish(product)}>
                  <FaHeart size={20} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Newcoll;
