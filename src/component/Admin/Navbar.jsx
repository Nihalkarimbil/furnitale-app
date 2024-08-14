import React from 'react'
import { FaUserShield } from 'react-icons/fa';

function NAvbar() {
  return (
    <div>
        <nav className='w-full bg-slate-50 h-16 absolute shadow-sm '>
        <div className='float-end mr-12 mt-4'><FaUserShield size={30} color='gray-200'/></div>
        </nav>
    </div>
  )
}

export default NAvbar