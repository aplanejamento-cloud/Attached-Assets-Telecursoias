const express = require("express");
const fs = require("fs");
const path = require("path");

const router = express.Router();

const videosFile = path.join(__dirname, "../data/ia_videos.json");

function readVideos() {
  if (fs.existsSync(videosFile)) {
    return JSON.parse(fs.readFileSync(videosFile, "utf-8"));
  }
  return [];
}

function writeVideos(videos) {
  fs.writeFileSync(videosFile, JSON.stringify(videos, null, 2));
}

router.get("/api/ia-videos", (req, res) => {
  const iaId = req.query.iaId ? Number(req.query.iaId) : null;
  const videos = readVideos();

  const filtered = iaId ? videos.filter((v) => v.iaId === iaId) : videos;

  res.json(filtered);
});

router.get("/api/ia-videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const videos = readVideos();
  const video = videos.find((v) => v.id === id);

  if (!video) {
    return res.status(404).json({ error: "Vídeo não encontrado." });
  }

  res.json(video);
});

router.post("/api/ia-videos", (req, res) => {
  const { titulo, descricao, url, iaId, thumbnail = "" } = req.body;

  if (!titulo || !descricao || !url || !iaId) {
    return res.status(400).json({ error: "Título, descrição, URL e iaId são obrigatórios." });
  }

  const videos = readVideos();
  const id = videos.length ? Math.max(...videos.map((v) => v.id)) + 1 : 1;

  const newVideo = {
    id,
    iaId,
    titulo,
    descricao,
    url,
    thumbnail,
    createdAt: new Date().toISOString(),
  };

  videos.push(newVideo);
  writeVideos(videos);

  res.status(201).json(newVideo);
});

router.put("/api/ia-videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const { titulo, descricao, url, thumbnail } = req.body;

  const videos = readVideos();
  const index = videos.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Vídeo não encontrado." });
  }

  videos[index] = {
    ...videos[index],
    titulo,
    descricao,
    url,
    thumbnail,
    updatedAt: new Date().toISOString(),
  };

  writeVideos(videos);
  res.json(videos[index]);
});

router.delete("/api/ia-videos/:id", (req, res) => {
  const id = Number(req.params.id);
  const videos = readVideos();
  const index = videos.findIndex((v) => v.id === id);

  if (index === -1) {
    return res.status(404).json({ error: "Vídeo não encontrado." });
  }

  videos.splice(index, 1);
  writeVideos(videos);

  res.json({ ok: true, message: "Vídeo deletado." });
});

module.exports = router;
