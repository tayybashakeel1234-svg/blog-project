import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <h2 className="logo">MyBlog</h2>

      <div className="nav-links">
        <Link to="/signin" className="nav-btn">Sign In</Link>
        <Link to="/signup" className="nav-btn outline">Sign Up</Link>
      </div>
    </nav>
  );
}

export default Navbar;
