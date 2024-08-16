import React, { useContext } from 'react'
import { FaUserShield,FaSignOutAlt  } from 'react-icons/fa';
import { UserContext } from '../context/Usercontext'


function NAvbar() {
  const {addminlogout} = useContext(UserContext)
  return (
    <div>
        <nav className='w-full bg-slate-50 h-16 absolute shadow-sm  '>
        <button className='float-end mr-12 mt-4  text-gray-500 hover:text-black' onClick={()=>addminlogout()} ><FaSignOutAlt size={24}/></button>
        <div className='float-end mr-3 mt-4 text-gray-500 hover:text-black'><FaUserShield size={24} color='gray-200'/></div>

        </nav>
    </div>
  )
}

export default NAvbar