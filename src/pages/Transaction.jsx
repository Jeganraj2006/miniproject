import React, { useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { supabase } from '../../supabaseClient'; // Import your Supabase client

const Transaction = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const cartItems = location.state?.cartItems || [];
  
  const [paymentMethod, setPaymentMethod] = useState('');
  const [formData, setFormData] = useState({});

  const handlePaymentMethodChange = (event) => {
    setPaymentMethod(event.target.value);
    setFormData({}); // Reset form data on method change
  };

  const handleChange = (e) => {
    setFormData(prev => ({ ...prev, [e.target.id]: e.target.value }));
  };

  const totalAmount = cartItems.reduce((total, item) => {
    const price = item.price || item.rent_per_day || 0;
    return total + price;
  }, 0);

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!paymentMethod) return alert("Please select a payment method.");

    const client = supabase.auth.user(); // Get the authenticated user
    const clientId = client ? client.id : null;

    if (!clientId) {
      return alert("You need to be logged in to complete the transaction.");
    }

    // Create the order in the orders table
    const orderData = {
      client_id: clientId,
      seller_id: cartItems[0]?.seller_id,  // Assuming first item is representative of seller
      product_id: cartItems[0]?.product_id || null,  // Handle if it's a product or rental
      quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
      total_price: totalAmount,
      status: 'pending',  // Initial status
      created_at: new Date().toISOString(),
    };

    const { data: orderDataResponse, error: orderError } = await supabase
      .from('orders')
      .insert([orderData])
      .single();

    if (orderError) {
      console.error('Order Error:', orderError);
      return alert('Error creating the order.');
    }

    // Create the transaction in the transactions table
    const transactionData = {
      client_id: clientId,
      amount: totalAmount,
      transaction_for: cartItems[0]?.product_id ? 'order' : 'rental', // Adjust based on item type
      reference_id: orderDataResponse.id, // Reference the newly created order
      reference_table: 'orders',  // Reference table name
      created_at: new Date().toISOString(),
    };

    const { data: transactionDataResponse, error: transactionError } = await supabase
      .from('transactions')
      .insert([transactionData]);

    if (transactionError) {
      console.error('Transaction Error:', transactionError);
      return alert('Error processing the payment.');
    }

    // Update the order status after transaction success
    const { data: updatedOrder, error: updateOrderError } = await supabase
      .from('orders')
      .update({ status: 'completed' })
      .eq('id', orderDataResponse.id)
      .single();

    if (updateOrderError) {
      console.error('Order Update Error:', updateOrderError);
      return alert('Error updating the order status.');
    }

    console.log('Transaction and Order Created:', transactionDataResponse, updatedOrder);

    // Redirect to success page or homepage after payment
    alert('✅ Payment successful!');
    navigate('/');
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 p-6">
      <div className="bg-white p-8 rounded-lg shadow-lg w-full max-w-2xl">
        <h2 className="text-2xl font-bold mb-6 text-center">💳 Secure Payment</h2>

        {/* Order Summary */}
        <div className="mb-6">
          <h3 className="text-xl font-semibold mb-2">🛒 Items Summary</h3>
          <ul className="text-gray-800 mb-4 space-y-2">
            {cartItems.map(item => (
              <li key={item.id} className="flex justify-between border-b pb-1">
                <span>{item.name}</span>
                <span>₹{item.price || item.rent_per_day}</span>
              </li>
            ))}
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
            <>
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
            </>
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
              Pay Now
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Transaction;
