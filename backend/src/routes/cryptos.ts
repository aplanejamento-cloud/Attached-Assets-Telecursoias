import express from 'express';
import * as fs from 'fs';
import * as path from 'path';

const cryptosRouter = express.Router();

const cryptosPath = path.join(__dirname, '../data/cryptos.json');

cryptosRouter.get('/', (req, res) => {
  fs.readFile(cryptosPath, 'utf8', (err, data) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao ler cryptos' });
    }
    res.json(JSON.parse(data));
  });
});

cryptosRouter.post('/', (req, res) => {
  const novasCryptos = req.body;
  fs.writeFile(cryptosPath, JSON.stringify(novasCryptos), 'utf8', (err) => {
    if (err) {
      return res.status(500).json({ error: 'Erro ao salvar cryptos' });
    }
    res.json({ message: 'Cryptos salvas' });
  });
});

export { cryptosRouter };
