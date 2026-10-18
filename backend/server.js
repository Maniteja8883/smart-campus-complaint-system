const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dotenv = require("dotenv");

dotenv.config();

const userRoutes = require("./routes/userRoutes");
const complaintRoutes = require("./routes/complaintRoutes");

const app = express();

app.use(cors());
app.use(express.json());
app.use("/uploads", express.static("uploads"));

app.use("/api/users", userRoutes);
app.use("/api/complaints", complaintRoutes);

const PORT = process.env.PORT || 5001;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/campus_complaints";

mongoose.connect(MONGO_URI)
  .then(() => {
    console.log("connected to mongodb");
    app.listen(PORT, () => {
      console.log("server running on port " + PORT);
    });
  })
  .catch((err) => {
    console.log("mongodb connection error", err);
  });
