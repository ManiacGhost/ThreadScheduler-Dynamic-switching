import React, { useState } from 'react';
import axios from 'axios';

export default function OrderDetailsPage() {
  const [orderId, setOrderId] = useState('');
  const [orderData, setOrderData] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const fetchOrderDetails = async () => {
    setLoading(true);
    setError('');
    setOrderData(null);

    try {
      const response = await axios.post('http://localhost:8080/read', { orderId });
      console.log('API response:', response.data); 

      if (response.data.status === '200 OK') {
        setOrderData(response.data.data); 
        setError(response.data.statusMessage || 'Something went wrong');
      }
    } catch (err) {
      setError(err.response?.data?.statusMessage || 'Failed to fetch order details');
    }

    setLoading(false);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto bg-white shadow rounded">
      <h1 className="text-2xl font-bold mb-4">Order Details Viewer</h1>

      <div className="mb-4 flex gap-2">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 rounded flex-grow"
        />
        <button
          onClick={fetchOrderDetails}
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Fetch'}
        </button>
      </div>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {orderData && (
        <div className="mt-6 space-y-4 text-sm">
          <div><strong>Order ID:</strong> {orderData.orderId}</div>
          <div><strong>Status:</strong> {orderData.status}</div>
          <div><strong>Order Date:</strong> {new Date(orderData.orderDate).toLocaleString()}</div>
          <div><strong>Delivery Date:</strong> {new Date(orderData.deliveryDate).toLocaleString()}</div>
          <div><strong>Total Amount:</strong> ₹{orderData.totalAmount}</div>
          <div><strong>Customer ID:</strong> {orderData.customerId}</div>
          <div><strong>Created By:</strong> {orderData.createdBy}</div>
          <div><strong>Updated By:</strong> {orderData.updatedBy}</div>

          <div>
            <h2 className="font-semibold mt-4">Shipping Address:</h2>
            <div>{orderData.shippingAddress.street}, {orderData.shippingAddress.city}</div>
            <div>{orderData.shippingAddress.state} - {orderData.shippingAddress.zipCode}, {orderData.shippingAddress.country}</div>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Billing Address:</h2>
            <div>{orderData.billingAddress.street}, {orderData.billingAddress.city}</div>
            <div>{orderData.billingAddress.state} - {orderData.billingAddress.zipCode}, {orderData.billingAddress.country}</div>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Items Ordered:</h2>
            <ul className="list-disc pl-6">
              {orderData.items.map((item, idx) => (
                <li key={idx}>
                  {item.itemName} (x{item.quantity}) - ₹{item.price} | {item.category}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Payment Details:</h2>
            <div>Payment Method: {orderData.paymentDetails.paymentMethod}</div>
            <div>Transaction ID: {orderData.paymentDetails.transactionId}</div>
            <div>Paid Amount: ₹{orderData.paymentDetails.paidAmount}</div>
            <div>Confirmed: {orderData.paymentDetails.paymentConfirmed ? 'Yes' : 'No'}</div>
          </div>
        </div>
      )}
    </div>
  );
}
