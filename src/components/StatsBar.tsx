import React from 'react';
import { Car, Zap, CheckCircle2, TrendingUp } from 'lucide-react';
import { Carpark } from '../types/carpark';

interface StatsBarProps {
  carparks: Carpark[];
  totalAvailable: number;
  totalCapacity: number;
  isLiveApiConnected: boolean;
}

export const StatsBar: React.FC<StatsBarProps> = ({
  carparks,
  totalAvailable,
  totalCapacity,
  isLiveApiConnected,
}) => {
  const highAvailCount = carparks.filter((c) => c.availableLots > 30).length;
  const evTotalPoints = carparks.reduce((sum, c) => sum + (c.evChargers.available ? c.evChargers.count : 0), 0);
  const occupancyRate = totalCapacity > 0 ? Math.round(((totalCapacity - totalAvailable) / totalCapacity) * 100) : 0;

  return (
    <div className="bg-slate-900/60 border-b border-slate-800/80 px-4 md:px-8 py-2.5">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-3 text-xs">
        {/* Metric 1: Available Lots */}
        <div className="flex items-center gap-2 text-slate-300">
          <Car className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">Lots Available Islandwide:</span>
          <span className="font-semibold text-white font-mono tabular-nums text-sm">
            {totalAvailable.toLocaleString()}
          </span>
          <span className="text-slate-500">/</span>
          <span className="text-slate-400 font-mono tabular-nums text-xs">
            {totalCapacity.toLocaleString()} total
          </span>
        </div>

        {/* Separator */}
        <div className="hidden lg:block w-px h-4 bg-slate-800" />

        {/* Metric 2: Occupancy Rate */}
        <div className="flex items-center gap-2 text-slate-300">
          <TrendingUp className="w-3.5 h-3.5 text-sky-400" />
          <span className="text-slate-400">Current Occupancy:</span>
          <span className="font-semibold text-white font-mono tabular-nums">
            {occupancyRate}%
          </span>
          <div className="w-16 h-1.5 bg-slate-800 rounded-full overflow-hidden hidden sm:block">
            <div
              className={`h-full rounded-full transition-all duration-500 ${
                occupancyRate > 85 ? 'bg-rose-500' : occupancyRate > 65 ? 'bg-amber-500' : 'bg-emerald-500'
              }`}
              style={{ width: `${occupancyRate}%` }}
            />
          </div>
        </div>

        {/* Separator */}
        <div className="hidden lg:block w-px h-4 bg-slate-800" />

        {/* Metric 3: Ample Lots Locations */}
        <div className="flex items-center gap-2 text-slate-300">
          <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-slate-400">High Availability Carparks (&gt;30 lots):</span>
          <span className="font-semibold text-emerald-400 font-mono tabular-nums">
            {highAvailCount}
          </span>
          <span className="text-slate-500">of {carparks.length}</span>
        </div>

        {/* Separator */}
        <div className="hidden lg:block w-px h-4 bg-slate-800" />

        {/* Metric 4: EV Charging Stations */}
        <div className="flex items-center gap-2 text-slate-300">
          <Zap className="w-3.5 h-3.5 text-cyan-400" />
          <span className="text-slate-400">EV Fast Chargers:</span>
          <span className="font-semibold text-white font-mono tabular-nums">
            {evTotalPoints} points
          </span>
        </div>

        {/* Status */}
        <div className="flex items-center gap-1.5 text-slate-400 text-[11px] ml-auto">
          <span
            className={`w-2 h-2 rounded-full ${
              isLiveApiConnected ? 'bg-emerald-400 shadow-xs shadow-emerald-400/50' : 'bg-sky-400'
            }`}
          />
          <span className="font-medium text-slate-300">
            {isLiveApiConnected ? 'Data.gov.sg Active' : 'SGT Real-Time Feeds'}
          </span>
        </div>
      </div>
    </div>
  );
};
