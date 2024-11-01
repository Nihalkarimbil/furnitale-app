import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { admincontext } from '../context/Admincontext'


function Users() {
  const { Costomers ,fetchuser} = useContext(admincontext)
  console.log(Costomers)
  

  useEffect(() => {
    fetchuser()
  }, []);
  

  return (
    <div>
      <div className='mt-24 pb-20 pl-24 w-[1000px]'>
      
      <div className="relative overflow-x-auto shadow-md sm:rounded-lg ">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs uppercase  bg-green-400 text-white">
            <tr>
              <th scope="col" className="px-6 py-3">
                User name
              </th>
              <th scope="col" className="px-6 py-3">
                Email
              </th>
              <th scope="col" className="px-6 py-3">
                ID
              </th>
             
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            {Costomers.map((item) => (

              <tr key={item._id} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700">
                <th scope="row" className="px-6 py-4 font-medium text-gray-500  whitespace-nowrap dark:text-white">
                  {item?.username}
                </th>
                
                <td className="px-6 py-4">
                  {item?.email}
                </td>
                <td className="px-6 py-4">
                  {item._id}
                </td>
                <td className="px-6 py-4">
                  <Link to={item._id} className="font-medium text-blue-600 dark:text-blue-500 hover:underline">details</Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
    </div>
  )
}

export default Users