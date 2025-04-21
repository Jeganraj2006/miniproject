import { useEffect, useState } from "react";
import { supabase } from "../../supabaseClient";

const SellerOrders = () => {
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchOrders = async () => {
      setLoading(true);

      const {
        data: { user },
        error: userError,
      } = await supabase.auth.getUser();

      if (userError || !user) {
        console.error("Error getting user:", userError);
        setLoading(false);
        return;
      }

      const sellerId = user.id;

      // JOIN orders with product info
      const { data: ordersData, error: ordersError } = await supabase
        .from("orders")
        .select(`
          id,
          quantity,
          total_price,
          status,
          created_at,
          product:product_id (
            name
          )
        `)
        .eq("seller_id", sellerId)
        .order("created_at", { ascending: false });

      if (ordersError) {
        console.error("Error fetching orders:", ordersError);
        setLoading(false);
        return;
      }

      setOrders(ordersData);
      setLoading(false);
    };

    fetchOrders();
  }, []);

  return (
    <div className="p-4 max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">My Orders</h2>

      {loading ? (
        <p className="text-gray-600">Loading orders...</p>
      ) : orders.length === 0 ? (
        <p className="text-gray-600">No orders found.</p>
      ) : (
        <div className="grid gap-4">
          {orders.map((order) => (
            <div
              key={order.id}
              className="p-4 bg-white rounded-xl shadow-md border border-gray-200"
            >
              <p><strong>Product:</strong> {order.product?.name || "Unknown"}</p>
              <p><strong>Quantity:</strong> {order.quantity}</p>
              <p><strong>Total Price:</strong> ₹{order.total_price}</p>
              <p><strong>Status:</strong> {order.status}</p>
              <p className="text-sm text-gray-500">
                Placed on {new Date(order.created_at).toLocaleString()}
              </p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SellerOrders;
