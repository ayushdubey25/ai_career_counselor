import { Link } from "react-router-dom";

const Navbar = () => (
  <nav className="p-4 bg-blue-600 text-white flex gap-4">
    <Link to="/">Home</Link>
    <Link to="/login">Login</Link>
    <Link to="/register">Register</Link>
  </nav>
);

export default Navbar;
