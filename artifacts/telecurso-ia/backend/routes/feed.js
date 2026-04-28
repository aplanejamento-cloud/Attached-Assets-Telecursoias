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

router.get("/api/feed", (req, res) => {
  const profiles = readProfiles();
  const videos = readVideos();

  const feed = profiles.map((p) => {
    const iaVideos = videos.filter((v) => v.iaId === p.id);
    return {
      ...p,
      videos: iaVideos,
    };
  });

  res.json(feed);
});

module.exports = router;
