import React, { useEffect, useState } from 'react';
import { supabase } from '../../supabaseClient';

const Dashboard = () => {
    const [users, setUsers] = useState([]);
    const [productCount, setProductCount] = useState(0); // ⬅️ New state

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const { data, error } = await supabase.auth.admin.listUsers();

                if (error || !data?.users) {
                    console.warn('Falling back to current user:', error?.message);
                    const { data: { user }, error: userError } = await supabase.auth.getUser();

                    if (user) {
                        setUsers([user]);
                    } else {
                        console.error('Error fetching current user:', userError?.message);
                    }
                } else {
                    setUsers(data.users);
                }
            } catch (err) {
                console.error('Unexpected error:', err);
            }
        };

        const fetchProductCount = async () => {
            try {
                const { data, error } = await supabase
                    .from('products')
                    .select('id')
                    .order('id', { ascending: false })
                    .limit(1);

                if (error) {
                    console.error('Error fetching product count:', error.message);
                    return;
                }

                if (data && data.length > 0) {
                    setProductCount(data[0].id); // ✅ Latest ID = count
                }
            } catch (err) {
                console.error('Error getting product count:', err.message);
            }
        };

        fetchUsers();
        fetchProductCount();
    }, []);

    return (
        <div className="min-h-screen flex pt-20">
            <aside className="w-1/4 bg-gray-800 text-white p-4">
                <div className="mb-8">
                    <img
                        src="https://via.placeholder.com/150"
                        alt="Profile"
                        className="rounded-full w-32 h-32 mx-auto"
                    />
                    <h2 className="text-center text-2xl mt-4">User Panel</h2>
                </div>
                <div>
                    <h3 className="text-xl mb-2">User Info</h3>
                    <ul>
                        {users.map((user) => (
                            <li key={user.id || user?.uid} className="mb-2">
                                <div className="font-bold">{user.user_metadata?.full_name || user.user_metadata?.name || 'No Name'}</div>
                                <div className="text-sm">{user.email}</div>
                            </li>
                        ))}
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
                        <p>{productCount}</p> {/* ✅ Dynamic product count */}
                    </div>
                </div>
            </main>
        </div>
    );
};

export default Dashboard;
