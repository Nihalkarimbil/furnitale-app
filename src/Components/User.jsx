
import React, { useContext } from 'react';
import { UserContext } from '../context/Usercontext';
import { Cartcon } from '../context/Cartcontext';
import { Link } from 'react-router-dom';

const User = () => {
    const { activeuser, handlelogout } = useContext(UserContext);
    const { cartitem } = useContext(Cartcon);


    if (!activeuser) {
        return (
            <div className="bg-gray-100 min-h-[500px] flex flex-col justify-center  items-center pt-20">
                <p className="text-center font-serif text-gray-400 text-xl sm:text-2xl md:text-3xl">
                    User Not Available!
                </p>
                <Link to="/login">
                    <button className="mt-4 sm:mt-6 px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg font-semibold">
                        Please Login
                    </button>
                </Link>
            </div>
        );
    }

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4 pt-">
            <div className="relative bg-gray-800 rounded-xl shadow-lg text-gray-300 w-full max-w-md p-6 md:p-8">
                <p className="absolute top-4 right-4 bg-yellow-400 text-gray-800 font-semibold text-xs rounded-full px-3 py-1">
                    PRO
                </p>
                <div className="flex flex-col items-center text-center">
                    <img
                        className="w-24 h-24 rounded-full border-4 border-teal-400 p-1 mb-4"
                        src={"https://i.pinimg.com/564x/f5/ef/fc/f5effcbe69882a106af37ef41d22ddf9.jpg"}
                        alt="user profile"
                    />
                    <h3 className="text-2xl font-semibold">{activeuser?.username || "Ricky Park"}</h3>
                    <h6 className="text-sm text-teal-400 uppercase">{"india"}</h6>
                    <p className="text-sm mt-2 leading-5">
                        {"user of furnitales ecommerce shop"}
                    </p>
                </div>

                <div className="mt-6 space-x-2 flex justify-center">
                    <Link to={'/myOrders'}>
                    <button 
                        className="bg-transparent border border-teal-400 text-teal-400 hover:bg-teal-400 hover:text-gray-900 rounded-lg px-4 py-2 font-medium"
                    >
                        My Orders
                    </button>
                    </Link>
                    
                </div>

                <div className="bg-gray-700 text-left rounded-lg mt-6 p-4">
                    
                    <ul className="flex flex-wrap gap-2">
                        {cartitem.map((item, index) => (
                            <li key={index} className="bg-gray-600 text-xs text-gray-200 rounded-full px-3 py-1">
                                {item.productId?.name}
                            </li>
                        ))}
                    </ul>
                </div>
                <button
                    className="mt-6 bg-red-600 hover:bg-red-700 w-full rounded-lg px-4 py-2 font-medium text-white"
                    onClick={handlelogout}
                >
                    Logout
                </button>
            </div>
        </div>
    );
};

export default User;

