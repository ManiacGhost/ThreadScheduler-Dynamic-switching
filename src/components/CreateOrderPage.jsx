import { useState } from "react";
import axios from "axios";

export default function CreateOrderPage() {
  const [form, setForm] = useState({
    orderId: "",
    customerId: "",
    orderDate: "",
    status: "Pending",
    totalAmount: "",
    shippingStreet: "",
    shippingCity: "",
    shippingState: "",
    shippingZip: "",
    shippingCountry: "",
    billingStreet: "",
    billingCity: "",
    billingState: "",
    billingZip: "",
    billingCountry: "",
    paymentMethod: "",
    paidAmount: "",
  });

  const [items, setItems] = useState([
    { itemName: "", quantity: 1, price: "", category: "" },
  ]);

  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleItemChange = (index, e) => {
    const newItems = [...items];
    newItems[index][e.target.name] = e.target.value;
    setItems(newItems);
  };

  const addNewItem = () => {
    setItems([
      ...items,
      { itemName: "", quantity: 1, price: "", category: "" },
    ]);
  };

  const handleCreateOrder = async () => {
    const parsedItems = items.map((item, index) => ({
      itemId: "ITEM" + (index + 1),
      itemName: item.itemName,
      quantity: parseInt(item.quantity),
      price: parseFloat(item.price),
      category: item.category,
    }));

    const payload = [
      {
        orderId: form.orderId,
        customerId: form.customerId,
        orderDate: form.orderDate,
        status: form.status,
        totalAmount: parseFloat(form.totalAmount),
        shippingAddress: {
          street: form.shippingStreet,
          city: form.shippingCity,
          state: form.shippingState,
          zipCode: form.shippingZip,
          country: form.shippingCountry,
        },
        billingAddress: {
          street: form.billingStreet,
          city: form.billingCity,
          state: form.billingState,
          zipCode: form.billingZip,
          country: form.billingCountry,
        },
        items: parsedItems,
        paymentDetails: {
          paymentId: "PAY" + Math.floor(Math.random() * 10000),
          paymentMethod: form.paymentMethod,
          transactionId: "TXN" + Math.floor(Math.random() * 1000000),
          paidAmount: parseFloat(form.paidAmount),
          paymentConfirmed: true,
        },
        deliveryDate: new Date(
          Date.now() + 4 * 24 * 60 * 60 * 1000
        ).toISOString(),
        createdBy: "system_admin",
        updatedBy: "order_service",
      },
    ];

    try {
      setStatus("loading");
      await axios.post(
        `${import.meta.env.VITE_API_BASE_URL}/orders/save`,
        payload
      );
      setStatus("success");
      setMessage("Order saved successfully!");
      setForm({
        orderId: "",
        customerId: "",
        orderDate: "",
        status: "Pending",
        totalAmount: "",
        shippingStreet: "",
        shippingCity: "",
        shippingState: "",
        shippingZip: "",
        shippingCountry: "",
        billingStreet: "",
        billingCity: "",
        billingState: "",
        billingZip: "",
        billingCountry: "",
        paymentMethod: "",
        paidAmount: "",
      });
      setItems([{ itemName: "", quantity: 1, price: "", category: "" }]);
    } catch (error) {
      console.error("Order save failed:", error);
      setMessage("Failed to save order.");
      setStatus("error");
    }
  };

  const removeItem = (index) => {
    const updatedItems = [...items];
    updatedItems.splice(index, 1);
    setItems(updatedItems);
  };

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h2 className="text-2xl font-bold">Create Order</h2>

      {/* Order Info */}
      <div className="grid grid-cols-2 gap-4">
        <input
          name="orderId"
          placeholder="Order ID"
          value={form.orderId}
          onChange={handleChange}
          className="input"
        />
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
        <select
          name="status"
          value={form.status}
          onChange={handleChange}
          className="input"
        >
          <option value="Pending">Pending</option>
          <option value="Shipped">Shipped</option>
          <option value="Delivered">Delivered</option>
        </select>
        <input
          type="number"
          name="totalAmount"
          placeholder="Total Amount"
          value={form.totalAmount}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Shipping & Billing */}
      <h3 className="font-semibold">Shipping Address</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="shippingStreet"
          placeholder="Street"
          value={form.shippingStreet}
          onChange={handleChange}
          className="input"
        />
        <input
          name="shippingCity"
          placeholder="City"
          value={form.shippingCity}
          onChange={handleChange}
          className="input"
        />
        <input
          name="shippingState"
          placeholder="State"
          value={form.shippingState}
          onChange={handleChange}
          className="input"
        />
        <input
          name="shippingZip"
          placeholder="Zip"
          value={form.shippingZip}
          onChange={handleChange}
          className="input"
        />
        <input
          name="shippingCountry"
          placeholder="Country"
          value={form.shippingCountry}
          onChange={handleChange}
          className="input"
        />
      </div>

      <h3 className="font-semibold">Billing Address</h3>
      <div className="grid grid-cols-2 gap-4">
        <input
          name="billingStreet"
          placeholder="Street"
          value={form.billingStreet}
          onChange={handleChange}
          className="input"
        />
        <input
          name="billingCity"
          placeholder="City"
          value={form.billingCity}
          onChange={handleChange}
          className="input"
        />
        <input
          name="billingState"
          placeholder="State"
          value={form.billingState}
          onChange={handleChange}
          className="input"
        />
        <input
          name="billingZip"
          placeholder="Zip"
          value={form.billingZip}
          onChange={handleChange}
          className="input"
        />
        <input
          name="billingCountry"
          placeholder="Country"
          value={form.billingCountry}
          onChange={handleChange}
          className="input"
        />
      </div>

      {/* Dynamic Items */}
      <h3 className="font-semibold">Items</h3>
      {items.map((item, idx) => (
        <div key={idx} className="grid grid-cols-5 gap-4 items-center mb-2">
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

          <button
            onClick={() => removeItem(idx)}
            className="text-red-600 font-bold hover:underline text-lg"
            title="Remove this item"
          >
            ❌
          </button>
        </div>
      ))}

      <button
        onClick={addNewItem}
        className="text-blue-600 hover:underline text-sm"
      >
        ➕ Add Item
      </button>

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

      <button
        onClick={handleCreateOrder}
        className="bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700"
      >
        Submit Order
      </button>

      {status === "loading" && <p className="text-yellow-500">Submitting...</p>}
      {status === "success" && <p className="text-green-600">{message}</p>}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </div>
  );
}
