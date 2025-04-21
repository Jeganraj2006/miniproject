import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import { FaCartShopping } from 'react-icons/fa6';
import { useCart } from '../context/CartContext';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const { addToCart } = useCart();

  useEffect(() => {
    fetchProducts();
  }, [searchQuery]);

  const fetchProducts = async () => {
    try {
      let query = supabase
        .from('products')
        .select('id, name, price, quantity, image'); // rating removed

      if (searchQuery) {
        query = query.ilike('name', `%${searchQuery}%`);
      }

      const { data, error } = await query;
      if (error) throw error;

      setProducts(data || []);
    } catch (error) {
      console.error('Error fetching products:', error.message);
    }
  };

  return (
    <div className="pt-10">
      {/* Search Bar */}
      <div className="mt-10 flex items-center border-2 border-emerald-600 rounded-xl px-4 py-2 max-w-md mx-auto mb-6">
        <svg width="19px" height="19px" viewBox="0 0 24 24" className="text-emerald-600 mr-2">
          <path d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 
            4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22
            c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 
            7.5-3.365 7.5-7.5-3.365-7.5-7.5z" />
        </svg>
        <input
          type="search"
          placeholder="Search products..."
          className="w-full focus:outline-none"
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>

      {/* Product Cards */}
      <section className="mb-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {products.map(product => (
          <div key={product.id} className="w-full relative">
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img
                    src={product.image}
                    alt={product.name}
                    className="object-cover h-52 w-full rounded-xl"
                  />
                </div>
                <div className="card-back p-4 bg-white rounded-xl shadow-lg">
                  <div className="mb-2 text-black cart">
                    <button onClick={() => addToCart(product)}>
                      <FaCartShopping size={22} />
                    </button>
                  </div>
                  <div className="mt-3 space-y-1 text-center">
                    <h1 className="text-xl font-semibold text-slate-700">{product.name}</h1>
                    <h1>Price: ₹{product.price} /kg</h1>
                    <h3 className="text-green-700 font-medium">
                      Available: {product.quantity} kg
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

export default Products;
