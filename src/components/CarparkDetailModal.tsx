import React, { useState } from 'react';
import { Carpark, VehicleType } from '../types/carpark';
import { calculateParkingFee } from '../services/carparkService';
import {
  X,
  Bookmark,
  Navigation,
  Clock,
  Zap,
  ShieldCheck,
  Calculator,
  Compass,
  AlertTriangle,
  Layers,
  ChevronRight,
  ExternalLink,
} from 'lucide-react';

interface CarparkDetailModalProps {
  carpark: Carpark | null;
  onClose: () => void;
  isFavorite: boolean;
  onToggleFavorite: (id: string) => void;
  vehicleType: VehicleType;
}

export const CarparkDetailModal: React.FC<CarparkDetailModalProps> = ({
  carpark,
  onClose,
  isFavorite,
  onToggleFavorite,
  vehicleType,
}) => {
  if (!carpark) return null;

  // Fee Calculator State
  const now = new Date();
  const currentHH = String(now.getHours()).padStart(2, '0');
  const [entryTime, setEntryTime] = useState<string>(`${currentHH}:00`);
  const [exitTime, setExitTime] = useState<string>(
    `${String((now.getHours() + 2) % 24).padStart(2, '0')}:30`
  );
  const [dayType, setDayType] = useState<'weekday' | 'saturday' | 'sunday_ph'>('weekday');

  const feeEstimate = calculateParkingFee(carpark, entryTime, exitTime, dayType);

  const carLots = carpark.lotsByType.car;
  const motoLots = carpark.lotsByType.motorcycle;
  const heavyLots = carpark.lotsByType.heavy;

  const currentAvailable =
    vehicleType === 'motorcycle' ? motoLots.available : carLots.available;
  const currentTotal =
    vehicleType === 'motorcycle' ? motoLots.total : carLots.total;
  const occupancyPct =
    currentTotal > 0
      ? Math.round(((currentTotal - currentAvailable) / currentTotal) * 100)
      : 0;

  // Get current hour in Singapore
  const sgHour = (now.getUTCHours() + 8) % 24;

  const googleMapsUrl = `https://www.google.com/maps/dir/?api=1&destination=${carpark.coordinates[0]},${carpark.coordinates[1]}`;
  const wazeUrl = `https://waze.com/ul?ll=${carpark.coordinates[0]},${carpark.coordinates[1]}&navigate=yes`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-4 bg-slate-950/80 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl shadow-2xl overflow-hidden my-auto">
        {/* Top Header */}
        <div className="flex items-start justify-between gap-4 p-5 border-b border-slate-800/80 bg-slate-950/60">
          <div className="flex-1 min-w-0">
            <div className="flex items-center gap-2 mb-1.5 flex-wrap">
              <span className="font-mono text-xs font-semibold px-2 py-0.5 rounded bg-slate-800 text-slate-300 border border-slate-700">
                {carpark.carparkNumber}
              </span>
              <span className="text-xs text-slate-400 font-medium">{carpark.agency}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{carpark.type}</span>
              <span className="text-slate-600">·</span>
              <span className="text-xs text-slate-400">{carpark.region}</span>
            </div>

            <h2 className="text-xl md:text-2xl font-bold text-white tracking-tight">
              {carpark.name}
            </h2>

            <p className="text-xs md:text-sm text-slate-400 mt-0.5">
              {carpark.address}, Singapore {carpark.postalCode}
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            {/* Bookmark button */}
            <button
              onClick={() => onToggleFavorite(carpark.id)}
              className={`p-2 rounded-xl transition-colors ${
                isFavorite
                  ? 'bg-amber-500/20 text-amber-300 border border-amber-500/30'
                  : 'bg-slate-800 text-slate-400 hover:text-white border border-slate-700'
              }`}
              title={isFavorite ? 'Saved in Watchlist' : 'Add to Watchlist'}
            >
              <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
            </button>

            {/* Close modal */}
            <button
              onClick={onClose}
              className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-400 hover:text-white border border-slate-700 transition-colors"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Modal Scrollable Body */}
        <div className="p-5 space-y-6 max-h-[75vh] overflow-y-auto">
          {/* Section 1: Live Lot Availability Hero Bar */}
          <div className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-3">
              <div>
                <span className="text-xs text-slate-400 font-medium">Real-Time Available Lots</span>
                <div className="flex items-baseline gap-2 mt-0.5">
                  <span
                    className={`text-3xl md:text-4xl font-mono font-bold tabular-nums ${
                      currentAvailable > 30
                        ? 'text-emerald-400'
                        : currentAvailable >= 10
                        ? 'text-amber-400'
                        : 'text-rose-400'
                    }`}
                  >
                    {currentAvailable.toLocaleString()}
                  </span>
                  <span className="text-sm font-mono text-slate-400 tabular-nums">
                    / {currentTotal.toLocaleString()} total capacity
                  </span>
                </div>
              </div>

              <div className="sm:text-right">
                <span
                  className={`inline-block text-xs font-semibold px-2.5 py-1 rounded-md border ${
                    currentAvailable > 30
                      ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/20'
                      : currentAvailable >= 10
                      ? 'bg-amber-500/10 text-amber-300 border-amber-500/20'
                      : 'bg-rose-500/10 text-rose-300 border-rose-500/20'
                  }`}
                >
                  {currentAvailable > 30
                    ? 'Plenty of Vacancies'
                    : currentAvailable >= 10
                    ? 'Moderate Availability'
                    : 'Almost Full'}
                </span>
                <div className="text-xs font-mono text-slate-400 mt-1 tabular-nums">
                  {occupancyPct}% current occupancy
                </div>
              </div>
            </div>

            {/* Occupancy bar */}
            <div className="w-full h-2.5 bg-slate-800 rounded-full overflow-hidden mb-3">
              <div
                className={`h-full transition-all duration-500 ${
                  occupancyPct > 85 ? 'bg-rose-500' : occupancyPct > 65 ? 'bg-amber-500' : 'bg-emerald-500'
                }`}
                style={{ width: `${occupancyPct}%` }}
              />
            </div>

            {/* Vehicle Types Breakdown */}
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 pt-2 border-t border-slate-800/60 text-xs">
              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/40">
                <div className="text-slate-400 text-[11px]">Car (C) Lots</div>
                <div className="font-mono font-bold text-white text-sm tabular-nums mt-0.5">
                  {carLots.available} <span className="text-slate-500 font-normal text-xs">/ {carLots.total}</span>
                </div>
              </div>

              <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/40">
                <div className="text-slate-400 text-[11px]">Motorcycle (Y) Lots</div>
                <div className="font-mono font-bold text-white text-sm tabular-nums mt-0.5">
                  {motoLots.available} <span className="text-slate-500 font-normal text-xs">/ {motoLots.total}</span>
                </div>
              </div>

              {heavyLots && (
                <div className="p-2 rounded-lg bg-slate-900/60 border border-slate-800/40 col-span-2 sm:col-span-1">
                  <div className="text-slate-400 text-[11px]">Heavy Vehicle (H)</div>
                  <div className="font-mono font-bold text-white text-sm tabular-nums mt-0.5">
                    {heavyLots.available} <span className="text-slate-500 font-normal text-xs">/ {heavyLots.total}</span>
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Section 2: Hourly Occupancy Trend Chart */}
          <div className="space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="font-medium text-slate-300 flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-sky-400" />
                <span>24-Hour Occupancy Profile</span>
              </span>
              <span className="text-slate-400 text-[11px] font-mono">
                Current Time in SGT: <strong className="text-emerald-400">{sgHour}:00</strong>
              </span>
            </div>

            <div className="p-3 bg-slate-950/60 border border-slate-800/80 rounded-xl">
              <div className="flex items-end justify-between gap-1 h-20 pt-2">
                {carpark.occupancyTrend.map((occ, hour) => {
                  const isCurrent = hour === sgHour;
                  const barColor = isCurrent
                    ? 'bg-emerald-400 shadow-sm shadow-emerald-400/50'
                    : occ > 85
                    ? 'bg-rose-500/70 hover:bg-rose-400'
                    : occ > 65
                    ? 'bg-amber-500/70 hover:bg-amber-400'
                    : 'bg-slate-700 hover:bg-slate-600';

                  return (
                    <div
                      key={hour}
                      className="flex-1 flex flex-col items-center gap-1 group relative h-full justify-end"
                    >
                      {/* Tooltip on hover */}
                      <div className="absolute -top-7 opacity-0 group-hover:opacity-100 transition-opacity bg-slate-800 border border-slate-700 text-[10px] text-white px-1.5 py-0.5 rounded pointer-events-none z-10 whitespace-nowrap font-mono">
                        {hour}:00 - {occ}%
                      </div>
                      <div
                        className={`w-full rounded-t-xs transition-all ${barColor}`}
                        style={{ height: `${occ}%` }}
                      />
                    </div>
                  );
                })}
              </div>

              <div className="flex justify-between text-[10px] font-mono text-slate-400 mt-2 px-1 border-t border-slate-800/60 pt-1">
                <span>00:00</span>
                <span>06:00</span>
                <span>12:00 (Lunch)</span>
                <span>18:00 (Dinner)</span>
                <span>23:00</span>
              </div>
            </div>
          </div>

          {/* Section 3: Interactive Parking Fee Calculator */}
          <div className="p-4 bg-slate-950/60 border border-slate-800/80 rounded-xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calculator className="w-4 h-4 text-emerald-400" />
                <h4 className="text-sm font-semibold text-white">Parking Fee Estimator</h4>
              </div>
              <span className="text-[11px] text-slate-400 font-mono">Singapore Dollars (SGD)</span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5 text-xs">
              <div>
                <label className="text-slate-400 block mb-1">Entry Time</label>
                <input
                  type="time"
                  value={entryTime}
                  onChange={(e) => setEntryTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Exit Time</label>
                <input
                  type="time"
                  value={exitTime}
                  onChange={(e) => setExitTime(e.target.value)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2.5 py-1.5 text-slate-200 font-mono text-xs focus:outline-none focus:border-emerald-500"
                />
              </div>

              <div>
                <label className="text-slate-400 block mb-1">Day of Week</label>
                <select
                  value={dayType}
                  onChange={(e) => setDayType(e.target.value as any)}
                  className="w-full bg-slate-900 border border-slate-800 rounded-lg px-2 py-1.5 text-slate-200 text-xs focus:outline-none focus:border-emerald-500"
                >
                  <option value="weekday">Mon - Fri (Weekday)</option>
                  <option value="saturday">Saturday</option>
                  <option value="sunday_ph">Sunday & Public Holiday</option>
                </select>
              </div>
            </div>

            {/* Calculated Fee Banner */}
            <div className="p-3 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-between">
              <div>
                <div className="text-[11px] text-emerald-400 font-medium">
                  Duration: {Math.floor(feeEstimate.durationMinutes / 60)}h{' '}
                  {feeEstimate.durationMinutes % 60}m
                </div>
                <div className="text-xs text-slate-300 mt-0.5">{feeEstimate.breakdownText}</div>
              </div>
              <div className="text-right">
                <span className="text-xs text-slate-400 block">Estimated Fee</span>
                <span className="text-xl md:text-2xl font-bold font-mono text-white tabular-nums">
                  S${feeEstimate.estimatedTotalSGD.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* Section 4: Full Rates Card */}
          <div className="space-y-2">
            <h4 className="text-sm font-semibold text-white flex items-center gap-1.5">
              <ShieldCheck className="w-4 h-4 text-sky-400" />
              <span>Standard Parking Rates & Charges</span>
            </h4>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-2 text-xs">
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] font-medium mb-1">Weekday (Mon - Fri)</div>
                <div className="text-slate-200 mb-1.5 font-medium">{carpark.rates.weekdayDay}</div>
                <div className="text-slate-400 text-[11px]">{carpark.rates.weekdayNight}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80">
                <div className="text-slate-400 text-[11px] font-medium mb-1">Weekend (Sat - Sun / PH)</div>
                <div className="text-slate-200 mb-1.5 font-medium">{carpark.rates.weekendDay}</div>
                <div className="text-slate-400 text-[11px]">{carpark.rates.weekendNight}</div>
              </div>
            </div>

            <div className="flex items-center gap-4 text-xs text-slate-400 px-1 pt-1">
              <span>Grace Period: <strong className="text-slate-200">{carpark.rates.gracePeriod}</strong></span>
              <span>·</span>
              <span>Payment: <strong className="text-slate-200">{carpark.electronicParking}</strong></span>
            </div>
          </div>

          {/* Section 5: Amenities & Specs */}
          <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800/80 space-y-2 text-xs">
            <div className="font-medium text-slate-300">Carpark Amenities & Specs</div>
            <div className="grid grid-cols-2 sm:grid-cols-3 gap-2 text-slate-400">
              <div className="flex items-center gap-1.5">
                <Layers className="w-3.5 h-3.5 text-slate-400" />
                <span>Max Height: <strong className="text-slate-200">{carpark.clearanceHeight}m</strong></span>
              </div>

              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-cyan-400" />
                <span>
                  EV Charging:{' '}
                  <strong className="text-slate-200">
                    {carpark.evChargers.available ? `${carpark.evChargers.count} Points` : 'None'}
                  </strong>
                </span>
              </div>

              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>
                  Accessible Lots:{' '}
                  <strong className="text-slate-200">{carpark.hasAccessibleLots ? 'Yes' : 'No'}</strong>
                </span>
              </div>
            </div>

            {carpark.evChargers.available && carpark.evChargers.provider && (
              <div className="text-[11px] text-cyan-400/90 pt-1 border-t border-slate-800/50">
                ⚡ EV Charger Network: {carpark.evChargers.provider}
              </div>
            )}
          </div>
        </div>

        {/* Modal Footer: Navigation CTAs */}
        <div className="flex items-center justify-between gap-3 p-4 bg-slate-950/90 border-t border-slate-800">
          <div className="text-xs text-slate-400 hidden sm:block">
            Coordinates: {carpark.coordinates[0].toFixed(4)}, {carpark.coordinates[1].toFixed(4)}
          </div>

          <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
            <a
              href={wazeUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium text-sky-300 bg-sky-500/10 hover:bg-sky-500/20 border border-sky-500/30 rounded-xl transition-colors whitespace-nowrap"
            >
              <Navigation className="w-3.5 h-3.5" />
              <span>Waze</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>

            <a
              href={googleMapsUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="flex items-center gap-1.5 px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors whitespace-nowrap shadow-sm"
            >
              <Navigation className="w-3.5 h-3.5 fill-slate-950" />
              <span>Navigate in Google Maps</span>
              <ExternalLink className="w-3 h-3 opacity-70" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};
