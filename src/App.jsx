import { useEffect, useState } from "react";
import Navbar from "./components/Navbar";
import HomeContent from "./components/HomeContent";

function App() {
  const [data, setData] = useState([]);
  const [activeOption, setActiveOption] = useState("home");

  useEffect(() => {
    fetch(`http://localhost:5000/api/${activeOption}`)
      .then((res) => res.json())
      .then((data) => setData(data))
      .catch((err) => console.error("API Error:", err));
  }, [activeOption]);

  return (
    <div className="min-h-screen bg-gray-100">
      <Navbar onSelect={setActiveOption} />
      <HomeContent data={data} />
    </div>
  );
}

export default App;
