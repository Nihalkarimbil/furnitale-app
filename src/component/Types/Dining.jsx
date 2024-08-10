import React, { useContext, useEffect, useState } from 'react'
import { Procontext } from '../context/Productcontext'
import { Link } from 'react-router-dom'

function Dining() {
  const[dining,setDining]=useState([])
  const{products}=useContext(Procontext)
  useEffect(()=>{
    if(products){
      setDining(products.filter((items)=>items.category==="dining"))
    }
  },[products])
  console.log(dining);
  
  return (
  
    <div className='bg-red-100'>
      <br/>
      <h1 className='flex justify-center font-extralight  text-4xl  text-gray-800'>Dinind Area furniture</h1>
      <p className='flex justify-center font-sans text-base text-gray-700 '>Dining in Comfort, Dining in Elegance</p>
      <br/>
      
      <div className="flex flex-wrap justify-center gap-6 p-6">
        {dining.map((product) => (
          <Link to={product.id} key={product.id}>
          <div 
            className="w-[300px] bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden"
            
          >
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-48 object-cover"
            />
            <div className="p-4 text-center">
              <h5 className="text-xl font-serif text-gray-900 mb-2">{product.name}</h5>
              <h5 className="text-xl font-semibold text-gray-900 mb-2">offer price: ₹ {product.new_price}</h5>
              <h5 className="text-xl font-semibold text-gray-500 mb-2 line-through"> ₹ {product.old_price}</h5>
              <p className="text-gray-700 mb-4">{product.description}</p>
              {/* <button className='bg-red-400 text-white rounded-md py-2 px-4 w-full hover:bg-black'>
                Add to Cart
              </button> */}
            </div>
          </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

export default Dining