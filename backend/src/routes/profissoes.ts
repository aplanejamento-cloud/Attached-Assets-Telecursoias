import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const profissoesRouter = express.Router();

const profissoesPath = path.join(__dirname, '../data/profissoes.json');

profissoesRouter.get('/', (req, res) => {
  fs.readFile(profissoesPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler profissões' });
    }
    res.json(JSON.parse(data));
  });
});

profissoesRouter.post('/', (req, res) => {
  const novasProfissoes = req.body;
  fs.writeFile(profissoesPath, JSON.stringify(novasProfissoes), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar profissões' });
    }
    res.json({ message: 'Profissões salvas' });
  });
});

export { profissoesRouter };
