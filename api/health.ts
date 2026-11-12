import type { Request, Response } from 'express';

export interface HealthCheckResponse {
  status: 'ok' | 'degraded' | 'error';
  service: string;
  timestamp: string;
  uptimeSeconds: number;
  environment: string;
  lta: {
    endpoint: string;
    isKeyConfigured: boolean;
    headerRequired: string;
  };
}

/**
 * Serverless Health Check endpoint
 * Route: /api/health
 */
export default async function handler(req: Request | any, res: Response | any) {
  // Support CORS for serverless environments
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    res.setHeader('Content-Type', 'application/json');
  }

  if (req.method === 'OPTIONS') {
    return res.status?.(200)?.end?.() ?? res.end?.();
  }

  const ltaKey = process.env.LTA_ACCOUNT_KEY || process.env.LTA_DATAMALL_KEY;
  const isKeyConfigured = Boolean(ltaKey && ltaKey.trim().length > 0);

  const payload: HealthCheckResponse = {
    status: 'ok',
    service: 'parksg-lta-carpark-service',
    timestamp: new Date().toISOString(),
    uptimeSeconds: Math.floor(process.uptime ? process.uptime() : 0),
    environment: process.env.NODE_ENV || 'development',
    lta: {
      endpoint: 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2',
      isKeyConfigured,
      headerRequired: 'AccountKey: <LTA_ACCOUNT_KEY>',
    },
  };

  if (typeof res.status === 'function') {
    return res.status(200).json(payload);
  }
  
  // Fallback for native Node response
  res.writeHead(200, { 'Content-Type': 'application/json' });
  return res.end(JSON.stringify(payload));
}
