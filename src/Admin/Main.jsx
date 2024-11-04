import React, { useContext, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { admincontext } from '../context/Admincontext';
import RevenueChart from './Revenewchart';
import CategoryPieChart from './productschart';

function Mainadmin() {
  const { fetchpro, products, Costomers, fetchuser, Orders, allorders, totalrevenew, revenew } = useContext(admincontext);

  useEffect(() => {
    fetchpro();
    fetchuser();
    allorders();
    totalrevenew();
  }, []);

  const revenueData = [
    { month: 'july', revenue: 3500 },
    { month: 'August', revenue: 2500 },
    { month: 'September', revenue: 5000 },
    { month: 'October', revenue: 4000 },
    { month: 'November', revenue: revenew.revenew },
  ];

  const totalpro = products.length;
  const totaluser = Costomers.length;
  const totalOrder = Orders.length;

  return (
    <div>
      <div className='flex flex-col md:flex-row justify-center items-center md:items-start'>
        <Link to={'/users'}
          className='bg-slate-100 w-[90%] sm:w-[250px] mt-10 md:mt-20 ml-0 md:ml-5 h-40 sm:h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
          <h1 className='text-4xl sm:text-5xl text-center mt-8 sm:mt-12 font-serif opacity-20'>Users</h1>
          <h1 className='text-4xl sm:text-5xl text-center mt-8 sm:mt-5 font-serif opacity-20'>{totaluser}</h1>
        </Link>
        <Link to={"/products"}
          className='bg-slate-100 w-[90%] sm:w-[250px] mt-10 md:mt-20 ml-0 md:ml-8 h-40 sm:h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
          <h1 className='text-4xl sm:text-5xl text-center mt-6 sm:mt-10 opacity-20 font-serif'>Products</h1>
          <h1 className='text-4xl sm:text-5xl text-center mt-8 sm:mt-5 font-serif opacity-20'>{totalpro}</h1>
        </Link>
        <Link to={"/Orders"}
          className='bg-slate-100 w-[90%] sm:w-[250px] mt-10 md:mt-20 ml-0 md:ml-8 h-40 sm:h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
          <h1 className='text-4xl sm:text-5xl text-center mt-6 sm:mt-10 opacity-20 font-serif'>Orders</h1>
          <h1 className='text-4xl sm:text-5xl text-center mt-8 sm:mt-5 font-serif opacity-20'>{totalOrder}</h1>
        </Link>
        <Link
          className='bg-slate-100 w-[90%] sm:w-[250px] mt-10 md:mt-20 ml-0 md:ml-8 h-40 sm:h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105 mb-20'>
          <h1 className='text-4xl sm:text-5xl text-center mt-6 sm:mt-10 opacity-20 font-serif'>Revenew</h1>
          <h1 className='text-4xl sm:text-5xl text-center mt-8 sm:mt-5 font-serif opacity-20'>{revenew.revenew}</h1>
        </Link>
      </div>

      <br />
      <div className='flex flex-col md:flex-row justify-center items-start'>
        <div className='w-full md:w-3/4 p-2'>
        <h6 className='text-center bg-gray-100 rounded font-bold font-serif text-gray-400'>Revenews per month</h6>
          <RevenueChart revenueData={revenueData} />
        </div>
        <div className='w-full md:w-1/4 p-2'> 
        <h6 className='pl-16 bg-gray-400 rounded font-bold font-serif text-white'>Product categories</h6>
          <CategoryPieChart products={products} />
        </div>
      </div>
    </div>
  );
}

export default Mainadmin;
