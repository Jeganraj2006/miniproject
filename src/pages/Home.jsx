import React from 'react';
import img from '../Images/img1.jpg'
const Home = () => {
  return (
    <div>
        <div className="bg-green-50 ">
            <main className=" pt-20">
                <section className="text-center mb-8 ">
                    <div className=' mt-5 w-full h-200 relative bg-gradient-to-tl from-green-300 to-indigo-300'>
                        <img src={img} alt="" className='w-full  object-cover mix-blend-overlay absolute h-200'/>
                        <div className='ml-4 mr-4 pt-24 pb-24 translate-y-100'><h2 className="text-4xl font-semibold mb-4 text-slate-700 ">A B2C digital marketplace where fair food trade is made easy, fast, and transparent!</h2>
                    </div>
                    </div>
                    <p className="text-xl text-black pb-8 mt-10">
                        Join us to connect with farmers, suppliers, and buyers from all over the world.
                    </p>
                    <div className='pt-3 bg-white p-6 rounded-lg shadow-md text-black'>
                        <h1>Get the best prices for your produce by connecting directly with buyers.</h1>
                    </div>       
                    {/* <div className='bg-green-500  h-1'></div>
                    <div className='bg-green-500  h-2.5 ml-[50%] mr-[50%]'>
                        <div className='border-l-[5px] border-l-transparent border-r-[5px] border-r-transparent border-t-[5px] border-t-green-500'></div>
                    </div>*/}
                <div className='text-black '>
                    <div className="bg-white text-center p-6 rounded-lg shadow-md ">
                        <h3 className="text-xl font-bold mb-2">For Farmers</h3>
                        <p className="mb-4">
                            Get the best prices for your produce by connecting directly with buyers.
                        </p>
                        <button className='p-0.5 w-40 rounded-xl hover:shadow-lg bg-lime-300 shadow-lime-500 duration-200  easy-in-out'>
                            ...Know more
                        </button>
                        
                    </div> 
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">For Suppliers</h3>
                        <p className="mb-4">
                            Source high-quality products directly from trusted farmers.
                        </p>
                        <button className='p-0.5 w-40 rounded-xl hover:shadow-lg bg-lime-300 shadow-lime-500 duration-200  easy-in-out'>
                            ...Know more
                        </button>                        
                    </div>
                    <div className="bg-white p-6 rounded-lg shadow-md">
                        <h3 className="text-xl font-bold mb-2">For Buyers</h3>
                        <p className="mb-4">
                            Find the best deals on agricultural products from verified suppliers.
                        </p>
                        <button className='p-0.5 w-40 rounded-xl hover:shadow-lg bg-lime-300 shadow-lime-500 duration-200  easy-in-out'>
                            ...Know more
                        </button>
                    </div>
                </div>
                </section> 
            </main>
            
        </div>
    </div>
    
  )
}

export default Home