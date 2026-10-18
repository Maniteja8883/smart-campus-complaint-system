const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const Complaint = require("../models/Complaint");
const auth = require("../middleware/auth");

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/");
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname));
  }
});

const upload = multer({ storage: storage });

router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const title = req.body.title;
    const category = req.body.category;
    const description = req.body.description;

    if (!title || !description) {
      return res.status(400).json({ message: "please fill all fields" });
    }

    let image = "";
    if (req.file) {
      image = req.file.filename;
    }

    const newComplaint = new Complaint({
      title: title,
      category: category || "Other",
      description: description,
      image: image,
      user: req.user.id
    });

    await newComplaint.save();
    res.status(201).json({ message: "complaint submitted successfully", complaint: newComplaint });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/my", auth, async (req, res) => {
  try {
    const complaints = await Complaint.find({ user: req.user.id }).sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.get("/all", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "access denied" });
    }

    const complaints = await Complaint.find().populate("user", "name email").sort({ createdAt: -1 });
    res.json(complaints);
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

router.put("/:id", auth, async (req, res) => {
  try {
    if (req.user.role !== "admin") {
      return res.status(403).json({ message: "access denied" });
    }

    const status = req.body.status;
    const assignedTo = req.body.assignedTo;

    const complaint = await Complaint.findById(req.params.id);
    if (!complaint) {
      return res.status(404).json({ message: "complaint not found" });
    }

    if (status) {
      complaint.status = status;
    }
    if (assignedTo !== undefined) {
      complaint.assignedTo = assignedTo;
    }

    await complaint.save();
    res.json({ message: "complaint updated successfully", complaint: complaint });
  } catch (err) {
    res.status(500).json({ message: "something went wrong" });
  }
});

module.exports = router;
