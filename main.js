const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MongoDB
// Remplace par ta vraie chaîne de connexion récupérée sur Atlas
const MONGO_URI = "mongodb+srv://ruphin_db_user:tAYs99xv4ZgEJQjv@cluster0.p9jgdcq.mongodb.net/"; 

mongoose.connect(MONGO_URI)
  .then(() => console.log("Connecté à MongoDB"))
  .catch(err => console.error("Erreur connexion mongo:", err));

// Modèle de données
const ImageSchema = new mongoose.Schema({
  secure_url: String,
  createdAt: { type: Date, default: Date.now }
});
const Image = mongoose.model("Image", ImageSchema);

// ROUTES
app.get("/api/images", async (req, res) => {
  try {
    const images = await Image.find().sort({ createdAt: -1 }); // Les plus récentes d'abord
    res.json(images);
  } catch (err) {
    res.status(500).json([]);
  }
});

app.post("/api/images", async (req, res) => {
  try {
    const { secure_url } = req.body;
    if (!secure_url) return res.status(400).json({ error: "URL manquante" });

    const newImage = new Image({ secure_url });
    await newImage.save();

    res.json({ success: true, secure_url });
  } catch (err) {
    res.status(500).json({ success: false, message: "Erreur DB" });
  }
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Serveur sur port ${PORT}`));