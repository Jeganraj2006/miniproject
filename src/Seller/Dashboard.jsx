import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const ClientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [orderCount, setOrderCount] = useState(0);
  const [rentalCount, setRentalCount] = useState(0);

  useEffect(() => {
    const fetchClientData = async () => {
      const { data: { user } } = await supabase.auth.getUser();

      if (user) {
        const userId = user.id;

        // Fetch profile
        const { data: profileData, error: profileError } = await supabase
          .from('profiles')
          .select('*')
          .eq('id', userId)
          .single();
        if (profileError) console.error('Profile error:', profileError);
        else setProfile(profileData);

        // Fetch order count
        const { count: orderCountData } = await supabase
          .from('orders')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', userId);
        setOrderCount(orderCountData || 0);

        // Fetch rental order count
        const { count: rentalCountData } = await supabase
          .from('rental_orders')
          .select('*', { count: 'exact', head: true })
          .eq('client_id', userId);
        setRentalCount(rentalCountData || 0);
      }
    };

    fetchClientData();
  }, []);

  return (
    <div className="min-h-screen flex pt-20">
      {/* Sidebar */}
      <aside className="w-1/4 bg-blue-800 text-white p-4">
        <div className="mb-8 text-center">
          <img
            src="https://via.placeholder.com/150"
            alt="Profile"
            className="rounded-full w-32 h-32 mx-auto"
          />
          <h2 className="text-2xl mt-4">Client Panel</h2>
        </div>
        <div>
          <h3 className="text-xl mb-2">Profile Info</h3>
          {profile ? (
            <ul>
              <li className="mb-2 font-bold">{profile.name}</li>
              <li className="text-sm">{profile.email}</li>
              <li className="text-sm capitalize">Role: {profile.role}</li>
            </ul>
          ) : (
            <p>Loading profile...</p>
          )}
        </div>
      </aside>

      {/* Main */}
      <main className="w-3/4 bg-gray-100 p-8">
        <h1 className="text-3xl mb-6">Client Dashboard</h1>
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl mb-2">Total Orders</h2>
            <p>{orderCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl mb-2">Rental Orders</h2>
            <p>{rentalCount}</p>
          </div>
          <div className="bg-white p-4 rounded shadow">
            <h2 className="text-xl mb-2">Total Spent</h2>
            <p>₹ Coming Soon</p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ClientDashboard;
