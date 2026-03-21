const express = require("express");
const router = express.Router();
const Data = require("../models/Data");

// POST /api/data
router.post("/", async (req, res) => {
  try {
    const newData = new Data(req.body);
    await newData.save();
    res.json({ message: "Data stored successfully" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// (Optional) GET all data
router.get("/", async (req, res) => {
  try {
    const data = await Data.find().limit(100);
    res.json(data);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;