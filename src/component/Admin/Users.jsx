import React, { useState,useEffect } from 'react'
import axios from 'axios'


function Users() {
    const [Costomers,setCostomers]=useState([])

    useEffect(()=>{
        const fetchuser= async ()=>{
          try {
            const respons=await axios.get("http://localhost:5000/user")
            setCostomers(respons.data);
          } catch (error) {
            console.error("eror fetching data",error)        
          }
        }
        fetchuser()
    },[])
    console.log(Costomers);
    

  return (
    <div>
    <section className="w-screen bg-gray-100 text-gray-600 h-screen px-4">
    <div className="flex flex-col pt-28 h-full">
      {/* Table */}
      <div className="w-full max-w-2xl  bg-white shadow-lg rounded-sm border border-gray-200">
        <header className="px-5 py-4 border-b border-gray-100">
          <h2 className="font-semibold text-gray-800">Customers</h2>
        </header>
        <div className="p-3">
          <div className="overflow-x-auto">
            <table className="table-auto w-full">
              <thead className="text-xs font-semibold uppercase text-gray-400 bg-gray-50">
                <tr>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Name</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">Email</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-left">ID</div>
                  </th>
                  <th className="p-2 whitespace-nowrap">
                    <div className="font-semibold text-center">Country</div>
                  </th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-gray-100">
                {Costomers.map((customer, index) => (
                  <tr key={index}>
                    <td className="p-2 whitespace-nowrap">
                      <div className="flex items-center">
                        <div className="w-10 h-10 flex-shrink-0 mr-2 sm:mr-3">
                          <img className="rounded-full" src={customer.image} width="40" height="40" alt={customer.name} />
                        </div>
                        <div className="font-medium text-gray-800">{customer?.input?.username}</div>
                      </div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left">{customer?.input?.email}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-left font-medium text-green-500">{customer?.id}</div>
                    </td>
                    <td className="p-2 whitespace-nowrap">
                      <div className="text-lg text-center">{customer.country}</div>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  </section>
    </div>
  )
}

export default Users