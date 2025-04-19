import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    // Check if item already exists in cart
    const exists = cartItems.find(item => item.id === product.id);
    if (exists) {
      alert("Item already in cart!");
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      alert("Added to cart!");
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook
export const useCart = () => useContext(CartContext);
