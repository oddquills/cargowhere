import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { Carpark, FilterState, SingaporeRegion, VehicleType } from './types/carpark';
import {
  fetchLiveCarparks,
  getFavoriteCarparkIds,
  toggleFavoriteCarparkId,
} from './services/carparkService';
import { Header } from './components/Header';
import { StatsBar } from './components/StatsBar';
import { CarparkMap } from './components/CarparkMap';
import { CarparkCard } from './components/CarparkCard';
import { CarparkFilters } from './components/CarparkFilters';
import { CarparkDetailModal } from './components/CarparkDetailModal';
import { RateGuideModal } from './components/RateGuideModal';
import {
  Bookmark,
  Car,
  Compass,
  AlertCircle,
  MapPin,
  RefreshCw,
  Search,
  Sparkles,
} from 'lucide-react';

const INITIAL_FILTERS: FilterState = {
  searchQuery: '',
  region: 'All',
  availabilityFilter: 'all',
  vehicleType: 'car',
  agencyFilter: 'all',
  evOnly: false,
  minClearance: 0,
  sortBy: 'availability',
};

export default function App() {
  const [carparks, setCarparks] = useState<Carpark[]>([]);
  const [selectedCarpark, setSelectedCarpark] = useState<Carpark | null>(null);
  const [favorites, setFavorites] = useState<string[]>([]);
  const [activeTab, setActiveTab] = useState<'map' | 'list' | 'favorites' | 'rates'>('map');
  const [filters, setFilters] = useState<FilterState>(INITIAL_FILTERS);
  const [userLocation, setUserLocation] = useState<[number, number] | null>(null);
  const [isRefreshing, setIsRefreshing] = useState<boolean>(false);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  const [isLiveApiConnected, setIsLiveApiConnected] = useState<boolean>(false);
  const [totalAvailable, setTotalAvailable] = useState<number>(0);
  const [totalCapacity, setTotalCapacity] = useState<number>(0);
  const [isRateGuideOpen, setIsRateGuideOpen] = useState<boolean>(false);
  const [autoRefreshCount, setAutoRefreshCount] = useState<number>(60);

  // Load initial favorites from localStorage
  useEffect(() => {
    setFavorites(getFavoriteCarparkIds());
  }, []);

  // Fetch live carpark data
  const loadData = useCallback(async (coords?: [number, number]) => {
    setIsRefreshing(true);
    try {
      const result = await fetchLiveCarparks(coords || userLocation || undefined);
      setCarparks(result.carparks);
      setIsLiveApiConnected(result.isLiveApiConnected);
      setLastUpdated(result.timestamp);
      setTotalAvailable(result.totalAvailableLots);
      setTotalCapacity(result.totalCapacity);
    } catch (error) {
      console.error('Error updating carparks:', error);
    } finally {
      setIsRefreshing(false);
      setAutoRefreshCount(60);
    }
  }, [userLocation]);

  // Initial load
  useEffect(() => {
    loadData();
  }, [loadData]);

  // Auto-refresh countdown (every 60 seconds)
  useEffect(() => {
    const timer = setInterval(() => {
      setAutoRefreshCount((prev) => {
        if (prev <= 1) {
          loadData();
          return 60;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [loadData]);

  // Geolocation handler
  const handleLocateUser = () => {
    if (!navigator.geolocation) {
      // Fallback to Singapore City Hall
      setUserLocation([1.2930, 103.8520]);
      loadData([1.2930, 103.8520]);
      return;
    }

    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const coords: [number, number] = [pos.coords.latitude, pos.coords.longitude];
        setUserLocation(coords);
        loadData(coords);
      },
      () => {
        // Fallback to central Singapore Orchard location
        const fallback: [number, number] = [1.3038, 103.8340];
        setUserLocation(fallback);
        loadData(fallback);
      },
      { timeout: 8000 }
    );
  };

  // Toggle favorite
  const handleToggleFavorite = (id: string) => {
    const updated = toggleFavoriteCarparkId(id);
    setFavorites(updated);
  };

  // Filtered & Sorted carparks
  const filteredCarparks = useMemo(() => {
    let list = [...carparks];

    // Favorites tab filter
    if (activeTab === 'favorites') {
      list = list.filter((c) => favorites.includes(c.id));
    }

    // Search query
    if (filters.searchQuery.trim()) {
      const q = filters.searchQuery.toLowerCase().trim();
      list = list.filter(
        (c) =>
          c.name.toLowerCase().includes(q) ||
          c.carparkNumber.toLowerCase().includes(q) ||
          c.address.toLowerCase().includes(q) ||
          c.postalCode.includes(q) ||
          c.region.toLowerCase().includes(q)
      );
    }

    // Region
    if (filters.region !== 'All') {
      list = list.filter((c) => c.region === filters.region);
    }

    // Availability Filter
    if (filters.availabilityFilter === 'high') {
      list = list.filter((c) => {
        const lots = filters.vehicleType === 'motorcycle'
          ? c.lotsByType.motorcycle.available
          : c.lotsByType.car.available;
        return lots > 30;
      });
    } else if (filters.availabilityFilter === 'medium') {
      list = list.filter((c) => {
        const lots = filters.vehicleType === 'motorcycle'
          ? c.lotsByType.motorcycle.available
          : c.lotsByType.car.available;
        return lots >= 10 && lots <= 30;
      });
    } else if (filters.availabilityFilter === 'low') {
      list = list.filter((c) => {
        const lots = filters.vehicleType === 'motorcycle'
          ? c.lotsByType.motorcycle.available
          : c.lotsByType.car.available;
        return lots < 10;
      });
    }

    // EV Only
    if (filters.evOnly) {
      list = list.filter((c) => c.evChargers.available);
    }

    // Clearance Height
    if (filters.minClearance > 0) {
      list = list.filter((c) => c.clearanceHeight >= filters.minClearance);
    }

    // Sorting
    list.sort((a, b) => {
      if (filters.sortBy === 'availability') {
        const lotsA = filters.vehicleType === 'motorcycle'
          ? a.lotsByType.motorcycle.available
          : a.lotsByType.car.available;
        const lotsB = filters.vehicleType === 'motorcycle'
          ? b.lotsByType.motorcycle.available
          : b.lotsByType.car.available;
        return lotsB - lotsA;
      }
      if (filters.sortBy === 'distance') {
        const distA = a.distanceKm ?? 999;
        const distB = b.distanceKm ?? 999;
        return distA - distB;
      }
      if (filters.sortBy === 'price') {
        return a.rates.ratePerHourEstimate - b.rates.ratePerHourEstimate;
      }
      if (filters.sortBy === 'name') {
        return a.name.localeCompare(b.name);
      }
      return 0;
    });

    return list;
  }, [carparks, favorites, activeTab, filters]);

  // Handle Tab switch
  const handleTabChange = (tab: 'map' | 'list' | 'favorites' | 'rates') => {
    if (tab === 'rates') {
      setIsRateGuideOpen(true);
    } else {
      setActiveTab(tab);
    }
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col font-sans selection:bg-emerald-500 selection:text-white">
      {/* Top Header */}
      <Header
        activeTab={activeTab}
        setActiveTab={handleTabChange}
        isRefreshing={isRefreshing}
        onRefresh={() => loadData()}
        lastUpdated={lastUpdated}
        isLiveApiConnected={isLiveApiConnected}
        favoriteCount={favorites.length}
      />

      {/* Stats KPI Bar */}
      <StatsBar
        carparks={carparks}
        totalAvailable={totalAvailable}
        totalCapacity={totalCapacity}
        isLiveApiConnected={isLiveApiConnected}
      />

      {/* Auto-refresh indicator sub-bar */}
      <div className="bg-slate-900/40 border-b border-slate-800/40 px-4 md:px-8 py-1 flex items-center justify-between text-[11px] text-slate-400">
        <div className="flex items-center gap-1.5">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
          <span>Next live sync in <strong className="text-slate-300 font-mono tabular-nums">{autoRefreshCount}s</strong></span>
        </div>
        <div className="flex items-center gap-3">
          <span className="hidden sm:inline">Singapore Standard Time (UTC+8)</span>
          <button
            onClick={() => handleTabChange('rates')}
            className="text-sky-400 hover:text-sky-300 hover:underline transition-colors"
          >
            HDB & URA Rates Guide
          </button>
        </div>
      </div>

      {/* Main Content Area */}
      <main className="flex-1 flex flex-col max-w-7xl w-full mx-auto p-3 sm:p-4 md:p-6 gap-4">
        {/* INTERACTIVE MAP VIEW */}
        {activeTab === 'map' && (
          <div className="flex-1 grid grid-cols-1 lg:grid-cols-12 gap-4 min-h-[580px]">
            {/* Left Column: Filter and Results List (5 cols on large) */}
            <div className="lg:col-span-5 flex flex-col gap-3 max-h-[820px]">
              <CarparkFilters
                filters={filters}
                onFilterChange={setFilters}
                onReset={() => setFilters(INITIAL_FILTERS)}
                totalFiltered={filteredCarparks.length}
              />

              {/* Scrollable Cards List */}
              <div className="flex-1 overflow-y-auto space-y-2.5 pr-1">
                {filteredCarparks.length === 0 ? (
                  <div className="p-8 text-center bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                    <AlertCircle className="w-8 h-8 text-slate-500 mx-auto" />
                    <p className="text-sm font-semibold text-slate-300">No carparks match your filter criteria</p>
                    <p className="text-xs text-slate-500">
                      Try expanding your search query or selecting &quot;All Singapore&quot;.
                    </p>
                    <button
                      onClick={() => setFilters(INITIAL_FILTERS)}
                      className="mt-2 px-3 py-1.5 text-xs text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg transition-colors"
                    >
                      Reset All Filters
                    </button>
                  </div>
                ) : (
                  filteredCarparks.map((carpark) => (
                    <CarparkCard
                      key={carpark.id}
                      carpark={carpark}
                      isSelected={selectedCarpark?.id === carpark.id}
                      isFavorite={favorites.includes(carpark.id)}
                      onSelect={(c) => setSelectedCarpark(c)}
                      onToggleFavorite={handleToggleFavorite}
                      vehicleType={filters.vehicleType}
                    />
                  ))
                )}
              </div>
            </div>

            {/* Right Column: Full Interactive Map (7 cols on large) */}
            <div className="lg:col-span-7 h-[500px] lg:h-full min-h-[480px]">
              <CarparkMap
                carparks={filteredCarparks}
                selectedCarpark={selectedCarpark}
                onSelectCarpark={(c) => setSelectedCarpark(c)}
                userLocation={userLocation}
                onLocateUser={handleLocateUser}
                vehicleType={filters.vehicleType}
              />
            </div>
          </div>
        )}

        {/* FULL DIRECTORY LIST VIEW */}
        {activeTab === 'list' && (
          <div className="space-y-4">
            <CarparkFilters
              filters={filters}
              onFilterChange={setFilters}
              onReset={() => setFilters(INITIAL_FILTERS)}
              totalFiltered={filteredCarparks.length}
            />

            {filteredCarparks.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-xl space-y-2">
                <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
                <p className="text-base font-semibold text-slate-300">No carparks found</p>
                <p className="text-xs text-slate-500">Adjust your search keyword or region.</p>
                <button
                  onClick={() => setFilters(INITIAL_FILTERS)}
                  className="mt-2 px-4 py-2 text-xs text-emerald-400 bg-emerald-500/10 hover:bg-emerald-500/20 rounded-lg"
                >
                  Reset Filters
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredCarparks.map((carpark) => (
                  <CarparkCard
                    key={carpark.id}
                    carpark={carpark}
                    isSelected={selectedCarpark?.id === carpark.id}
                    isFavorite={favorites.includes(carpark.id)}
                    onSelect={(c) => setSelectedCarpark(c)}
                    onToggleFavorite={handleToggleFavorite}
                    vehicleType={filters.vehicleType}
                  />
                ))}
              </div>
            )}
          </div>
        )}

        {/* SAVED / WATCHLIST VIEW */}
        {activeTab === 'favorites' && (
          <div className="space-y-4">
            <div className="flex items-center justify-between p-4 bg-slate-900/80 border border-slate-800 rounded-xl">
              <div>
                <h2 className="text-base md:text-lg font-bold text-white flex items-center gap-2">
                  <Bookmark className="w-4 h-4 text-amber-400 fill-amber-400" />
                  <span>My Saved Carparks Watchlist</span>
                </h2>
                <p className="text-xs text-slate-400 mt-0.5">
                  Pin your home estate, work building, or regular weekend mall for instant lot availability.
                </p>
              </div>

              <div className="text-xs font-mono text-slate-300 bg-slate-800 px-3 py-1.5 rounded-lg border border-slate-700">
                {favorites.length} saved
              </div>
            </div>

            {filteredCarparks.length === 0 ? (
              <div className="p-12 text-center bg-slate-900/60 border border-slate-800 rounded-2xl space-y-4">
                <Bookmark className="w-12 h-12 text-slate-600 mx-auto" />
                <div>
                  <h3 className="text-base font-semibold text-white">No saved carparks yet</h3>
                  <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
                    Click the bookmark icon on any carpark in the map or directory to track its live availability here.
                  </p>
                </div>

                <div className="pt-2">
                  <button
                    onClick={() => setActiveTab('map')}
                    className="px-4 py-2 text-xs font-semibold text-slate-950 bg-emerald-400 hover:bg-emerald-300 rounded-xl transition-colors shadow-sm"
                  >
                    Explore Singapore Carparks
                  </button>
                </div>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3.5">
                {filteredCarparks.map((carpark) => (
                  <CarparkCard
                    key={carpark.id}
                    carpark={carpark}
                    isSelected={selectedCarpark?.id === carpark.id}
                    isFavorite={true}
                    onSelect={(c) => setSelectedCarpark(c)}
                    onToggleFavorite={handleToggleFavorite}
                    vehicleType={filters.vehicleType}
                  />
                ))}
              </div>
            )}
          </div>
        )}
      </main>

      {/* Carpark Detail Drawer / Modal */}
      {selectedCarpark && (
        <CarparkDetailModal
          carpark={selectedCarpark}
          onClose={() => setSelectedCarpark(null)}
          isFavorite={favorites.includes(selectedCarpark.id)}
          onToggleFavorite={handleToggleFavorite}
          vehicleType={filters.vehicleType}
        />
      )}

      {/* Singapore Rate Guide Modal */}
      {isRateGuideOpen && (
        <RateGuideModal onClose={() => setIsRateGuideOpen(false)} />
      )}

      {/* Footer */}
      <footer className="mt-auto border-t border-slate-800/80 bg-slate-950 py-4 px-4 md:px-8 text-center text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-2">
          <div>
            ParkSG Singapore Carpark Tracker &copy; {new Date().getFullYear()} · Real-Time Lots Feeds
          </div>
          <div className="flex items-center gap-4 text-slate-400">
            <span>Data Source: Data.gov.sg & LTA DataMall</span>
            <span>·</span>
            <span>HDB / URA / Commercial EPS</span>
          </div>
        </div>
      </footer>
    </div>
  );
}
