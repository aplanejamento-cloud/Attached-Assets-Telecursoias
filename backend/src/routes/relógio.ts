import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const relógioRouter = express.Router();

const relógioPath = path.join(__dirname, '../data/relógio.json');

relógioRouter.get('/', (req, res) => {
  fs.readFile(relógioPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler relógio' });
    }
    res.json(JSON.parse(data));
  });
});

relógioRouter.post('/', (req, res) => {
  const novosVotos = req.body;
  fs.writeFile(relógioPath, JSON.stringify(novosVotos), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar votos' });
    }
    res.json({ message: 'Votos salvos' });
  });
});

export { relógioRouter };
