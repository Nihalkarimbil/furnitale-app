import React, { useContext } from 'react';
import { Cartcon } from '../context/Cartcontext';


const Orders = () => {
    const { orders, cancelOrder, getAllorders } = useContext(Cartcon);
  
    const handleCancel = async (orderId) => {
        try {
            await cancelOrder(orderId);
            await getAllorders();
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <div className='bg-gray-100 min-h-screen pb-3'>
            <div className="container mx-auto pt-20 px-8">
                <header className="bg-amber-300 border-b p-4 text-lg font-semibold text-center">
                    My Orders
                </header>
                <br />

                {orders.length === 0 ? (
                    <div className="text-center py-10 text-gray-500 text-xl font-semibold">
                        No orders found.
                    </div>
                ) : (
                    orders.map((order) => (
                        <article key={order._id} className="bg-white border rounded-md mb-8 shadow-md">
                            <div className="p-4">
                                <div className="flex justify-between items-center mb-4">
                                    <div>
                                        <h6 className="font-bold text-gray-700">Order ID: {order._id}</h6>
                                        <h6 className="font-bold text-gray-700">Purchase Date: {order.purchaseDate}</h6>
                                    </div>

                                    <div className="text-right">
                                        <h6 className="font-bold text-gray-700">Payment Status: {order.paymentStatus}</h6>
                                        <h6 className="font-bold text-gray-700">Shipping Status: {order.shippingStatus}</h6>
                                    </div>
                                </div>
                                <hr className="my-6" />

                                <ul className="flex flex-wrap -mx-2 mb-6">
                                    {order.products.map((product) => (
                                        <li key={product._id} className="w-full md:w-1/3 px-2 mb-4">
                                            <figure className="flex bg-white p-2 border rounded-md shadow-sm">
                                                <div className="w-20 h-20 flex-shrink-0">
                                                    <img src={product.productId.image} alt={product.productId.name} className="w-full h-full object-cover border rounded" />
                                                </div>
                                                <figcaption className="ml-4 flex flex-col justify-center">
                                                    <p className="font-semibold">{product.productId.name}</p>
                                                </figcaption>
                                            </figure>
                                        </li>
                                    ))}
                                </ul>

                                <hr className="mb-6" />

                                <div className="flex justify-between items-center">
                                    <h1 className='font-bold text-xl text-gray-700'>Amount: ${order.amount}</h1>
                                    {order.shippingStatus !== 'cancelled' && (
                                        <button
                                            onClick={() => handleCancel(order._id)}
                                            className="inline-flex items-center bg-orange-500 text-white px-4 py-2 rounded hover:bg-orange-600"
                                        >
                                            <i className="fa fa-chevron-left mr-2"></i> Cancel Order
                                        </button>
                                    )}
                                </div>
                            </div>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default Orders;
