import React, { useContext, useState, useEffect } from 'react'
import { useParams, Link } from 'react-router-dom'
import { admincontext } from '../context/Admincontext'
function Prodetails() {

    const { id } = useParams()
    const { fetchpro, products, deletepro } = useContext(admincontext)
    const [pro, setPro] = useState([])

    useEffect(() => {
        fetchpro()
    }, []);


    useEffect(() => {
        setPro(products.filter((items) => items._id == id))
    }, [products])


    return (
        <div className='bg-gray-100 w-full'>

            <div className='flex flex-col items-center bg-gray-100  pt-24 w-[1200px]'>
                <br />
                {pro.map((product, index) => (
                    <div key={index} className='flex flex-col md:flex-row items-center bg-gray-50 rounded-lg shadow-md mb-4 p-4 w-full max-w-4xl'>
                        <img
                            src={product.image}
                            alt={product.name}
                            className='w-full h-auto md:w-1/2 md:h-[450px] object-cover mb-4 md:mb-0 md:mr-4'
                        />
                        <div className='flex flex-col items-center md:items-start text-center md:text-left'>
                            <h1 className='font-semibold text-gray-600 text-xl md:text-3xl mb-2'>{product.name}</h1>
                            <h2 className='font-bold text-orange-900 text-lg md:text-2xl mb-2'>category: {product.category}</h2>
                            <h5 className="text-xl font-semibold text-gray-500 mb-2 line-through text-center">₹ {product.old_price}</h5>
                            <h3 className='font-bold text-lg md:text-xl mb-2'>₹ {product.new_price} & free shipping</h3>
                            <p className='text-base  mb-4'>
                                {product.detailOne}
                            </p>
                            <p className='text-yellow-700 font-medium'>Rating: {product.rating}</p>
                            <br />
                            <div>
                                <Link to={`/products/${product._id}/edit`}>
                                    <button className='bg-blue-950 text-white rounded-md py-2 px-4 hover:bg-black' >
                                        Edit
                                    </button>
                                </Link>

                                <button className='bg-blue-950 text-white rounded-md py-2 px-4 hover:bg-black ml-4' onClick={() => deletepro(product)} >
                                    Delete
                                </button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default Prodetails