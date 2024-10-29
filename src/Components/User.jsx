import React, { useContext } from 'react'
import { FaUser } from 'react-icons/fa'; 
import { UserContext } from '../context/Usercontext';
import { Link} from 'react-router-dom';



function User() {

    const { activeuser,handlelogout } = useContext(UserContext)
    console.log(activeuser)
    const username = activeuser?.username;
    const id=activeuser?.id
    if (!activeuser) {
        return (
            <div className="bg-orange-100 min-h-[310px] flex flex-col justify-center  items-center pt-20">
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
        <div className='flex items-center justify-center min-h-[100px] p-8 bg-orange-100 pt-20'>
            <div className="w-full max-w-md p-8 bg-red-50 shadow-md rounded-lg">
                <FaUser className="w-32 h-32 mx-auto rounded dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl text-gray-500">{username}</h2>
                        <p>id:{id}</p>
                        <button className='bg-slate-300 rounded-lg p-1 font-semibold m-2 mt-3'onClick={handlelogout}>Log out</button>
                        <Link to={'/'}>
                        <button className='bg-gray-500 text-white rounded-lg p-1 font-semibold mt-3'>Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default User