const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const profilesFile = path.join(__dirname, "../data/ia_profiles.json");
const videosFile = path.join(__dirname, "../data/ia_videos.json");

function readProfiles() {
  if (fs.existsSync(profilesFile)) {
    return JSON.parse(fs.readFileSync(profilesFile, "utf-8"));
  }
  return [];
}

function readVideos() {
  if (fs.existsSync(videosFile)) {
    return JSON.parse(fs.readFileSync(videosFile, "utf-8"));
  }
  return [];
}

router.get("/api/ia/:id", (req, res) => {
  const id = Number(req.params.id);
  const profiles = readProfiles();
  const profile = profiles.find(p => p.id === id);

  if (!profile) {
    return res.status(404).json({ error: "Perfil de IA não encontrado." });
  }

  const videos = readVideos();
  const iaVideos = videos.filter(v => v.iaId === id);

  res.json({
    ...profile,
    videos: iaVideos,
  });
});

module.exports = router;
