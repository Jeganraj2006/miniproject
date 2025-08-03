import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineGoogle, AiOutlineX } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";
import { supabase } from '../../supabaseClient'; // Import supabase client

const Seller_signup = () => {
    const [loading, setLoading] = useState(false);

    // ✅ Updated Google Login function with redirectTo
    const handleGoogleLogin = async () => {
        setLoading(true);
        try {
            localStorage.setItem('selectedRole', 'seller'); // Save role
            await supabase.auth.signInWithOAuth({
                provider: 'google',
                options: {
                    redirectTo: 'http://localhost:5173/auth-callback',
                },
            });
        } catch (error) {
            console.error("Error with Google login:", error);
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up as Seller</h2>
                <form className="space-y-4">
                    <div>
                        <label className="block text-gray-700">Email</label>
                        <input
                            type="email"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your email"
                        />
                    </div>
                    <div>
                        <label className="block text-gray-700">Password</label>
                        <input
                            type="password"
                            className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                            placeholder="Enter your password"
                        />
                    </div>
                    <Link to="/home">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300"
                        >
                            Sign Up
                        </button>
                    </Link>
                </form>

                <div className="mt-6 flex justify-between items-center">
                    <hr className="w-full border-gray-300" />
                    <span className="px-2 text-gray-500">or</span>
                    <hr className="w-full border-gray-300" />
                </div>

                <div className="flex justify-center mt-6 space-x-4">
                    <div>
                        <button
                            onClick={handleGoogleLogin}
                            disabled={loading}
                            className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300"
                        >
                            <AiOutlineGoogle />
                        </button>
                    </div>
                    {/* <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
                        <FaFacebookF />
                    </button>
                    <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300">
                        <AiOutlineX />
                    </button> */}
                </div>

                <p className="mt-6 text-center text-gray-500">
                    Already have an account?{' '}
                    <Link to="/sLogin" className="text-blue-500 hover:underline">Log In</Link>
                </p>
            </div>
        </div>
    );
};

export default Seller_signup;
