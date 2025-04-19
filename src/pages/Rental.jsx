import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient' // Import the Supabase client

const Rental = () => {
  const [rentals, setRentals] = useState([])

  // Fetch rentals from Supabase
  useEffect(() => {
    const fetchRentals = async () => {
      try {
        let { data, error } = await supabase
          .from('rentals')
          .select('id, name, rent_per_day, image') // Select relevant fields
          .eq('available', true) // Optional: filter available rentals

        if (error) throw error

        setRentals(data) // Set the rentals data to state
      } catch (error) {
        console.error('Error fetching rentals:', error.message)
      }
    }

    fetchRentals()
  }, []) // Empty dependency array means this runs once when the component mounts

  return (
    <div>
      <div className='pt-30'>
        <div className="group">
          <svg viewBox="0 0 24 24" aria-hidden="true" className="search-icon">
            <g>
              <path
                d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
              ></path>
            </g>
          </svg>
          <input
            id="query"
            className="input"
            type="search"
            placeholder="Search..."
            name="searchbar"
          />
        </div>

        <section className='mt-10'>
          <div className='grid grid-cols-4 gap-5 space-y-20 items-center justify-center ml-15'>
            {rentals.map((rental) => (
              <div key={rental.id} className='w-50 relative h-50 rent_list'>
                <img
                  src={rental.image}
                  alt={rental.name}
                  className='object-cover h-50 w-60 rounded-xl'
                />
                <div className='justify-center'>
                  <h1 className="text-2xl font-semibold text-slate-700">{rental.name}</h1>
                  <h1>Price: ₹{rental.rent_per_day}</h1>
                  <h3>Rating: {/* Add rating logic here */}</h3>
                </div>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  )
}

export default Rental
