import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const ClientDashboard = () => {
  const [profile, setProfile] = useState(null);
  const [orders, setOrders] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [updatedData, setUpdatedData] = useState({ name: '', email: '' });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProfileAndOrders = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error('Error fetching user:', userError);
        setLoading(false);
        return;
      }

      const { data: profileData, error: profileError } = await supabase
        .from('profiles')
        .select('*')
        .eq('id', user.id)
        .single();

      if (profileError) {
        console.error('Error fetching profile:', profileError);
      } else {
        setProfile(profileData);
        setUpdatedData({ name: profileData.name, email: profileData.email });
      }

      const { data: ordersData, error: ordersError } = await supabase
        .from('orders')
        .select('*')
        .eq('client_id', user.id);

      if (ordersError) {
        console.error('Error fetching orders:', ordersError);
      } else {
        setOrders(ordersData);
      }

      setLoading(false);
    };

    fetchProfileAndOrders();
  }, []);

  const handleUpdate = async () => {
    if (!updatedData.name || !updatedData.email) {
      alert('Name and email are required.');
      return;
    }

    const { error } = await supabase
      .from('profiles')
      .update(updatedData)
      .eq('id', profile.id);

    if (error) {
      console.error('Error updating profile:', error);
    } else {
      setProfile({ ...profile, ...updatedData });
      setIsEditing(false);
    }
  };

  if (loading) return <div className="p-6">Loading client data...</div>;

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold mb-4">Welcome to Your Dashboard</h2>

      {profile ? (
        <div className="bg-white shadow-md rounded p-6">
          {isEditing ? (
            <div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Name</label>
                <input
                  type="text"
                  value={updatedData.name}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, name: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mb-4">
                <label className="block text-sm font-medium text-gray-700">Email</label>
                <input
                  type="email"
                  value={updatedData.email}
                  onChange={(e) =>
                    setUpdatedData({ ...updatedData, email: e.target.value })
                  }
                  className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <button
                onClick={handleUpdate}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Save
              </button>
              <button
                onClick={() => {
                  setIsEditing(false);
                  setUpdatedData({ name: profile.name, email: profile.email });
                }}
                className="ml-2 bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600"
              >
                Cancel
              </button>
            </div>
          ) : (
            <div>
              <p className="mb-2"><strong>ID:</strong> {profile.id}</p>
              <p className="mb-2"><strong>Name:</strong> {profile.name}</p>
              <p className="mb-4"><strong>Email:</strong> {profile.email}</p>
              <button
                onClick={() => setIsEditing(true)}
                className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                Edit Details
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>No profile data found.</p>
      )}

      <div className="mt-6">
        <h3 className="text-xl font-bold mb-4">Your Orders</h3>
        {orders.length > 0 ? (
          <ul className="bg-white shadow-md rounded p-6">
            {orders.map((order) => (
              <li key={order.id} className="mb-2 border-b pb-2">
                <p><strong>Order ID:</strong> {order.id}</p>
                <p><strong>Details:</strong> {order.details}</p>
                <p><strong>Status:</strong> {order.status}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>No orders found.</p>
        )}
      </div>
    </div>
  );
};

export default ClientDashboard;
