import React from 'react';
import {Link} from 'react-router-dom'
import { AiOutlineGoogle,AiOutlineX } from "react-icons/ai";
import { FaFacebookF } from "react-icons/fa";

import {LoginSocialGoogle} from 'reactjs-social-login'

const Seller_Login = () => {
    return (
        <div className="min-h-screen flex items-center justify-center bg-gray-100">
            <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md">
                <h2 className="text-2xl font-bold mb-6 text-center">Login as seller</h2>
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
                    <Link to="/sDashboard"><button
                        type="submit"
                        className="w-full bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">
                    Login</button></Link>
                </form>
                <div className="mt-6 flex items-center justify-between">
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                    <span className="text-xs text-gray-500 uppercase">or login with</span>
                    <span className="border-b w-1/5 lg:w-1/4"></span>
                </div>
                <div className="flex justify-center mt-6 space-x-4">
                    <div>
                        <LoginSocialGoogle client_id='238139246455-9hm7016mp98thslt7i31j82u40736ds7.apps.googleusercontent.com'
                        accessype='offline'
                        onResolve={({provider,data})=>{console.log(provider,data)}}
                        onReject={(error)=>{console.log(error)}}
                        ><button className="bg-red-500 text-white p-2 rounded-full hover:bg-red-600 transition duration-300">
                        <AiOutlineGoogle />
                        </button>
                        </LoginSocialGoogle>
                    </div>
                    <div>
                        <button className="bg-blue-600 text-white p-2 rounded-full hover:bg-blue-700 transition duration-300">
                        <FaFacebookF />
                        </button>
                    </div>
                    <div>
                        <button className="bg-blue-400 text-white p-2 rounded-full hover:bg-blue-500 transition duration-300">
                            <AiOutlineX />
                        </button>
                    </div>
                </div>
                <div className="mt-6 text-center">
                    {/* <Link to="/signup" className="text-blue-500 hover:underline">Don't have an account? Sign up</Link> */}
                </div>
            </div>
        </div>
    );
};

export default Seller_Login;