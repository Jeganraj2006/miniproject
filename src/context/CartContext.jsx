// src/context/CartContext.jsx

import React, { createContext, useState, useContext } from 'react';

// Create CartContext
const CartContext = createContext();

// CartProvider component to wrap around your app
export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);

  // Add item to cart
  const addToCart = (rental) => {
    setCart((prevCart) => [...prevCart, rental]);
  };

  // Remove item from cart
  const removeFromCart = (id) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== id));
  };

  // Check if item is in cart
  const isInCart = (id) => cart.some((item) => item.id === id);

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, isInCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Custom hook to use cart context
export const useCart = () => {
  return useContext(CartContext);
};
