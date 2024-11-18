import React, { useContext, useEffect } from 'react'
import { Procontext } from '../context/Productcontext'
import { Link } from 'react-router-dom'
import { FaHeart, FaShoppingCart } from 'react-icons/fa';
import { Cartcon } from '../context/Cartcontext';
import AOS from 'aos';
import 'aos/dist/aos.css';
import LoadingSpinner from '../Spinner';


function Decor() {
  const { loading, decor } = useContext(Procontext)

  const { addtowishlist, addtocart } = useContext(Cartcon)

  useEffect(() => {
    AOS.init()
  }, [])


  const handlecart = (prod) => {
    addtocart(prod)
  }

  const handlewish = (prod) => {
    addtowishlist(prod)
  }

  return (
    <>
      {loading ? (<LoadingSpinner />) : (<div className='bg-gray-100 pt-14'>
        <br />
        <h1 className='flex justify-center font-extralight  text-4xl  text-gray-800' id='neww'>Decorations</h1>
        <p className='flex justify-center font-sans text-base text-gray-700 ' id='sub'>Decorate with Passion, Live with Comfort</p>

        <div className="mx-auto max-w-2xl px-4 py-16 sm:px-6 sm:py- lg:max-w-7xl lg:px-8">
          <div className="grid grid-cols-1 gap-x-6 gap-y-10 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 xl:gap-x-8">
            {decor.map((product) => (
              <div key={product.id} className="group relative" data-aos="fade-up" data-aos-duration="600" data-aos-easing="ease-in-out">
                <div className="aspect-h-1 aspect-w-1 w-full overflow-hidden rounded-lg bg-gray-200 xl:aspect-h-8 xl:aspect-w-7 shadow-lg">
                  <Link to={product._id}>
                    <img
                      src={product.image}
                      alt={product.discriptio}
                      className="h-[300px] w-full object-cover object-center group-hover:opacity-75 transition-transform transform scale-100 hover:scale-105"
                    />
                  </Link>

                </div>
                <div className="mt-4 flex justify-between items-center">

                  <div className="flex flex-col">
                    <h3 className="text-sm text-gray-700">{product.name}</h3>
                    <p className="mt-1 text-lg font-medium text-gray-900">${product.new_price}</p>
                  </div>

                  <div className="flex space-x-2">
                    <button
                      className="p-2 rounded-full bg-gary-100 hover:bg-red-300 text-gray-600 hover:text-red-800 transition-colors duration-300 ease-in-out"
                      onClick={() => handlewish(product)}
                    >
                      <FaHeart size={17} />
                    </button>
                    <button onClick={() => handlecart(product)}
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
      </div>)}
    </>

  )
}

export default Decor