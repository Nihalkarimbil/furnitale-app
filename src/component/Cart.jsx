import React, { useContext, useState, useEffect } from 'react'
import { Cartcon } from './context/Cartcontext'
import { UserContext } from './context/Usercontext';
import axios from 'axios';


function Cart() {

    const { cartitem, deletecart } = useContext(Cartcon)
    const { activeuser } = useContext(UserContext)

    const [quantities, setQuantities] = useState({});
    const [price,setPrice]=useState({})

    useEffect(() => {
        const initialQuantities = cartitem.reduce((acc, item) => {
            acc[item.id] = item.qty || 1;
            return acc;
        }, {});
        setQuantities(initialQuantities);
        const initialprice =cartitem.reduce((acc,item)=>{
            acc[item.id]=item.new_price*(item.qty||1)
            return acc
        },{});
        setPrice(initialprice)
    }, [cartitem]);

    const increament = async (item) => {
        const newCount = (quantities[item.id] || 1) + 1;
        setQuantities({ ...quantities, [item.id]: newCount });

        const newPrice=item.new_price * newCount
        setPrice({...price,[item.id]:newPrice})
        const itemID = item.id

        try {
            const resp = await axios.get(`http://localhost:5000/user/${activeuser.id}`)
            const input = resp.data.input
            const cart = resp.data.input.cart
            const index = cart.findIndex((item) => item.id == itemID)
            cart[index].qty += 1
            
            await axios.patch(`http://localhost:5000/user/${activeuser.id}`, {
                input: { ...input, cart: cart }
            });
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    // Function to handle decrement
    const decreament = async (item) => {
        const currentCount = quantities[item.id] || 1;
        if (currentCount > 1) {
            const newCount = currentCount - 1;
            setQuantities({ ...quantities, [item.id]: newCount });
            const itemID = item.id

            try {
                const resp = await axios.get(`http://localhost:5000/user/${activeuser.id}`)
                const input = resp.data.input
                const cart = resp.data.input.cart
                const index = cart.findIndex((item) => item.id == itemID)
                cart[index].qty -= 1
                console.log(cart[index]);
                await axios.patch(`http://localhost:5000/user/${activeuser.id}`, {
                    input: { ...input, cart: cart }
                });
            } catch (error) {
                console.error('Error updating quantity:', error);
            }
        }
    };

    return (

        <div >

            <div className="flex">
                <div id='1' className="w-1/2 bg-red-100  pl-14"> 
                    <div className="flex justify-center flex-row">
                        <div className=" md:w-11/12">
                            <div>
                                <div className="flex flex-row items-center justify-start relative top-4">
                                <p className="mr-1 font-semibold">cart page of: {activeuser?.input?.username}</p>
                                </div>
                                
                                <div className="flex flex-row items-center justify-end">
                                    <p className="mr-1">Sort by:</p>
                                    <p className="mr-1 font-bold">items</p>
                                </div>
                            </div>
                            {cartitem.map((item, index) => (
                                <div key={index} className="flex flex-row justify-between items-center p-2 bg-white mt-4 px-3 rounded">
                                    <div className="mr-1">
                                        <img className="rounded w-[70px]"
                                            src={item.image}
                                            alt={item.name}
                                        />
                                    </div>
                                    <div className="flex flex-col items-center">
                                        <p className="font-serif">{item.name}</p>
                                    </div>
                                    <div className="flex flex-row items-center">
                                        <i className="fa fa-minus text-red-500"></i>
                                        <div className="text-gray-500 mt-1 mx-2">
                                            <p>quantity:{quantities[item.id] || 1}</p>
                                            <button onClick={() => { increament(item) }} className='bg-slate-400 w-8 rounded mr-1'>+</button>
                                            <button onClick={() => { decreament(item) }} className='bg-slate-400 w-8 rounded'>-</button>
                                        </div>
                                        <i className="fa fa-plus text-green-500"></i>
                                    </div>
                                    <div>
                                        <h5 className="text-gray-500">{item.new_price}</h5>
                                    </div>
                                    <div className="flex items-center">
                                        <button className=" text-white bg-red-500 rounded-sm p-1 " onClick={() => { deletecart(item, index) }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                            <div className="flex flex-row items-center mt-3 p-2 bg-slate-400 rounded">
                                <div className="form-control border-0 flex-1">amount paid</div>
                                <button className="btn btn-outline-warning btn-sm ml-2" type="button">Apply</button>
                            </div>
                        </div>
                    </div>
                </div>
                <div id='2' className="w-1/2 bg-red-100 min-h- flex items-center justify-center ">
                    <div className="bg-white w-[400px] shadow-lg rounded-lg flex max-w-2xl">
                        <div className="w-full p-1">
                            <form className="space-y-4">
                                <h2 className="text-xl font-medium mb-4 justify-center">Payment Information</h2>
                                <div>
                                    <h1 className="font-medium text-gray-400">User:{activeuser?.input?.username}</h1>
                                </div>
                                <div>
                                    <p className="font-medium">Amount Payable</p>
                                    <input
                                        type="text"
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        name="card_number"
                                        id="card_number"
                                        required
                                    />
                                </div>
                                <div>
                                    <p className="font-medium">Card Type</p>
                                    <select
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        name="card_type"
                                        id="card_type"
                                        required
                                    >
                                        <option value="">--Select a Card Type--</option>
                                        <option value="Visa">Visa</option>
                                        <option value="RuPay">RuPay</option>
                                        <option value="MasterCard">MasterCard</option>
                                    </select>
                                </div>
                                <div className="flex justify-between">
                                    {/* Add any additional content here if needed */}
                                </div>
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                                >
                                    CheckOut
                                </button>
                            </form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart