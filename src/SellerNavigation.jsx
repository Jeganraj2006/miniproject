import React from 'react'
import {Link} from 'react-router-dom'

const Seller_navigation = () => {
  return (
    <div>
        <header >
    <div className="bg-green-600 text-white p-4 flex justify-around fixed w-full z-10">
    <h1 className="text-3xl font-bold text-center">Agrilink</h1>
    <Link to="/sDashboard" className="text-white">Dashboard</Link>
    <Link to="/sproducts" className="text-white">Products_list</Link>
    <Link to="/srental" className="text-white">Rental_list</Link>
    <Link to="/sorders_history" className="text-white">Orders_History</Link> 
    <Link to="/sOrders" className="text-white">Orders</Link> 

    </div>
    </header>   
    </div>
  )
}

export default Seller_navigation