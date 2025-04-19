import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineGoogle } from "react-icons/ai";
import { supabase } from '../../supabaseClient';

const Signup = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const selectedRole = localStorage.getItem('selectedRole');  // Role stored from the role selection page

  // Handle Google OAuth
  const handleGoogleLogin = async () => {
    const { user, session, error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
      options: {
        redirectTo: window.location.origin + (selectedRole === 'seller' ? '/sDashboard' : '/client-dashboard')
      }
    });

    if (error) {
      console.error('Google Login Error:', error.message);
      return;
    }

    if (user) {
      const { id, email, user_metadata } = user;
      const name = user_metadata.full_name || email.split('@')[0];

      // Insert profile into profiles table
      const profileData = {
        id,
        name,
        email,
        role: selectedRole
      };

      await supabase.from('profiles').upsert([profileData]);

      // Insert user into clients or sellers table based on role
      if (selectedRole === 'client') {
        await supabase.from('clients').upsert([{ id }]);
        navigate('/client-dashboard');
      } else if (selectedRole === 'seller') {
        await supabase.from('sellers').upsert([{ id }]);
        navigate('/sDashboard');
      }
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error('Signup Error:', error.message);
      return;
    }

    const user = data?.user;

    if (user) {
      const profileData = {
        id: user.id,
        email: user.email,
        name: email.split('@')[0],
        role: selectedRole
      };

      await supabase.from('profiles').upsert([profileData]);

      // Create user entry in the respective table (client or seller)
      if (selectedRole === 'client') {
        await supabase.from('clients').upsert([{ id: user.id }]);
        navigate('/client-dashboard');
      } else if (selectedRole === 'seller') {
        await supabase.from('sellers').upsert([{ id: user.id }]);
        navigate('/sDashboard');
      }
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Sign Up as Customer</h2>
        <form className="space-y-4" onSubmit={handleSignup}>
          <div>
            <label className="block text-gray-700">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block text-gray-700">Password</label>
            <input
              type="password"
              className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Enter your password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
          >
            Sign Up
          </button>
        </form>
        <div className="mt-6 flex justify-between items-center">
          <hr className="w-full border-gray-300" />
          <span className="px-2 text-gray-500">or</span>
          <hr className="w-full border-gray-300" />
        </div>
        <div className="flex justify-center mt-6 space-x-4">
          <button
            onClick={handleGoogleLogin}
            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
          >
            <AiOutlineGoogle />
          </button>
        </div>
        <p className="mt-6 text-center text-gray-500">
          Already have an account?{' '}
          <Link to="/login" className="text-blue-500 hover:underline">Log In</Link>
        </p>
      </div>
    </div>
  );
};

export default Signup;
