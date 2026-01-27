const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");

// GET all blogs
router.get("/", async (req, res) => {
  const blogs = await Blog.find().sort({ createdAt: -1 });
  res.json(blogs);
});

// POST new blog
router.post("/", async (req, res) => {
  const { heading, imageURL, content, author } = req.body;
  const blog = new Blog({ heading, imageURL, content, author });
  await blog.save();
  res.status(201).json(blog);
});



// Get all blogs
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Create new blog
router.post("/", async (req, res) => {
  const { title, content, image } = req.body;
  const newBlog = new Blog({ title, content, image });
  try {
    const savedBlog = await newBlog.save();
    res.status(201).json(savedBlog);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

module.exports = router;
