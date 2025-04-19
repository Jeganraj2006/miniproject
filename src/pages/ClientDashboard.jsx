import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const ClientDashboard = () => {
  const [clientData, setClientData] = useState(null);

  useEffect(() => {
    const fetchClientData = async () => {
      const user = supabase.auth.user();

      if (user) {
        const { data, error } = await supabase
          .from('clients')
          .select('*')
          .eq('id', user.id)
          .single();

        if (error) console.error('Error fetching client data:', error);
        else setClientData(data);
      }
    };

    fetchClientData();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h2 className="text-2xl font-bold">Welcome to Your Dashboard</h2>
      {clientData ? (
        <div>
          <p>Name: {clientData.name}</p>
          <p>Email: {clientData.email}</p>
        </div>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default ClientDashboard;
