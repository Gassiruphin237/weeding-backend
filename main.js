// main.js en CommonJS
const express = require("express");
const fs = require("fs");
const path = require("path");
const cors = require("cors");

const app = express();
const PORT = 5000;

app.use(cors());
app.use(express.json());

const DATA_PATH = path.join(__dirname, "data", "data.json");

app.get("/api/images", (req, res) => {
  try {
    const rawData = fs.readFileSync(DATA_PATH, "utf-8");
    const items = JSON.parse(rawData);
    res.json(items);
  } catch (err) {
    res.json([]);
  }
}); 

app.post("/api/images", (req, res) => {
  const { secure_url } = req.body;
  if (!secure_url) return res.status(400).json({ error: "secure_url manquant" });

  let items = [];
  try {
    const rawData = fs.readFileSync(DATA_PATH, "utf-8");
    items = JSON.parse(rawData);
  } catch (err) {
    items = [];
  }

  items.unshift({ secure_url });
  fs.writeFileSync(DATA_PATH, JSON.stringify(items, null, 2), "utf-8");
  res.json({ success: true, secure_url });
});

app.listen(5000, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
