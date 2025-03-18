import React from 'react'
import ag1 from '../Images/ag1.jpg'
import ag2 from '../Images/ag2.jpg'
import ag3 from '../Images/ag3.jpg'
import ag4 from '../Images/ag4.jpg'
import ag5 from '../Images/ag5.jpg'
import ag6 from '../Images/ag6.png'
import ag7 from '../Images/ag7.jpg'
import ag11 from '../Images/ag11.jpg'
import ag12 from '../Images/ag12.jpg'
import { IoMdAdd } from "react-icons/io";
import { GrFormSubtract } from "react-icons/gr";
import { VscDiffAdded } from "react-icons/vsc";


const Rental_list = () => {
  return (
    <div>
      <div className='pt-30 pb-8'>
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
                    <div className=' grid grid-cols-4 gap-5 space-y-30 items-center justify-center ml-15'>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag1} alt="" className='object-cover h-50 w-60 rounded-xl'/>
                        <div className='justify-center '>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
                                        <IoMdAdd  className='border-2 w-6 h-6'/>
                                        <h1>Rent : 20 /mon</h1>
                                        <GrFormSubtract className='border-2 w-6 h-6'/>
                                        </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                      <img src={ag2} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:1000 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3  className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag3} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:20 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag4} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:50 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag5} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:30 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag6} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:10 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag7} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4  ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:1500 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag11} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4 ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:80 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list'>
                        <img src={ag12} alt="" className='object-cover h-50 w-50 rounded-xl'/>
                        <div className='justify-center'>
                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                          <div className='flex space-x-4  ml-2'>
              <IoMdAdd  className='border-2 w-6 h-6'/>
              <h1>Rent:4000 /mon</h1>
              <GrFormSubtract className='border-2 w-6 h-6'/>
              </div>
                          <h3 className="border w-30 ml-10 mt-3 cart">Save changes</h3>
                        </div>
                      </div>
                      <div className=' w-50 relative h-50 rent_list border rounded-2xl'>
                        Add Item
                      <VscDiffAdded className="w-50 h-40  mb-15"/>
                                        <div className='justify-center'>
                                          <h1 className="text-2xl font-semibold text-slate-700 ">Name</h1>
                                          <h1>Price:</h1>
                                          <h3>Rating</h3>
                                        </div>
                                      </div>
                    <div>
                  </div>
                </div>
              </section>
            </div>
    </div>
  )
}

export default Rental_list