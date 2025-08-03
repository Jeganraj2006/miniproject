import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import { CartProvider } from './context/CartContext';
import GoogleTranslate from './utils/GoogleTranslate'; // ✅ Add this line

ReactDOM.createRoot(document.getElementById('root')).render(
    <CartProvider>
      <GoogleTranslate /> {/* ✅ Now it will work */}
      <App />
    </CartProvider>
);
