import React, { useContext } from 'react'
import { UserContext } from '../context/Usercontext';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Payment() {
    const Navigate=useNavigate()
    const { activeuser ,setActivUser} = useContext(UserContext)

    const pay = async () => {
        const confirmPayment = window.confirm('Are you sure you want to make the payment?');
        if (confirmPayment) {
            try {
                const res = await axios.get(`http://localhost:5000/user/${activeuser.id}`);
                const user1 = res.data;
              let result=  await axios.put(`http://localhost:5000/user/${activeuser.id}`, {
                    ...user1, input: { ...user1.input, cart: [] }
                });
                setActivUser(result.data.input)
                
                setTimeout(() => {
                    alert('Payment successful,Thank you for shopping');
                    Navigate('/')
                }, 3000);
                
            } catch (error) {
                console.error('There was an error clearing the cart:', error);

            }
        } else {
            alert('Payment canceled.');
        }
    };

    return (
        <div className=" bg-red-100 p-5">
            <div className="card px-4 container font-sans md:max-w-lg max-md:max-w-xl mx-auto border bg-red-50 rounded shadow">
                <p className="text-lg font-semibold py-3">Payment Details</p>
                <div className="grid grid-cols-12 gap-3">
                    <div className="col-span-12">
                        <div className="flex flex-col">
                            <p className="text-sm mb-1">Person Name</p>
                            <input
                                className="form-control mb-3 p-2 border border-gray-300 rounded"
                                type="text"
                                placeholder="Name"
                                required      
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <div className="flex flex-col">
                            <p className="text-sm mb-1">Card Number</p>
                            <input
                                className="form-control mb-3 p-2 border border-gray-300 rounded"
                                type="text"
                                placeholder="1234 5678 435678"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col">
                            <p className="text-sm mb-1">Expiry</p>
                            <input
                                className="form-control mb-3 p-2 border border-gray-300 rounded"
                                type="text"
                                placeholder="MM/YYYY"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-span-6">
                        <div className="flex flex-col">
                            <p className="text-sm mb-1">CVV/CVC</p>
                            <input
                                className="form-control mb-3 p-2 border border-gray-300 rounded"
                                type="password"
                                placeholder="***"
                                required
                            />
                        </div>
                    </div>
                    <div className="col-span-12">
                        <button className="btn btn-primary mb-3 w-full py-2 bg-blue-500 text-white rounded-md text-center"  onClick={() => { pay() }}>
                        pay 
                           
                        </button>
                    </div>
                </div>
            </div>
        </div>

    )
}

export default Payment