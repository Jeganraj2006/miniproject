import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { GrFormSubtract } from 'react-icons/gr';
import { FiSave } from 'react-icons/fi';
import { supabase } from '../../supabaseClient'; // adjust path if needed
import AddProductForm from './AddProductForm'; // adjust path if needed

const Products_list = () => {
  const [products, setProducts] = useState([]);

  // Fetch products from Supabase
  const fetchProducts = async () => {
    const { data, error } = await supabase
      .from('products')
      .select('*')
      .order('created_at', { ascending: false });

    if (error) {
      console.error('Error fetching products:', error.message);
    } else {
      setProducts(data);
    }
  };

  useEffect(() => {
    fetchProducts();
  }, []);

  // Increase price
  const handleAdd = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: product.price + 10 } : product
    ));
  };

  // Decrease price
  const handleSubtract = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.price > 0
        ? { ...product, price: product.price - 10 }
        : product
    ));
  };

  // Save price to Supabase
  const handleSave = async (id) => {
    const productToSave = products.find(p => p.id === id);
    const { error } = await supabase
      .from('products')
      .update({ price: productToSave.price })
      .eq('id', id);

    if (error) {
      console.error('Error saving product:', error.message);
      alert('Failed to update product.');
    } else {
      alert('Product updated!');
      fetchProducts(); // refresh list after saving
    }
  };

  // Update price manually
  const handleManualPriceChange = (id, value) => {
    const newPrice = Math.max(0, parseFloat(value) || 0);
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: newPrice } : product
    ));
  };

  return (
    <div className="pt-10 px-10 bg-gray-50 min-h-screen">
      {/* Add Product Form */}
      <AddProductForm onProductAdded={fetchProducts} />

      {/* Product Grid */}
      <section className="mt-10">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {products.map(product => (
            <div
              key={product.id}
              className="bg-white rounded-xl shadow-lg p-4 flex flex-col items-center hover:shadow-xl transition-shadow"
            >
              <img
                src={product.image}
                alt={product.name}
                className="object-cover h-40 w-full rounded-lg mb-4"
              />
              <h1 className="text-xl font-semibold text-slate-800">{product.name}</h1>
              <p className="text-gray-600">
                Quantity: {product.quantity} {product.unit}
              </p>

              <div className="flex items-center space-x-4 mt-2">
                {/* Add Button */}
                <IoMdAdd
                  className="border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-green-100"
                  onClick={() => handleAdd(product.id)}
                />

                {/* Editable Price Input */}
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleManualPriceChange(product.id, e.target.value)}
                  className="w-20 text-center border rounded-md p-1 text-gray-700"
                />

                {/* Subtract Button */}
                <GrFormSubtract
                  className={`border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-red-100 ${
                    product.price === 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleSubtract(product.id)}
                />
              </div>

              {/* Save Button */}
              <button
                onClick={() => handleSave(product.id)}
                className="mt-4 px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md flex items-center gap-2 hover:bg-blue-700 transition-all duration-200"
              >
                <FiSave /> Save Changes
              </button>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products_list;