import cors from 'cors';
import dotenv from 'dotenv';
import express, { ErrorRequestHandler } from 'express';
import { connectDatabase } from './config/database';
import apiRouter from './routes';

dotenv.config();

const app = express();
const port = 8000;
const codespaceName = process.env.CODESPACE_NAME;
const apiUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : `http://localhost:${port}`;

app.use(cors());
app.use(express.json());
app.get('/health', (_request, response) => response.json({ status: 'ok', apiUrl }));
app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (error, _request, response, _next) => {
  console.error(error);
  response.status(400).json({ error: error instanceof Error ? error.message : 'Request failed' });
};
app.use(errorHandler);

async function startServer() {
  try {
    await connectDatabase();
    app.listen(port, () => console.log(`Octofit API listening at ${apiUrl}`));
  } catch (error) {
    console.error('Unable to start API:', error);
    process.exit(1);
  }
}

if (require.main === module) {
  startServer();
}

export { app, startServer };