import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient';

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];

  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({});
  const [transactionStatus, setTransactionStatus] = useState(null);
  const [loadingItems, setLoadingItems] = useState([]);
  const [sellerIds, setSellerIds] = useState([]);

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.price || item.rent_per_day || 0;
    return total + price * (item.selectedQuantity || 1);
  }, 0);

  // Fetch seller IDs for products in the cart
  const fetchSellerIds = async () => {
    const fetchedSellerIds = [];
    for (const item of cartItems) {
      if (item.product_id) {
        const { data, error } = await supabase
          .from('products')
          .select('created_by')
          .eq('id', item.product_id)
          .single();

        if (error) {
          console.error('Error fetching seller_id:', error);
        } else {
          fetchedSellerIds.push({ product_id: item.product_id, seller_id: data.created_by });
        }
      }
    }
    setSellerIds(fetchedSellerIds);
  };

  useEffect(() => {
    fetchSellerIds();
  }, [cartItems]);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymentMethod) return alert('Please select a payment method.');
    if (paymentMethod === 'gpay' && !formData.gpayId) return alert('Please enter your GPay UPI ID.');
    if (paymentMethod === 'bankTransfer' && !formData.accountNumber) return alert('Please enter your account number.');

    // Simulating UPI Payment with Hardcoded UPI IDs
    const validUpiIds = ['jegan@hdfc', 'admin@indusbnk'];
    if (paymentMethod === 'gpay' && !validUpiIds.includes(formData.gpayId)) {
      return alert('Invalid UPI ID. Please enter a valid one.');
    }

    const { data: { user }, error: authError } = await supabase.auth.getUser();

    if (authError || !user) {
      alert('You need to be logged in to complete the transaction.');
      return;
    }

    const clientId = user.id;
    const successPromises = [];
    const rollbackPromises = [];

    try {
      const transactionBatch = [];

      for (const item of cartItems) {
        setLoadingItems((prev) => [...prev, item.id]);

        const quantity = item.selectedQuantity || 1;
        const isProduct = !!item.product_id;
        const orderTable = isProduct ? 'orders' : 'rental_orders';
        const itemIdField = isProduct ? 'product_id' : 'rental_id';
        const sourceTable = isProduct ? 'products' : 'rentals';
        const tableName = isProduct ? 'Product' : 'Rental';

        // Find seller_id for the current item from the fetched sellerIds
        const sellerId = sellerIds.find((seller) => seller.product_id === item.product_id)?.seller_id;

        // If sellerId is not found, throw an error
        if (!sellerId) {
          console.error('Seller ID not found for item:', item);
          continue;
        }

        // Log the seller_id for each item
        console.log(`Item: ${item.name} - Seller ID: ${sellerId}`);

        // Check if the transaction already exists
        const { data: existingTransaction } = await supabase
          .from('transactions')
          .select('id')
          .eq('client_id', clientId)
          .eq('reference_id', item.id)
          .eq('reference_table', orderTable)
          .single();

        if (existingTransaction) {
          console.log('Transaction already exists:', existingTransaction);
          continue; // Skip the current item if the transaction already exists
        }

        // Insert into the orders or rental_orders table
        const { data: order, error: orderError } = await supabase
          .from(orderTable)
          .insert([{
            client_id: clientId,
            seller_id: sellerId,
            [itemIdField]: item.id,
            quantity,
            total_price: (item.price || item.rent_per_day) * quantity,
            status: 'pending',
            created_at: new Date().toISOString(),
          }])
          .select()
          .single();

        if (orderError) throw orderError;

        // Insert into the transactions table
        const { error: transactionError } = await supabase
          .from('transactions')
          .insert([{
            client_id: clientId,
            amount: (item.price || item.rent_per_day) * quantity,
            transaction_for: isProduct ? 'order' : 'rental',
            reference_id: order.id,
            reference_table: orderTable,
            created_at: new Date().toISOString(),
          }]);

        if (transactionError) throw transactionError;

        // Rollback operation in case of failure
        const rollbackOperation = async () => {
          await supabase
            .from(sourceTable)
            .update({
              quantity: supabase.raw('quantity + ?', [quantity]), // Rollback by adding the quantity back
            })
            .eq('id', item.id);
        };
        rollbackPromises.push(rollbackOperation);

        // Update the quantity in the products or rentals table
        const { error: updateQtyError } = await supabase
          .from(sourceTable)
          .update({
            quantity: supabase.raw('quantity - ?', [quantity]), // Reduce quantity by subtracting the ordered quantity
          })
          .eq('id', item.id);

        if (updateQtyError) throw updateQtyError;

        // Mark the order as completed
        await supabase.from(orderTable).update({ status: 'completed' }).eq('id', order.id);

        successPromises.push(order);
        setLoadingItems((prev) => prev.filter((id) => id !== item.id));
      }

      // Wait for all successful promises
      await Promise.all(successPromises);

      // Transaction success
      setTransactionStatus('success');
    } catch (error) {
      console.error('Transaction Failed:', error);

      // Rollback all changes in case of failure
      for (const rollback of rollbackPromises) {
        await rollback();
      }

      alert('Something went wrong during the transaction.');
    }
  };

  useEffect(() => {
    if (transactionStatus === 'success') {
      alert('✅ Payment successful!');
      navigate('/dashboard');  // Redirecting to the dashboard page
    }
  }, [transactionStatus, navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">💳 Secure Payment</h2>

        {/* Items Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">🛒 Items Summary</h3>
          <ul className="text-gray-800 mb-4 space-y-2">
            {cartItems.map((item) => {
              const isProduct = !!item.product_id;
              const tableName = isProduct ? 'Product' : 'Rental'; // Set the table name for display
              return (
                <li key={item.id} className="flex flex-col border-b pb-2">
                  <div className="flex justify-between">
                    <span className="font-medium">{item.name}</span>
                    <span>₹{item.price || item.rent_per_day} × {item.selectedQuantity || 1}</span>
                  </div>
                  <div className="text-sm text-gray-500">Available: {item.quantity}</div>
                  <div className="text-xs text-gray-400">Source: {tableName}</div> {/* Display the table name */}
                </li>
              );
            })}
          </ul>
          <div className="text-right text-lg font-bold">Total: ₹{totalAmount}</div>
        </div>

        {/* Payment Form */}
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 font-bold mb-2" htmlFor="paymentMethod">
              Select Payment Method
            </label>
            <select
              id="paymentMethod"
              value={paymentMethod}
              onChange={handlePaymentMethodChange}
              className="block w-full bg-white border border-gray-400 px-4 py-2 rounded shadow focus:outline-none"
            >
              <option value="">Choose a method</option>
              <option value="gpay">GPay</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          {paymentMethod === 'gpay' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="gpayId">
                GPay UPI ID
              </label>
              <input
                type="text"
                id="gpayId"
                value={formData.gpayId || ''}
                onChange={handleChange}
                className="block w-full bg-white border border-gray-400 px-4 py-2 rounded shadow focus:outline-none"
              />
            </div>
          )}

          {paymentMethod === 'bankTransfer' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="accountNumber">
                Bank Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={formData.accountNumber || ''}
                onChange={handleChange}
                className="block w-full bg-white border border-gray-400 px-4 py-2 rounded shadow focus:outline-none"
              />
            </div>
          )}

          <div className="flex justify-between items-center">
            <button
              type="submit"
              className="px-6 py-3 bg-blue-600 text-white font-bold rounded-lg w-full hover:bg-blue-500 transition duration-300"
            >
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
