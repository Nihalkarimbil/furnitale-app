import React, { useContext, useState, useEffect } from 'react'
import { Cartcon } from './context/Cartcontext'
import { UserContext } from './context/Usercontext';
import axios from 'axios';
import { FaUser } from 'react-icons/fa'; 


function Cart() {

    const { cartitem, deletecart } = useContext(Cartcon)
    const { activeuser } = useContext(UserContext)
    const [quantities, setQuantities] = useState({});
    const [price, setPrice] = useState(0)

    useEffect(() => {
        const initialQuantities = cartitem.reduce((acc, item) => {
            acc[item.id] = item.qty || 1;
            return acc;
        }, {});
        setQuantities(initialQuantities);
    },[cartitem])
    //     const initialprice = cartitem.reduce((acc, item) => {
    //         acc[item.id] = item.new_price * (item.qty || 1)
    //         return acc
    //     }, {});
    //     setPrice(initialprice)
    // }, [cartitem]);
    useEffect(()=>{
        const pricetotal=()=>{
            const total=cartitem.reduce((acc,item)=>{
                const quantity=quantities[item.id]||1;
                return acc+item.new_price* quantity
            },0)
            setPrice(total)
        }
        pricetotal()
    },[quantities,cartitem])

    const increament = async (item) => {
        const newCount = (quantities[item.id] || 1) + 1;
        setQuantities({ ...quantities, [item.id]: newCount });

        // const newPrice = item.new_price * newCount
        // setPrice({ ...price, [item.id]: newPrice })
        const itemID = item.id

        try {
            const resp = await axios.get(`http://localhost:5000/user/${activeuser.id}`)
            const input = resp.data.input
            const cart = resp.data.input.cart
            const index = cart.findIndex((item) => item.id == itemID)
            cart[index].qty += 1
            // cart[index].new_price=newPrice

            await axios.patch(`http://localhost:5000/user/${activeuser.id}`, {
                input: { ...input, cart: cart }
            });
        } catch (error) {
            console.error('Error updating quantity:', error);
        }
    };

    
    const decreament = async (item) => {
        const currentCount = quantities[item.id] || 1;
        if (currentCount > 1) {
            
            const newCount = currentCount - 1;
            setQuantities({ ...quantities, [item.id]: newCount });
            const itemID = item.id
            // const newPrice = item.new_price * newCount
            // setPrice({ ...price, [item.id]: newPrice })

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
    const pay=async()=>{
        alert('are you sure want to make payment')
        await setTimeout(() => {
            alert('payment succesfull')
        }, 5000);
    }

    return (
        <div >
            <div className="flex">
                <div id='1' className="w-1/2 bg-red-100  pl-14">
                    <div className="flex justify-center flex-row pb-10">
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
                                        <h5 className="text-gray-500">{(item.new_price * (quantities[item.id]))}</h5>
                                    </div>
                                    <div className="flex items-center">
                                        <button className=" text-white bg-red-500 rounded-sm p-1 " onClick={() => { deletecart(item, index) }}>Delete</button>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <div id='2' className="w-1/2 bg-red-100 min-h- flex items-center justify-center ">
                    <div className="bg-white w-[400px] shadow-lg rounded-lg flex max-w-lg">
                        <div className="w-full p-1">
                            <form className="space-y-3">
                                <div> 
                                    <h1 className="font-medium text-gray-400 text-center pt-2 font-serif"> User:{activeuser?.input?.username}</h1>
                                </div>
                                <div>
                                    <p className="font-bold text-lg text-center">Amount Payable:{price}</p>
                                </div>
                                <div>
                                    <p className="font-medium text-center">Select Apps</p>
                                    <select
                                        className="mt-1 p-2 border border-gray-300 rounded w-full"
                                        name="card_type"
                                        id="card_type"
                                        required
                                    >
                                        <option value="">--Select a Card Type--</option>
                                        <option value="Visa">G-PAY</option>
                                        <option value="RuPay">Paytm</option>
                                        <option value="MasterCard">PhonePe</option>
                                    </select>
                                </div>
                                    <p className="font-medium text-center">enter phone number</p>
                                    <input className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    type='text'
                                    placeholder='phone number'
                                    required
                                    />
                                    <p className="font-medium text-center">password</p>
                                    <input className="mt-1 p-2 border border-gray-300 rounded w-full"
                                    type='password'
                                    placeholder='pin'
                                    required
                                    />
                                
                            
                                
                                <button
                                    type="submit"
                                    className="mt-4 bg-blue-500 text-white p-2 rounded hover:bg-blue-600"onClick={()=>{pay()}} >
                                    PAY 
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