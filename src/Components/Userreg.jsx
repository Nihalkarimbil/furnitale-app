import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import axiosinstance from '../axiosinstance';
import { useFormik } from 'formik';
import { schema } from '../Schema/Validation';

const initialValues = {
  username: "",
  email: "",
  password: "",
  confpassword: ""
}

function Userreg() {
  const navigate = useNavigate()

  const { touched, errors, values, handleBlur, handleSubmit, handleChange } = useFormik({
    initialValues: initialValues,
    validationSchema: schema,

    onSubmit: (values) => {
      values.preventDefault();

      axiosinstance.post("/user/signup", values)
        .then((res) => {
          toast.success("registerd succesfully")
          navigate("/login");
        }).catch((err) => {
          toast.error(err)
        })


    }
  })

  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    confpassword: "",
    admin: false,
    blocked: false,
  });

  const handlechange = (e) => {
    const { name, value } = e.target;
    setInput((previnput) => ({
      ...previnput, [name]: value
    }));
  }


  return (
    <div className='bg-gray-100 p-5 pt-20'>
      <div className="max-w-md  mx-auto p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl text-center font-serif text-gray-400">Sign Up</h1>
        <form onSubmit={handleSubmit}>
          <div>
            <div>
              <label className='font-mono text-gray-500'>User Name:</label>
              <input
                type="text"
                name='username'
                onChange={handleChange}
                value={values.username}
                placeholder="Enter your name"
                className='mt-1 p-1 border-2 rounded w-full text-black'

              />
              {errors.username && touched.username ? (<p id='err'>{errors.username}</p>) : null}

            </div>

            <div>
              <label className='font-mono text-gray-500 mt-2'>Email</label>
              <input
                type="email"
                name='email'
                placeholder="Enter your email"
                value={values.email}
                onChange={handleChange}
                className='mt-1 p-1 border-2 rounded w-full text-black'

              />
              {errors.email && touched.email ? (<p id='err'>{errors.email}</p>) : null}

            </div>
            <div>
              <label className='font-mono text-gray-500 mt-2'>Password:</label>
              <input
                type='password'
                placeholder='Enter your password'
                name='password'
                value={values.password}
                onChange={handleChange}

                className="mt-1 p-1 border-2 rounded w-full text-black"
              />
              {errors.password && touched.password ? (<p id='err'>{errors.password}</p>) : null}

            </div>

            <div>

              <label className='font-mono text-gray-500 mt-2'>Confirm Password:</label>
              <input
                type='password'
                placeholder='Confirm your password'
                name='confpassword'
                value={values.confpassword}
                onChange={handleChange}

                className="mt-1 p-1 border-2 rounded w-full text-black"
              />

              {errors.confpassword && touched.confpassword ? (<p id='err'>{errors.confpassword}</p>) : null}
            </div>

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
