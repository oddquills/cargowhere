import React from 'react';
import { Carpark, VehicleType } from '../types/carpark';
import { Bookmark, Navigation2, Zap, ArrowUpRight, Gauge } from 'lucide-react';

interface CarparkCardProps {
  carpark: Carpark;
  isSelected: boolean;
  isFavorite: boolean;
  onSelect: (carpark: Carpark) => void;
  onToggleFavorite: (id: string) => void;
  vehicleType: VehicleType;
}

export const CarparkCard: React.FC<CarparkCardProps> = ({
  carpark,
  isSelected,
  isFavorite,
  onSelect,
  onToggleFavorite,
  vehicleType,
}) => {
  const currentLots =
    vehicleType === 'motorcycle'
      ? carpark.lotsByType.motorcycle
      : carpark.lotsByType.car;

  const avail = currentLots.available;
  const total = currentLots.total;
  const occupancyPct = total > 0 ? Math.round(((total - avail) / total) * 100) : 100;

  // Status color styling
  let statusColor = 'text-emerald-400';
  let statusText = 'Ample Lots';
  let badgeBg = 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20';

  if (avail <= 0) {
    statusColor = 'text-rose-500';
    statusText = 'Full';
    badgeBg = 'bg-rose-500/10 text-rose-400 border-rose-500/20';
  } else if (avail < 10) {
    statusColor = 'text-rose-400';
    statusText = 'Crowded (<10)';
    badgeBg = 'bg-rose-500/10 text-rose-300 border-rose-500/20';
  } else if (avail <= 30) {
    statusColor = 'text-amber-400';
    statusText = 'Filling Fast';
    badgeBg = 'bg-amber-500/10 text-amber-300 border-amber-500/20';
  }

  return (
    <div
      onClick={() => onSelect(carpark)}
      className={`group relative p-4 rounded-xl transition-all cursor-pointer border ${
        isSelected
          ? 'bg-slate-800/95 border-emerald-500/60 ring-1 ring-emerald-500/40 shadow-lg'
          : 'bg-slate-900/80 hover:bg-slate-850 border-slate-800 hover:border-slate-700/80 shadow-xs'
      }`}
    >
      {/* Top Header: Carpark Name & Favorite */}
      <div className="flex items-start justify-between gap-3 mb-2">
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 mb-1">
            <span className="text-xs font-mono font-medium text-slate-400 bg-slate-800/80 px-1.5 py-0.5 rounded border border-slate-700/50">
              {carpark.carparkNumber}
            </span>
            <span className="text-[11px] text-slate-400 font-medium">{carpark.agency}</span>
            <span className="text-slate-600">·</span>
            <span className="text-[11px] text-slate-400 truncate">{carpark.region}</span>
          </div>

          <h3 className="text-sm md:text-base font-semibold text-white group-hover:text-emerald-400 transition-colors truncate">
            {carpark.name}
          </h3>
        </div>

        {/* Favorite Button */}
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite(carpark.id);
          }}
          className={`p-1.5 rounded-lg transition-colors shrink-0 ${
            isFavorite
              ? 'text-amber-400 bg-amber-400/10 hover:bg-amber-400/20'
              : 'text-slate-500 hover:text-slate-300 hover:bg-slate-800'
          }`}
          title={isFavorite ? 'Remove from saved' : 'Save carpark'}
        >
          <Bookmark className={`w-4 h-4 ${isFavorite ? 'fill-amber-400' : ''}`} />
        </button>
      </div>

      {/* Main Lot Count & Status Row */}
      <div className="flex items-end justify-between gap-4 py-2 my-1 border-y border-slate-800/60">
        <div>
          <div className="text-[11px] text-slate-400 mb-0.5">
            {vehicleType === 'motorcycle' ? 'Motorcycle Lots Available' : 'Car Lots Available'}
          </div>
          <div className="flex items-baseline gap-2">
            <span className={`text-2xl font-bold font-mono tabular-nums ${statusColor}`}>
              {avail.toLocaleString()}
            </span>
            <span className="text-xs font-mono text-slate-500 tabular-nums">
              / {total.toLocaleString()} total
            </span>
          </div>
        </div>

        <div className="text-right">
          <span className={`inline-block text-[11px] font-medium px-2 py-0.5 rounded border ${badgeBg}`}>
            {statusText}
          </span>
          <div className="text-[11px] font-mono text-slate-400 mt-1 tabular-nums">
            {occupancyPct}% full
          </div>
        </div>
      </div>

      {/* Metadata Row: Rates, EV, Clearance, Distance */}
      <div className="flex items-center justify-between text-xs text-slate-400 mt-2.5 pt-1">
        <div className="flex items-center gap-3">
          <span className="font-mono text-slate-300 font-medium">
            ~S${carpark.rates.ratePerHourEstimate.toFixed(2)}/hr
          </span>

          {carpark.evChargers.available && (
            <span className="flex items-center gap-0.5 text-cyan-400 font-medium text-[11px]">
              <Zap className="w-3 h-3" />
              <span>{carpark.evChargers.count} EV</span>
            </span>
          )}

          <span className="text-slate-400 text-[11px]">
            H: {carpark.clearanceHeight}m
          </span>
        </div>

        <div className="flex items-center gap-1.5 shrink-0">
          {carpark.distanceKm !== undefined && (
            <span className="text-[11px] font-mono text-sky-400 flex items-center gap-0.5">
              <Navigation2 className="w-3 h-3 rotate-45" />
              <span>{carpark.distanceKm} km</span>
            </span>
          )}

          <span className="text-emerald-400 opacity-0 group-hover:opacity-100 transition-opacity ml-1 flex items-center text-[11px] font-medium">
            Details <ArrowUpRight className="w-3 h-3 ml-0.5" />
          </span>
        </div>
      </div>
    </div>
  );
};
