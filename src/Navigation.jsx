import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { supabase } from '../supabaseClient'; // adjust path as needed

const Navigation = () => {
  const [session, setSession] = useState(null);
  const [role, setRole] = useState(null); // client or seller
  const navigate = useNavigate();

  useEffect(() => {
    const getSessionAndRole = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);

      if (session?.user?.id) {
        const userId = session.user.id;

        // Check if user is in 'clients'
        const { data: clientData } = await supabase
          .from('clients')
          .select('id')
          .eq('id', userId)
          .single();

        if (clientData) {
          setRole('client');
        } else {
          // Otherwise, check if user is a seller
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

  return (
    <div>
      <header>
        <div className="bg-green-600 text-white p-4 flex justify-around fixed w-full z-10">
          <h1 className="text-3xl font-bold text-center">Agrilink</h1>
          <Link to="/" className="text-white">Home</Link>
          <Link to="/products" className="text-white">Products</Link>
          <Link to="/rental" className="text-white">Rental</Link>

          {session && role === 'client' && (
            <>
              <Link to="/client-dashboard" className="text-white">Dashboard</Link>
              <Link to="/cart" className="text-white">Cart</Link>
              <Link to="/transaction" className="text-white">Transaction</Link>
            </>
          )}

          {session && role === 'seller' && (
            <>
              <Link to="/sDashboard" className="text-white">Dashboard</Link>
            </>
          )}

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
