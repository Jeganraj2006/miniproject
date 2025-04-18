import React, { useState } from 'react';
import { supabase } from '../../supabaseClient'; // adjust the path if needed

const AddProductForm = ({ onProductAdded }) => {
  const [formData, setFormData] = useState({
    name: '',
    price: '',
    quantity: '',
    unit: '',
    image: ''
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const {
      data: { user },
    } = await supabase.auth.getUser(); // Get current logged in user

    const { name, price, quantity, unit, image } = formData;

    const { error } = await supabase.from('products').insert([
      {
        name,
        price: parseFloat(price),
        quantity: parseInt(quantity),
        unit,
        image,
        created_by: user.id,
      },
    ]);

    if (error) {
      console.error('Error adding product:', error.message);
      alert("Failed to add product.");
    } else {
      alert("Product added successfully!");
      setFormData({ name: '', price: '', quantity: '', unit: '', image: '' });
      onProductAdded(); // Refresh product list
    }
  };

  return (
    <form onSubmit={handleSubmit} className="bg-white p-6 rounded-lg shadow-md mb-6 max-w-lg">
      <h2 className="text-2xl font-bold mb-4">Add New Product</h2>
      <input type="text" name="name" value={formData.name} onChange={handleChange} placeholder="Product Name" className="input" required />
      <input type="number" name="price" value={formData.price} onChange={handleChange} placeholder="Price" className="input" required />
      <input type="number" name="quantity" value={formData.quantity} onChange={handleChange} placeholder="Quantity" className="input" required />
      <input type="text" name="unit" value={formData.unit} onChange={handleChange} placeholder="Unit (kg, pcs)" className="input" required />
      <input type="text" name="image" value={formData.image} onChange={handleChange} placeholder="Image URL" className="input" required />
      <button type="submit" className="mt-4 px-4 py-2 bg-green-600 text-white font-semibold rounded hover:bg-green-700">Add Product</button>
    </form>
  );
};

export default AddProductForm;