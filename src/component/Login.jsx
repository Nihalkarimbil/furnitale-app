

import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { Link} from 'react-router-dom';
import { UserContext } from './context/Usercontext';

function Login() {
  const {handleSubmit,handlechange,login}=useContext(UserContext)

  return (
    <div className="flex items-center justify-center min-h-screen bg-red-100">
      <div className="w-full max-w-md p-8 bg-white shadow-md rounded-lg">
        <h2 className="text-2xl font-bold mb-6 text-center font-serif text-gray-400">Sign In</h2>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">user name:</label>
            <input
              type="text"
              id="username"
              name="username"
              onChange={handlechange}
              value={login.username}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              onChange={handlechange}
              value={login.password}
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            />
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 px-4 rounded-md shadow-sm hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Login
          </button>
          <p className='font-semibold'>you don't have an account? <Link className='text-blue-900' to={'/register'}>Create an account</Link></p>
        </form>
      </div>
    </div>
  );
}

export default Login;
