import React, { useContext, useState,useEffect } from 'react'
import { Procontext } from '../context/Productcontext'
import { Link } from 'react-router-dom';

function Newcoll() {
    const {products} =useContext(Procontext)
    const [coll,setColl]=useState([])
    useEffect(() => {
        if (products) {
          setColl(products.filter(item => item.newCollections === true));
        }
      }, [products]);
      
  return (
    <div className='bg-red-100'>
      <h1 className='flex justify-center font-extralight  text-4xl  text-gray-800'>New Collections</h1>
      <p className='flex justify-center font-sans text-base text-gray-700 '>Explore Limitless Possibilities with Our New Collection</p>
      <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py- lg:max-w-7xl lg:px-8">
        <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
          {coll.map((product) => (
            <Link key={product.id}  to={product.id} className="group">
              <div  className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-lg">
                <img
                  src={product.image}
                  alt={product.discriptio}
                  className="h-[300px] w-full object-cover object-center group-hover:opacity-75 transition-transform transform scale-100 hover:scale-105"
                />
              </div>
              <h3 className="mt-4 text-sm text-gray-700">{product.name}</h3>
              <p className="mt-1 text-lg font-medium text-gray-900">{product.new_price}</p>
            </Link>
          ))}
        </div>
      </div>
    
    </div>
  )
}

export default Newcoll