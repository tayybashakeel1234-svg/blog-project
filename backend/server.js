// const express = require("express");
// const mongoose = require("mongoose");
// const cors = require("cors");

// const blogRoutes = require("./routes/blog");

// app.use("/api/blogs", blogRoutes);


// require("dotenv").config();

// // ✅ app FIRST
// const app = express();

// // ✅ middleware
// app.use(cors());
// app.use(express.json());
// app.use(express.urlencoded({ extended: true }));
// app.use("/api/blogs", require("./routes/blog"));


// // ✅ routes AFTER app
// const authRoutes = require("./routes/auth");
// app.use("/api/auth", authRoutes);

// // test route
// app.get("/", (req, res) => {
//   res.send("Backend running successfully");
// });

// const PORT = 5000;

// // ✅ database connect + server start
// mongoose
//   .connect(process.env.MONGO_URI)
//   .then(() => {
//     console.log("MongoDB connected");
//     app.listen(PORT, () => {
//       console.log(`Server running on port ${PORT}`);
//     });
//   })
//   .catch((err) => console.log("MongoDB error:", err));


const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();
const app = express();
const path = require("path");

app.use("/uploads", express.static(path.join(__dirname, "uploads")));


// middleware
app.use(express.json());
app.use(cors());

app.use(express.urlencoded({ extended: true }));

app.use("/uploads", express.static("uploads"));


// routes
app.use("/api/blogs", require("./routes/blog"));
app.use("/api/auth", require("./routes/auth"));

app.listen(5000, () => {
  console.log("Server running on port 5000");
});

// test route
app.get("/", (req, res) => res.send("Backend running successfully"));

// DB + server
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("MongoDB connected");
    app.listen(5000, () => console.log("Server running on port 5000"));
  })
  .catch(err => console.log("MongoDB error:", err));
