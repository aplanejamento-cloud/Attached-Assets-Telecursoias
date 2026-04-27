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

function writeProfiles(profiles) {
  fs.writeFileSync(profilesFile, JSON.stringify(profiles, null, 2));
}

function readVideos() {
  if (fs.existsSync(videosFile)) {
    return JSON.parse(fs.readFileSync(videosFile, "utf-8"));
  }
  return [];
}

function writeVideos(videos) {
  fs.writeFileSync(videosFile, JSON.stringify(videos, null, 2));
}

router.get("/api/ia-profiles", (req, res) => {
  const profiles = readProfiles();
  res.json(profiles);
});

router.get("/api/ia-profiles/:id", (req, res) => {
  const id = Number(req.params.id);
  const profiles = readProfiles();
  const profile = profiles.find((p) => p.id === id);

  if (!profile) {
    return res.status(404).json({ error: "Perfil de IA não encontrado." });
  }

  res.json(profile);
});

router.post("/api/ia-profiles", (req, res) => {
  const { nome, tipo, descricao, avatar, videos = [] } = req.body;

  if (!nome || !tipo || !descricao) {
    return res.status(400).json({ error: "Nome, tipo e descrição são obrigatórios." });
  }

  const profiles = readProfiles();
  const id = profiles.length ? Math.max(...profiles.map((p) => p.id)) + 1 : 1;

  const newProfile = {
    id,
    nome,
    tipo,
    descricao,
    avatar,
    videos: videos.map((v) => v.id),
    createdAt: new Date().toISOString(),
  };

  profiles.push(newProfile);
  writeProfiles(profiles);

  if (videos.length) {
    const allVideos = [...readVideos(), ...videos.map((v) => ({ ...v, iaId: id }))];
    writeVideos(allVideos);
  }

  res.status(201).json(newProfile);
});

router.put("/api/ia-profiles/:id", (req, res) => {
  const id = Number(req.params.id);
  const { nome, tipo, descricao, avatar } = req.body;

  const profiles = readProfiles();
  const index = profiles.findIndex((p) => p.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Perfil de IA não encontrado." });
  }

  profiles[index] = {
    ...profiles[index],
    nome,
    tipo,
    descricao,
    avatar,
    updatedAt: new Date().toISOString(),
  };

  writeProfiles(profiles);
  res.json(profiles[index]);
});

module.exports = router;
