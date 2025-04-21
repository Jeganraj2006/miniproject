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

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setFormData({});
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.price || item.rent_per_day || 0;
    return total + price * (item.selectedQuantity || 1);
  }, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymentMethod) return alert("Please select a payment method.");
    if (paymentMethod === 'creditCard' && !formData.cardNumber) return alert("Please enter your credit card number.");
    if (paymentMethod === 'gpay' && !formData.gpayId) return alert("Please enter your GPay UPI ID.");
    if (paymentMethod === 'bankTransfer' && !formData.accountNumber) return alert("Please enter your account number.");

    const { data: { user }, error: authError } = await supabase.auth.getUser();
    if (authError || !user) {
      alert("You need to be logged in to complete the transaction.");
      return;
    }

    const clientId = user.id;
    const successPromises = [];

    try {
      for (const item of cartItems) {
        setLoadingItems(prev => [...prev, item.id]);

        const quantity = item.selectedQuantity || 1;
        const isProduct = !!item.product_id;
        const orderTable = isProduct ? 'orders' : 'rental_orders';
        const itemIdField = isProduct ? 'product_id' : 'rental_id';
        const sourceTable = isProduct ? 'products' : 'rentals';

        // Insert into the orders or rental_orders table
        const { data: order, error: orderError } = await supabase
          .from(orderTable)
          .insert([{
            client_id: clientId,
            seller_id: item.seller_id,
            [itemIdField]: item.id,
            quantity,
            total_price: (item.price || item.rent_per_day) * quantity,
            status: 'pending',
            created_at: new Date().toISOString()
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
            created_at: new Date().toISOString()
          }]);

        if (transactionError) throw transactionError;

        // Update the quantity in the products or rentals table
        const { error: updateQtyError } = await supabase
          .from(sourceTable)
          .update({
            quantity: supabase.raw('quantity - ?', [quantity])  // Update quantity by subtracting the ordered quantity
          })
          .eq('id', item.id);

        if (updateQtyError) throw updateQtyError;

        // Mark the order or rental order as completed
        await supabase
          .from(orderTable)
          .update({ status: 'completed' })
          .eq('id', order.id);

        successPromises.push(order);
        setLoadingItems(prev => prev.filter(id => id !== item.id));
      }

      // Wait for all transactions to finish
      await Promise.all(successPromises);
      setTransactionStatus('success');
    } catch (error) {
      console.error('Transaction Failed:', error);
      alert("Something went wrong during the transaction.");
    }
  };

  useEffect(() => {
    if (transactionStatus === 'success') {
      alert('✅ Payment successful!');
      navigate('/');
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
              const tableName = isProduct ? 'Product' : 'Rental';  // Set the table name for display
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
              <option value="creditCard">Credit Card</option>
              <option value="gpay">GPay</option>
              <option value="bankTransfer">Bank Transfer</option>
            </select>
          </div>

          {paymentMethod === 'creditCard' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="cardNumber">
                Card Number
              </label>
              <input
                type="text"
                id="cardNumber"
                value={formData.cardNumber || ''}
                onChange={handleChange}
                placeholder="1234 5678 9012 3456"
                className="input-style"
              />
            </div>
          )}

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
                placeholder="example@okaxis"
                className="input-style"
              />
            </div>
          )}

          {paymentMethod === 'bankTransfer' && (
            <div className="mb-4">
              <label className="block text-gray-700 font-bold mb-2" htmlFor="accountNumber">
                Account Number
              </label>
              <input
                type="text"
                id="accountNumber"
                value={formData.accountNumber || ''}
                onChange={handleChange}
                placeholder="123456789"
                className="input-style"
              />
            </div>
          )}

          <div className="flex justify-end mt-6">
            <button
              type="submit"
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-6 rounded-lg"
            >
              {loadingItems.length ? 'Processing...' : 'Pay Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
