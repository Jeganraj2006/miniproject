import React, { useEffect, useState } from "react";
import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://your-supabase-url.supabase.co"; // Replace with your Supabase URL
const supabaseKey = "your-supabase-key"; // Replace with your Supabase Key
const supabase = createClient(supabaseUrl, supabaseKey);

const OrdersHistory = ({ sellerId }) => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setLoading(true);
        const { data, error } = await supabase
          .from("orders") // Replace with your table name
          .select("*")
          .eq("seller_id", sellerId)
          .order("created_at", { ascending: false });

        if (error) throw error;
        setOrders(data);
      } catch (error) {
        console.error("Error fetching orders:", error.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrders();
  }, [sellerId]);

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <h1 className="text-2xl font-bold text-gray-800 mb-4">Order History</h1>
      {loading ? (
        <p className="text-gray-600">Loading...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white shadow-md rounded-lg">
            <thead>
              <tr className="bg-gray-200 text-gray-600 uppercase text-sm leading-normal">
                <th className="py-3 px-6 text-left">Order ID</th>
                <th className="py-3 px-6 text-left">Product</th>
                <th className="py-3 px-6 text-left">Quantity</th>
                <th className="py-3 px-6 text-left">Price</th>
                <th className="py-3 px-6 text-left">Date</th>
              </tr>
            </thead>
            <tbody className="text-gray-600 text-sm font-light">
              {orders.map((order) => (
                <tr
                  key={order.id}
                  className="border-b border-gray-200 hover:bg-gray-100"
                >
                  <td className="py-3 px-6 text-left">{order.id}</td>
                  <td className="py-3 px-6 text-left">{order.product_name}</td>
                  <td className="py-3 px-6 text-left">{order.quantity}</td>
                  <td className="py-3 px-6 text-left">${order.price}</td>
                  <td className="py-3 px-6 text-left">
                    {new Date(order.created_at).toLocaleDateString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default OrdersHistory;