import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // adjust path as needed

const Navigation = () => {
  const [session, setSession] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get current session
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
    };

    getSession();

    // Listen for auth state changes
    const { data: listener } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => {
      listener?.subscription?.unsubscribe();
    };
  }, []);

  const handleLogout = async () => {
    await supabase.auth.signOut();
    setSession(null);
    navigate('/'); // redirect to homepage after logout
  };

  return (
    <div>
      <header>
        <div className="bg-green-600 text-white p-4 flex justify-around fixed w-full z-10">
          <h1 className="text-3xl font-bold text-center">Agrilink</h1>
          <Link to="/" className="text-white">Home</Link>
          <Link to="/products" className="text-white">Products</Link>
          <Link to="/rental" className="text-white">Rental</Link>

          {session && (
            <>
              <Link to="/cart" className="text-white">Cart</Link>
              <Link to="/transaction" className="text-white">Transaction</Link>
            </>
          )}

          {/* Show Login if not logged in, else show Logout */}
          {!session ? (
            <Link to="/login_options" className="text-white">Login</Link>
          ) : (
            <button onClick={handleLogout} className="text-white">Logout</button>
          )}
        </div>
      </header>
    </div>
  );
};

export default Navigation;
