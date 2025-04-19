import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient'; // Import the Supabase client
import { FaCartShopping } from 'react-icons/fa6';

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchRentals();
  }, [searchQuery]);

  const fetchRentals = async () => {
    setLoading(true);
    setError(null); // Reset error state
    try {
      let query = supabase
        .from('rentals')
        .select('id, name, rent_per_day, image') // Removed rating
        .eq('available', true); // Ensure available rentals only

      // Apply the search query filter if it's provided
      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;

      if (error) throw error;
      if (data) {
        setRentals(data);
      } else {
        setRentals([]);
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="pt-10">
      {/* Search Bar */}
      <div className="group mb-8">
        <input
          id="query"
          className="input"
          type="search"
          placeholder="Search rentals..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery state
        />
      </div>

      {/* Rental Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {loading && <p>Loading...</p>}
        {error && <p className="text-red-500">{error}</p>}
        {rentals.length === 0 && !loading && !error && (
          <p>No rentals available matching your search.</p>
        )}
        {rentals.map((rental) => (
          <div key={rental.id} className="w-full relative">
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img
                    src={rental.image}
                    alt={rental.name}
                    className="object-cover h-52 w-full rounded-xl"
                  />
                </div>
                <div className="card-back p-4 bg-white rounded-xl shadow-lg">
                  <div className="mb-2 text-black cart">
                    <FaCartShopping />
                  </div>
                  <div className="space-y-2 font-medium text-gray-800">
                    <h1>Price: ₹{rental.rent_per_day} /day</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-center">
              <h1 className="text-xl font-semibold text-slate-700">{rental.name}</h1>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default Rental;
