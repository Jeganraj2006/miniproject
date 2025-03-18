import React from 'react';

const Dashboard = () => {
    return (
        <div className="min-h-screen flex pt-20">
            <aside className="w-1/4 bg-gray-800 text-white p-4">
                <div className="mb-8">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="rounded-full w-32 h-32 mx-auto"
                    />
                    <h2 className="text-center text-2xl mt-4">John Doe</h2>
                </div>
                <div>
                    <h3 className="text-xl mb-2">Personal Details</h3>
                    <ul>
                        <li>Email: john.doe@example.com</li>
                        <li>Phone: (123) 456-7890</li>
                        <li>Address: 123 Main St, Anytown, USA</li>
                    </ul>
                </div>
            </aside>
            <main className="w-3/4 bg-gray-100 p-8">
                <h1 className="text-3xl mb-6">Dashboard</h1>
                <div className="grid grid-cols-3 gap-4">
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl mb-2">Sales</h2>
                        <p>$10,000</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl mb-2">Orders</h2>
                        <p>150</p>
                    </div>
                    <div className="bg-white p-4 rounded shadow">
                        <h2 className="text-xl mb-2">Products</h2>
                        <p>50</p>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard