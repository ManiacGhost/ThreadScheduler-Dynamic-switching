import React, { useState } from "react";
import axios from "axios";

export default function UpdateOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [form, setForm] = useState(null);
  const [items, setItems] = useState([]);
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const fetchOrder = async () => {
    setStatus("loading");
    try {
      const response = await axios.post("http://localhost:8085/api/v1/orders/read", { orderId });
      if (response.data.data) {
        const data = response.data.data;
        setForm({
          ...data,
          orderDate: data.orderDate.slice(0, 16), // trim ISO
          deliveryDate: data.deliveryDate.slice(0, 16),
          totalAmount: data.totalAmount,
          paymentMethod: data.paymentDetails.paymentMethod,
          paidAmount: data.paymentDetails.paidAmount,
        });
        setItems(data.items);
        setStatus("fetched");
      } else {
        setMessage("Order not found");
        setStatus("error");
      }
    } catch (err) {
      setMessage("Failed to fetch order");
      setStatus("error");
    }
  };

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const handleUpdateOrder = async () => {
    const payload = {
      orderId: form.orderId,
      customerId: form.customerId,
      orderDate: form.orderDate,
      status: form.status,
      totalAmount: parseFloat(form.totalAmount),
      shippingAddress: form.shippingAddress,
      billingAddress: form.billingAddress,
      items: items.map((item, i) => ({
        ...item,
        quantity: parseInt(item.quantity),
        price: parseFloat(item.price),
      })),
      paymentDetails: {
        ...form.paymentDetails,
        paymentMethod: form.paymentMethod,
        paidAmount: parseFloat(form.paidAmount),
        paymentConfirmed: true,
      },
      deliveryDate: form.deliveryDate,
      createdBy: form.createdBy,
      updatedBy: "update_ui",
    };

    try {
      setStatus("loading");
      await axios.post("http://localhost:8085/api/v1/orders/update", payload);
      setMessage("Order updated successfully!");
      setStatus("success");
    } catch (err) {
      setMessage("Failed to update order.");
      setStatus("error");
    }
  };

  if (!form) {
    return (
      <div className="p-6 max-w-xl mx-auto space-y-4">
        <h2 className="text-2xl font-bold">Fetch Order to Update</h2>
        <input
          className="input"
          placeholder="Enter Order ID"
          value={orderId}
          onChange={(e) => setOrderId(e.target.value)}
        />
        <button
          onClick={fetchOrder}
          className="bg-blue-600 text-white px-4 py-2 rounded"
        >
          Fetch Order
        </button>
        {status === "error" && <p className="text-red-600">{message}</p>}
      </div>
    );
  }

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Update Order: {form.orderId}</h2>

      {/* Order Info */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="customerId"
          placeholder="Customer ID"
          value={form.customerId}
          onChange={handleChange}
          className="input"
        />
        <input
          type="datetime-local"
          name="orderDate"
          value={form.orderDate}
          onChange={handleChange}
          className="input"
        />
        <select name="status" value={form.status} onChange={handleChange} className="input">
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          type="number"
          name="totalAmount"
          value={form.totalAmount}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Items */}
      <h3 className="font-semibold">Items</h3>
      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-4 gap-4 items-center mb-2">
          <input
            name="itemName"
            placeholder="Item Name"
            value={item.itemName}
            onChange={(e) => handleItemChange(idx, e)}
            className="input"
          />
          <input
            type="number"
            name="quantity"
            placeholder="Qty"
            value={item.quantity}
            onChange={(e) => handleItemChange(idx, e)}
            className="input"
          />
          <input
            type="number"
            name="price"
            placeholder="Price"
            value={item.price}
            onChange={(e) => handleItemChange(idx, e)}
            className="input"
          />
          <input
            name="category"
            placeholder="Category"
            value={item.category}
            onChange={(e) => handleItemChange(idx, e)}
            className="input"
          />
        </div>
      ))}

      {/* Payment */}
      <h3 className="font-semibold">Payment</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="paymentMethod"
          placeholder="Payment Method"
          value={form.paymentMethod}
          onChange={handleChange}
          className="input"
        />
        <input
          type="number"
          name="paidAmount"
          placeholder="Paid Amount"
          value={form.paidAmount}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Submit */}
      <button
        onClick={handleUpdateOrder}
        className="bg-green-600 text-white px-6 py-2 rounded hover:bg-green-700"
      >
        Update Order
      </button>

      {status === "loading" && <p className="text-yellow-500">Updating...</p>}
      {status === "success" && <p className="text-green-600">{message}</p>}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </div>
  );
}
