import express from 'express';
import cors from 'cors';
import snippetRoutes from './routes/snippet.routes';

const app = express();
app.use(cors());
app.use(express.json());
app.use(snippetRoutes);

export default app;