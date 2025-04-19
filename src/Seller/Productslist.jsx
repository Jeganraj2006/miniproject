import React, { useState, useEffect } from 'react';
import { IoMdAdd } from 'react-icons/io';
import { GrFormSubtract } from 'react-icons/gr';
import { FiSave } from 'react-icons/fi';
import { MdDelete } from 'react-icons/md'; // <-- delete icon
import { supabase } from '../../supabaseClient'; // adjust path if needed
import AddProductForm from './AddProductForm'; // adjust path if needed

const Products_list = () => {
  const [products, setProducts] = useState([]);

  // Fetch products
  const fetchProducts = async () => {
    const {
      data: { user },
    } = await supabase.auth.getUser();

    const { data, error } = await supabase
      .from('products')
      .select('*')
      .eq('created_by', user.id)
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

  const handleAdd = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: Number(product.price) + 10 } : product
    ));
  };

  const handleSubtract = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.price > 0
        ? { ...product, price: Number(product.price) - 10 }
        : product
    ));
  };

  const handleManualPriceChange = (id, value) => {
    const newPrice = Math.max(0, parseFloat(value) || 0);
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: newPrice } : product
    ));
  };

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
      fetchProducts();
    }
  };

  const handleDelete = async (id) => {
    const confirmDelete = window.confirm('Are you sure you want to delete this product?');
    if (!confirmDelete) return;

    const { error } = await supabase
      .from('products')
      .delete()
      .eq('id', id);

    if (error) {
      console.error('Delete error:', error.message);
      alert('Failed to delete product.');
    } else {
      alert('Product deleted.');
      fetchProducts();
    }
  };

  return (
    <div className="pt-10 px-10 bg-gray-50 min-h-screen">
      <AddProductForm onProductAdded={fetchProducts} />

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
                <IoMdAdd
                  className="border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-green-100"
                  onClick={() => handleAdd(product.id)}
                />
                <input
                  type="number"
                  value={product.price}
                  onChange={(e) => handleManualPriceChange(product.id, e.target.value)}
                  className="w-20 text-center border rounded-md p-1 text-gray-700"
                />
                <GrFormSubtract
                  className={`border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-red-100 ${
                    product.price <= 0 ? 'opacity-50 cursor-not-allowed' : ''
                  }`}
                  onClick={() => handleSubtract(product.id)}
                />
              </div>

              <div className="mt-4 flex gap-3 w-full">
                <button
                  onClick={() => handleSave(product.id)}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center justify-center gap-2"
                >
                  <FiSave /> Save
                </button>
                <button
                  onClick={() => handleDelete(product.id)}
                  className="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 flex items-center justify-center gap-2"
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

export default Products_list;
