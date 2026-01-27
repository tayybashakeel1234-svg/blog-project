import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import BlogCard from "../components/BlogCard";
import CreateBlog from "../components/CreateBlog";
import "../css/blog.css";

function Page() {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const [showCreate, setShowCreate] = useState(false);

  // Auth check
  const user = JSON.parse(localStorage.getItem("user"));
  useEffect(() => {
    if (!user) navigate("/signin"); // redirect if not logged in
  }, []);

  // Fetch blogs
  const fetchBlogs = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/blogs");
      const data = await res.json();
      setBlogs(data);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="blogpage-container">
        <button className="create-btn" onClick={() => setShowCreate(true)}>
          Create New Blog
        </button>

        {showCreate && (
          <CreateBlog
            user={user}
            onClose={() => {
              setShowCreate(false);
              fetchBlogs(); // refresh after creating blog
            }}
          />
        )}

        <div className="blogs-grid">
          {blogs.map((blog) => (
            <BlogCard key={blog._id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}

export default Page;
