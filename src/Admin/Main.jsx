// import React from 'react'
// import { Link } from 'react-router-dom'

// function Mainadmin() {
//   return (
//     <div className='flex '>
//       <Link to={'/users'}
//        className='bg-slate-100 w-[450px] mt-20 ml-5 h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
//       <h1 className='text-8xl text-center mt-12 font-serif opacity-20'>Users</h1>    
//       </Link>
//       <Link to={"/products"}
//      className='bg-slate-100 w-[450px] mt-20 ml-8 h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
//         <h1 className='text-8xl text-center mt-10 opacity-20 font-serif'>Products</h1>  
//       </Link>
//     </div>
//   )
// }

// export default Mainadmin

import React from 'react'
import { Link } from 'react-router-dom'

function Mainadmin() {
  return (
    <div className='flex flex-col md:flex-row justify-center items-center md:items-start'>
      <Link to={'/users'}
        className='bg-slate-100 w-[90%] sm:w-[450px] mt-10 md:mt-20 ml-0 md:ml-5 h-40 sm:h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
        <h1 className='text-4xl sm:text-8xl text-center mt-8 sm:mt-12 font-serif opacity-20'>Users</h1>    
      </Link>
      <Link to={"/products"}
        className='bg-slate-100 w-[90%] sm:w-[450px] mt-10 md:mt-20 ml-0 md:ml-8 h-40 sm:h-48 rounded-lg shadow-lg hover:transition-transform transform scale-100 hover:scale-105'>
        <h1 className='text-4xl sm:text-8xl text-center mt-6 sm:mt-10 opacity-20 font-serif'>Products</h1>  
      </Link>
    </div>
  )
}

export default Mainadmin
