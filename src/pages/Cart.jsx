import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useCart } from '../context/CartContext';

const Cart = () => {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity } = useCart();

  const handleIncreaseQuantity = (item) => {
    const availableQuantity = item.quantity || 0;
    const cartQty = item.selectedQuantity || 1;

    if (cartQty < availableQuantity) {
      updateQuantity(item.id, cartQty + 1, item.table);
    } else {
      alert(`Only ${availableQuantity} items are available.`);
    }
  };

  const handleDecreaseQuantity = (item) => {
    const cartQty = item.selectedQuantity || 1;

    if (cartQty > 1) {
      updateQuantity(item.id, cartQty - 1, item.table);
    }
  };

  const handleBuyNow = () => {
    const selectedItems = cartItems.map(item => ({
      ...item,
      selectedQuantity: item.selectedQuantity || 1,
      table: item.table, // important to pass this for processing in Transaction
    }));

    navigate('/transaction', { state: { cartItems: selectedItems } });
  };

  return (
    <div className="p-4">
      <h2 className="text-2xl font-bold mb-4">Your Cart</h2>

      {cartItems.map(item => (
        <div key={item.id} className="border-b py-3">
          <h4 className="text-lg font-semibold">{item.name}</h4>
          <p>Price: ₹{item.price || item.rent_per_day}</p>
          <p className="text-sm text-gray-600">
            From: {item.table === 'products' ? 'Product Table' : 'Rental Table'}
          </p>

          {/* Quantity Controls */}
          <div className="flex items-center mt-2">
            <button
              onClick={() => handleDecreaseQuantity(item)}
              className="bg-gray-300 p-2 rounded-l"
            >
              -
            </button>
            <p className="px-4">{item.selectedQuantity || 1}</p>
            <button
              onClick={() => handleIncreaseQuantity(item)}
              className="bg-gray-300 p-2 rounded-r"
            >
              +
            </button>
          </div>

          <button
            onClick={() => removeFromCart(item.id)}
            className="mt-2 text-red-600 underline"
          >
            Remove
          </button>
        </div>
      ))}

      <button
        onClick={handleBuyNow}
        className="mt-6 bg-green-600 text-white px-6 py-2 rounded-lg"
      >
        Buy Now
      </button>
    </div>
  );
};

export default Cart;
