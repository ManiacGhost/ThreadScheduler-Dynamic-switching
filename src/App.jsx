import { useState } from "react";
import Navbar from "./components/Navbar";
import OrderDetailsPage from "./components/OrderDetailsPage";
import CreateOrderPage from "./components/CreateOrderPage";

function App() {
  const [activeOption, setActiveOption] = useState("read");

  const renderPage = () => {
    switch (activeOption) {
      case "create":
        return <CreateOrderPage />;
      case "read":
        return <OrderDetailsPage />;
      case "update":
        return <div className="p-6">Update Page (Select & edit order)</div>;
      case "delete":
        return <div className="p-6">Delete Page (Delete confirmation)</div>;
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
