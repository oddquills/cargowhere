import { Carpark } from '../types/carpark';
import { INITIAL_SINGAPORE_CARPARKS } from '../data/singaporeCarparks';

const DATA_GOV_SG_CARPARK_API = 'https://api.data.gov.sg/v1/transport/carpark-availability';
const FAVORITES_STORAGE_KEY = 'parksg_favorite_carparks_v1';

export interface DataGovSgLotInfo {
  total_lots: string;
  lot_type: 'C' | 'H' | 'Y'; // C: Car, H: Heavy, Y: Motorcycle
  lots_available: string;
}

export interface DataGovSgItem {
  carpark_number: string;
  update_datetime: string;
  carpark_info: DataGovSgLotInfo[];
}

export interface FetchResult {
  carparks: Carpark[];
  isLiveApiConnected: boolean;
  timestamp: string;
  totalAvailableLots: number;
  totalCapacity: number;
}

// Calculate distance between two lat/lng points using Haversine formula
export function calculateDistanceKm(lat1: number, lon1: number, lat2: number, lon2: number): number {
  const R = 6371; // Radius of Earth in km
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return Math.round(R * c * 10) / 10;
}

// Fetch live carpark lots availability from data.gov.sg
export async function fetchLiveCarparks(userCoords?: [number, number]): Promise<FetchResult> {
  let isLiveApiConnected = false;
  let apiMap = new Map<string, { carAvail: number; carTotal: number; motoAvail?: number; motoTotal?: number }>();

  try {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 6000); // 6s timeout

    const res = await fetch(DATA_GOV_SG_CARPARK_API, {
      signal: controller.signal,
      headers: {
        Accept: 'application/json',
      },
    });
    clearTimeout(timeoutId);

    if (res.ok) {
      const data = await res.json();
      if (data?.items?.[0]?.carpark_data) {
        isLiveApiConnected = true;
        const carparkList: DataGovSgItem[] = data.items[0].carpark_data;

        for (const item of carparkList) {
          const num = item.carpark_number?.trim().toUpperCase();
          if (!num) continue;

          let carAvail = 0;
          let carTotal = 0;
          let motoAvail = 0;
          let motoTotal = 0;

          for (const info of item.carpark_info || []) {
            const avail = parseInt(info.lots_available, 10) || 0;
            const tot = parseInt(info.total_lots, 10) || 0;
            if (info.lot_type === 'C') {
              carAvail = avail;
              carTotal = tot;
            } else if (info.lot_type === 'Y') {
              motoAvail = avail;
              motoTotal = tot;
            }
          }

          apiMap.set(num, { carAvail, carTotal, motoAvail, motoTotal });
        }
      }
    }
  } catch (err) {
    // Graceful fallback to real-time realistic simulation
    console.warn('Real-time Gov API call note (using local high-fidelity fallback):', err);
    isLiveApiConnected = false;
  }

  // Get current hour in Singapore (UTC+8)
  const now = new Date();
  const sgHour = (now.getUTCHours() + 8) % 24;

  const updatedCarparks: Carpark[] = INITIAL_SINGAPORE_CARPARKS.map((carpark) => {
    let availableLots = carpark.availableLots;
    let carAvail = carpark.lotsByType.car.available;
    let carTotal = carpark.lotsByType.car.total;
    let motoAvail = carpark.lotsByType.motorcycle.available;
    let motoTotal = carpark.lotsByType.motorcycle.total;

    // Check if we got live data from data.gov.sg
    const match = apiMap.get(carpark.carparkNumber.toUpperCase());
    if (match && match.carTotal > 0) {
      carAvail = Math.min(match.carAvail, match.carTotal);
      carTotal = match.carTotal;
      if (match.motoTotal && match.motoTotal > 0) {
        motoAvail = Math.min(match.motoAvail || 0, match.motoTotal);
        motoTotal = match.motoTotal;
      }
      availableLots = carAvail + motoAvail;
    } else {
      // Dynamic realistic lot variation based on time of day in Singapore
      // Peak hours (12pm-2pm lunch, 6pm-8pm dinner, weekend afternoons)
      const baseTrendPct = carpark.occupancyTrend[sgHour] || 70;
      // Add small natural random jitter (+/- 3%)
      const jitter = (Math.random() * 6 - 3);
      const occupancyPct = Math.max(5, Math.min(98, baseTrendPct + jitter));
      
      const newCarAvail = Math.round(carTotal * (1 - occupancyPct / 100));
      carAvail = Math.max(2, Math.min(carTotal, newCarAvail));

      const newMotoAvail = Math.round(motoTotal * (1 - occupancyPct / 100));
      motoAvail = Math.max(1, Math.min(motoTotal, newMotoAvail));
      
      availableLots = carAvail + motoAvail;
    }

    const distanceKm = userCoords
      ? calculateDistanceKm(userCoords[0], userCoords[1], carpark.coordinates[0], carpark.coordinates[1])
      : undefined;

    return {
      ...carpark,
      availableLots,
      totalLots: carTotal + motoTotal,
      lotsByType: {
        car: { total: carTotal, available: carAvail },
        motorcycle: { total: motoTotal, available: motoAvail },
        heavy: carpark.lotsByType.heavy,
      },
      lastUpdated: now.toISOString(),
      distanceKm,
    };
  });

  const totalAvailableLots = updatedCarparks.reduce((sum, c) => sum + c.availableLots, 0);
  const totalCapacity = updatedCarparks.reduce((sum, c) => sum + c.totalLots, 0);

  return {
    carparks: updatedCarparks,
    isLiveApiConnected,
    timestamp: now.toLocaleTimeString('en-SG', { hour: '2-digit', minute: '2-digit', second: '2-digit' }),
    totalAvailableLots,
    totalCapacity,
  };
}

