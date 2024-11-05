import React, { useContext, useState, useEffect } from 'react';
import { Cartcon } from '../context/Cartcontext';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosinstance from '../axiosinstance';


function Cart() {
    const { cartitem, deletecart, getCartItems, createOrder } = useContext(Cartcon);
    const [quantities, setQuantities] = useState({});
    const [price, setPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCartItems = async () => {
            await getCartItems();
            setLoading(false);
        };

        fetchCartItems();
    }, []);

    useEffect(() => {
        if (cartitem.length) {
            const initialQuantities = cartitem.reduce((acc, item) => {
                acc[item.productId?._id] = item.productId.quantity || 1;
                return acc;
            }, {});
            setQuantities(initialQuantities);
        }
    }, [cartitem]);

    useEffect(() => {
        const pricetotal = () => {
            const total = cartitem.reduce((acc, item) => {
                const quantity = quantities[item.productId?._id] || 1;
                return acc + item.productId?.new_price * quantity;
            }, 0);
            setPrice(total);
        };
        pricetotal();
    }, [quantities, cartitem]);

    const updateCart = async (item, action) => {
        const itemID = item.productId?._id;
        try {
            const res = await axiosinstance.put('/user/updatecart', {
                productId: itemID,
                action
            }, {
                withCredentials: true
            });

            const updatedCart = res.data.products;
            const updatedQuantities = updatedCart.reduce((acc, product) => {
                acc[product.productId?._id] = product.quantity;
                return acc;
            }, {});

            setQuantities(updatedQuantities);
        } catch (error) {
            console.error('Error updating cart item:', error);
            toast.error('Error updating cart item');
        }
    };

    const increment = (item) => {
        updateCart(item, 'increment');
    };

    const decrement = (item) => {
        updateCart(item, 'decrement');
    };

    const handlecheckout = async () => {
        try {
            await createOrder();
            navigate('/payment');
        } catch (error) {
            console.error('Error creating order:', error);
            toast.error('Failed to create order. Please try again.');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className='bg-gray-100 pt-14 min-h-screen'>
            <div className="font-sans mx-auto py-4 max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="grid lg:grid-cols-3 gap-6">
                    <div className="lg:col-span-2 bg-gray-50 p-4 rounded-md shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800" id='navname'>Cart</h2>
                        <hr className="border-gray-300 mt-4 mb-8" />

                        <div className="space-y-4">
                            {cartitem.map((item, index) => (
                                <div className="grid grid-cols-3 md:grid-cols-4 gap-4 items-center" key={index}>
                                    <div className="flex items-center gap-4 col-span-2 md:col-span-3">
                                        <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                                            <img className='w-full h-full object-cover rounded-md'
                                                src={item.productId?.image}
                                                alt={item.productId?.name}
                                            />
                                        </div>
                                        <div>
                                            <h3 className="text-base font-bold text-gray-800">
                                                {item.productId?.name}
                                            </h3>
                                            <button className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => deletecart(item)}>
                                                Remove
                                            </button>
                                            <div className="flex gap-2 mt-2">
                                                <button
                                                    type="button"
                                                    className="px-2 py-1 border border-gray-300 text-gray-800 text-xs rounded-md" onClick={() => increment(item)}
                                                >
                                                    +
                                                </button>
                                                <p>{quantities[item.productId?._id]}</p>
                                                <button
                                                    type="button"
                                                    className="px-2 py-1 border border-gray-300 text-gray-800 text-xs rounded-md" onClick={() => decrement(item)}
                                                >
                                                    -
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="text-right">
                                        <h4 className="text-base font-bold text-gray-800">₹{(item.productId?.new_price * quantities[item.productId?._id])}</h4>
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="border-gray-300 mt-4 mb-8" />
                    </div>

                    <div className="bg-gray-50 p-4 rounded-md shadow-sm">
                        <h2 className="text-2xl font-bold text-gray-800" id='navname'>Summary</h2>
                        <hr className="border-gray-300 mt-4 mb-8" />
                        <div className="flex justify-between items-center">
                            <p className="text-base font-light text-gray-800">Shipping charge</p>
                            <p className="text-base font-semibold text-gray-800">₹0.00</p>
                        </div>
                        <hr className="border-gray-300 mt-4 mb-8" />
                        <div className="flex justify-between items-center">
                            <p className="text-base font-semibold text-gray-800">Total</p>
                            <p className="text-lg font-bold text-gray-800">₹{price}</p>
                        </div>
                        <button
                            type="button"
                            className="w-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md mt-4"
                            onClick={handlecheckout}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Cart;
