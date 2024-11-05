import React, { useContext, useEffect, useState } from 'react';
import { admincontext } from '../context/Admincontext';
import { Link } from 'react-router-dom';

function Product() {
  const { products, fetchpro } = useContext(admincontext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; 

  useEffect(() => {
    fetchpro();
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIdx, startIdx + itemsPerPage);

  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='mt-24 pb-20 pl-12 pr-12 w-full'>
      <div className='mr-36'>
        <div className='flex flex-col md:flex-row justify-center items-center md:items-start  '>
          <Link to={'/adDining'}
            className='bg-slate-100 w-[90%] sm:w-[250px]  ml-0 md:ml-5 h-30 sm:h-20 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
            <h1 className='text-4xl sm:text-5xl text-center sm:mt-4 font-serif opacity-20'>Dining</h1>

          </Link>
          <Link to={'/adliving'}
            className='bg-slate-100 w-[90%] sm:w-[250px] ml-0 md:ml-8 h-40 sm:h-20 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
            <h1 className='text-4xl sm:text-5xl text-center sm:mt-4 opacity-20 font-serif'>Livingroom</h1>

          </Link>
          <Link to={'/adDecor'}
            className='bg-slate-100 w-[90%] sm:w-[250px] ml-0 md:ml-8 h-40 sm:h-20 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
            <h1 className='text-4xl sm:text-5xl text-center sm:mt-4 opacity-20 font-serif'>Decor</h1>

          </Link>                                                           
          <Link to={'/adBed'}
            className='bg-slate-100 w-[90%] sm:w-[250px]  ml-0 md:ml-8 h-40 sm:h-20 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105 mb-10'>
            <h1 className='text-4xl sm:text-5xl text-center sm:mt-4 opacity-20 font-serif'>Bedroom</h1>

          </Link>
        </div>

      </div>

      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg mr-24 ">
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
            {currentProducts.map((item) => (
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
      <Link to={'/add'}>
        <button className='bg-blue-900 rounded-md mt-4  p-2 text-white font-semibold hover:bg-black '>Add Products</button>
      </Link>

      <div className="flex justify-center mt-4">
        <button
          onClick={() => handlePageChange(currentPage - 1)}
          disabled={currentPage === 1}
          className="px-3 py-1 mx-1 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
        >
          Previous
        </button>
        {[...Array(totalPages)].map((_, idx) => (
          <button
            key={idx}
            onClick={() => handlePageChange(idx + 1)}
            className={`px-3 py-1 mx-1 rounded-md ${currentPage === idx + 1 ? 'bg-blue-900 text-white' : 'bg-gray-300 text-gray-800'}`}
          >
            {idx + 1}
          </button>
        ))}
        <button
          onClick={() => handlePageChange(currentPage + 1)}
          disabled={currentPage === totalPages}
          className="px-3 py-1 mx-1 bg-gray-300 text-gray-800 rounded-md disabled:opacity-50"
        >
          Next
        </button>
      </div>
    </div>
  );
}

export default Product;
