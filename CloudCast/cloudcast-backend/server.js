const express = require("express");
const mysql = require("mysql2");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME
});

db.connect(err => {
  if (err) {
    console.error("DB connection failed:", err);
    return;
  }
  console.log("Connected to MySQL");
});

// --- Songs Endpoints ---

// Get all songs
app.get("/api/songs", (req, res) => {
  db.query("SELECT * FROM songs", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a song
app.post("/api/songs", (req, res) => {
  const { title, artist, file_url } = req.body;
  db.query(
    "INSERT INTO songs (title, artist, file_url) VALUES (?, ?, ?)",
    [title, artist, file_url],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, artist, file_url });
    }
  );
});

// --- Podcasts Endpoints ---

// Get all podcasts
app.get("/api/podcasts", (req, res) => {
  db.query("SELECT * FROM podcasts", (err, results) => {
    if (err) return res.status(500).json(err);
    res.json(results);
  });
});

// Add a podcast
app.post("/api/podcasts", (req, res) => {
  const { title, embed_url } = req.body;
  db.query(
    "INSERT INTO podcasts (title, embed_url) VALUES (?, ?)",
    [title, embed_url],
    (err, result) => {
      if (err) return res.status(500).json(err);
      res.json({ id: result.insertId, title, embed_url });
    }
  );
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
