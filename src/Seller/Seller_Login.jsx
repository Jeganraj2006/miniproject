import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AiOutlineGoogle, AiOutlineX } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { supabase } from '../../supabaseClient';

const Seller_Login = () => {
  const [user, setUser] = useState(null);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };
    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      listener?.subscription.unsubscribe();
    };
  }, []);

  const handleLogin = async () => {
    const { error } = await supabase.auth.signInWithOAuth({
      provider: 'google',
    });
    if (error) console.error('Error with login:', error);
  };

  const handleEmailLogin = async (e) => {
    e.preventDefault();
    const { error } = await supabase.auth.signInWithPassword({ email, password });
    if (error) {
      alert("Login failed: " + error.message);
    } else {
      navigate('/sDashboard');
    }
  };

  const handleLogout = async () => {
    const { error } = await supabase.auth.signOut();
    if (error) console.error('Error with logout:', error);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center">Login as seller</h2>

        {user ? (
          <div className="text-center mb-6">
            <p className="text-green-600 font-semibold mb-2">Welcome, {user.email}</p>
            <button
              onClick={handleLogout}
              className="bg-gray-800 text-white px-4 py-2 rounded-lg hover:bg-gray-900 transition duration-300"
            >
              Logout
            </button>
          </div>
        ) : (
          <>
            <form className="space-y-4" onSubmit={handleEmailLogin}>
              <div>
                <label className="block text-gray-700">Email</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your email"
                />
              </div>
              <div>
                <label className="block text-gray-700">Password</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter your password"
                />
              </div>
              <button
                type="submit"
                className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
              >
                Login
              </button>
            </form>
          </>
        )}

        <div className="mt-6 flex items-center justify-between">
          <span className="border-b w-1/5 lg:w-1/4"></span>
          <span className="text-xs text-gray-500 uppercase">or login with</span>
          <span className="border-b w-1/5 lg:w-1/4"></span>
        </div>

        <div className="flex justify-center mt-6 space-x-4">
          {!user && (
            <button
              onClick={handleLogin}
              className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
            >
              <AiOutlineGoogle />
            </button>
          )}
          <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
            <FaFacebookF />
          </button>
          <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300">
            <AiOutlineX />
          </button>
        </div>

        <div className="mt-6 text-center">
          <Link to="/sSignup" className="text-blue-500 hover:underline">
            Don't have an account? Sign up
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Seller_Login;
