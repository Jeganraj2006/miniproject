import React, { createContext, useContext, useState } from 'react';

const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (product) => {
    const existingItem = cartItems.find(item => item.id === product.id);

    if (existingItem) {
      if (existingItem.quantity < product.quantity) {
        setCartItems(prev =>
          prev.map(item =>
            item.id === product.id
              ? { ...item, quantity: item.quantity + 1 }
              : item
          )
        );
        alert('Increased quantity in cart!');
      } else {
        alert('Cannot add more. Reached available stock.');
      }
    } else {
      setCartItems([...cartItems, { ...product, quantity: 1 }]);
      alert('Added to cart!');
    }
  };

  const removeFromCart = (id) => {
    setCartItems(cartItems.filter(item => item.id !== id));
  };

  const updateQuantity = (id, newQty) => {
    setCartItems(prev =>
      prev.map(item =>
        item.id === id ? { ...item, quantity: newQty } : item
      )
    );
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity }}
    >
      {children}
    </CartContext.Provider>
  );
};

export const useCart = () => useContext(CartContext);
