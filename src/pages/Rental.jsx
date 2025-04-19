import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FaCartShopping } from "react-icons/fa6";
import { useCart } from '../context/CartContext'; // Import Cart hook

const Rental = () => {
  const [rentals, setRentals] = useState([]);
  const { addToCart } = useCart(); // Use cart context

  useEffect(() => {
    fetchRentals();
  }, []);

  const fetchRentals = async () => {
    const { data, error } = await supabase.from('rentals').select('*').eq('available', true);
    if (error) {
      console.error('Error fetching rentals:', error);
    } else {
      setRentals(data);
    }
  };

  const handleAddToCart = (rental) => {
    // Create the rental item to be added to the cart
    const rentalItem = {
      id: rental.id,
      name: rental.name,
      rent_per_day: rental.rent_per_day,
      image: rental.image,
      description: rental.description,
      price: rental.rent_per_day,  // Add the rent price
    };

    // Add to cart
    addToCart(rentalItem);
  };

  return (
    <div className="pt-10">
      {/* Search Bar */}
      <div className="group mb-8">
        <input
          id="query"
          className="input"
          type="search"
          placeholder="Search..."
          name="searchbar"
        />
      </div>

      {/* Rental Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
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
                    <h3>Rating: {rental.rating || '4.5 ⭐'}</h3>
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

export default Rental;
