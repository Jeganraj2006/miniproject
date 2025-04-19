import React from 'react';
import { useCart } from '../context/CartContext';
import { supabase } from '../../supabaseClient';

const Cart = () => {
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleQuantityChange = async (item, newQty) => {
    if (newQty < 1) return;

    // Fetch the latest quantity from DB
    const { data, error } = await supabase
      .from('products')
      .select('quantity')
      .eq('id', item.id)
      .single();

    if (error) {
      console.error('Error fetching quantity:', error);
      return;
    }

    if (newQty <= data.quantity) {
      updateQuantity(item.id, newQty);
    } else {
      alert(`Only ${data.quantity} items are available.`);
    }
  };

  return (
    <div className="p-10">
      <h1 className="text-3xl font-bold mb-4">Your Cart</h1>
      {cartItems.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <ul className="space-y-4">
          {cartItems.map((item) => (
            <li key={item.id} className="flex items-center justify-between bg-white shadow p-4 rounded">
              <div>
                <h2 className="text-xl font-semibold">{item.name}</h2>
                <p>Price: ₹{item.price}</p>
                <div className="flex items-center mt-2">
                  <label htmlFor={`quantity-${item.id}`} className="mr-2 font-semibold">
                    Qty:
                  </label>
                  <input
                    id={`quantity-${item.id}`}
                    type="number"
                    value={item.qty}
                    min={1}
                    className="w-16 border rounded px-2 py-1"
                    onChange={(e) => handleQuantityChange(item, parseInt(e.target.value))}
                  />
                </div>
              </div>
              <button
                onClick={() => removeFromCart(item.id)}
                className="text-red-600 hover:text-red-800 font-bold"
              >
                Remove
              </button>
            </li>
          ))}
        </ul>
      )}

      {cartItems.length > 0 && (
        <div className="text-right mt-6">
          <a
            href="/transaction"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-6 rounded"
          >
            Buy Now
          </a>
        </div>
      )}
    </div>
  );
};

export default Cart;
