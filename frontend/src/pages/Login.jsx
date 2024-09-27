import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    try {
      const response = await fetch(`${import.meta.env.VITE_BACKEND_IP}/api/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ username, password }),
      });

      if (!response.ok) {
        throw new Error('Login failed!'); // Handle non-200 response
      }

      const data = await response.json();
      // Assume the response contains a token or user data
      console.log(data); // Log the response for debugging

      navigate('/'); // Navigate to the home page on successful login
    } catch (error) {
      console.error('Error:', error);
      alert('Login failed! Please try again.'); // Notify user of failure
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <div className="bg-white shadow-md rounded p-6 w-96"> {/* Added width and centering */}
        <h1 className="text-3xl font-bold text-center mb-4">Login</h1>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            className="border p-2 mb-4 w-full"
            value={username}
            onChange={(e) => setUsername(e.target.value)} // Update state on change
          />
          <input
            type="password"
            placeholder="Password"
            className="border p-2 mb-4 w-full"
            value={password}
            onChange={(e) => setPassword(e.target.value)} // Update state on change
          />
          <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded w-full">Login</button>
        </form>
        <div className="mt-4 text-center"> {/* Center the sign-up link/button */}
          <p>Don't have an account? <span className="text-blue-500 cursor-pointer" onClick={() => navigate('/signup')}>Sign Up</span></p>
        </div>
      </div>
    </div>
  );
};

export default Login;
