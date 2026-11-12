import React, { useEffect, useRef, useState } from 'react';
import L from 'leaflet';
import { Carpark, VehicleType } from '../types/carpark';
import { SINGAPORE_HOTSPOTS } from '../data/singaporeCarparks';
import { Navigation, Layers, Compass, Zap, ShieldAlert } from 'lucide-react';

interface CarparkMapProps {
  carparks: Carpark[];
  selectedCarpark: Carpark | null;
  onSelectCarpark: (carpark: Carpark) => void;
  userLocation: [number, number] | null;
  onLocateUser: () => void;
  vehicleType: VehicleType;
}

export const CarparkMap: React.FC<CarparkMapProps> = ({
  carparks,
  selectedCarpark,
  onSelectCarpark,
  userLocation,
  onLocateUser,
  vehicleType,
}) => {
  const mapContainerRef = useRef<HTMLDivElement>(null);
  const mapInstanceRef = useRef<L.Map | null>(null);
  const markersLayerRef = useRef<L.LayerGroup | null>(null);
  const userMarkerRef = useRef<L.Marker | null>(null);
  const [mapTheme, setMapTheme] = useState<'dark' | 'voyager'>('dark');
  const [activeHotspot, setActiveHotspot] = useState<string>('All Singapore');

  // Initialize Map
  useEffect(() => {
    if (!mapContainerRef.current || mapInstanceRef.current) return;

    const map = L.map(mapContainerRef.current, {
      center: [1.3521, 103.8198],
      zoom: 12,
      minZoom: 11,
      maxZoom: 18,
      zoomControl: false,
    });

    L.control.zoom({ position: 'bottomright' }).addTo(map);

    const tileUrl =
      mapTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    const tileLayer = L.tileLayer(tileUrl, {
      attribution: '&copy; <a href="https://carto.com/">CARTO</a> &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);

    const markersGroup = L.layerGroup().addTo(map);
    markersLayerRef.current = markersGroup;
    mapInstanceRef.current = map;

    return () => {
      map.remove();
      mapInstanceRef.current = null;
    };
  }, []);

  // Handle Tile theme switch
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    // Remove existing tile layers
    map.eachLayer((layer) => {
      if (layer instanceof L.TileLayer) {
        map.removeLayer(layer);
      }
    });

    const tileUrl =
      mapTheme === 'dark'
        ? 'https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png'
        : 'https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png';

    L.tileLayer(tileUrl, {
      attribution: '&copy; CARTO &copy; OpenStreetMap',
      subdomains: 'abcd',
      maxZoom: 19,
    }).addTo(map);
  }, [mapTheme]);

  // Update Markers when carparks, vehicleType, or selectedCarpark change
  useEffect(() => {
    if (!mapInstanceRef.current || !markersLayerRef.current) return;

    const markersGroup = markersLayerRef.current;
    markersGroup.clearLayers();

    carparks.forEach((carpark) => {
      const availLots =
        vehicleType === 'motorcycle'
          ? carpark.lotsByType.motorcycle.available
          : carpark.lotsByType.car.available;

      const isSelected = selectedCarpark?.id === carpark.id;

      // Color coding: Green > 30, Amber 10-30, Red < 10
      let badgeBg = 'bg-emerald-500 text-slate-950 border-emerald-400';
      let pinColor = '#10b981';

      if (availLots <= 0) {
        badgeBg = 'bg-rose-700 text-white border-rose-600';
        pinColor = '#be123c';
      } else if (availLots < 10) {
        badgeBg = 'bg-rose-500 text-white border-rose-400';
        pinColor = '#f43f5e';
      } else if (availLots <= 30) {
        badgeBg = 'bg-amber-400 text-slate-950 border-amber-300';
        pinColor = '#f59e0b';
      }

      const customIcon = L.divIcon({
        className: 'custom-carpark-marker',
        html: `
          <div style="transform: translate(-50%, -100%); cursor: pointer;">
            <div class="flex items-center gap-1 px-2 py-0.5 rounded-full font-mono font-bold text-xs shadow-lg transition-transform duration-200 border ${badgeBg} ${
              isSelected ? 'ring-4 ring-white scale-125 z-50' : 'hover:scale-110'
            }">
              <span class="tabular-nums">${availLots}</span>
              ${carpark.evChargers.available ? '<span style="font-size: 9px; line-height: 1;">⚡</span>' : ''}
            </div>
            <div style="width: 2px; height: 6px; background-color: ${pinColor}; margin: 0 auto;"></div>
            <div style="width: 6px; height: 6px; border-radius: 50%; background-color: ${pinColor}; margin: -2px auto 0;"></div>
          </div>
        `,
        iconSize: [40, 40],
        iconAnchor: [20, 40],
      });

      const marker = L.marker(carpark.coordinates, { icon: customIcon });

      marker.on('click', () => {
        onSelectCarpark(carpark);
        if (mapInstanceRef.current) {
          mapInstanceRef.current.flyTo(carpark.coordinates, 16, { duration: 0.8 });
        }
      });

      markersGroup.addLayer(marker);
    });
  }, [carparks, selectedCarpark, vehicleType, onSelectCarpark]);

  // Update User Location Pin
  useEffect(() => {
    if (!mapInstanceRef.current) return;
    const map = mapInstanceRef.current;

    if (userLocation) {
      if (userMarkerRef.current) {
        userMarkerRef.current.setLatLng(userLocation);
      } else {
        const userIcon = L.divIcon({
          className: 'user-location-marker',
          html: `
            <div style="transform: translate(-50%, -50%); position: relative;">
              <div class="w-4 h-4 bg-sky-500 border-2 border-white rounded-full shadow-lg"></div>
              <div class="absolute -inset-2 bg-sky-400/30 rounded-full animate-ping"></div>
            </div>
          `,
          iconSize: [20, 20],
          iconAnchor: [10, 10],
        });
        const marker = L.marker(userLocation, { icon: userIcon, zIndexOffset: 1000 }).addTo(map);
        userMarkerRef.current = marker;
      }
    }
  }, [userLocation]);

  // Fly to selected carpark when changed externally
  useEffect(() => {
    if (selectedCarpark && mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(selectedCarpark.coordinates, 16, { duration: 0.8 });
    }
  }, [selectedCarpark]);

  // Handle Hotspot Jump
  const handleJumpToHotspot = (hotspot: (typeof SINGAPORE_HOTSPOTS)[0]) => {
    setActiveHotspot(hotspot.name);
    if (mapInstanceRef.current) {
      mapInstanceRef.current.flyTo(hotspot.coordinates, hotspot.zoom, { duration: 1.0 });
    }
  };

  return (
    <div className="relative w-full h-full min-h-[420px] rounded-xl overflow-hidden border border-slate-800 bg-slate-950 flex flex-col">
      {/* Top Floating Controls Bar */}
      <div className="absolute top-3 left-3 right-3 z-[1000] flex items-center justify-between gap-2 pointer-events-none">
        {/* Hotspots Quick Filter Bar */}
        <div className="pointer-events-auto flex items-center gap-1.5 overflow-x-auto py-1 px-1.5 bg-slate-900/90 backdrop-blur-md border border-slate-800/90 rounded-lg shadow-lg max-w-[calc(100%-140px)] scrollbar-none">
          <span className="text-[11px] font-medium text-slate-400 px-2 shrink-0 flex items-center gap-1">
            <Compass className="w-3 h-3 text-emerald-400" />
            <span className="hidden sm:inline">Jump to:</span>
          </span>
          {SINGAPORE_HOTSPOTS.map((spot) => (
            <button
              key={spot.name}
              onClick={() => handleJumpToHotspot(spot)}
              className={`px-2.5 py-1 text-xs font-medium rounded transition-colors whitespace-nowrap shrink-0 ${
                activeHotspot === spot.name
                  ? 'bg-emerald-500 text-slate-950 font-semibold shadow-xs'
                  : 'text-slate-300 hover:text-white hover:bg-slate-800/80'
              }`}
            >
              {spot.name}
            </button>
          ))}
        </div>

        {/* Right utility buttons */}
        <div className="pointer-events-auto flex items-center gap-1.5 shrink-0">
          {/* Map theme switcher */}
          <button
            onClick={() => setMapTheme(mapTheme === 'dark' ? 'voyager' : 'dark')}
            className="p-2 text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg shadow-lg backdrop-blur-md transition-colors"
            title="Toggle Map Style (Dark / Street)"
          >
            <Layers className="w-4 h-4 text-slate-300" />
          </button>

          {/* Locate me button */}
          <button
            onClick={onLocateUser}
            className="flex items-center gap-1.5 px-3 py-2 text-xs font-medium bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-800 rounded-lg shadow-lg backdrop-blur-md transition-colors"
            title="Locate my position in Singapore"
          >
            <Navigation className="w-3.5 h-3.5 text-sky-400" />
            <span className="hidden md:inline">Near Me</span>
          </button>
        </div>
      </div>

      {/* Leaflet Map Mount Point */}
      <div ref={mapContainerRef} className="w-full h-full flex-1 z-0" />

      {/* Map Legend (Bottom Left) */}
      <div className="absolute bottom-4 left-4 z-[1000] bg-slate-900/90 backdrop-blur-md border border-slate-800/80 rounded-lg px-3 py-2 shadow-lg flex items-center gap-3 text-[11px] text-slate-300 pointer-events-auto">
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-emerald-500"></span>
          <span>&gt;30 lots</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-amber-400"></span>
          <span>10-30 lots</span>
        </div>
        <div className="flex items-center gap-1.5">
          <span className="w-2.5 h-2.5 rounded-full bg-rose-500"></span>
          <span>&lt;10 lots / Full</span>
        </div>
        <div className="hidden sm:flex items-center gap-1 text-cyan-400 ml-1">
          <Zap className="w-3 h-3" />
          <span className="text-slate-400">EV Station</span>
        </div>
      </div>
    </div>
  );
};
