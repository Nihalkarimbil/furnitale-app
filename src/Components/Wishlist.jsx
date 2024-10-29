import React, { useContext } from 'react'
import { Cartcon } from '../context/Cartcontext'
import { FaShoppingCart } from 'react-icons/fa'


function Wishlist() {

    const {wishitem,addtocart,removewish}=useContext(Cartcon)
    const handlecart = (prod) => {
        addtocart(prod)
    }

    return ( 
        <div className='bg-red-100  h-full pt-20'>
            <div className="font-sans md:max-w-4xl max-md:max-w-xl mx-auto bg-red-100 py-4">
                <div className="md:col-span-2 bg-red-50 p-4 rounded-md">
                    <h2 className="text-2xl font-bold text-gray-800" id='navname'>wishlist </h2>
                    <hr className="border-gray-300 mt-4 mb-8" />
                    {wishitem.map((item, index) => (
                    <div className="grid grid-cols-3 items-center gap-4" key={index}>
                        <div className="col-span-2 flex items-center gap-4">

                            <div className="w-24 h-24 shrink-0 bg-white p-1 rounded-md">
                                <img className='w-24 h-24 '
                                src={item.image}
                                alt={item.name}
                                />
                            </div>
                            <div>
                                <h3 className="text-base font-bold text-gray-800">
                                    {item.name}
                                  
                                </h3>
                                <button className="text-xs text-red-500 cursor-pointer mt-0.5" onClick={() => { removewish(item) }}>
                                    Remove
                                </button>

                            </div>
                        </div>
                        <div className="ml-auto float-end">
                            {/* <h4 className="text-base font-bold text-gray-800">₹{(item.new_price * (quantities[item.id]))}</h4> */}
                            <h4 className="text-base font-bold text-gray-800">₹{item.new_price}</h4>
                            <button onClick={()=>handlecart(item)}><FaShoppingCart/></button>
                        </div>
                    </div>
))}
                </div>
            </div>
        </div>
    )
}

export default Wishlist