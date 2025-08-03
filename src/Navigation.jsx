import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient';
import axios from 'axios';

const Navigation = () => {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null); // client or seller
  const [translatedLabels, setTranslatedLabels] = useState({});
  const [isTamil, setIsTamil] = useState(false);

  const navigate = useNavigate();

  const labels = {
    home: 'Home',
    products: 'Products',
    rental: 'Rental',
    dashboard: 'Dashboard',
    cart: 'Cart',
    transaction: 'Transaction',
    login: 'Login',
    logout: 'Logout',
    agrilink: 'Agrilink',
  };

  // Replace with your actual API key or move to a backend for security
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
      changeLanguageTo(targetLang); // Change the language of the page
    } catch (err) {
      console.error('Translation failed:', err.message);
    }
  };

  const changeLanguageTo = (langCode) => {
    const select = document.querySelector(".goog-te-combo");
    if (select) {
      select.value = langCode;
      select.dispatchEvent(new Event("change"));
    }
  };

  useEffect(() => {
    const getSessionAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.id) {
        const userId = session.user.id;

        const { data: clientData } = await supabase
          .from('clients')
          .select('id')
          .eq('id', userId)
          .single();

        if (clientData) {
          setRole('client');
        } else {
          const { data: sellerData } = await supabase
            .from('sellers')
            .select('id')
            .eq('id', userId)
            .single();

          if (sellerData) {
            setRole('seller');
          }
        }
      }
    };

    getSessionAndRole();

    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
      getSessionAndRole();
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    setRole(null);
    navigate('/');
  };

  const display = translatedLabels.home ? translatedLabels : labels;

  return (
    <header>
      <div className="bg-green-600 text-white p-4 flex flex-wrap justify-between fixed w-full z-10 items-center">
        <h1 className="text-2xl font-bold">{display.agrilink}</h1>
        <Link to="/" className="text-white">{display.home}</Link>
        <Link to="/products" className="text-white">{display.products}</Link>
        <Link to="/rental" className="text-white">{display.rental}</Link>

        {session && role === 'client' && (
          <>
            <Link to="/client-dashboard" className="text-white">{display.dashboard}</Link>
            <Link to="/cart" className="text-white">{display.cart}</Link>
            <Link to="/transaction" className="text-white">{display.transaction}</Link>
          </>
        )}

        {session && role === 'seller' && (
          <Link to="/sDashboard" className="text-white">{display.dashboard}</Link>
        )}

        {!session ? (
          <Link to="/login_options" className="text-white">{display.login}</Link>
        ) : (
          <button onClick={handleLogout} className="text-white">{display.logout}</button>
        )}

        {/* Translate Button */}
        <button
            onClick={translateLabels}
            className="ml-2 px-3 py-1 bg-yellow-400 text-black font-medium rounded hover:bg-yellow-500 transition"
          >
            
          </button>
      </div>
    </header>
  );
};

export default Navigation;
