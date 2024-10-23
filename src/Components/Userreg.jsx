import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosinstance from '../axiosinstance';

function Userreg() {
  const navigate = useNavigate()

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confpassword: "",
    admin: false,
    blocked: false,
  });

  const handlesubmit = (e) => {
    e.preventDefault();
    const reginput = {
      ...input,
      blocked: false
    };
    axiosinstance.post("/user/signup",reginput) 
    .then((res) => {
      toast.success("registerd succesfully")
      navigate("/login");
      // localStorage.setItem('regdata',JSON.stringify(reginput))
    }).catch((err) => {
      toast.error(err)
    })

  };
  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((previnput) => ({
      ...previnput, [name]: value
    }));
  }


  return (
    <div className='bg-red-100 p-5'>
      <div className="max-w-md  mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-serif text-gray-400">Sign Up</h1>
        <form onSubmit={handlesubmit}>
          <div>
            <label className='font-mono text-gray-500'>User Name:</label>
            <input
              type="text"
              pattern="^[A-Za-z0-9].{3,15}"
              name='username'
              onChange={handlechange}
              value={input.username}
              placeholder="Enter your name"
              className='mt-1 p-1 border-2 rounded w-full text-black'
              required
            />
            <span className='text-red-600'>Username should have 3-15 characters</span>

            <label className='font-mono text-gray-500 mt-2'>Email:</label>
            <input
              type="email"
              name='email'
              placeholder="Enter your email"
              value={input.email}
              onChange={handlechange}
              className='mt-1 p-1 border-2 rounded w-full text-black'
              required
            />
            <span className='text-red-600'>Enter a valid email id</span>

            <label className='font-mono text-gray-500 mt-2'>Password:</label>
            <input
              type='password'
              pattern="(?=.*\d)(?=.*[A-Z]).{5,}"
              placeholder='Enter your password'
              name='password'
              value={input.password}
              onChange={handlechange}
              required
              className="mt-1 p-1 border-2 rounded w-full text-black"
            />
            <span className='text-red-600'>Password must have at least 5 characters and include at least one digit and one uppercacse </span>

            <label className='font-mono text-gray-500 mt-2'>Confirm Password:</label>
            <input
              type='password'
              pattern={input.password}
              placeholder='Confirm your password'
              name='confpassword'
              value={input.confpassword}
              onChange={handlechange}
              required
              className="mt-1 p-1 border-2 rounded w-full text-black"
            />
            <span className='text-red-600'>Passwords do not match</span>

            <button className='bg-blue-100 border-3px rounded-full mt-2 h-9 w-full hover:bg-green-400 font-bold text-gray-600' type='submit'>Sign Up</button>
            <br /><br />
            <p className='font-semibold'>you have an account? <Link className='text-blue-900' to={'/login'}>Go to account</Link></p>
          </div>
        </form>
        <br />
      </div>
    </div>

  );


}
export default Userreg;
