import { useState } from "react";
import Navbar from "./components/Navbar";
import OrderDetailsPage from "./components/OrderDetailsPage";

function App() {
  const [activeOption, setActiveOption] = useState("read");

  const renderPage = () => {
    switch (activeOption) {
      case "create":
        return <div className="p-6">Create Page (Form to add order)</div>;
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
