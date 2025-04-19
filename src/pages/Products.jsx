import React, { useEffect, useState } from 'react'
import { supabase } from '../../supabaseClient'
import { FaCartShopping } from "react-icons/fa6"

const Products = () => {
  const [products, setProducts] = useState([])

  useEffect(() => {
    fetchProducts()
  }, [])

  const fetchProducts = async () => {
    const { data, error } = await supabase.from('products').select('*')
    if (error) {
      console.error('Error fetching products:', error)
    } else {
      setProducts(data)
    }
  }

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

      {/* Product Cards */}
      <section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 px-6">
        {products.map(product => (
          <div key={product.id} className="w-full relative">
            <div className="card">
              <div className="card-inner">
                <div className="card-front">
                  <img
                    src={product.image_url}
                    alt={product.name}
                    className="object-cover h-52 w-full rounded-xl"
                  />
                </div>
                <div className="card-back p-4 bg-white rounded-xl shadow-lg">
                  <div className="mb-2 text-black cart">
                    <FaCartShopping />
                  </div>
                  <div className="space-y-2 font-medium text-gray-800">
                    <h1>Calories: {product.calories || 'N/A'}</h1>
                    <h1>Description: {product.description || 'No info'}</h1>
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-3 space-y-1 text-center">
              <h1 className="text-xl font-semibold text-slate-700">{product.name}</h1>
              <h1>Price: ₹{product.price} /kg</h1>
              <h3>Rating: {product.rating || '4.5 ⭐'}</h3>
            </div>
          </div>
        ))}
      </section>
    </div>
  )
}

export default Products
