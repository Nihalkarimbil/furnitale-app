import React, { useContext, useState, useEffect } from 'react'
import { Cartcon } from '../context/Cartcontext'
import { UserContext } from '../context/Usercontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify'
import axiosinstance from '../axiosinstance';

function Cart() {

    const { cartitem, deletecart } = useContext(Cartcon)
    console.log('htjyf', cartitem)
    const { activeuser } = useContext(UserContext)
    const [quantities, setQuantities] = useState({});
    const [price, setPrice] = useState(0)
    const navigate = useNavigate()

    useEffect(() => {
        const initialQuantities = cartitem.reduce((acc, item) => {
            acc[item.productId._id] = item.qty || 1;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    }, [cartitem]);

    useEffect(() => {
        const pricetotal = () => {
            const total = cartitem.reduce((acc, item) => {
                const quantity = quantities[item.productId._id] || 1;
                return acc + item.productId.new_price * quantity
            }, 0)
            setPrice(total)
        }
        pricetotal()
    }, [quantities, cartitem])

    const updateCart = async (item, action) => {
        console.log('first', item)
        console.log('second', action);

        const itemID = item.productId._id;
        console.log('third', itemID)
        try {
            const res = await axiosinstance.put('/user/updatecart', {
                productId: itemID,
                action
            }, {
                withCredentials: true
            });

            const updatedCart = res.data.products;
            const updatedQuantities = updatedCart.reduce((acc, product) => {
                acc[product.productId._id] = product.quantity;
                return acc;
            }, {});

            setQuantities(updatedQuantities);
            toast.success(`${action === 'increment' ? 'Incremented' : 'Decremented'} quantity successfully!`);
        } catch (error) {
            console.error('Error updating cart item:', error);
            toast.error('Error updating cart item');
        }
    };

    // Function to handle incrementing the item quantity
    const increment = (item) => {
        updateCart(item, 'increment');
    };

    // Function to handle decrementing the item quantity
    const decrement = (item) => {
        const currentCount = quantities[item.id] || 1;
        if (currentCount > 1) {
            updateCart(item, 'decrement');
        } else {
            toast.error('Cannot decrement below 1');
        }
    };



    return (
        <div className='bg-red-100'>
            <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-red-100 py-4">
                <div className="grid md:grid-cols-3 gap-4">
                    <div className="md:col-span-2 bg-red-50 p-4 rounded-md">
                        <h2 className="text-2xl font-bold text-gray-800" id='navname'>Cart: </h2>
                        <hr className="border-gray-300 mt-4 mb-8" />

                        <div className="space-y-4">
                            {cartitem.map((item, index) => (
                                <div className="grid grid-cols-3 items-center gap-4">
                                    <div className="col-span-2 flex items-center gap-4">

                                        <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                                            <img className='w-24 h-24 '
                                                src={item.productId.image}
                                                alt={item.productId.name}
                                            />
                                        </div>

                                        <div>
                                            <h3 className="text-base font-bold text-gray-800">
                                                {item.productId.name}
                                            </h3>
                                            <button className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => { deletecart(item, index) }}>
                                                Remove
                                            </button>

                                            <div className="flex gap-4 mt-4">
                                                <div className="relative group">
                                                    <button
                                                        type="button"
                                                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md" onClick={() => { increment(item) }}
                                                    >
                                                        +
                                                    </button>
                                                </div>
                                                <p>{item.quantity}</p>

                                                <div>
                                                    <button
                                                        type="button"

                                                        className="flex items-center px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs outline-none bg-transparent rounded-md" onClick={() => { decrement(item) }}
                                                    >-
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="ml-auto">
                                        <h4 className="text-base font-bold text-gray-800">₹{(item.productId.new_price * (quantities[item.productId._id]))}</h4>
                                        {console.log((quantities[item.productId._id]))};
                                        
                                    </div>
                                </div>
                            ))}
                        </div>
                        <hr className="border-gray-300 mt-4 mb-8" />
                    </div>

                    <div className="bg-red-50 p-4 rounded-md">
                        <h2 className="text-2xl font-bold text-gray-800" id='navname'>Summary</h2>
                        <hr className="border-gray-300 mt-4 mb-8" />
                        <div className="flex justify-between items-center">
                            <p className="text-base font-light text-gray-800">shipping charge</p>
                            <p className="text-base font-semibold text-gray-800">₹0.00</p>
                        </div>
                        <hr className="border-gray-300 mt-4 mb-8" />
                        <div className="flex justify-between items-center">
                            <p className="text-base font-semibold text-gray-800">Total</p>
                            <p className="text-lg font-bold text-gray-800">₹{price}</p>
                        </div>
                        <button
                            type="button"
                            className="w-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md mt-8" onClick={() => navigate('/payment')}
                        >
                            Checkout
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart

// import React, { useContext, useState, useEffect } from 'react';
// import { Cartcon } from '../context/Cartcontext';
// import { UserContext } from '../context/Usercontext';
// import { useNavigate } from 'react-router-dom';
// import { toast } from 'react-toastify';
// import axiosinstance from '../axiosinstance';

// function Cart() {
//     const { cartitem, deletecart } = useContext(Cartcon);
//     const { activeuser } = useContext(UserContext);
//     const [quantities, setQuantities] = useState({});
//     const [price, setPrice] = useState(0);
//     const navigate = useNavigate();

//     // Initialize quantities based on cart items
//     useEffect(() => {
//         const initialQuantities = cartitem.reduce((acc, item) => {
//             acc[item.id] = item.qty || 1;
//             return acc;
//         }, {});
//         setQuantities(initialQuantities);
//     }, [cartitem]);

//     // Calculate total price whenever quantities or cart items change
//     useEffect(() => {
//         const pricetotal = () => {
//             const total = cartitem.reduce((acc, item) => {
//                 const quantity = quantities[item.id] || 1;
//                 return acc + item.productId.new_price * quantity;
//             }, 0);
//             setPrice(total);
//         };
//         pricetotal();
//     }, [quantities, cartitem]);

//     // Function to update cart item quantity (increment or decrement)


//     return (
//         <div className='bg-red-100'>
//             <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-red-100 py-4">
//                 <div className="grid md:grid-cols-3 gap-4">
//                     <div className="md:col-span-2 bg-red-50 p-4 rounded-md">
//                         <h2 className="text-2xl font-bold text-gray-800" id='navname'>Cart: </h2>
//                         <hr className="border-gray-300 mt-4 mb-8" />

//                         <div className="space-y-4">
//                             {cartitem.map((item, index) => (
//                                 <div className="grid grid-cols-3 items-center gap-4" key={item.id}>
//                                     <div className="col-span-2 flex items-center gap-4">
//                                         <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
//                                             <img className='w-24 h-24' src={item.productId.image} alt={item.productId.name} />
//                                         </div>
//                                         <div>
//                                             <h3 className="text-base font-bold text-gray-800">{item.productId.name}</h3>
//                                             <button
//                                                 className="text-xs text-red-500 cursor-pointer mt-0.5"
//                                                 onClick={() => { deletecart(item, index) }}>
//                                                 Remove
//                                             </button>

//                                             <div className="flex gap-4 mt-4">
//                                                 <button
//                                                     type="button"
//                                                     className="px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs bg-transparent rounded-md"
//                                                     onClick={() => { increment(item) }}>
//                                                     +
//                                                 </button>
//                                                 <p>{quantities[item.id] || 1}</p>
//                                                 <button
//                                                     type="button"
//                                                     className="px-2.5 py-1.5 border border-gray-300 text-gray-800 text-xs bg-transparent rounded-md"
//                                                     onClick={() => { decrement(item) }}>
//                                                     -
//                                                 </button>
//                                             </div>
//                                         </div>
//                                     </div>
//                                     <div className="ml-auto">
//                                         <h4 className="text-base font-bold text-gray-800">₹{(item.productId.new_price * (quantities[item.id]))}</h4>
//                                     </div>
//                                 </div>
//                             ))}
//                         </div>
//                         <hr className="border-gray-300 mt-4 mb-8" />
//                     </div>

//                     <div className="bg-red-50 p-4 rounded-md">
//                         <h2 className="text-2xl font-bold text-gray-800" id='navname'>Summary</h2>
//                         <hr className="border-gray-300 mt-4 mb-8" />
//                         <div className="flex justify-between items-center">
//                             <p className="text-base font-light text-gray-800">Shipping charge</p>
//                             <p className="text-base font-semibold text-gray-800">₹0.00</p>
//                         </div>
//                         <hr className="border-gray-300 mt-4 mb-8" />
//                         <div className="flex justify-between items-center">
//                             <p className="text-base font-semibold text-gray-800">Total</p>
//                             <p className="text-lg font-bold text-gray-800">₹{price}</p>
//                         </div>
//                         <button
//                             type="button"
//                             className="w-full text-sm font-semibold text-white bg-blue-500 hover:bg-blue-700 px-4 py-2 rounded-md mt-8"
//                             onClick={() => navigate('/payment')}>
//                             Checkout
//                         </button>
//                     </div>
//                 </div>
//             </div>
//         </div>
//     );
// }

// export default Cart;
