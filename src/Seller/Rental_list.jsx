import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { GrFormSubtract } from 'react-icons/gr';
import { FiSave } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md';
import { supabase } from '../../supabaseClient';
import AddRentalForm from './AddRentalForm';

const Rental_list = () => {
  const [rentals, setRentals] = useState([]);
  const [userId, setUserId] = useState(null);

  // Fetch current user and their rentals
  const fetchRentals = async () => {
    const {
      data: { user },
      error: userError,
    } = await supabase.auth.getUser();

    if (userError || !user) {
      console.error('Failed to fetch user:', userError?.message);
      return;
    }

    setUserId(user.id);

    const { data, error } = await supabase
      .from('rentals')
      .select('*')
      .eq('seller_id', user.id)
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching rentals:', error.message);
    } else {
      setRentals(data);
    }
  };

  useEffect(() => {
    fetchRentals();
  }, []);

  const handleAdd = (id) => {
    setRentals(rentals.map(rental =>
      rental.id === id ? { ...rental, rent_per_day: rental.rent_per_day + 10 } : rental
    ));
  };

  const handleSubtract = (id) => {
    setRentals(rentals.map(rental =>
      rental.id === id && rental.rent_per_day > 0
        ? { ...rental, rent_per_day: rental.rent_per_day - 10 }
        : rental
    ));
  };

  const handleManualChange = (id, value) => {
    const newPrice = Math.max(0, parseFloat(value) || 0);
    setRentals(rentals.map(rental =>
      rental.id === id ? { ...rental, rent_per_day: newPrice } : rental
    ));
  };

  const handleSave = async (id) => {
    const rentalToSave = rentals.find(r => r.id === id);
    const { error } = await supabase
      .from('rentals')
      .update({ rent_per_day: rentalToSave.rent_per_day })
      .eq('id', id);

    if (error) {
      console.error('Error saving rental:', error.message);
      alert('Failed to update rental.');
    } else {
      alert('Rental updated!');
      fetchRentals();
    }
  };

  const handleDelete = async (id) => {
    if (!id) {
      console.error('Invalid ID, cannot delete.');
      return;
    }

    const confirmDelete = window.confirm('Are you sure you want to delete this rental?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('rentals')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error.message);
      alert('Failed to delete rental.');
    } else {
      alert('Rental deleted successfully!');
      fetchRentals();
    }
  };

  return (
    <div className="pt-20 px-10 bg-gray-50 min-h-screen">
      {/* ✅ Add Rental Form with seller_id */}
      {userId && <AddRentalForm onRentalAdded={fetchRentals} sellerId={userId} />}

      <section className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {rentals.map(rental => (
            <div
              key={rental.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              <img
                src={rental.image}
                alt={rental.name}
                className="object-cover h-40 w-full rounded-lg mb-4"
              />
              <h1 className="text-xl font-semibold text-slate-800">{rental.name}</h1>
              <p className="text-gray-600">{rental.description}</p>

              <div className="flex items-center space-x-4 mt-2">
                <IoMdAdd
                  className="border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-green-100"
                  onClick={() => handleAdd(rental.id)}
                />

                <input
                  type="number"
                  value={rental.rent_per_day}
                  onChange={(e) => handleManualChange(rental.id, e.target.value)}
                  className="w-20 text-center border rounded-md p-1 text-gray-700"
                />

                <GrFormSubtract
                  className={`border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-red-100 ${
                    rental.rent_per_day === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleSubtract(rental.id)}
                />
              </div>

              <div className="flex space-x-4 mt-4">
                <button
                  onClick={() => handleSave(rental.id)}
                  className="px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-700 transition-all duration-200"
                >
                  <FiSave /> Save
                </button>

                <button
                  onClick={() => handleDelete(rental.id)}
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-red-700 transition-all duration-200"
                >
                  <MdDelete /> Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Rental_list;
