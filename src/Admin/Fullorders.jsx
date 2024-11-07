import React, { useContext, useEffect, useState } from 'react';
import { admincontext } from '../context/Admincontext';

function Fullorders() {
  const { Orders, allorders, updateShippingStatus } = useContext(admincontext);
  const [shippingStatus, setShippingStatus] = useState({});

  useEffect(() => {
    allorders();
  }, []);

  useEffect(() => {
    const initialStatus = Orders.reduce((acc, order) => {
      acc[order._id] = order.shippingStatus;
      return acc;
    }, {});
    setShippingStatus(initialStatus);
  }, [Orders]);


  const ordersByUser = Orders.reduce((acc, order) => {
    if (!acc[order.userID]) {
      acc[order.userID] = [];
    }
    acc[order.userID].push(order);
    return acc;
  }, {});

  const handleShippingStatusChange = async (orderId, newStatus) => {
    try {
      setShippingStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: newStatus,
      }));

      await updateShippingStatus(orderId, newStatus);

    } catch (error) {

      console.log("Error updating shipping status:", error);


      setShippingStatus((prevStatus) => ({
        ...prevStatus,
        [orderId]: shippingStatus[orderId],
      }));
    }
  };

  return (
    <div className='p-2 sm:p-20 bg-gray-50 min-h-screen pt-20 w-full'>
      <h1 className='text-3xl font-bold text-center text-gray-800 mb-10'>Order Details</h1>
      {Object.keys(ordersByUser).map((userID) => (
        <div key={userID} className='mb-10 w-full'>
          <div className='mb-4'>
            <span className='inline-block bg-white text-blue-600 text-sm font-semibold px-4 py-2 rounded-md'>
              User ID: {userID}
            </span>
          </div>

          <table className='w-full bg-white shadow-lg rounded-lg overflow-hidden'>
            <thead>
              <tr className='bg-gray-100 border-b'>
                <th className='text-left p-4 font-medium text-gray-700'>Order ID</th>
                <th className='text-left p-4 font-medium text-gray-700'>Amount</th>
                <th className='text-left p-4 font-medium text-gray-700'>Purchase Date</th>
                <th className='text-left p-4 font-medium text-gray-700'>Payment Status</th>
                <th className='text-left p-4 font-medium text-gray-700'>Shipping Status</th>
                <th className='text-left p-4 font-medium text-gray-700'>Products</th>
              </tr>
            </thead>
            <tbody>
              {ordersByUser[userID].map((order) => (
                <tr key={order._id} className='border-b hover:bg-gray-50 transition-colors duration-150'>
                  <td className='p-4 text-gray-800 text-sm'>{order._id}</td>
                  <td className='p-4 text-gray-800 text-sm font-semibold'>${order.amount.toFixed(2)}</td>
                  <td className='p-4 text-gray-800 text-sm'>{new Date(order.purchaseDate).toLocaleDateString()}</td>
                  <td className={`p-4 text-sm font-medium ${order.paymentStatus === 'completed' ? 'text-green-500' : 'text-red-500'}`}>
                    {order.paymentStatus.charAt(0).toUpperCase() + order.paymentStatus.slice(1)}
                  </td>
                  <td className='p-4 text-sm font-medium'>
                    {shippingStatus[order._id] === 'cancelled' ? (
                      <p className="text-red-500 font-semibold">Cancelled</p>
                    ) : shippingStatus[order._id] === 'shipped' ? (
                      <p className="text-green-500 font-semibold">Shipped</p>
                    ) : (
                      <select
                        value={shippingStatus[order._id] || order.shippingStatus}
                        onChange={(e) => handleShippingStatusChange(order._id, e.target.value)}
                        className={`rounded-md px-2 py-1 ${shippingStatus[order._id] === 'shipped' ? 'text-green-500' : 'text-red-500'}`}
                      >
                        <option value="pending">Pending</option>
                        <option value="shipped">Shipped</option>
                        <option value="delivered">Delivered</option>
                        <option value="cancelled">Cancelled</option>
                      </select>
                    )}
                  </td>
                  <td className='p-4 text-gray-800 text-sm'>
                    <ul className='space-y-1'>
                      {order.products.map((product, index) => (
                        <li key={index} className='flex justify-between text-gray-700 text-base font-serif'>
                          <p>{product.productId.name}</p>
                        </li>
                      ))}
                    </ul>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ))}
    </div>
  );
}

export default Fullorders;
