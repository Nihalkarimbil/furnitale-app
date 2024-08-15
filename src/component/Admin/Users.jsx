import React, { useContext, useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Procontext } from '../context/Productcontext'


function Users() {
  const { Costomers } = useContext(Procontext)
  const [user, setuser] = useState([])

  useEffect(() => {
    if (Costomers) {
      setuser(Costomers.filter(use => use.admin === false))
    }
  }, [Costomers])

  return (
    <div>
      <section className="w-screen text-gray-600 h-screen px-4">
        <div className="flex flex-col pt-28 h-full ">
          {/* Table */}
          <div className="w-[1000px] bg-gray-100 shadow-lg hs border border-gray-300 rounded-xl overflow-hidden ">
            <header className="px-5 py-4 border-b border-gray-100">
              <h2 className="font-serif text-emerald-500 text-center text-lg">Customers</h2>
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
                      <th className="p-2 whitespace-nowrap">
                        <div className="font-semibold text-center">Details</div>
                      </th>
                    </tr>
                  </thead>
                  <tbody className="text-sm divide-y divide-gray-100">

                    {Costomers.map((customer, index) => (

                      <tr key={index}>
                        <td className="p-2 whitespace-nowrap">
                          <div className="flex items-center">

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
                          <div className="text-lg text-center text-amber-300">India</div>
                        </td>
                        <td className="p-2 whitespace-nowrap">
                          <Link to={customer.id}>
                            <div className="text-lg text-center text-white border   rounded-lg bg-sky-950">Details</div>
                          </Link>
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