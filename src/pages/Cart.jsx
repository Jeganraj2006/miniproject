// src/pages/Cart.jsx

import React from 'react';
import { useCart } from '../context/CartContext';  // Import CartContext

const Cart = () => {
  const { cart, removeFromCart } = useCart();

  return (
    <div className="pt-10 px-4 sm:px-8 md:px-16">
      <h1 className="text-3xl font-semibold text-slate-700 mb-6">Your Cart 🛒</h1>

      {cart.length === 0 ? (
        <p className="text-gray-500">Your cart is empty. Add some rentals to your cart!</p>
      ) : (
        <div>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center p-4 bg-white rounded-xl shadow-md">
                <div className="flex items-center space-x-4">
                  <img src={item.image} alt={item.name} className="h-24 w-24 object-cover rounded-lg" />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-700">{item.name}</h2>
                    <p className="text-gray-600">₹{item.rent_per_day} per day</p>
                  </div>
                </div>
                <button
                  onClick={() => removeFromCart(item.id)}
                  className="bg-red-500 text-white px-4 py-2 rounded-lg hover:bg-red-600"
                >
                  Remove
                </button>
              </li>
            ))}
          </ul>

          <div className="mt-8 text-right">
            <button
              onClick={() => alert('Proceeding to checkout')}
              className="bg-blue-500 text-white px-6 py-3 rounded-lg hover:bg-blue-600"
            >
              Proceed to Checkout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
