import React from 'react';
import { RefreshCw, MapPin, Bookmark, Car, FileText } from 'lucide-react';

interface HeaderProps {
  activeTab: 'map' | 'list' | 'favorites' | 'rates';
  setActiveTab: (tab: 'map' | 'list' | 'favorites' | 'rates') => void;
  isRefreshing: boolean;
  onRefresh: () => void;
  lastUpdated: string;
  isLiveApiConnected: boolean;
  favoriteCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  activeTab,
  setActiveTab,
  isRefreshing,
  onRefresh,
  lastUpdated,
  isLiveApiConnected,
  favoriteCount,
}) => {
  return (
    <header className="sticky top-0 z-30 flex items-center justify-between gap-4 md:gap-8 px-4 md:px-8 py-3.5 bg-slate-900/95 backdrop-blur-md border-b border-slate-800">
      {/* Zone 1: Single text element wordmark with clean Singapore marker */}
      <div className="flex items-center gap-3 shrink-0">
        <div className="w-8 h-8 rounded-lg bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
          <Car className="w-4 h-4" />
        </div>
        <div className="flex flex-col">
          <div className="flex items-center gap-1.5">
            <span className="text-base md:text-lg font-bold tracking-tight text-white whitespace-nowrap">
              ParkSG
            </span>
            <span className="text-[10px] font-mono tracking-wider px-1.5 py-0.5 rounded bg-emerald-500/10 text-emerald-400 border border-emerald-500/20">
              LIVE
            </span>
          </div>
          <span className="text-[11px] text-slate-400 hidden sm:inline">Singapore Real-Time Lots</span>
        </div>
      </div>

      {/* Zone 2: Navigation Links */}
      <nav className="flex items-center gap-1 sm:gap-2 md:gap-6 text-xs md:text-sm font-medium text-slate-300">
        <button
          onClick={() => setActiveTab('map')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'map'
              ? 'text-white bg-slate-800 font-semibold shadow-sm'
              : 'hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <MapPin className="w-3.5 h-3.5 text-emerald-400" />
          <span>Interactive Map</span>
        </button>

        <button
          onClick={() => setActiveTab('list')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'list'
              ? 'text-white bg-slate-800 font-semibold shadow-sm'
              : 'hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Car className="w-3.5 h-3.5 text-sky-400" />
          <span>Directory</span>
        </button>

        <button
          onClick={() => setActiveTab('favorites')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'favorites'
              ? 'text-white bg-slate-800 font-semibold shadow-sm'
              : 'hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <Bookmark className="w-3.5 h-3.5 text-amber-400" />
          <span>Saved</span>
          {favoriteCount > 0 && (
            <span className="text-[11px] font-mono px-1.5 py-0.2 bg-amber-500/20 text-amber-300 rounded-full">
              {favoriteCount}
            </span>
          )}
        </button>

        <button
          onClick={() => setActiveTab('rates')}
          className={`flex items-center gap-1.5 py-1.5 px-2.5 rounded-md transition-colors whitespace-nowrap shrink-0 ${
            activeTab === 'rates'
              ? 'text-white bg-slate-800 font-semibold shadow-sm'
              : 'hover:text-white hover:bg-slate-800/50'
          }`}
        >
          <FileText className="w-3.5 h-3.5 text-indigo-400" />
          <span>SG Rate Guide</span>
        </button>
      </nav>

      {/* Zone 3: 1 Primary Action (Live Sync) */}
      <div className="flex items-center gap-3 shrink-0">
        <button
          onClick={onRefresh}
          disabled={isRefreshing}
          className="flex items-center gap-2 px-3 py-1.5 md:px-3.5 md:py-2 text-xs font-medium text-slate-200 bg-slate-800 hover:bg-slate-700/80 active:bg-slate-700 border border-slate-700/80 rounded-lg transition-all whitespace-nowrap shrink-0 shadow-sm disabled:opacity-50"
          title={isLiveApiConnected ? 'Connected to Data.gov.sg API' : 'Real-time telemetry active'}
        >
          <RefreshCw className={`w-3.5 h-3.5 text-emerald-400 ${isRefreshing ? 'animate-spin' : ''}`} />
          <span className="hidden sm:inline">Sync Lots</span>
          <span className="text-[11px] font-mono text-slate-400 tabular-nums">
            {lastUpdated || 'Now'}
          </span>
        </button>
      </div>
    </header>
  );
};
