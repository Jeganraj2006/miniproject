import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';
import img from '../Images/img1.jpg';

const Home = () => {
  const [user, setUser] = useState(null);

  // ✅ Check user session on component mount
  useEffect(() => {
    const getUserSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setUser(session?.user || null);
    };

    getUserSession();
    // ✅ Listen for auth state changes
    const { data: authListener } = supabase.auth.onAuthStateChange((_event, session) => {
      setUser(session?.user || null);
    });

    return () => {
      authListener.subscription.unsubscribe();
    };
  }, []);

  return (
    <div>
      <div className="bg-green-50">
        <main className="pt-20">
        <section className="text-center mb-8">
  {/* 🌄 Hero Section */}
  <div className="mt-5 w-full bg-gradient-to-tl from-green-300 to-indigo-300">
    <div className="relative h-[800px] w-full overflow-hidden">
      <img
        src={img}
        alt="Hero"
        className="w-full h-full object-cover mix-blend-overlay"
      />
      <div className="absolute inset-0 flex translate-y-10 items-center justify-center">
        <h2 className="text-4xl font-semibold text-slate-700 text-center">
          A B2C digital marketplace where fair food trade is made easy, fast, and transparent!
        </h2>
      </div>
      </div>
    </div>
    <p className="text-xl text-black pb-8 mt-12">
      Join us to connect with farmers, suppliers, and buyers from all over the world.
    </p>
          <div className="pt-3 bg-white p-6 rounded-lg shadow-md text-black">
            <h1>Get the best prices for your produce by connecting directly with buyers.</h1>
          </div>
            {/* 👨‍🌾 Role Sections */}
            <div className='text-black mt-10 grid grid-cols-1 md:grid-cols-3 gap-6 px-6'>
              {[
                {
                  title: "For Farmers",
                  text: "Get the best prices for your produce by connecting directly with buyers.",
                },
                {
                  title: "For Suppliers",
                  text: "Source high-quality products directly from trusted farmers.",
                },
                {
                  title: "For Buyers",
                  text: "Find the best deals on agricultural products from verified suppliers.",
                },
              ].map((section, i) => (
                <div key={i} className="bg-white p-6 rounded-lg shadow-md">
                  <h3 className="text-xl font-bold mb-2">{section.title}</h3>
                  <p className="mb-4">{section.text}</p>
                  <button className='p-0.5 w-40 rounded-xl hover:shadow-lg bg-lime-300 shadow-lime-500 duration-200  easy-in-out'>
                    ...Know more
                  </button>
                </div>
              ))}
            </div>
          </section>
        </main>
      </div>
    </div>
  );
};

export default Home;