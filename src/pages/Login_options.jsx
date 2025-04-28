import React from 'react';
import { useNavigate } from 'react-router-dom';

const Login_options = () => {
  const navigate = useNavigate();

  const handleRoleSelect = (role) => {
    localStorage.setItem('selectedRole', role);
    if (role === 'client') {
      navigate('/signup');
    } else if (role === 'seller') {
      navigate('/sSignup');
    }
  };

  return (
    <div className="pt-30 flex items-center justify-center bg-gray-100 pb-55">
      <div className="bg-white mt-20 mb-36 p-20 rounded-lg shadow-lg w-full max-w-md space-y-6">
        <h1 className="text-xl font-semibold text-center">Choose who you are...</h1>
        <div className="flex justify-around pt-4">
          <button
            onClick={() => handleRoleSelect('client')}
            className="w-30 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Customer
          </button>
          <button
            onClick={() => handleRoleSelect('seller')}
            className="w-30 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Seller
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login_options;
