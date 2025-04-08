import React, { useState } from 'react';
import wheet from '../Images/wheet.avif';
import dal from '../Images/dal.jpg';
import beens from '../Images/beens.jpg';
import coffee from '../Images/coffee_beens.jpg';
import lotus from '../Images/lotus_seeds.webp';
// import others as needed
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";

const Products_list = () => {
  const initialProducts = [
    { id: 1, name: "Wheet", price: 100, image: wheet },
    { id: 2, name: "Dal", price: 120, image: dal },
    { id: 3, name: "Beens", price: 90, image: beens },
    { id: 4, name: "Coffee Beens", price: 245, image: coffee },
    { id: 5, name: "Lotus Seeds", price: 160, image: lotus },
    // Add more products similarly
  ];

  const [products, setProducts] = useState(initialProducts);

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

  return (
    <div className='pt-30'>
      <section className='mt-10'>
        <div className='grid grid-cols-4 gap-5 items-center justify-center ml-15'>
          {products.map(product => (
            <div key={product.id} className='w-50 relative h-50'>
              <div className="card">
                <div className="card-inner">
                  <div className="card-front">
                    <img src={product.image} alt={product.name} className='object-cover h-50 w-60 rounded-xl' />
                  </div>
                  <div className="card-back">
                    <div className='mb-37 ml-2 text-black'>
                      <h1 className='border-2 w-15 h-9'>Edit</h1>
                    </div>
                    <div className='space-y-2 grid grid-cols-1 font-black text-gray-950 mr-8'>
                      <h1>calories:</h1>
                      <h1>Description:</h1>
                    </div>
                  </div>
                </div>
              </div>
              <div className='justify-center space-y-2'>
                <h1 className="text-2xl font-semibold text-slate-700 ">{product.name}</h1>
                <div className='flex space-x-6 items-center'>
                  <IoMdAdd className='border-2 w-6 h-6 cursor-pointer' onClick={() => handleAdd(product.id)} />
                  <h1>Price: ₹{product.price}</h1>
                  <GrFormSubtract className='border-2 w-6 h-6 cursor-pointer' onClick={() => handleSubtract(product.id)} />
                </div>
                <h3>Save Changes</h3>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
};

export default Products_list;
