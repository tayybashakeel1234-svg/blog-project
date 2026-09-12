const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const path = require("path");
const app = express();

// ✅ middleware
app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ✅ static uploads folder
app.use("/uploads", express.static(path.join(__dirname, "uploads")));

// ✅ routes
app.use("/api/blogs", require("./routes/blog"));
app.use("/api/auth", require("./routes/auth"));

// ✅ test route
app.get("/", (req, res) => res.send("Backend running successfully"));

// ✅ PORT from environment
const PORT = process.env.PORT || 5000;

// mongoose
//   .connect(process.env.MONGO_URI, {
//     family: 4
//   })
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
//   })
//   .catch((err) => console.log("MongoDB error:", err));


// ✅ MongoDB connection + server start
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
  })
  .catch((err) => console.log("MongoDB error:", err));



// mongoose.connect("mongodb+srv://tayybashakeel1234_db_user:Tayyba12345@cluster0.abcde.mongodb.net/blog-project?retryWrites=true&w=majority") 
// .then(() => console.log("MongoDB Atlas connected")) 
// .catch(err => console.log(err));
// .connect(process.env.DB_URI, { dbName: "blog-project"})
