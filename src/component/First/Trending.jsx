import React, { useContext, useEffect, useState } from 'react';
import { Procontext } from '../context/Productcontext';
import { Link } from 'react-router-dom';

function Trending () {
  const { products } = useContext(Procontext);
  const [filt,setFilt]=useState([])

  useEffect(() => {
    if (products) {
      setFilt(products.filter(item => item.topTrends === true));
    }
  }, [products]);
 
  
  return (
    <div className='bg-red-100'>
      <br/>
      <h1 className='flex justify-center font-extralight  text-4xl  text-gray-800 '>Trending Products</h1>
      <p className='flex justify-center font-sans text-base text-gray-700 '>Experience the Pulse of Modern Living!</p>
      <br/>

      <div className="flex flex-wrap justify-center gap-6 p-6">
        {filt.map(product => (
         <Link to={product.id} key={product.id}>
          <div  className="w-[300px] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden">
            <img className="h-64 w-[300px]" src={product.image} alt={product.title} />
            <div className="px-5 py-4">
              <div className="font-serif text-xl mb-2 hover:text-red-700 text-center text-gray-600">{product.name}</div>
              <h5 className="text-xl font-semibold text-gray-900 mb-2 text-center">offfer Price: ₹ {product.new_price}</h5>
              <h5 className="text-xl font-semibold text-gray-500 mb-2 line-through text-center">₹ {product.old_price}</h5>
              <p className="text-gray-700 text-base text-center">{product.description}</p>
              <br/>
              {/* <button className='bg-red-400 text-white rounded-md py-2 px-4 w-full hover:bg-black'>
                Add to Cart
              </button> */}
            </div>
          </div>
         </Link>
          
          
        ))}
      </div>
    </div>
  );
}

export default Trending 

