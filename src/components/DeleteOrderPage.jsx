import { useState } from "react";
import axios from "axios";

export default function DeleteOrderPage() {
  const [orderId, setOrderId] = useState("");
  const [status, setStatus] = useState("idle");
  const [message, setMessage] = useState("");

  const handleDelete = async () => {
    if (!orderId) {
      setMessage("Order ID is required.");
      setStatus("error");
      return;
    }

    try {
      setStatus("loading");
      const response = await axios.post(
        "http://localhost:8085/api/v1/orders/delete",
        orderId,
        {
          headers: { "Content-Type": "text/plain" },
        }
      );

      const { statusMessage, status: backendStatus } = response.data;

      if (backendStatus && backendStatus.startsWith("2")) {
        setStatus("success");
        setMessage(statusMessage || "Order deleted successfully.");
        setOrderId("");
      } else {
        setStatus("error");
        setMessage(statusMessage || "Something went wrong.");
      }
    } catch (err) {
      console.error(err);
      setStatus("error");

      if (err.response && err.response.data?.statusMessage) {
        setMessage(err.response.data.statusMessage);
      } else {
        setMessage(`Failed to delete order: ${orderId}`);
      }
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-4">
      <h2 className="text-2xl font-bold">Delete Order</h2>

      <input
        type="text"
        name="orderId"
        value={orderId}
        onChange={(e) => setOrderId(e.target.value)}
        placeholder="Enter Order ID"
        className="input"
      />

      <button
        onClick={handleDelete}
        className="bg-red-600 text-white px-6 py-2 rounded hover:bg-red-700"
      >
        Delete Order
      </button>

      {status === "loading" && <p className="text-yellow-500">Deleting...</p>}
      {status === "success" && <p className="text-green-600">{message}</p>}
      {status === "error" && <p className="text-red-600">{message}</p>}
    </div>
  );
}
