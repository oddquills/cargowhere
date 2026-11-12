import type { Request, Response } from 'express';

const LTA_DATAMALL_URL = 'https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2';

export interface LTACarparkItem {
  CarParkID: string;
  Area: string;
  Development: string;
  Location: string; // "latitude longitude" e.g. "1.29375 103.85718"
  AvailableLots: number;
  LotType: 'C' | 'H' | 'Y'; // C: Car, H: Heavy, Y: Motorcycle
  Agency: 'HDB' | 'LTA' | 'URA';
}

export interface LTAResponse {
  'odata.metadata'?: string;
  value: LTACarparkItem[];
}

// In-memory cache to prevent hitting LTA rate limits (DataMall updates every ~1 min)
interface CacheEntry {
  timestamp: number;
  data: LTAResponse;
}

const memoryCache = new Map<string, CacheEntry>();
const CACHE_TTL_MS = 45 * 1000; // 45 seconds cache

/**
 * Serverless function: Pulls live carpark lot availability from LTA DataMall
 * Endpoint: https://datamall2.mytransport.sg/ltaodataservice/CarParkAvailabilityv2
 * Required Header: AccountKey: <LTA_ACCOUNT_KEY>
 * Route: /api/carparkavailability
 */
export default async function handler(req: Request | any, res: Response | any) {
  // CORS support
  if (res.setHeader) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization, AccountKey');
    res.setHeader('Content-Type', 'application/json');
  }

  if (req.method === 'OPTIONS') {
    return res.status?.(200)?.end?.() ?? res.end?.();
  }

  // Get AccountKey from environment variable (never hardcoded)
  const ltaAccountKey =
    process.env.LTA_ACCOUNT_KEY ||
    process.env.LTA_DATAMALL_KEY ||
    (req.headers?.['accountkey'] as string) ||
    '';

  // If key is not yet configured by the user
  if (!ltaAccountKey || ltaAccountKey.trim().length === 0) {
    const errorResponse = {
      success: false,
      configured: false,
      error: 'LTA_ACCOUNT_KEY_NOT_CONFIGURED',
      message:
        'LTA_ACCOUNT_KEY is missing. Please set LTA_ACCOUNT_KEY in your environment variables (.env file or server environment). Request a free key at https://datamall.lta.gov.sg/',
      endpoint: LTA_DATAMALL_URL,
      headerRequired: 'AccountKey',
      timestamp: new Date().toISOString(),
      value: [],
    };

    if (typeof res.status === 'function') {
      return res.status(200).json(errorResponse);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(errorResponse));
  }

  // Parse query parameters
  const query = req.query || {};
  const skip = query.skip || query['$skip'] ? String(query.skip || query['$skip']) : '';
  const fetchAll = query.all === 'true' || query.fetchAll === 'true';
  const cacheKey = `lta_carparks_${skip}_${fetchAll}`;

  // Check cache
  const cached = memoryCache.get(cacheKey);
  const now = Date.now();
  if (cached && now - cached.timestamp < CACHE_TTL_MS) {
    const payload = {
      success: true,
      cached: true,
      cacheAgeSeconds: Math.floor((now - cached.timestamp) / 1000),
      timestamp: new Date(cached.timestamp).toISOString(),
      ...cached.data,
    };

    if (typeof res.status === 'function') {
      return res.status(200).json(payload);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(payload));
  }

  try {
    if (fetchAll) {
      // LTA returns max 500 items per request. Fetch multiple pages if requested.
      const allItems: LTACarparkItem[] = [];
      let currentSkip = 0;
      let hasMore = true;
      let iterations = 0;

      while (hasMore && iterations < 8) {
        iterations++;
        const targetUrl = `${LTA_DATAMALL_URL}?$skip=${currentSkip}`;
        const pageRes = await fetch(targetUrl, {
          headers: {
            AccountKey: ltaAccountKey.trim(),
            accept: 'application/json',
          },
        });

        if (!pageRes.ok) {
          throw new Error(`LTA DataMall responded with status ${pageRes.status}: ${pageRes.statusText}`);
        }

        const pageData = (await pageRes.json()) as LTAResponse;
        const pageItems = pageData.value || [];
        allItems.push(...pageItems);

        if (pageItems.length < 500) {
          hasMore = false;
        } else {
          currentSkip += 500;
        }
      }

      const resultData: LTAResponse = {
        'odata.metadata': `${LTA_DATAMALL_URL}/$metadata#CarParkAvailabilityv2`,
        value: allItems,
      };

      memoryCache.set(cacheKey, { timestamp: now, data: resultData });

      const responsePayload = {
        success: true,
        cached: false,
        totalLotsReturned: allItems.length,
        timestamp: new Date().toISOString(),
        ...resultData,
      };

      if (typeof res.status === 'function') {
        return res.status(200).json(responsePayload);
      }
      res.writeHead(200, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(responsePayload));
    }

    // Single page fetch
    const targetUrl = skip ? `${LTA_DATAMALL_URL}?$skip=${skip}` : LTA_DATAMALL_URL;
    const ltaResponse = await fetch(targetUrl, {
      method: 'GET',
      headers: {
        AccountKey: ltaAccountKey.trim(),
        accept: 'application/json',
      },
    });

    if (ltaResponse.status === 401 || ltaResponse.status === 403) {
      const authError = {
        success: false,
        error: 'LTA_AUTHENTICATION_FAILED',
        message: 'LTA DataMall rejected the AccountKey. Please verify your AccountKey at https://datamall.lta.gov.sg/',
        statusCode: ltaResponse.status,
        timestamp: new Date().toISOString(),
      };
      if (typeof res.status === 'function') {
        return res.status(401).json(authError);
      }
      res.writeHead(401, { 'Content-Type': 'application/json' });
      return res.end(JSON.stringify(authError));
    }

    if (!ltaResponse.ok) {
      throw new Error(`LTA DataMall error: ${ltaResponse.status} ${ltaResponse.statusText}`);
    }

    const data = (await ltaResponse.json()) as LTAResponse;
    memoryCache.set(cacheKey, { timestamp: now, data });

    const payload = {
      success: true,
      cached: false,
      timestamp: new Date().toISOString(),
      ...data,
    };

    if (typeof res.status === 'function') {
      return res.status(200).json(payload);
    }
    res.writeHead(200, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(payload));
  } catch (err: any) {
    const errorPayload = {
      success: false,
      error: 'LTA_DATAMALL_FETCH_ERROR',
      message: err?.message || 'Failed to fetch from LTA DataMall',
      endpoint: LTA_DATAMALL_URL,
      timestamp: new Date().toISOString(),
    };

    if (typeof res.status === 'function') {
      return res.status(502).json(errorPayload);
    }
    res.writeHead(502, { 'Content-Type': 'application/json' });
    return res.end(JSON.stringify(errorPayload));
  }
}
