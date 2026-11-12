export type SingaporeRegion = 
  | 'All'
  | 'Orchard'
  | 'Marina Bay & Downtown'
  | 'CBD & Chinatown'
  | 'Central (Toa Payoh / Bishan)'
  | 'East (Tampines / Bedok / Changi)'
  | 'West (Jurong / Clementi)'
  | 'North (Woodlands / Yishun)'
  | 'North-East (Sengkang / Punggol)';

export type CarparkAgency = 'HDB' | 'URA' | 'LTA' | 'MALL' | 'COMMERCIAL';

export type VehicleType = 'car' | 'motorcycle' | 'heavy';

export interface LotTypeData {
  total: number;
  available: number;
}

export interface RateSchedule {
  weekdayDay: string;
  weekdayNight: string;
  weekendDay: string;
  weekendNight: string;
  gracePeriod: string;
  hdbCouponOrEps: string;
  ratePerHourEstimate: number; // For sorting / quick comparison (SGD)
}

export interface EVChargerInfo {
  available: boolean;
  count: number;
  provider?: string; // e.g. "SP Group (50kW DC)", "Charge+ (22kW AC)", "Shell Recharge"
}

export interface Carpark {
  id: string;
  carparkNumber: string; // e.g. "ACB", "TM1", "ION", "MBS"
  name: string;
  address: string;
  postalCode: string;
  region: SingaporeRegion;
  agency: CarparkAgency;
  type: 'Multi-Storey (MSCP)' | 'Basement' | 'Surface' | 'Mechanized';
  coordinates: [number, number]; // [lat, lng]
  clearanceHeight: number; // in meters e.g. 1.9, 2.1, 4.0
  totalLots: number;
  availableLots: number;
  lotsByType: {
    car: LotTypeData;
    motorcycle: LotTypeData;
    heavy?: LotTypeData;
  };
  evChargers: EVChargerInfo;
  rates: RateSchedule;
  hasAccessibleLots: boolean;
  electronicParking: 'EPS (IU In-Vehicle)' | 'CashCard / FlashPay' | 'Season Only';
  isPopularHotspot?: boolean;
  occupancyTrend: number[]; // 24-hour occupancy percentages (0 to 100) from 00:00 to 23:00
  lastUpdated: string;
  distanceKm?: number;
}

export interface FilterState {
  searchQuery: string;
  region: SingaporeRegion;
  availabilityFilter: 'all' | 'high' | 'medium' | 'low'; // high (>30 lots), medium (10-30), low (<10)
  vehicleType: VehicleType;
  agencyFilter: 'all' | 'HDB' | 'URA' | 'MALL';
  evOnly: boolean;
  minClearance: number; // 0 for any, 2.0 for high SUVs/vans
  sortBy: 'availability' | 'distance' | 'price' | 'name';
}
