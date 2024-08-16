import React, { useContext } from 'react'
import { Procontext } from '../context/Productcontext';
import { Link } from 'react-router-dom';


function Product() {
  const { products } = useContext(Procontext)

  return (
    
    <div className='mt-24 pb-20 pl-24'>
      <Link to={'/add'}><button className='bg-blue-900 rounded-md mb-4 p-2 text-white font-semibold hover:bg-black'>Add Products</button></Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase  bg-gray-900 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                Product name
              </th>
              <th scope="col" className="px-6 py-3">
                Color
              </th>
              <th scope="col" className="px-6 py-3">
                Category
              </th>
              <th scope="col" className="px-6 py-3">
                Price
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {products.map((item) => (

              <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                  {item.name}
                </th>
                <td className="px-6 py-4">
                  <img className='w-20 h-20 '
                    src={item.image}
                    alt={item.name}
                  />
                </td>
                <td className="px-6 py-4">
                  {item.category}
                </td>
                <td className="px-6 py-4">
                  {item.new_price}
                </td>
                <td className="px-6 py-4">
                  <Link to={item.id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  )
}

export default Product