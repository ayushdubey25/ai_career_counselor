import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import QuestionForm from "./pages/QuestionForm";
import Report from "./pages/Report";
import Suggestions from "./pages/Suggestions";
import Navbar from "./components/Navbar";

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/ai/question" element={<QuestionForm />} />
        <Route path="/ai/report" element={<Report />} />
        <Route path="/ai/suggest" element={<Suggestions />} />
      </Routes>
    </Router>
  );
}

export default App;
