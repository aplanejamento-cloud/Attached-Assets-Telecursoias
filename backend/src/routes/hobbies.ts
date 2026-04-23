import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const hobbiesRouter = express.Router();

const hobbiesPath = path.join(__dirname, '../data/hobbies.json');

hobbiesRouter.get('/', (req, res) => {
  fs.readFile(hobbiesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler hobbies' });
    }
    res.json(JSON.parse(data));
  });
});

hobbiesRouter.post('/', (req, res) => {
  const novosHobbies = req.body;
  fs.writeFile(hobbiesPath, JSON.stringify(novosHobbies), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar hobbies' });
    }
    res.json({ message: 'Hobbies salvos' });
  });
});

export { hobbiesRouter };
