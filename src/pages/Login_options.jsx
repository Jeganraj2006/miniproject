import React from 'react'
import { Link} from 'react-router-dom'
const Login_options = () => {
  return (
    <div className="pt-30 flex items-center justify-center bg-gray-100 pb-55">
        <div className="bg-white p-15 rounded-lg shadow-lg w-full max-w-md space-y-6">
            <h1 className='text-xl'>Choose who you are....</h1>
            <div className='flex justify-around'>
            <Link to="/login" className="text-white"><button   className="w-30 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Customer</button></Link>    
            <Link to="/slogin" className="text-white"><button   className="w-30 bg-blue-500 text-white py-2 rounded-lg hover:bg-blue-600 transition duration-300">Sellers</button></Link>
            </div>
        </div>
    </div>
  )
}

export default Login_options