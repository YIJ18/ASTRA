import React, { useEffect, useRef, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap } from 'react-leaflet';
import { motion } from 'framer-motion';
import L from 'leaflet';

delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon-2x.png',
  iconUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-icon.png',
  shadowUrl: 'https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.7.1/images/marker-shadow.png',
});

const createPulsingIcon = () => {
  return L.divIcon({
    className: 'custom-div-icon',
    html: `<div style="width: 20px; height: 20px; background: linear-gradient(135deg, #8b5cf6, #a855f7); border: 3px solid white; border-radius: 50%; box-shadow: 0 0 20px rgba(139, 92, 246, 0.6); animation: pulse 2s infinite;"></div><style>@keyframes pulse { 0% { transform: scale(1); box-shadow: 0 0 20px rgba(139, 92, 246, 0.6); } 50% { transform: scale(1.2); box-shadow: 0 0 30px rgba(139, 92, 246, 0.8); } 100% { transform: scale(1); box-shadow: 0 0 20px rgba(139, 92, 246, 0.6); } }</style>`,
    iconSize: [20, 20],
    iconAnchor: [10, 10]
  });
};

const MapUpdater = ({ position }) => {
  const map = useMap();
  useEffect(() => {
    map.setView([position.lat, position.lng], map.getZoom());
  }, [position, map]);
  return null;
};

const GPSMap = ({ position }) => {
  const [mapInstance, setMapInstance] = useState(null);

  useEffect(() => {
    if (mapInstance) {
      const timer = setTimeout(() => {
        mapInstance.invalidateSize();
      }, 400); 
      return () => clearTimeout(timer);
    }
  }, [mapInstance]);

  return (
    <motion.div
      className="h-96 w-full rounded-xl overflow-hidden relative"
      initial={{ opacity: 0, scale: 0.9 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.8 }}
      onAnimationComplete={() => {
        if (mapInstance) {
          mapInstance.invalidateSize();
        }
      }}
    >
      <MapContainer
        center={[position.lat, position.lng]}
        zoom={15}
        style={{ height: '100%', width: '100%' }}
        whenCreated={setMapInstance}
      >
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        
        <MapUpdater position={position} />
        
        <Marker 
          position={[position.lat, position.lng]}
          icon={createPulsingIcon()}
        >
          <Popup>
            <div className="text-center p-2">
              <h3 className="font-semibold text-gray-800 mb-2">Ubicación Actual</h3>
              <p className="text-sm text-gray-600">
                <strong>Latitud:</strong> {position.lat.toFixed(6)}<br/>
                <strong>Longitud:</strong> {position.lng.toFixed(6)}
              </p>
              <div className="mt-2 text-xs text-gray-500">
                Actualización en tiempo real
              </div>
            </div>
          </Popup>
        </Marker>
      </MapContainer>
      
      <motion.div
        className="absolute bottom-4 left-4 bg-black bg-opacity-70 text-white px-3 py-2 rounded-lg text-sm z-[1000]"
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, delay: 0.5 }}
      >
        <div className="flex items-center gap-2">
          <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
          <span>GPS Activo</span>
        </div>
        <div className="text-xs text-gray-300 mt-1">
          {position.lat.toFixed(4)}, {position.lng.toFixed(4)}
        </div>
      </motion.div>
    </motion.div>
  );
};

export default GPSMap;