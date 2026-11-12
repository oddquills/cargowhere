import { Carpark } from '../types/carpark';

export const INITIAL_SINGAPORE_CARPARKS: Carpark[] = [
  // ORCHARD ROAD & SHOPPING BELT
  {
    id: 'sg-ion-orchard',
    carparkNumber: 'ION',
    name: 'ION Orchard Carpark',
    address: '2 Orchard Turn',
    postalCode: '238801',
    region: 'Orchard',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3040, 103.8318],
    clearanceHeight: 1.95,
    totalLots: 560,
    availableLots: 142,
    lotsByType: {
      car: { total: 500, available: 124 },
      motorcycle: { total: 60, available: 18 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'SP Group (50kW DC Fast Charge)'
    },
    rates: {
      weekdayDay: 'Mon-Thu: $3.27 for 1st hr, $1.64/subsequent 30 mins (8am-4:59pm)',
      weekdayNight: '$4.91/entry (5pm-11:59pm); $1.64/hr (12am-7:59am)',
      weekendDay: 'Fri-Sun & PH: $4.09 for 1st hr, $2.02/subsequent 30 mins',
      weekendNight: '$5.45/entry (5pm-11:59pm)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Full Electronic EPS',
      ratePerHourEstimate: 3.27
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [15, 10, 8, 8, 12, 25, 45, 68, 85, 92, 94, 90, 88, 84, 82, 85, 92, 96, 94, 82, 65, 45, 30, 20],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-takashimaya-sc',
    carparkNumber: 'TKS',
    name: 'Takashimaya / Ngee Ann City',
    address: '391 Orchard Road',
    postalCode: '238873',
    region: 'Orchard',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3025, 103.8345],
    clearanceHeight: 2.0,
    totalLots: 880,
    availableLots: 310,
    lotsByType: {
      car: { total: 800, available: 278 },
      motorcycle: { total: 80, available: 32 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'Charge+ (22kW AC)'
    },
    rates: {
      weekdayDay: '$3.50 for 1st hr, $1.80/subsequent 30 mins (12am-5pm)',
      weekdayNight: '$4.50/entry (5pm-12am)',
      weekendDay: '$4.50 for 1st hr, $2.20/subsequent 30 mins (12am-5pm)',
      weekendNight: '$5.50/entry (5pm-12am)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'EPS IU Barrier-Free',
      ratePerHourEstimate: 3.50
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [12, 10, 8, 8, 10, 20, 40, 65, 82, 88, 92, 88, 84, 82, 80, 85, 90, 95, 90, 78, 60, 40, 25, 15],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-paragon-orchard',
    carparkNumber: 'PGN',
    name: 'Paragon Shopping Centre',
    address: '290 Orchard Road',
    postalCode: '238859',
    region: 'Orchard',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3038, 103.8358],
    clearanceHeight: 1.9,
    totalLots: 450,
    availableLots: 58,
    lotsByType: {
      car: { total: 410, available: 48 },
      motorcycle: { total: 40, available: 10 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group'
    },
    rates: {
      weekdayDay: '$3.30 for 1st hr, $1.80/subsequent 30 mins (3am-4:59pm)',
      weekdayNight: '$5.00/entry (5pm-2:59am)',
      weekendDay: '$4.80 for 1st 2 hrs, $1.80/subsequent 30 mins',
      weekendNight: '$5.00/entry (5pm-2:59am)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Full Electronic EPS',
      ratePerHourEstimate: 3.30
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [10, 8, 5, 5, 8, 18, 38, 60, 78, 88, 92, 91, 88, 85, 84, 88, 94, 98, 92, 80, 58, 35, 20, 12],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-plaza-singapura',
    carparkNumber: 'PS',
    name: 'Plaza Singapura',
    address: '68 Orchard Road',
    postalCode: '238839',
    region: 'Orchard',
    agency: 'MALL',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.3006, 103.8451],
    clearanceHeight: 2.1,
    totalLots: 720,
    availableLots: 198,
    lotsByType: {
      car: { total: 660, available: 176 },
      motorcycle: { total: 60, available: 22 }
    },
    evChargers: {
      available: true,
      count: 8,
      provider: 'Shell Recharge / Charge+'
    },
    rates: {
      weekdayDay: '$2.60 for 1st hr, $0.65/subsequent 15 mins (12am-5:59pm)',
      weekdayNight: '$3.50/entry (6pm-11:59pm)',
      weekendDay: '$3.20 for 1st 2 hrs, $0.65/subsequent 15 mins',
      weekendNight: '$3.50/entry (6pm-11:59pm)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 2.60
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [8, 5, 5, 5, 8, 15, 30, 50, 70, 80, 85, 82, 78, 75, 76, 80, 86, 90, 85, 70, 50, 30, 18, 10],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-somerset-313',
    carparkNumber: 'S313',
    name: '313@Somerset',
    address: '313 Orchard Road',
    postalCode: '238895',
    region: 'Orchard',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3012, 103.8383],
    clearanceHeight: 1.9,
    totalLots: 220,
    availableLots: 18,
    lotsByType: {
      car: { total: 190, available: 12 },
      motorcycle: { total: 30, available: 6 }
    },
    evChargers: {
      available: true,
      count: 2,
      provider: 'Lendlease Charge'
    },
    rates: {
      weekdayDay: '$3.20 for 1st hr, $1.60/subsequent 30 mins (8am-5pm)',
      weekdayNight: '$4.50/entry (5pm-11:59pm)',
      weekendDay: '$4.00 for 1st hr, $1.80/subsequent 30 mins',
      weekendNight: '$5.00/entry (5pm-11:59pm)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Electronic EPS',
      ratePerHourEstimate: 3.20
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [14, 10, 8, 8, 12, 22, 42, 65, 84, 92, 96, 95, 92, 89, 88, 92, 97, 98, 96, 85, 68, 48, 28, 18],
    lastUpdated: new Date().toISOString()
  },

  // MARINA BAY & DOWNTOWN
  {
    id: 'sg-marina-bay-sands',
    carparkNumber: 'MBS',
    name: 'Marina Bay Sands (North & South)',
    address: '10 Bayfront Avenue',
    postalCode: '018956',
    region: 'Marina Bay & Downtown',
    agency: 'COMMERCIAL',
    type: 'Basement',
    coordinates: [1.2834, 103.8607],
    clearanceHeight: 2.0,
    totalLots: 2500,
    availableLots: 840,
    lotsByType: {
      car: { total: 2300, available: 790 },
      motorcycle: { total: 200, available: 50 }
    },
    evChargers: {
      available: true,
      count: 12,
      provider: 'SP Group Superchargers & Porsche Destination'
    },
    rates: {
      weekdayDay: '$14.00 1st hr, $1.50/subsequent 30 mins (7am-7pm)',
      weekdayNight: '$14.00 1st hr, $1.50/subsequent 30 mins (Capped $32/24hr)',
      weekendDay: '$14.00 1st hr, $1.50/subsequent 30 mins',
      weekendNight: '$14.00 flat entry for Sands Rewards Gold/Platinum members',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'MBS Automated EPS',
      ratePerHourEstimate: 14.00
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [25, 20, 18, 16, 20, 30, 48, 62, 70, 75, 78, 80, 82, 80, 78, 82, 88, 92, 90, 85, 75, 60, 45, 30],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-suntec-city',
    carparkNumber: 'SUNTEC',
    name: 'Suntec City Mall Carpark (Yellow/Red/Green)',
    address: '3 Temasek Boulevard',
    postalCode: '038983',
    region: 'Marina Bay & Downtown',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.2936, 103.8572],
    clearanceHeight: 2.0,
    totalLots: 3100,
    availableLots: 1240,
    lotsByType: {
      car: { total: 2850, available: 1150 },
      motorcycle: { total: 250, available: 90 }
    },
    evChargers: {
      available: true,
      count: 14,
      provider: 'SP Group & Charge+'
    },
    rates: {
      weekdayDay: '$2.60 for 1st hr, $0.65/subsequent 15 mins (7am-5pm)',
      weekdayNight: '$3.50/entry (5pm-7am next day)',
      weekendDay: '$2.80 for 1st 4 hrs, $0.65/subsequent 15 mins',
      weekendNight: '$3.50/entry (5pm-7am)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'Suntec City EPS',
      ratePerHourEstimate: 2.60
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [10, 8, 6, 6, 10, 25, 55, 78, 85, 88, 86, 82, 78, 75, 76, 80, 84, 86, 80, 65, 45, 30, 20, 12],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-raffles-city',
    carparkNumber: 'RC',
    name: 'Raffles City Shopping Centre',
    address: '252 North Bridge Road',
    postalCode: '179103',
    region: 'Marina Bay & Downtown',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.2941, 103.8532],
    clearanceHeight: 2.05,
    totalLots: 1040,
    availableLots: 320,
    lotsByType: {
      car: { total: 950, available: 285 },
      motorcycle: { total: 90, available: 35 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'SP Group 50kW'
    },
    rates: {
      weekdayDay: '$3.30 for 1st hr, $0.80/subsequent 15 mins (8am-5:59pm)',
      weekdayNight: '$3.50/entry (6pm-11:59pm)',
      weekendDay: '$3.30 for 1st 2 hrs, $0.80/subsequent 15 mins',
      weekendNight: '$3.50/entry (6pm-11:59pm)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 3.30
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [10, 8, 6, 6, 12, 28, 62, 82, 90, 92, 90, 85, 80, 78, 80, 85, 88, 90, 82, 68, 48, 30, 18, 12],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-marina-one',
    carparkNumber: 'MO',
    name: 'Marina One The Heart Carpark',
    address: '7 Straits View',
    postalCode: '018936',
    region: 'Marina Bay & Downtown',
    agency: 'COMMERCIAL',
    type: 'Basement',
    coordinates: [1.2778, 103.8538],
    clearanceHeight: 2.15,
    totalLots: 1500,
    availableLots: 680,
    lotsByType: {
      car: { total: 1400, available: 630 },
      motorcycle: { total: 100, available: 50 }
    },
    evChargers: {
      available: true,
      count: 10,
      provider: 'Charge+'
    },
    rates: {
      weekdayDay: '$3.50 for 1st hr, $1.50/subsequent 30 mins (7am-5pm)',
      weekdayNight: '$3.50/entry (5pm-7am)',
      weekendDay: '$3.50/entry (all day)',
      weekendNight: '$3.50/entry (all night)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'Full Electronic EPS',
      ratePerHourEstimate: 3.50
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [8, 6, 5, 5, 10, 30, 68, 90, 95, 96, 94, 90, 86, 85, 88, 85, 80, 60, 40, 25, 18, 12, 10, 8],
    lastUpdated: new Date().toISOString()
  },

  // CBD & CHINATOWN
  {
    id: 'sg-tanjong-pagar-plaza',
    carparkNumber: 'ACB',
    name: 'Tanjong Pagar Plaza MSCP (HDB Block 1-7)',
    address: 'Block 1 Tanjong Pagar Plaza',
    postalCode: '082001',
    region: 'CBD & Chinatown',
    agency: 'HDB',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.2762, 103.8431],
    clearanceHeight: 2.1,
    totalLots: 620,
    availableLots: 165,
    lotsByType: {
      car: { total: 550, available: 140 },
      motorcycle: { total: 70, available: 25 },
      heavy: { total: 10, available: 2 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group HDB EV Program'
    },
    rates: {
      weekdayDay: '$1.20 per 30 mins (Central Area 7am-5pm)',
      weekdayNight: '$0.60 per 30 mins (capped at $5 night rate 10:30pm-7am)',
      weekendDay: '$1.20 per 30 mins (7am-5pm); Free parking on Sun/PH (7am-10:30pm)',
      weekendNight: '$0.60 per 30 mins (capped at $5 night rate)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'HDB Electronic EPS',
      ratePerHourEstimate: 2.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [30, 28, 25, 25, 28, 40, 65, 85, 92, 95, 95, 92, 90, 91, 92, 88, 82, 75, 68, 60, 50, 42, 38, 32],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-chinatown-complex',
    carparkNumber: 'CCM',
    name: 'Chinatown Complex MSCP',
    address: '335 Smith Street',
    postalCode: '050335',
    region: 'CBD & Chinatown',
    agency: 'HDB',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.2825, 103.8432],
    clearanceHeight: 1.9,
    totalLots: 390,
    availableLots: 42,
    lotsByType: {
      car: { total: 340, available: 32 },
      motorcycle: { total: 50, available: 10 }
    },
    evChargers: {
      available: true,
      count: 2,
      provider: 'TotalEnergies / SP Group'
    },
    rates: {
      weekdayDay: '$1.20 per 30 mins (7am-5pm)',
      weekdayNight: '$0.60 per 30 mins (after 5pm)',
      weekendDay: '$1.20 per 30 mins (7am-5pm)',
      weekendNight: '$0.60 per 30 mins (after 5pm)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'HDB Central Area EPS',
      ratePerHourEstimate: 2.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [20, 18, 15, 15, 18, 25, 45, 70, 85, 92, 96, 98, 97, 95, 92, 90, 88, 85, 80, 68, 52, 38, 28, 22],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-guoco-tower',
    carparkNumber: 'GT',
    name: 'Guoco Tower Carpark (Tanjong Pagar MRT)',
    address: '1 Wallich Street',
    postalCode: '078881',
    region: 'CBD & Chinatown',
    agency: 'COMMERCIAL',
    type: 'Basement',
    coordinates: [1.2770, 103.8458],
    clearanceHeight: 2.1,
    totalLots: 490,
    availableLots: 180,
    lotsByType: {
      car: { total: 440, available: 155 },
      motorcycle: { total: 50, available: 25 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'Shell Recharge'
    },
    rates: {
      weekdayDay: '$3.50 for 1st hr, $1.75/subsequent 30 mins (6am-5pm)',
      weekdayNight: '$3.50/entry (5pm-6am)',
      weekendDay: '$3.50/entry (6am-6am next day)',
      weekendNight: '$3.50/entry',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Electronic EPS',
      ratePerHourEstimate: 3.50
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [10, 8, 6, 6, 12, 35, 75, 92, 95, 96, 95, 90, 88, 88, 89, 84, 75, 55, 38, 25, 18, 14, 12, 10],
    lastUpdated: new Date().toISOString()
  },

  // CENTRAL (TOA PAYOH / BISHAN / BUGIS)
  {
    id: 'sg-bugis-junction',
    carparkNumber: 'BJ',
    name: 'Bugis Junction Carpark',
    address: '200 Victoria Street',
    postalCode: '188021',
    region: 'Central (Toa Payoh / Bishan)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.2998, 103.8553],
    clearanceHeight: 1.95,
    totalLots: 640,
    availableLots: 115,
    lotsByType: {
      car: { total: 580, available: 95 },
      motorcycle: { total: 60, available: 20 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group'
    },
    rates: {
      weekdayDay: '$2.50 for 1st hr, $0.60/subsequent 15 mins (8am-5:59pm)',
      weekdayNight: '$3.30/entry (6pm-11:59pm)',
      weekendDay: '$2.80 for 1st 2 hrs, $0.60/subsequent 15 mins',
      weekendNight: '$3.30/entry (6pm-11:59pm)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 2.50
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [12, 8, 6, 6, 10, 20, 45, 70, 84, 89, 92, 90, 88, 85, 86, 90, 94, 95, 90, 78, 60, 40, 25, 16],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-toa-payoh-hub-mscp',
    carparkNumber: 'TP10',
    name: 'Toa Payoh Central Hub MSCP (HDB)',
    address: 'Block 500 Toa Payoh Lorong 6',
    postalCode: '310500',
    region: 'Central (Toa Payoh / Bishan)',
    agency: 'HDB',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.3326, 103.8475],
    clearanceHeight: 2.15,
    totalLots: 780,
    availableLots: 245,
    lotsByType: {
      car: { total: 700, available: 215 },
      motorcycle: { total: 80, available: 30 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'SP Group HDB EV Program'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (7am-10:30pm)',
      weekdayNight: '$0.60 per 30 mins (capped at $5 night parking)',
      weekendDay: '$0.60 per 30 mins; Free Parking Scheme Sunday/PH 7am-10:30pm',
      weekendNight: '$0.60 per 30 mins (capped at $5)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'HDB Electronic Parking System',
      ratePerHourEstimate: 1.20
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [40, 38, 35, 35, 38, 45, 60, 75, 82, 85, 86, 84, 82, 80, 80, 82, 85, 88, 85, 75, 65, 55, 48, 42],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-bishan-junction8',
    carparkNumber: 'J8',
    name: 'Junction 8 Shopping Centre',
    address: '9 Bishan Place',
    postalCode: '579837',
    region: 'Central (Toa Payoh / Bishan)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3508, 103.8488],
    clearanceHeight: 1.95,
    totalLots: 310,
    availableLots: 35,
    lotsByType: {
      car: { total: 270, available: 25 },
      motorcycle: { total: 40, available: 10 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr, $0.40/subsequent 15 mins (12am-5:59pm)',
      weekdayNight: '$2.50/entry (6pm-11:59pm)',
      weekendDay: '$2.50 for 1st 2 hrs, $0.40/subsequent 15 mins',
      weekendNight: '$2.50/entry (6pm-11:59pm)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 1.60
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [15, 12, 10, 10, 12, 20, 38, 60, 75, 85, 90, 94, 92, 88, 86, 88, 95, 98, 96, 85, 65, 45, 30, 20],
    lastUpdated: new Date().toISOString()
  },

  // WEST (JURONG / CLEMENTI)
  {
    id: 'sg-jurong-jem',
    carparkNumber: 'JEM',
    name: 'Jem Carpark (Jurong Gateway)',
    address: '50 Jurong Gateway Road',
    postalCode: '608549',
    region: 'West (Jurong / Clementi)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3332, 103.7436],
    clearanceHeight: 2.1,
    totalLots: 680,
    availableLots: 210,
    lotsByType: {
      car: { total: 620, available: 185 },
      motorcycle: { total: 60, available: 25 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'Lendlease / Charge+'
    },
    rates: {
      weekdayDay: '$1.80 for 1st hr, $0.50/subsequent 15 mins (6am-6pm)',
      weekdayNight: '$3.00/entry (6pm-6am)',
      weekendDay: '$2.50 for 1st 2 hrs, $0.50/subsequent 15 mins',
      weekendNight: '$3.00/entry (6pm-6am)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Lendlease EPS',
      ratePerHourEstimate: 1.80
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [12, 10, 8, 8, 12, 22, 45, 68, 78, 82, 85, 84, 82, 80, 82, 86, 92, 94, 90, 76, 55, 35, 22, 15],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-jurong-westgate',
    carparkNumber: 'WG',
    name: 'Westgate Shopping Mall',
    address: '3 Gateway Drive',
    postalCode: '608532',
    region: 'West (Jurong / Clementi)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3340, 103.7424],
    clearanceHeight: 2.0,
    totalLots: 610,
    availableLots: 195,
    lotsByType: {
      car: { total: 560, available: 172 },
      motorcycle: { total: 50, available: 23 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group'
    },
    rates: {
      weekdayDay: '$1.80 for 1st hr, $0.50/subsequent 15 mins (12am-5:59pm)',
      weekdayNight: '$3.00/entry (6pm-11:59pm)',
      weekendDay: '$2.50 for 1st 2 hrs, $0.50/subsequent 15 mins',
      weekendNight: '$3.00/entry (6pm-11:59pm)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 1.80
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [10, 8, 6, 6, 10, 20, 40, 65, 75, 80, 83, 82, 80, 78, 80, 84, 90, 92, 88, 72, 50, 32, 20, 12],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-jurong-imm',
    carparkNumber: 'IMM',
    name: 'IMM Outlet Mall (Levels 3, 4 & 5)',
    address: '2 Jurong East Street 21',
    postalCode: '609601',
    region: 'West (Jurong / Clementi)',
    agency: 'MALL',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.3349, 103.7468],
    clearanceHeight: 2.15,
    totalLots: 1350,
    availableLots: 480,
    lotsByType: {
      car: { total: 1250, available: 440 },
      motorcycle: { total: 100, available: 40 }
    },
    evChargers: {
      available: true,
      count: 8,
      provider: 'Charge+ Fast Chargers'
    },
    rates: {
      weekdayDay: 'First 1 hr FREE (1st entry Mon-Fri 6am-5:59pm), $0.60/subsequent 15 mins',
      weekdayNight: '$2.50/entry (6pm-5:59am)',
      weekendDay: '$1.50 for 1st hr, $0.60/subsequent 15 mins',
      weekendNight: '$2.50/entry (6pm-5:59am)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 1.20
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [8, 6, 5, 5, 8, 15, 30, 52, 68, 75, 80, 82, 80, 76, 78, 82, 86, 88, 82, 65, 45, 28, 16, 10],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-clementi-central-hdb',
    carparkNumber: 'CL12',
    name: 'Clementi Central MSCP (HDB Block 442)',
    address: 'Block 442 Clementi Avenue 3',
    postalCode: '120442',
    region: 'West (Jurong / Clementi)',
    agency: 'HDB',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.3145, 103.7645],
    clearanceHeight: 2.1,
    totalLots: 420,
    availableLots: 98,
    lotsByType: {
      car: { total: 380, available: 85 },
      motorcycle: { total: 40, available: 13 }
    },
    evChargers: {
      available: true,
      count: 3,
      provider: 'SP Group HDB EV'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (7am-10:30pm)',
      weekdayNight: '$0.60 per 30 mins (capped $5)',
      weekendDay: '$0.60 per 30 mins (Sunday/PH Free 7am-10:30pm)',
      weekendNight: '$0.60 per 30 mins (capped $5)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'HDB Electronic EPS',
      ratePerHourEstimate: 1.20
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [35, 32, 30, 30, 32, 40, 55, 72, 80, 84, 85, 82, 80, 78, 80, 82, 86, 90, 85, 75, 62, 50, 42, 38],
    lastUpdated: new Date().toISOString()
  },

  // EAST (TAMPINES / BEDOK / CHANGI)
  {
    id: 'sg-jewel-changi',
    carparkNumber: 'JWL',
    name: 'Jewel Changi Airport / T1 Carpark',
    address: '78 Airport Boulevard',
    postalCode: '819666',
    region: 'East (Tampines / Bedok / Changi)',
    agency: 'COMMERCIAL',
    type: 'Basement',
    coordinates: [1.3602, 103.9897],
    clearanceHeight: 2.15,
    totalLots: 2500,
    availableLots: 880,
    lotsByType: {
      car: { total: 2350, available: 820 },
      motorcycle: { total: 150, available: 60 }
    },
    evChargers: {
      available: true,
      count: 16,
      provider: 'Shell Recharge & SP Group Ultra-Fast'
    },
    rates: {
      weekdayDay: 'General Carpark (B3-B5): $0.04/min ($2.40/hr for first 90 mins, $5.00/30m subsequent)',
      weekdayNight: 'Short Stay: $0.04/min ($2.40/hr)',
      weekendDay: 'General Carpark: $0.04/min ($2.40/hr)',
      weekendNight: 'General Carpark: $0.04/min ($2.40/hr)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Changi Airport Automated EPS',
      ratePerHourEstimate: 2.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [20, 15, 12, 12, 15, 25, 45, 60, 72, 78, 80, 82, 84, 82, 80, 84, 88, 92, 90, 80, 65, 50, 35, 25],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-tampines-hub',
    carparkNumber: 'OTH',
    name: 'Our Tampines Hub (Basement Carpark)',
    address: '1 Tampines Walk',
    postalCode: '528523',
    region: 'East (Tampines / Bedok / Changi)',
    agency: 'COMMERCIAL',
    type: 'Basement',
    coordinates: [1.3533, 103.9405],
    clearanceHeight: 2.1,
    totalLots: 1400,
    availableLots: 395,
    lotsByType: {
      car: { total: 1250, available: 350 },
      motorcycle: { total: 150, available: 45 }
    },
    evChargers: {
      available: true,
      count: 10,
      provider: 'SP Group'
    },
    rates: {
      weekdayDay: '$0.024/min ($1.44/hr, 12am-6pm)',
      weekdayNight: '$2.40/entry (6pm-12am)',
      weekendDay: '$0.024/min ($1.44/hr, 12am-6pm)',
      weekendNight: '$2.40/entry (6pm-12am)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'PA Automated EPS',
      ratePerHourEstimate: 1.44
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [15, 12, 10, 10, 15, 25, 45, 65, 75, 80, 82, 80, 78, 76, 78, 82, 88, 92, 86, 72, 55, 38, 25, 18],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-tampines-mall',
    carparkNumber: 'TM',
    name: 'Tampines Mall Carpark',
    address: '4 Tampines Central 5',
    postalCode: '529510',
    region: 'East (Tampines / Bedok / Changi)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3538, 103.9452],
    clearanceHeight: 1.95,
    totalLots: 620,
    availableLots: 88,
    lotsByType: {
      car: { total: 560, available: 72 },
      motorcycle: { total: 60, available: 16 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'Charge+'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr, $0.40/subsequent 15 mins (12am-5:59pm)',
      weekdayNight: '$2.50/entry (6pm-11:59pm)',
      weekendDay: '$2.50 for 1st 2 hrs, $0.40/subsequent 15 mins',
      weekendNight: '$2.50/entry (6pm-11:59pm)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 1.60
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [10, 8, 6, 6, 10, 18, 35, 58, 75, 85, 92, 94, 90, 86, 85, 88, 95, 96, 92, 80, 60, 40, 22, 14],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-bedok-town-centre',
    carparkNumber: 'BD12',
    name: 'Bedok Town Centre MSCP (Block 207A)',
    address: 'Block 207A New Upper Changi Road',
    postalCode: '461207',
    region: 'East (Tampines / Bedok / Changi)',
    agency: 'HDB',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.3248, 103.9312],
    clearanceHeight: 2.15,
    totalLots: 510,
    availableLots: 120,
    lotsByType: {
      car: { total: 460, available: 104 },
      motorcycle: { total: 50, available: 16 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group HDB EV'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (7am-10:30pm)',
      weekdayNight: '$0.60 per 30 mins (night cap $5)',
      weekendDay: '$0.60 per 30 mins; Free on Sunday/PH 7am-10:30pm',
      weekendNight: '$0.60 per 30 mins (night cap $5)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'HDB EPS',
      ratePerHourEstimate: 1.20
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [38, 35, 32, 32, 35, 42, 58, 76, 85, 88, 88, 86, 84, 82, 82, 84, 88, 92, 88, 78, 66, 54, 46, 40],
    lastUpdated: new Date().toISOString()
  },

  // NORTH (WOODLANDS / YISHUN)
  {
    id: 'sg-woodlands-causeway-point',
    carparkNumber: 'CP',
    name: 'Causeway Point Woodlands',
    address: '1 Woodlands Square',
    postalCode: '738099',
    region: 'North (Woodlands / Yishun)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.4361, 103.7865],
    clearanceHeight: 2.0,
    totalLots: 820,
    availableLots: 240,
    lotsByType: {
      car: { total: 750, available: 215 },
      motorcycle: { total: 70, available: 25 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'Charge+ Fast Chargers'
    },
    rates: {
      weekdayDay: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm)',
      weekdayNight: '$2.50/entry (5pm-7am)',
      weekendDay: '$2.20 for 1st 2 hrs, $0.80/subsequent 30 mins',
      weekendNight: '$2.50/entry (5pm-7am)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'Frasers Property EPS',
      ratePerHourEstimate: 1.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [14, 10, 8, 8, 12, 20, 38, 55, 70, 78, 82, 80, 78, 76, 78, 82, 88, 92, 88, 75, 58, 40, 26, 18],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-woodlands-civic-centre',
    carparkNumber: 'WCC',
    name: 'Woodlands Civic Centre MSCP',
    address: '900 South Woodlands Drive',
    postalCode: '730900',
    region: 'North (Woodlands / Yishun)',
    agency: 'HDB',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.4352, 103.7879],
    clearanceHeight: 2.15,
    totalLots: 460,
    availableLots: 130,
    lotsByType: {
      car: { total: 410, available: 112 },
      motorcycle: { total: 50, available: 18 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group HDB EV'
    },
    rates: {
      weekdayDay: '$0.60 per 30 mins (7am-10:30pm)',
      weekdayNight: '$0.60 per 30 mins (night cap $5)',
      weekendDay: '$0.60 per 30 mins (Sunday/PH Free Parking)',
      weekendNight: '$0.60 per 30 mins',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'HDB Electronic EPS',
      ratePerHourEstimate: 1.20
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [30, 28, 25, 25, 28, 38, 55, 75, 84, 88, 86, 82, 80, 80, 82, 85, 88, 86, 80, 68, 54, 42, 35, 32],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-northpoint-city',
    carparkNumber: 'NPC',
    name: 'Northpoint City (North & South Wings)',
    address: '930 Yishun Avenue 2',
    postalCode: '769098',
    region: 'North (Woodlands / Yishun)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.4296, 103.8360],
    clearanceHeight: 2.05,
    totalLots: 1020,
    availableLots: 290,
    lotsByType: {
      car: { total: 920, available: 255 },
      motorcycle: { total: 100, available: 35 }
    },
    evChargers: {
      available: true,
      count: 8,
      provider: 'Shell Recharge'
    },
    rates: {
      weekdayDay: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm)',
      weekdayNight: '$2.50/entry (5pm-7am)',
      weekendDay: '$2.40 for 1st 2 hrs, $0.80/subsequent 30 mins',
      weekendNight: '$2.50/entry (5pm-7am)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'Frasers Property EPS',
      ratePerHourEstimate: 1.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [12, 10, 8, 8, 10, 18, 35, 55, 72, 80, 84, 82, 80, 78, 80, 84, 90, 93, 88, 76, 58, 38, 24, 16],
    lastUpdated: new Date().toISOString()
  },

  // NORTH-EAST (SENGKANG / PUNGGOL / SERANGOON)
  {
    id: 'sg-punggol-waterway-point',
    carparkNumber: 'WWP',
    name: 'Waterway Point Punggol (East & West Wing)',
    address: '83 Punggol Central',
    postalCode: '828761',
    region: 'North-East (Sengkang / Punggol)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.4067, 103.9022],
    clearanceHeight: 2.1,
    totalLots: 1250,
    availableLots: 360,
    lotsByType: {
      car: { total: 1150, available: 325 },
      motorcycle: { total: 100, available: 35 }
    },
    evChargers: {
      available: true,
      count: 8,
      provider: 'Charge+ 22kW'
    },
    rates: {
      weekdayDay: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm)',
      weekdayNight: '$2.40/entry (5pm-7am)',
      weekendDay: '$2.40 for 1st 2 hrs, $0.80/subsequent 30 mins',
      weekendNight: '$2.40/entry (5pm-7am)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'Frasers EPS',
      ratePerHourEstimate: 1.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [12, 8, 6, 6, 10, 18, 36, 56, 72, 80, 84, 82, 80, 78, 80, 84, 90, 94, 90, 78, 60, 40, 25, 16],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-nex-serangoon',
    carparkNumber: 'NEX',
    name: 'NEX Shopping Mall (Basement & Roof)',
    address: '23 Serangoon Central',
    postalCode: '556083',
    region: 'North-East (Sengkang / Punggol)',
    agency: 'MALL',
    type: 'Multi-Storey (MSCP)',
    coordinates: [1.3506, 103.8726],
    clearanceHeight: 1.95,
    totalLots: 980,
    availableLots: 110,
    lotsByType: {
      car: { total: 900, available: 95 },
      motorcycle: { total: 80, available: 15 }
    },
    evChargers: {
      available: true,
      count: 6,
      provider: 'SP Group'
    },
    rates: {
      weekdayDay: '$1.40 for 1st hr, $0.70/subsequent 30 mins (7am-5pm)',
      weekdayNight: '$2.60/entry (5pm-7am)',
      weekendDay: '$2.60 for 1st 2 hrs, $0.80/subsequent 30 mins',
      weekendNight: '$2.60/entry (5pm-7am)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Electronic EPS',
      ratePerHourEstimate: 1.40
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [14, 10, 8, 8, 12, 22, 45, 68, 84, 90, 94, 92, 88, 86, 88, 92, 96, 98, 94, 82, 64, 44, 28, 18],
    lastUpdated: new Date().toISOString()
  },
  {
    id: 'sg-sengkang-grand-mall',
    carparkNumber: 'SGM',
    name: 'Sengkang Grand Mall (Buangkok MRT)',
    address: '70 Compassvale Bow',
    postalCode: '544692',
    region: 'North-East (Sengkang / Punggol)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.3828, 103.8931],
    clearanceHeight: 2.1,
    totalLots: 420,
    availableLots: 135,
    lotsByType: {
      car: { total: 380, available: 118 },
      motorcycle: { total: 40, available: 17 }
    },
    evChargers: {
      available: true,
      count: 4,
      provider: 'SP Group Fast'
    },
    rates: {
      weekdayDay: '$1.50 for 1st hr, $0.40/subsequent 15 mins (12am-5:59pm)',
      weekdayNight: '$2.50/entry (6pm-11:59pm)',
      weekendDay: '$2.50 for 1st 2 hrs, $0.40/subsequent 15 mins',
      weekendNight: '$2.50/entry (6pm-11:59pm)',
      gracePeriod: '15 mins',
      hdbCouponOrEps: 'CapitaLand EPS',
      ratePerHourEstimate: 1.50
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    occupancyTrend: [12, 10, 8, 8, 10, 18, 35, 55, 70, 78, 82, 80, 78, 76, 78, 82, 88, 92, 88, 76, 58, 38, 24, 16],
    lastUpdated: new Date().toISOString()
  },

  // HARBOURFRONT & SENTOSA
  {
    id: 'sg-vivocity',
    carparkNumber: 'VIVO',
    name: 'VivoCity Shopping Mall (Basement 1 & 2)',
    address: '1 HarbourFront Walk',
    postalCode: '098585',
    region: 'Central (Toa Payoh / Bishan)',
    agency: 'MALL',
    type: 'Basement',
    coordinates: [1.2644, 103.8222],
    clearanceHeight: 2.0,
    totalLots: 2200,
    availableLots: 750,
    lotsByType: {
      car: { total: 2000, available: 680 },
      motorcycle: { total: 200, available: 70 }
    },
    evChargers: {
      available: true,
      count: 12,
      provider: 'SP Group & Charge+'
    },
    rates: {
      weekdayDay: '$1.60 for 1st hr, $0.80/subsequent 30 mins (7am-6pm)',
      weekdayNight: '$3.50/entry (6pm-4am)',
      weekendDay: '$2.00 for 1st hr, $1.00/subsequent 30 mins',
      weekendNight: '$4.00/entry (6pm-4am)',
      gracePeriod: '10 mins',
      hdbCouponOrEps: 'Mapletree EPS',
      ratePerHourEstimate: 1.60
    },
    hasAccessibleLots: true,
    electronicParking: 'EPS (IU In-Vehicle)',
    isPopularHotspot: true,
    occupancyTrend: [10, 8, 6, 6, 10, 18, 35, 55, 72, 80, 85, 86, 84, 82, 84, 88, 94, 96, 92, 80, 60, 40, 22, 14],
    lastUpdated: new Date().toISOString()
  }
];

// Quick jump hotspots in Singapore
export const SINGAPORE_HOTSPOTS = [
  { name: 'All Singapore', region: 'All', coordinates: [1.3521, 103.8198] as [number, number], zoom: 12 },
  { name: 'Orchard Road', region: 'Orchard', coordinates: [1.3035, 103.8340] as [number, number], zoom: 15 },
  { name: 'Marina Bay / CBD', region: 'Marina Bay & Downtown', coordinates: [1.2840, 103.8560] as [number, number], zoom: 15 },
  { name: 'Jurong East', region: 'West (Jurong / Clementi)', coordinates: [1.3340, 103.7430] as [number, number], zoom: 15 },
  { name: 'Tampines Hub', region: 'East (Tampines / Bedok / Changi)', coordinates: [1.3535, 103.9430] as [number, number], zoom: 15 },
  { name: 'Woodlands', region: 'North (Woodlands / Yishun)', coordinates: [1.4360, 103.7870] as [number, number], zoom: 15 },
  { name: 'Jewel Changi', region: 'East (Tampines / Bedok / Changi)', coordinates: [1.3602, 103.9897] as [number, number], zoom: 15 },
  { name: 'VivoCity', region: 'Central (Toa Payoh / Bishan)', coordinates: [1.2644, 103.8222] as [number, number], zoom: 15 }
];
