const multer = require("multer");

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

const express = require("express");
const router = express.Router();
const Blog = require("../models/Blog");





router.post("/create", upload.single("image"), async (req, res) => {
    console.log("REQ BODY:", req.body);
  console.log("REQ FILE:", req.file);
  try {
    const blog = new Blog({
  title: req.body.title,
  content: req.body.content,
  category: req.body.category,
  date: req.body.date,
  image: req.file ? `/uploads/${req.file.filename}` : null,
});

    await blog.save();                 // ← PERMANENT SAVE
    res.status(201).json(blog);
  } catch (err) {
    console.error("SAVE ERROR:", err);
    res.status(500).json({ error: "Blog save failed" });
  }
});

// GET ALL BLOGS (for reload / permanent data)
router.get("/", async (req, res) => {
  try {
    const blogs = await Blog.find().sort({ createdAt: -1 });
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch blogs" });
  }
});

router.post("/", async (req, res) => {
  const blog = new Blog({
  title: req.body.title,
  content: req.body.content,
  category: req.body.category,
  date: req.body.date,
  image: req.file ? `/uploads/${req.file.filename}` : null,
});

  await blog.save();      // ← ye line MUST exist ho
  res.status(201).json(blog);
});


module.exports = router;
