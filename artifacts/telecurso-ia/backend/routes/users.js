const express = require("express");
const fs = require("fs");
const path = require("path");
const bcrypt = require("bcrypt");

const router = express.Router();

const usersFile = path.join(__dirname, "../data/users.json");

function readUsers() {
  if (fs.existsSync(usersFile)) {
    return JSON.parse(fs.readFileSync(usersFile, "utf-8"));
  }
  return [];
}

function writeUsers(users) {
  fs.writeFileSync(usersFile, JSON.stringify(users, null, 2));
}

router.post("/api/users/register", async (req, res) => {
  const { nome, sobrenome, whatsapp, email, profissao, password } = req.body;

  if (!nome || !sobrenome || !whatsapp || !email || !profissao || !password) {
    return res.status(400).json({ error: "Preencha todos os campos." });
  }

  const users = readUsers();
  const existing = users.find((u) => u.email === email);
  if (existing) {
    return res.status(409).json({ error: "E‑mail já cadastrado." });
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const newUser = {
    id: users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    nome,
    sobrenome,
    whatsapp,
    email,
    profissao,
    password: hashedPassword,
    createdAt: new Date().toISOString(),
  };

  users.push(newUser);
  writeUsers(users);

  res.json({ ok: true, message: "Usuário criado com sucesso." });
});

router.post("/api/users/login", async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password) {
    return res.status(400).json({ error: "E‑mail e senha são obrigatórios." });
  }

  const users = readUsers();
  const user = users.find((u) => u.email === email);

  if (!user || !(await bcrypt.compare(password, user.password))) {
    return res.status(401).json({ error: "E‑mail ou senha incorretos." });
  }

  res.json({ ok: true, user: { id: user.id, nome: user.nome, email: user.email, profissao: user.profissao } });
});

router.post("/api/auth/google", (req, res) => {
  const { email, nome, sobrenome } = req.body;

  const users = readUsers();
  let user = users.find((u) => u.email === email);

  if (!user) {
    const id = users.length ? Math.max(...users.map((u) => u.id)) + 1 : 1;
    user = {
      id,
      nome,
      sobrenome,
      whatsapp: "",
      email,
      profissao: "Sem profissão definida",
      password: "",
      viaGoogle: true,
      createdAt: new Date().toISOString(),
    };
    users.push(user);
    writeUsers(users);
  }

  res.json({ ok: true, user: { id: user.id, nome: user.nome, sobrenome: user.sobrenome, email: user.email, viaGoogle: true } });
});

module.exports = router;
