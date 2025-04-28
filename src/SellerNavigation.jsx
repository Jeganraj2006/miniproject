import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const Seller_navigation = () => {
  const [isTamil, setIsTamil] = useState(false);
  const [translatedLabels, setTranslatedLabels] = useState({});
  
  const labels = {
    dashboard: 'Dashboard',
    products_list: 'Products List',
    rental_list: 'Rental List',
    orders_history: 'Orders History',
    orders: 'Orders',
    agrilink: 'Agrilink',
  };

  // Replace with your actual API key or use your backend
  const API_KEY = 'YOUR_GOOGLE_TRANSLATE_API_KEY';

  const translateLabels = async () => {
    const targetLang = isTamil ? 'en' : 'ta';

    try {
      const translated = {};
      for (const key in labels) {
        const res = await axios.post(
          `https://translation.googleapis.com/language/translate/v2`,
          null,
          {
            params: {
              q: labels[key],
              target: targetLang,
              key: API_KEY,
            },
          }
        );
        translated[key] = res.data.data.translations[0].translatedText;
      }
      setTranslatedLabels(translated);
      setIsTamil(!isTamil);
    } catch (err) {
      console.error('Translation failed:', err.message);
    }
  };

  const display = translatedLabels.dashboard ? translatedLabels : labels;

  return (
    <div>
      <header>
        <div className="bg-green-600 text-white p-4 flex justify-between fixed w-full z-10 items-center">
          <h1 className="text-2xl font-bold">{display.agrilink}</h1>
            <Link to="/sDashboard" className="text-white">{display.dashboard}</Link>
            <Link to="/sproducts" className="text-white">{display.products_list}</Link>
            <Link to="/srental" className="text-white">{display.rental_list}</Link>
            <Link to="/sorders_history" className="text-white">{display.orders_history}</Link>
            <Link to="/sOrders" className="text-white">{display.orders}</Link>

            {/* Translate Button */}
            <button
              onClick={translateLabels}
              className="ml-2 px-3 py-1 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
            >
              {isTamil ? 'English' : 'தமிழ்'}
            </button>
        </div>
      </header>
    </div>
  );
};

export default Seller_navigation;
