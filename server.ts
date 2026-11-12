import http from 'http';
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

async function startServer() {
  const httpServer = http.createServer(app);

  if (process.env.NODE_ENV !== 'production') {
    const { createServer } = await import('vite');
    const isHmrDisabled = process.env.DISABLE_HMR === 'true';

    const vite = await createServer({
      server: {
        middlewareMode: true,
        hmr: isHmrDisabled ? false : { server: httpServer },
        watch: isHmrDisabled ? null : {},
      },
      appType: 'spa',
    });

    app.use(vite.middlewares);
  } else {
    app.use(express.static('dist'));
    app.get('*', (_req, res) => {
      res.sendFile('dist/index.html', { root: '.' });
    });
  }

  httpServer.listen(PORT, '0.0.0.0', () => {
    console.log(`Server running at http://0.0.0.0:${PORT}`);
  });
}

startServer();
