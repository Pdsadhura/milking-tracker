const express = require("express");
const router = express.Router();
const MilkingSession = require("../models/MilkingSession");


router.post("/", async (req, res) => {
  try {
    const { start_time, end_time, duration, milk_quantity } = req.body;

    if (!start_time || !end_time || duration == null || milk_quantity == null) {
      return res.status(400).json({ error: "start_time, end_time, duration, milk_quantity are required" });
    }

    if (new Date(end_time) <= new Date(start_time)) {
      return res.status(400).json({ error: "end_time must be after start_time" });
    }
    if (duration < 0 || milk_quantity < 0) {
      return res.status(400).json({ error: "duration and milk_quantity must be >= 0" });
    }

    const saved = await MilkingSession.create({ start_time, end_time, duration, milk_quantity });
    res.status(201).json({
        status: 201,
        success: true,
        message: "Milking session created successfully",
        data: saved
      });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});


router.get("/", async (req, res) => {
  try {
    const sessions = await MilkingSession.find().sort({ start_time: -1 });
    res.json(sessions);
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;
