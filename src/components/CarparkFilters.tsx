import React from 'react';
import { FilterState, SingaporeRegion, VehicleType } from '../types/carpark';
import { Search, X, SlidersHorizontal, Car, Bike, Zap } from 'lucide-react';

interface CarparkFiltersProps {
  filters: FilterState;
  onFilterChange: (newFilters: FilterState) => void;
  onReset: () => void;
  totalFiltered: number;
}

const REGIONS: SingaporeRegion[] = [
  'All',
  'Orchard',
  'Marina Bay & Downtown',
  'CBD & Chinatown',
  'Central (Toa Payoh / Bishan)',
  'East (Tampines / Bedok / Changi)',
  'West (Jurong / Clementi)',
  'North (Woodlands / Yishun)',
  'North-East (Sengkang / Punggol)',
];

export const CarparkFilters: React.FC<CarparkFiltersProps> = ({
  filters,
  onFilterChange,
  onReset,
  totalFiltered,
}) => {
  return (
    <div className="bg-slate-900/90 border border-slate-800 rounded-xl p-3.5 space-y-3">
      {/* Row 1: Search Input & Vehicle Toggle */}
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <div className="relative flex-1 w-full">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-slate-400" />
          <input
            type="text"
            value={filters.searchQuery}
            onChange={(e) => onFilterChange({ ...filters, searchQuery: e.target.value })}
            placeholder="Search carparks by mall name, HDB code (ACB, TP10), or street..."
            className="w-full pl-9 pr-8 py-2 bg-slate-950/80 border border-slate-800 rounded-lg text-xs md:text-sm text-slate-200 placeholder:text-slate-500 focus:outline-none focus:border-emerald-500/60 focus:ring-1 focus:ring-emerald-500/30 transition-all"
          />
          {filters.searchQuery && (
            <button
              onClick={() => onFilterChange({ ...filters, searchQuery: '' })}
              className="absolute right-2.5 top-1/2 -translate-y-1/2 text-slate-400 hover:text-white"
            >
              <X className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Vehicle Type Segmented Control */}
        <div className="flex items-center gap-1 p-1 bg-slate-950/80 border border-slate-800 rounded-lg shrink-0 w-full sm:w-auto justify-center">
          <button
            onClick={() => onFilterChange({ ...filters, vehicleType: 'car' })}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filters.vehicleType === 'car'
                ? 'bg-slate-800 text-emerald-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Car className="w-3.5 h-3.5" />
            <span>Car Lots</span>
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, vehicleType: 'motorcycle' })}
            className={`flex items-center gap-1 px-3 py-1.5 text-xs font-medium rounded-md transition-colors ${
              filters.vehicleType === 'motorcycle'
                ? 'bg-slate-800 text-sky-400 font-semibold shadow-xs'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <Bike className="w-3.5 h-3.5" />
            <span>Motorcycle</span>
          </button>
        </div>
      </div>

      {/* Row 2: Region Dropdown, Availability Filter & Sort */}
      <div className="flex flex-wrap items-center gap-2 text-xs">
        {/* Region Select */}
        <div className="flex items-center gap-1.5">
          <label className="text-slate-400 text-[11px]">Region:</label>
          <select
            value={filters.region}
            onChange={(e) => onFilterChange({ ...filters, region: e.target.value as SingaporeRegion })}
            className="bg-slate-950/80 border border-slate-800 rounded-lg px-2.5 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/60"
          >
            {REGIONS.map((region) => (
              <option key={region} value={region}>
                {region}
              </option>
            ))}
          </select>
        </div>

        {/* Availability Filter Buttons */}
        <div className="flex items-center gap-1 bg-slate-950/60 border border-slate-800/80 rounded-lg p-0.5">
          <button
            onClick={() => onFilterChange({ ...filters, availabilityFilter: 'all' })}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              filters.availabilityFilter === 'all'
                ? 'bg-slate-800 text-white'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            All Lots
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, availabilityFilter: 'high' })}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              filters.availabilityFilter === 'high'
                ? 'bg-emerald-500/20 text-emerald-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            &gt;30 lots
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, availabilityFilter: 'medium' })}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              filters.availabilityFilter === 'medium'
                ? 'bg-amber-500/20 text-amber-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            10-30 lots
          </button>
          <button
            onClick={() => onFilterChange({ ...filters, availabilityFilter: 'low' })}
            className={`px-2 py-1 rounded text-[11px] font-medium transition-colors ${
              filters.availabilityFilter === 'low'
                ? 'bg-rose-500/20 text-rose-300 font-semibold'
                : 'text-slate-400 hover:text-slate-200'
            }`}
          >
            &lt;10 lots
          </button>
        </div>

        {/* EV Only toggle */}
        <button
          onClick={() => onFilterChange({ ...filters, evOnly: !filters.evOnly })}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
            filters.evOnly
              ? 'bg-cyan-500/20 border-cyan-500/40 text-cyan-300'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <Zap className="w-3 h-3 text-cyan-400" />
          <span>EV Charging Only</span>
        </button>

        {/* High Clearance Toggle */}
        <button
          onClick={() => onFilterChange({ ...filters, minClearance: filters.minClearance === 2.0 ? 0 : 2.0 })}
          className={`flex items-center gap-1 px-2.5 py-1.5 rounded-lg border text-[11px] font-medium transition-colors ${
            filters.minClearance === 2.0
              ? 'bg-indigo-500/20 border-indigo-500/40 text-indigo-300'
              : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
          }`}
        >
          <span>Height &ge; 2.0m</span>
        </button>

        {/* Sort by */}
        <div className="flex items-center gap-1.5 ml-auto">
          <label className="text-slate-400 text-[11px]">Sort:</label>
          <select
            value={filters.sortBy}
            onChange={(e) => onFilterChange({ ...filters, sortBy: e.target.value as FilterState['sortBy'] })}
            className="bg-slate-950/80 border border-slate-800 rounded-lg px-2 py-1.5 text-xs text-slate-200 focus:outline-none focus:border-emerald-500/60"
          >
            <option value="availability">Most Lots First</option>
            <option value="distance">Nearest First</option>
            <option value="price">Lowest Rates</option>
            <option value="name">Alphabetical</option>
          </select>
        </div>

        {/* Reset */}
        {(filters.searchQuery || filters.region !== 'All' || filters.availabilityFilter !== 'all' || filters.evOnly || filters.minClearance > 0) && (
          <button
            onClick={onReset}
            className="text-[11px] text-slate-400 hover:text-rose-400 underline transition-colors"
          >
            Reset
          </button>
        )}
      </div>

      {/* Filter result count */}
      <div className="text-[11px] text-slate-400 flex items-center justify-between border-t border-slate-800/60 pt-2">
        <span>Showing <strong className="text-white font-mono tabular-nums">{totalFiltered}</strong> carparks matching criteria</span>
        {filters.vehicleType === 'motorcycle' && (
          <span className="text-sky-400 font-mono">Viewing Motorcycle Lots</span>
        )}
      </div>
    </div>
  );
};
