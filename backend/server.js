const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const connectDB = require("./config/db");


dotenv.config();
connectDB();

const app = express();
// app.use(cors({ origin: process.env.ALLOWED_ORIGIN || "*" }));
app.use(cors());
app.use(express.json());


app.get("/health", (_req, res) => res.json({ status: "ok" }));
app.get("/", (_req, res) => {
    res.send("Welcome to Milking Tracker API");
  });

app.use("/sessions", require("./routes/sessionRoutes"));


app.use((err, _req, res, _next) => {
  console.error("Unhandled error:", err);
  res.status(500).json({ error: "Internal Server Error" });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`API running on ${PORT}`));
