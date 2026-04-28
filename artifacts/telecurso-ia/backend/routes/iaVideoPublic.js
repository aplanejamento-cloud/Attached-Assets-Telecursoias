const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const videosFile = path.join(__dirname, "../data/ia_videos.json");
const profilesFile = path.join(__dirname, "../data/ia_profiles.json");

function readVideos() {
  if (fs.existsSync(videosFile)) {
    return JSON.parse(fs.readFileSync(videosFile, "utf-8"));
  }
  return [];
}

function readProfiles() {
  if (fs.existsSync(profilesFile)) {
    return JSON.parse(fs.readFileSync(profilesFile, "utf-8"));
  }
  return [];
}

router.get("/api/video/:id", (req, res) => {
  const id = Number(req.params.id);
  const videos = readVideos();
  const video = videos.find(v => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Vídeo não encontrado." });
  }

  const profiles = readProfiles();
  const ia = profiles.find(p => p.id === video.iaId);

  res.json({
    ...video,
    ia: ia || null,
  });
});

module.exports = router;
