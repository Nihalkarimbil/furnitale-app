import React, { useContext, useEffect, useState } from 'react';
import { admincontext } from '../context/Admincontext';
import { Link } from 'react-router-dom';

function Product() {
  const { products, fetchpro } = useContext(admincontext);
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5; // Adjust this value to set the number of items per page

  useEffect(() => {
    fetchpro();
  }, []);

  // Calculate total pages
  const totalPages = Math.ceil(products.length / itemsPerPage);

  const startIdx = (currentPage - 1) * itemsPerPage;
  const currentProducts = products.slice(startIdx, startIdx + itemsPerPage);

  // Handler for changing pages
  const handlePageChange = (page) => {
    setCurrentPage(page);
  };

  return (
    <div className='mt-24 pb-20 pl-24'>
      <Link to={'/add'}>
        <button className='bg-blue-900 rounded-md mb-4 p-2 text-white font-semibold hover:bg-black'>Add Products</button>
      </Link>
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
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
