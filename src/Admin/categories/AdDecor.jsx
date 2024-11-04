import React, { useContext } from 'react'
import { admincontext } from '../../context/Admincontext';
import { Link } from 'react-router-dom';

function AdDecor() {
    const { Decor } = useContext(admincontext);
    return (
        <div className='w-full mr-28 '>
          
            <div className="shadow-md sm:rounded-lg mt-20 ml-14 ">
            <h3 className='text-center font-bold text-xl py-2'>Decor</h3>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
                    <thead className="text-xs uppercase bg-gray-900 text-white">
                        <tr>
                            <th scope="col" className="px-6 py-3">Product name</th>
                            <th scope="col" className="px-6 py-3">Color</th>
                            <th scope="col" className="px-6 py-3">Category</th>
                            <th scope="col" className="px-6 py-3">Price</th>
                            <th scope="col" className="px-6 py-3">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {Decor.map((item) => (
                            <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">{item.name}</th>
                                <td className="px-6 py-4">
                                    <img className='w-20 h-20' src={item.image} alt={item.name} />
                                </td>
                                <td className="px-6 py-4">{item.category}</td>
                                <td className="px-6 py-4">{item.new_price}</td>
                                <td className="px-6 py-4">
                                    <Link to={`/products/${item._id}`} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">Details</Link>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <Link to={'/products'}>
                <button className='bg-blue-900 rounded-md  mt-3 mb-3 ml-14 p-2 text-white font-semibold hover:bg-black float-end'>Back</button>
            </Link>
        </div>

    )
}

export default AdDecor
