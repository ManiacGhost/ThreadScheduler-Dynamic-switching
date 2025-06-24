import { useState } from "react";
import Navbar from "./components/Navbar";
import OrderDetailsPage from "./components/OrderDetailsPage";
import CreateOrderPage from "./components/CreateOrderPage";
import DeleteOrderPage from "./components/DeleteOrderPage";
import UpdateOrderPage from "./components/UpdateOrderPage";

function App() {
  const [activeOption, setActiveOption] = useState("read");

  const renderPage = () => {
    switch (activeOption) {
      case "create":
        return <CreateOrderPage />;
      case "read":
        return <OrderDetailsPage />;
      case "update":
        return <UpdateOrderPage />;
      case "delete":
        return <DeleteOrderPage />;
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSelect={setActiveOption} />
      {renderPage()}
    </div>
  );
}

export default App;