// Local Storage for Bookmarks / Favorites
export function getFavoriteCarparkIds(): string[] {
  try {
    const raw = localStorage.getItem(FAVORITES_STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export function toggleFavoriteCarparkId(id: string): string[] {
  try {
    const favorites = getFavoriteCarparkIds();
    const index = favorites.indexOf(id);
    let updated: string[];
    if (index >= 0) {
      updated = favorites.filter((favId) => favId !== id);
    } else {
      updated = [...favorites, id];
    }
    localStorage.setItem(FAVORITES_STORAGE_KEY, JSON.stringify(updated));
    return updated;
  } catch {
    return [];
  }
}

// Calculate parking fee estimate in SGD
export function calculateParkingFee(
  carpark: Carpark,
  entryTime: string, // "HH:MM" e.g. "14:00"
  exitTime: string,  // "HH:MM" e.g. "17:30"
  dayType: 'weekday' | 'saturday' | 'sunday_ph'
): { estimatedTotalSGD: number; durationMinutes: number; breakdownText: string } {
  const [entryH, entryM] = entryTime.split(':').map(Number);
  const [exitH, exitM] = exitTime.split(':').map(Number);

  let startTotalM = entryH * 60 + entryM;
  let endTotalM = exitH * 60 + exitM;

  if (endTotalM <= startTotalM) {
    endTotalM += 24 * 60; // Next day
  }

  const durationMinutes = endTotalM - startTotalM;

  // Check grace period (e.g. 10 or 15 mins)
  const graceMinutes = carpark.rates.gracePeriod.includes('15') ? 15 : 10;
  if (durationMinutes <= graceMinutes) {
    return {
      estimatedTotalSGD: 0,
      durationMinutes,
      breakdownText: `Exited within ${carpark.rates.gracePeriod} grace period (Free)`,
    };
  }

  // Calculate based on carpark agency / rate card
  let fee = 0;
  let breakdown = '';

  if (carpark.agency === 'HDB' || carpark.agency === 'URA') {
    // HDB standard: Central area is $1.20/30 mins, non-central is $0.60/30 mins
    const isCentral = carpark.rates.weekdayDay.includes('$1.20');
    const ratePerHalfHour = isCentral ? 1.20 : 0.60;
    
    if (dayType === 'sunday_ph' && carpark.rates.weekendDay.toLowerCase().includes('free')) {
      fee = 0.00;
      breakdown = 'Sunday / Public Holiday Free Parking Scheme (FPS)';
    } else {
      const halfHours = Math.ceil(durationMinutes / 30);
      fee = halfHours * ratePerHalfHour;
      breakdown = `${halfHours} blocks of 30 mins @ S$${ratePerHalfHour.toFixed(2)} / half hr`;
    }
  } else {
    // Shopping Malls & Commercial Hubs
    const hours = Math.ceil(durationMinutes / 60);
    const baseFirstHr = carpark.rates.ratePerHourEstimate;
    if (hours <= 1) {
      fee = baseFirstHr;
      breakdown = `1st hour rate: S$${baseFirstHr.toFixed(2)}`;
    } else {
      const subsequentHours = hours - 1;
      const subRate = Math.max(1.20, baseFirstHr * 0.75);
      fee = baseFirstHr + subsequentHours * subRate;
      breakdown = `1st hr (S$${baseFirstHr.toFixed(2)}) + ${subsequentHours} subsequent hrs @ ~S$${subRate.toFixed(2)}/hr`;
    }
  }

  return {
    estimatedTotalSGD: Math.round(fee * 100) / 100,
    durationMinutes,
    breakdownText: breakdown,
  };
}
