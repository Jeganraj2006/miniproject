import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { useCart } from '../context/CartContext';  // Import useCart hook

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');

  // Access cart functions from CartContext
  const { cart, addToCart, removeFromCart, isInCart } = useCart();

  useEffect(() => {
    const fetchRentals = async () => {
      try {
        let { data, error } = await supabase
          .from('rentals')
          .select('id, name, rent_per_day, image')
          .eq('available', true);

        if (error) throw error;
        setRentals(data);
      } catch (error) {
        console.error('Error fetching rentals:', error.message);
      }
    };

    fetchRentals();
  }, []);

  const filteredRentals = rentals.filter((rental) =>
    rental.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="pt-10 px-4 sm:px-8 md:px-16">
      {/* Search Bar */}
      <div className="relative w-full max-w-md mx-auto mb-10">
        <input
          id="query"
          type="search"
          name="searchbar"
          placeholder="Search..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="w-full py-3 pl-12 pr-4 border border-gray-300 rounded-xl shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        />
      </div>

      {/* Rental List */}
      <section className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {filteredRentals.map((rental) => (
            <div key={rental.id} className="bg-white rounded-xl shadow-md p-4 flex flex-col justify-between h-96">
              <img
                src={rental.image}
                alt={rental.name}
                className="object-cover h-40 w-full rounded-lg"
              />
              <div className="mt-4 text-center">
                <h1 className="text-xl font-semibold text-slate-700">{rental.name}</h1>
                <h2 className="text-gray-600">Price: ₹{rental.rent_per_day}</h2>
                <h3 className="text-yellow-500">Rating: ⭐⭐⭐⭐☆</h3>
              </div>

              <div className="mt-4 flex justify-center">
                {isInCart(rental.id) ? (
                  <button
                    onClick={() => removeFromCart(rental.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Remove from Cart
                  </button>
                ) : (
                  <button
                    onClick={() => addToCart(rental)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded-lg shadow-md"
                  >
                    Add to Cart
                  </button>
                )}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cart Summary (Optional UI) */}
      <div className="mt-10 bg-gray-100 p-6 rounded-xl shadow-inner">
        <h2 className="text-2xl font-bold mb-4">🛒 Cart Summary</h2>
        {cart.length === 0 ? (
          <p className="text-gray-500">Your cart is empty.</p>
        ) : (
          <ul className="space-y-2">
            {cart.map((item) => (
              <li key={item.id} className="flex justify-between items-center">
                <span>{item.name}</span>
                <span className="text-gray-700 font-medium">₹{item.rent_per_day}</span>
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default Rental;
