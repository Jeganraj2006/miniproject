import React, { useState } from 'react';
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { FiSave } from "react-icons/fi";
import data from "../assets/products.json";

const Products_list = () => {
  const [products, setProducts] = useState(data);

  const handleAdd = (id) => {
    setProducts(products.map(product =>
      product.id === id ? { ...product, price: product.price + 10 } : product
    ));
  };

  const handleSubtract = (id) => {
    setProducts(products.map(product =>
      product.id === id && product.price > 0
        ? { ...product, price: product.price - 10 }
        : product
    ));
  };

  const handleSave = (id) => {
    const savedProduct = products.find(p => p.id === id);
    console.log("Saving product:", savedProduct);
    // You can integrate Supabase or API call here
  };

  return (
    <div className="pt-10 px-10 bg-gray-50 min-h-screen">
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
              <p className="text-gray-600">Quantity: {product.quantity} {product.unit}</p>

              <div className="flex items-center space-x-4 mt-2">
                <IoMdAdd
                  className="border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-green-100"
                  onClick={() => handleAdd(product.id)}
                />
                <h2 className="text-md font-medium text-gray-700">₹{product.price}</h2>
                <GrFormSubtract
                  className={`border-2 rounded-full p-1 w-7 h-7 cursor-pointer hover:bg-red-100 ${product.price === 0 ? 'opacity-50 cursor-not-allowed' : ''}`}
                  onClick={() => handleSubtract(product.id)}
                />
              </div>

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
