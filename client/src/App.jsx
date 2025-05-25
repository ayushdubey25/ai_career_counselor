import { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import ChatPage from "./pages/ChatPage";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Features from "./pages/Features";
import CloudAnimation from "./components/CloudAnimation";

function App() {
  const [showCloud, setShowCloud] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowCloud(false);
    }, 3000); // Show animation for 3 seconds

    return () => clearTimeout(timer);
  }, []);

  return (
    <div className="app">
      {showCloud ? (
        <CloudAnimation />
      ) : (
        <Router>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/chat" element={<ChatPage />} />
            <Route path="/features" element={<Features />} />
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
