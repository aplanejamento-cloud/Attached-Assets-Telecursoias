import express from 'express';
import { authRouter } from './routes/auth';
import { profissoesRouter } from './routes/profissoes';
import { hobbiesRouter } from './routes/hobbies';
import { projetosRouter } from './routes/projetos';
import { relógioRouter } from './routes/relógio';
import { cryptosRouter } from './routes/cryptos';

export const app = express();

app.use('/api/auth', authRouter);
app.use('/api/profissoes', profissoesRouter);
app.use('/api/hobbies', hobbiesRouter);
app.use('/api/projetos', projetosRouter);
app.use('/api/relógio', relógioRouter);
app.use('/api/cryptos', cryptosRouter);
