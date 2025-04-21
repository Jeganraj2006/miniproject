import React, { useContext, useState } from 'react';
import { FaTrashAlt } from 'react-icons/fa';
import { useCart } from '../context/CartContext';
import { supabase } from '../../supabaseClient';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cartItems, removeFromCart, clearCart, updateQuantity } = useCart();
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleQuantityChange = async (itemId, newQuantity) => {
    try {
      const item = cartItems.find(item => item.id === itemId);
      if (item) {
        const { data, error } = await supabase
          .from(item.table) // dynamic table based on item
          .select('quantity')
          .eq('id', item.id)
          .single();

        if (error) {
          console.error('Error fetching product data:', error);
          return;
        }

        const availableStock = data?.quantity || 0;

        if (newQuantity > availableStock) {
          setErrorMessage(`Cannot add more. Reached available stock of ${availableStock}.`);
          newQuantity = availableStock;
        }

        updateQuantity(itemId, Math.max(1, newQuantity));
      }
    } catch (err) {
      console.error('Error checking stock availability:', err);
    }
  };

  const handleSingleBuyNow = (item) => {
    const isProduct = item.price !== undefined;

    const singleItem = {
      ...item,
      table: isProduct ? 'products' : 'rentals',
      product_id: isProduct ? item.id : undefined,
      rental_id: !isProduct ? item.id : undefined,
      selectedQuantity: item.quantity || 1,
    };

    navigate('/transaction', { state: { cartItems: [singleItem] } });
  };

  const handleBuyNowAll = () => {
    if (cartItems.length === 0) {
      setErrorMessage("Your cart is empty. Please add some items to proceed.");
      return;
    }

    // Ensure each item in the cart has the correct 'table' field set
    const updatedCartItems = cartItems.map(item => {
      const isProduct = item.price !== undefined;
      return {
        ...item,
        table: isProduct ? 'products' : 'rentals',  // Assign the correct table name
        product_id: isProduct ? item.id : undefined,
        rental_id: !isProduct ? item.id : undefined,
        selectedQuantity: item.quantity || 1,
      };
    });

    navigate('/transaction', { state: { cartItems: updatedCartItems } });
  };

  return (
    <div className="pt-10">
      <h1 className="text-2xl font-semibold text-slate-700 mb-4">Your Cart</h1>

      {cartItems.length === 0 ? (
        <div className="text-center text-xl">Your cart is empty</div>
      ) : (
        <div>
          <div className="space-y-6">
            {cartItems.map((item) => (
              <div key={item.id} className="flex justify-between items-center border-b pb-4">
                <div className="flex items-center">
                  <img
                    src={item.image}
                    alt={item.name}
                    className="w-20 h-20 object-cover rounded-xl mr-4"
                  />
                  <div>
                    <h2 className="text-xl font-semibold text-slate-700">{item.name}</h2>
                    <p className="text-sm text-gray-500">From Table: {item.table}</p>
                    <p className="text-sm text-gray-700">Price: ₹{item.price}</p>
                  </div>
                </div>

                <div className="flex items-center">
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-l-lg"
                    onClick={() =>
                      handleQuantityChange(item.id, Math.max(1, item.quantity - 1))
                    }
                  >
                    -
                  </button>
                  <input
                    type="number"
                    value={item.quantity}
                    min="1"
                    className="w-12 text-center"
                    onChange={(e) =>
                      handleQuantityChange(item.id, Math.max(1, Number(e.target.value)))
                    }
                  />
                  <button
                    className="bg-gray-200 px-2 py-1 rounded-r-lg"
                    onClick={() => handleQuantityChange(item.id, item.quantity + 1)}
                  >
                    +
                  </button>
                </div>

                <div className="flex items-center space-x-2 ml-4">
                  <button
                    className="text-red-500"
                    onClick={() => removeFromCart(item.id)}
                  >
                    <FaTrashAlt size={20} />
                  </button>

                  <button
                    className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                    onClick={() => handleSingleBuyNow(item)}
                  >
                    Buy Now
                  </button>
                </div>
              </div>
            ))}
          </div>

          {errorMessage && (
            <div className="text-red-500 mt-4 text-center">
              {errorMessage}
            </div>
          )}

          <div className="mt-8 flex justify-between items-center">
            <div>
              <button
                className="text-emerald-600 font-semibold text-lg"
                onClick={clearCart}
              >
                Clear Cart
              </button>
            </div>
            <div className="text-xl font-semibold">
              Total: ₹{cartItems.reduce((total, item) => total + item.price * item.quantity, 0)}
            </div>
          </div>

          <div className="mt-4">
            <button
              className="bg-blue-500 text-white py-2 px-6 rounded-lg"
              onClick={handleBuyNowAll}
            >
              Buy All
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default Cart;
