import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const projetosRouter = express.Router();

const projetosPath = path.join(__dirname, '../data/projetos.json');

projetosRouter.get('/', (req, res) => {
  fs.readFile(projetosPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler projetos' });
    }
    res.json(JSON.parse(data));
  });
});

projetosRouter.post('/', (req, res) => {
  const novosProjetos = req.body;
  fs.writeFile(projetosPath, JSON.stringify(novosProjetos), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar projetos' });
    }
    res.json({ message: 'Projetos salvos' });
  });
});

export { projetosRouter };
