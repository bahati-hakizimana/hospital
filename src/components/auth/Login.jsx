import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { LockClosedIcon } from '@heroicons/react/20/solid';
import axios from 'axios';

const Login = () => {
  const navigate = useNavigate();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
      if (response.data) {
        alert("Login successful");
      }
      const userRole = response.data.role;
      localStorage.setItem('userRole', userRole); // Store user role in localStorage
      setMessage(response.data.message);
      if (userRole === 'admin') {
        navigate('/admin'); // Redirect to admin dashboard
      } else if (userRole === 'user') {
        navigate('/user'); // Redirect to user dashboard
      } else {
        console.log(`Unknown user role: ${userRole}`);
      }
    } catch (error) {
      console.error('Error during login:', error);
      setMessage('Login failed. Please check your credentials.');
    }
  };

  // Check if user is already logged in and redirect to appropriate dashboard
  const userRole = localStorage.getItem('userRole');
  if (userRole) {
    if (userRole === 'admin') {
      navigate('/admin');
    } else if (userRole === 'user') {
      navigate('/user');
    }
  }

  return (
    <>
    <div className="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-white">
      <div className="sm:mx-auto sm:w-full sm:max-w-sm">
        <h2 className="mt-10 text-center text-xl font-semibold leading-9 tracking-tight text-gray-900">
          Welcome Back
        </h2>
      </div>
      <small className='mt-1.5 text-center'>Sign in to your account</small>
      <div className="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <form className="space-y-6" onSubmit={handleLogin}>
          <div>
            <label htmlFor="username" className="block text-sm font-medium leading-6 text-gray-900">
              Username
            </label>
            <div className="mt-2">
              <input
                id="username"
                name="username"
                type="text"
                autoComplete="username"
                required
                value={username} onChange={(e) => setUsername(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <div className="flex items-center justify-between">
              <label htmlFor="password" className="block text-sm font-medium leading-6 text-gray-900">
                Password
              </label>
              <div className="text-sm">
                <a href="password_reset" className="font-semibold text-indigo-600 hover:text-indigo-500">
                  Forgot password?
                </a>
              </div>
            </div>
            <div className="mt-2">
              <input
                id="password"
                name="password"
                type="password"
                autoComplete="current-password"
                required
                value={password} onChange={(e) => setPassword(e.target.value)}
                className="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group relative flex w-full justify-center rounded-md bg-purple-500 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
            >
              <span className='absolute inset-y-0 left-0 flex items-center pl-3'>
                <LockClosedIcon className='h-5 w-5 text-purple-400 group-hover:text-indigo-400' aria-hidden="true" />
              </span>
              Sign In
            </button>
          </div>
        </form>
        <p className="mt-10 text-center text-sm text-gray-500">
          Not a member?{' '}
          <Link to="/signup" className="font-semibold leading-6 text-indigo-600 hover:text-indigo-500">
            Sign Up
          </Link>
          <Link to="/" className="px-4 py-2 bg-blue-400 rounded-full text-white ml-4">Back home</Link>
        </p>
      </div>
    </div>
  </>
  );
};

export default Login;






// import React, { useState } from 'react';
// import { Link, useNavigate } from 'react-router-dom';
// import { LockClosedIcon } from '@heroicons/react/20/solid';
// import axios from 'axios';

// const Login = () => {
//   const navigate = useNavigate();
//   const [username, setUsername] = useState('');
//   const [password, setPassword] = useState('');
//   const [message, setMessage] = useState('');

//   const handleLogin = async (e) => {
//     e.preventDefault();
//     try {
//       const response = await axios.post('http://127.0.0.1:8000/login/', { username, password });
//       if(response.data){
//         alert("login successful", response.data.username);
//       }
//       const userRole = response.data.role;
//       console.log(`User role is ${userRole}`);
//       localStorage.setItem("userRole", userRole);
//       setMessage(response.data.message);
//       if (userRole === 'admin') {
//         // redirect to admin dashboard
//         console.log('Redirecting to admin dashboard...');
//         navigate('/admin');
//       } else if (userRole === 'user') {
//         // redirect to user dashboard
//         console.log('Redirecting to user dashboard...');
//         navigate('/user');
//       } else {
//         console.log(`Unknown user role: ${userRole}`);
//       }
//     } catch (error) {
//       console.error('Error during login:', error);
//       setMessage('Login failed. Please check your credentials.');
//     }
//   };

//   return (
    
//   )
// }

// export default Login;
// http://127.0.0.1:8000/logout/