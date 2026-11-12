import express from 'express';
import dotenv from 'dotenv';
import healthHandler from './api/health.ts';
import carparkAvailabilityHandler from './api/carparkavailability.ts';

dotenv.config();

const app = express();
const PORT = Number(process.env.PORT) || 3000;

app.use(express.json());

// Serverless API Endpoints mounted in Express
app.all('/api/health', (req, res) => healthHandler(req, res));
app.all('/api/carparkavailability', (req, res) => carparkAvailabilityHandler(req, res));
app.all('/api/carpark-availability', (req, res) => carparkAvailabilityHandler(req, res));

// Vite middleware in dev or static files in production
async function startServer() {
  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const vite = await createServer({
      server: { middlewareMode: true, port: PORT, host: '0.0.0.0' },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  app.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
