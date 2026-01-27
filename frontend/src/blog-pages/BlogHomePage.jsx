import { Link } from "react-router-dom";
import Navbar from "../components/Navbar";
import "./home.css"; // existing styling

function BlogHomePage() {
  const user = JSON.parse(localStorage.getItem("user"));

  return (
    <div>
      <Navbar />
      <div className="home-container">
        <h1>Welcome to My Blog System</h1>
        {!user ? (
          <div className="home-links">
            <Link to="/signup" className="btn">Sign Up</Link>
            <Link to="/signin" className="btn">Sign In</Link>
          </div>
        ) : (
          <div className="home-links">
            <Link to="/blogpage" className="btn">Go to Blog Page</Link>
          </div>
        )}
      </div>
    </div>
  );
}

export default BlogHomePage;
