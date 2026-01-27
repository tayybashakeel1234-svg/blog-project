import Navbar from "../components/Navbar";
import "./HomePage.css";

function HomePage() {
  return (
    <div className="home-container">
      <Navbar />

      <div className="hero">
        <h1>Share Your Thoughts With The World</h1>
        <p>
          Create blogs, read ideas, and express yourself freely on our platform.
        </p>
      </div>
    </div>
  );
}

export default HomePage;

