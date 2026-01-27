const mongoose = require("mongoose");

// const blogSchema = new mongoose.Schema({
//   heading: String,
//   imageURL: String,
//   content: String,
//   author: String,
//   createdAt: { type: Date, default: Date.now },
// });

const blogSchema = new mongoose.Schema(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    image: { type: String },
    category: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Blog", blogSchema);
