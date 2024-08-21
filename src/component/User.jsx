import React, { useContext } from 'react'
import { FaUser } from 'react-icons/fa'; 
import { UserContext } from './context/Usercontext';
import { Link} from 'react-router-dom';



function User() {

    const { activeuser,handlelogout } = useContext(UserContext)
    const username = activeuser?.username;
    const id=activeuser?.id
    if (!activeuser) {
        return (
           <div className='bg-red-100 h-[310px]'>
            <div >
            <p className='flex justify-center p-[90px] font-serif text-gray-400 text-3xl'>User Not Available!
                </p>
                <Link to={'/login'}>
                <button className=' relative left-[620px] p-1 rounded bottom-16 text-blue-700 font-semibold'>
                    Please Login
                </button>
                </Link>
            </div>
            </div>
       
        )
            
    }

    return (
        <div className='flex items-center justify-center min-h-[100px] p-8 bg-red-100'>
            <div className="w-full max-w-md p-8 bg-red-50 shadow-md rounded-lg">
                <FaUser className="w-32 h-32 mx-auto rounded dark:bg-gray-500 aspect-square" />
                <div className="space-y-4 text-center divide-y dark:divide-gray-300">
                    <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl text-gray-500">{username}</h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-600"> an active user</p>
                        <p>id:{id}</p>
                        <button className='bg-red-300 rounded-sm p-1 font-semibold m-2'onClick={handlelogout}>Log out</button>
                        <Link to={'/n'}>
                        <button className='bg-blue-800 text-white rounded-sm p-1 font-semibold'>Back to Home</button>
                        </Link>
                    </div>
                </div>
            </div>
            
        </div>
    )
}

export default User