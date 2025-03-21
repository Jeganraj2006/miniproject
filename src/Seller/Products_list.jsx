import React from 'react'
import wheet from '../Images/wheet.avif'
import dal from '../Images/dal.jpg'
import beens from '../Images/beens.jpg'
import coffee from '../Images/coffee_beens.jpg'
import lotus from '../Images/lotus_seeds.webp'
import chia from '../Images/chia_seeds.avif'
import sunflower from '../Images/sunflower_seeds.jpg'
import pumpkin from '../Images/pumpkin_seeds.jpg'
import millet from '../Images/millet.webp'
import paddy from '../Images/paddy.jpg'
import radish from '../Images/red_radish_seeds.webp'
import ragi from '../Images/ragi.jpg'
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";





const Products_list = () => {
  return (
    <div>
      <div className='pt-30'>
<div class="group">
  <svg viewBox="0 0 24 24" aria-hidden="true" class="search-icon">
    <g>
      <path
        d="M21.53 20.47l-3.66-3.66C19.195 15.24 20 13.214 20 11c0-4.97-4.03-9-9-9s-9 4.03-9 9 4.03 9 9 9c2.215 0 4.24-.804 5.808-2.13l3.66 3.66c.147.146.34.22.53.22s.385-.073.53-.22c.295-.293.295-.767.002-1.06zM3.5 11c0-4.135 3.365-7.5 7.5-7.5s7.5 3.365 7.5 7.5-3.365 7.5-7.5 7.5-7.5-3.365-7.5-7.5z"
      ></path>
    </g>
  </svg>

  <input
    id="query"
    class="input"
    type="search"
    placeholder="Search..."
    name="searchbar"
  />
</div>
      <section className='mt-10'>
        <div className='grid grid-cols-4 gap-5 space-y-30 items-center justify-center ml-15'>
          <div className=' w-50 relative h-50'>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
              <img src={wheet} alt="" className='object-cover h-50 w-60 rounded-xl'/>
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
          <div className='justify-center  space-y-2'>
              <h1 className="text-2xl font-semibold text-slate-700 ">Wheet</h1>
              <div className='space-y-2'>
              <div className='flex space-x-6'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1 >Price:₹100</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
              <h3>Save Changes</h3>
              </div>
            </div>
          </div>
          <div className=' w-50 relative h-50 '>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
              <img src={dal} alt="" className='object-cover h-50 w-50 rounded-xl'/>
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
              <h1 className="text-2xl font-semibold text-slate-700 ">Dal</h1>
              <div className='flex space-x-6'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Price:₹120</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
              <h3>Save Changes</h3>
            </div>
          </div>
          <div className=' w-50 relative h-50 '>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
              <img src={beens} alt="" className='object-cover h-50 w-50 rounded-xl'/>
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
            <div className='justify-center space-y-2 '>
              <h1 className="text-2xl font-semibold text-slate-700 ">Beens</h1>
              <div className='flex space-x-6'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Price : ₹90</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
              <h3>Save Changes</h3>
            </div>
          </div>
          <div className=' w-50 relative h-50 '>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
              <img src={coffee} alt="" className='object-cover h-50 w-50 rounded-xl'/>
              </div>
              <div className="card-back">
                <div className='mb-37 text-black'>
                    <h1 className='border-2 w-15 h-9 '>Edit</h1>
                </div>
                <div className='space-y-2 grid grid-cols-1 font-black text-gray-950 mr-8'>
                <h1>calories:</h1>
                <h1>Description:</h1>
                </div>
              </div>
            </div>
          </div>    
            <div className='justify-center space-y-2'>
              <h1 className="text-2xl font-semibold text-slate-700 ">Coffee Beens</h1>
              <div className='flex space-x-6'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Price:₹245</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
              <h3>Save Changes</h3>
            </div>
          </div>
          <div className=' w-50 relative h-50 '>
          <div class="card">
            <div class="card-inner">
              <div class="card-front">
              <img src={lotus} alt="" className='object-cover h-50 w-50 rounded-xl'/>
              </div>
              <div className="card-back">
                <div className='mb-37 ml-2 text-black'>
                    <h1 className='border-2 w-15 h-9'>Edit</h1>
                </div>
                <div className='space-y-2 grid grid-cols-1 font-black text-gray-950 mr-8/6699'>
                <h1>calories:</h1>
                <h1>Description:</h1>
                </div>
              </div>
            </div>
          </div>    
            <div className='justify-center space-y-2'>
              <h1 className="text-2xl font-semibold text-slate-700 ">Lotus Seeds</h1>
              <div className='flex space-x-6'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Price:₹160</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
              <h3>Save Changes</h3>
            </div>
          </div>
         
          <div></div>
          
        </div>
      </section>
      </div>
    </div>
  )
}

export default Products_list