import React, { useState } from 'react';
import { supabase } from '../../supabaseClient';

const AddRental = ({ onRentalAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    rent_per_day: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const ensureSellerExists = async (userId) => {
    const { data, error } = await supabase
      .from('sellers')
      .select('id')
      .eq('id', userId)
      .single();

    if (error && error.code === 'PGRST116') {
      const { error: insertError } = await supabase
        .from('sellers')
        .insert({ id: userId });

      if (insertError) {
        console.error('Failed to create seller:', insertError.message);
        alert('Failed to register as a seller.');
        return false;
      }
    }

    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
      error: authError
    } = await supabase.auth.getUser();

    if (authError || !user) {
      alert("User not authenticated.");
      return;
    }

    const sellerReady = await ensureSellerExists(user.id);
    if (!sellerReady) return;

    const { name, description, rent_per_day, image } = formData;

    const { error } = await supabase.from('rentals').insert([
      {
        name,
        description,
        rent_per_day: parseFloat(rent_per_day),
        image,
        seller_id: user.id,
        available: true,
      },
    ]);

    if (error) {
      console.error('Error adding rental:', error.message);
      alert("Failed to add rental.");
    } else {
      alert("Rental added!");
      setFormData({ name: '', description: '', rent_per_day: '', image: '' });
      onRentalAdded(); // Refresh list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-8 max-w-xl mx-auto">
      <h2 className="text-2xl font-bold mb-4 text-center">Add New Rental</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Rental Name" className="input mb-3 w-full" required />
      <input type="text" name="description" value={formData.description} onChange={handleChange} placeholder="Description" className="input mb-3 w-full" />
      <input type="number" name="rent_per_day" value={formData.rent_per_day} onChange={handleChange} placeholder="Rent per day" className="input mb-3 w-full" required />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="input mb-3 w-full" required />
      <button type="submit" className="w-full py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700">Add Rental</button>
    </form>
  );
};

export default AddRental;
