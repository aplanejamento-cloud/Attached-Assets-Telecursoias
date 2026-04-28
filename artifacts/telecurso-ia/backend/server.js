const express = require("express");
const path = require("path");
const cors = require("cors");
const userRoutes = require("./routes/users");
const iaProfileRoutes = require("./routes/iaProfiles");
const iaVideoRoutes = require("./routes/iaVideos");

const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

app.use("/api/users", userRoutes);
app.use("/api/ia-profiles", iaProfileRoutes);
app.use("/api/ia-videos", iaVideoRoutes);

app.use("/", express.static(path.join(__dirname, "../frontend/dist")));

app.listen(PORT, () => {
  console.log(`Servidor rodando em http://localhost:${PORT}`);
});
