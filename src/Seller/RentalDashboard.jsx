import React, { useState, useEffect } from 'react';
import AddRentalForm from './AddRentalForm';
import RentalList from './RentalList';
import { supabase } from '../../supabaseClient';

const RentalDashboard = () => {
  const [rentals, setRentals] = useState([]);

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const { data, error } = await supabase.from('rentals').select('*');

    if (error) {
      console.error('Error fetching rentals:', error.message);
    } else {
      setRentals(data);
    }
  };

  const handleRentalAdded = (newRental) => {
    setRentals((prevRentals) => [...prevRentals, newRental]);
  };

  return (
    <div className="container mx-auto p-4">
      <AddRentalForm onRentalAdded={handleRentalAdded} />
      <RentalList rentals={rentals} />
    </div>
  );
};

export default RentalDashboard;
