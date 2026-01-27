import { Link, useNavigate } from "react-router-dom";
import "./navbar.css"; // aap isme styling add kar sakti ho

function Navbar() {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const handleLogout = () => {
    localStorage.removeItem("user"); // clear auth state
    navigate("/"); // redirect to home
  };

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <Link to={user ? "/blogpage" : "/"} className="logo">
          MyBlog
        </Link>
      </div>

      <div className="navbar-right">
        {!user && (
          <>
            <Link to="/signup" className="nav-btn">Sign Up</Link>
            <Link to="/signin" className="nav-btn">Sign In</Link>
          </>
        )}

        {user && (
          <>
            <span className="welcome-text">Hi, {user.username}</span>
            <button onClick={handleLogout} className="nav-btn">Logout</button>
          </>
        )}
      </div>
    </nav>
  );
}

export default Navbar;
