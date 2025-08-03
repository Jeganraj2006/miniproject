import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FaCartShopping } from 'react-icons/fa6';
import { useCart } from '../context/CartContext';

const RentalList = () => {
  const [rentals, setRentals] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchRentals();
  }, [searchQuery]);

  const fetchRentals = async () => {
    try {
      let query = supabase
        .from('rentals')
        .select('id, name, rent_per_day, image'); // Adjusted for rentals

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      setRentals(data || []);
    } catch (error) {
      console.error('Error fetching rentals:', error.message);
    }
  };

  const handleAddToCart = (rentals) => {
    const cartItem = {
      ...rentals,
      table: 'rentals', // Mark as rental
    };
    addToCart(cartItem); // Add rental to cart
    console.log('Added to cart from table:', cartItem.table); // Logs 'rentals'
  };

  return (
    <div className="pt-10">
      {/* Search Bar */}
      <div className="mt-10 flex items-center border-2 border-emerald-600 rounded-xl px-4 py-2 max-w-md mx-auto mb-6">
        <svg width="19px" height="19px" viewBox="0 0 24 24" className="text-emerald-600 mr-2">
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5-3.365-7.5-7.5z" />
        </svg>
        <input
          type="search"
          placeholder="Search rentals..."
          className="w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Rental Cards */}
      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
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
                    <button onClick={() => handleAddToCart(rental)}>
                      <FaCartShopping size={22} />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 text-center">
                    <h1 className="text-xl font-semibold text-slate-700">{rental.name}</h1>
                    <h1>Price: ₹{rental.rent_per_day} /day</h1>
                    <h3 className="text-green-700 font-medium">
                      Available
                    </h3>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </section>
    </div>
  );
};

export default RentalList;
