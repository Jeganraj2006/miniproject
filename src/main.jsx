// src/index.jsx

import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App';
import { CartProvider } from './context/CartContext';  // Import CartProvider

createRoot(document.getElementById('root')).render(
  <CartProvider>
    <App />
  </CartProvider>
);
