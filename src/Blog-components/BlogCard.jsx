function BlogCard({ blog }) {
  return (
    <div className="blog-card">
      {blog.imageURL && <img src={blog.imageURL} alt={blog.heading} />}
      <h3>{blog.heading}</h3>
      <p>{blog.content}</p>
      <span>By: {blog.author}</span>
    </div>
  );
}

export default BlogCard;
