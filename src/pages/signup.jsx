import React from 'react';
import { AiOutlineGoogle,AiOutlineFacebook,AiOutlineX } from "react-icons/ai";

const Signup = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Sign Up</h2>
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
                    <button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300">
                        <AiOutlineGoogle />
                    </button>
                    <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
                        <>F</>
                    </button>
                    <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300">
                        <AiOutlineX />
                    </button>
                </div>
                <p className="mt-6 text-center text-gray-500">
                    Already have an account?{' '}
                    <a href="./login" id=" signup" className="text-blue-500 hover:underline" >
                        Log In
                    </a>
                </p>
            </div>
        </div>
    );
};

export default Signup;