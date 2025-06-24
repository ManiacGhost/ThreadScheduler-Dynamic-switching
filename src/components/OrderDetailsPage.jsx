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
      const response = await axios.post('http://localhost:8085/api/v1/orders/read', { orderId });

      if (response.data.status === 'SUCCESS') {
        setOrderData(response.data.data); 
      } else {
        setError(response.data.statusMessage || 'Something went wrong.');
      }
    } catch (err) {
      setError(err.response?.data?.statusMessage || 'Failed to fetch order details');
    }
    setLoading(false);
  };

  return (
    <div className="p-6 max-w-3xl mx-auto bg-white shadow rounded mt-10">
      <h1 className="text-2xl font-bold mb-4">Fetch Order Details</h1>

      <div className="mb-4">
        <input
          type="text"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
          className="border p-2 rounded w-full"
        />
        <button
          onClick={fetchOrderDetails}
          className="mt-2 bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          disabled={loading}
        >
          {loading ? 'Loading...' : 'Get Details'}
        </button>
      </div>

      {error && <div className="text-red-600 font-semibold">{error}</div>}

      {orderData && (
        <div className="mt-6 space-y-4">
          <div><strong>Order ID:</strong> {orderData.orderId}</div>
          <div><strong>Customer ID:</strong> {orderData.customerId}</div>
          <div><strong>Status:</strong> {orderData.status}</div>
          <div><strong>Order Date:</strong> {orderData.orderDate}</div>
          <div><strong>Delivery Date:</strong> {orderData.deliveryDate}</div>
          <div><strong>Total Amount:</strong> ₹{orderData.totalAmount}</div>

          <div>
            <h2 className="font-semibold mt-4">Shipping Address:</h2>
            <pre>{JSON.stringify(orderData.shippingAddress, null, 2)}</pre>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Billing Address:</h2>
            <pre>{JSON.stringify(orderData.billingAddress, null, 2)}</pre>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Items:</h2>
            <ul className="list-disc pl-6">
              {orderData.items?.map((item, idx) => (
                <li key={idx}>
                  {item.itemName} - Qty: {item.quantity}, Price: ₹{item.price}
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h2 className="font-semibold mt-4">Payment Details:</h2>
            <pre>{JSON.stringify(orderData.paymentDetails, null, 2)}</pre>
          </div>

          <div><strong>Created By:</strong> {orderData.createdBy}</div>
          <div><strong>Updated By:</strong> {orderData.updatedBy}</div>
        </div>
      )}
    </div>
  );
}
