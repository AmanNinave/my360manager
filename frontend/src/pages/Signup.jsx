import React from 'react';

const Signup = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold">Signup</h1>
      {/* Add your signup form here */}
      <form>
        <input type="text" placeholder="Username" className="border p-2 mb-4 w-full" />
        <input type="email" placeholder="Email" className="border p-2 mb-4 w-full" />
        <input type="password" placeholder="Password" className="border p-2 mb-4 w-full" />
        <button type="submit" className="bg-blue-500 text-white px-4 py-2 rounded">Signup</button>
      </form>
    </div>
  );
};

export default Signup;
