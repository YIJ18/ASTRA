import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Thermometer, Droplets, Gauge, MapPin, Compass, Sun, Wind } from 'lucide-react';
import TemperatureChart from '@/components/charts/TemperatureChart';
import HumidityChart from '@/components/charts/HumidityChart';
import PressureChart from '@/components/charts/PressureChart';
import GyroscopeChart from '@/components/charts/GyroscopeChart';
import UVChart from '@/components/charts/UVChart';
import CO2Chart from '@/components/charts/CO2Chart';
import GPSMap from '@/components/GPSMap';
import SensorCard from '@/components/SensorCard';

const SensorDashboard = () => {
  const [sensorData, setSensorData] = useState({
    temperature: 22.5,
    humidity: 65,
    pressure: 1013.25,
    gps: { lat: 40.7128, lng: -74.0060 },
    gyroscope: { x: 0, y: 0, z: 0 },
    uv: 5,
    co2: 400
  });

  const [dataHistory, setDataHistory] = useState({
    temperature: [],
    humidity: [],
    pressure: [],
    gyroscope: [],
    uv: [],
    co2: []
  });

  // Simular datos de sensores en tiempo real
  useEffect(() => {
    const interval = setInterval(() => {
      const now = new Date();
      
      setSensorData(prev => {
        const newData = {
          temperature: 20 + Math.random() * 10 + Math.sin(Date.now() / 10000) * 5,
          humidity: 50 + Math.random() * 30 + Math.cos(Date.now() / 8000) * 10,
          pressure: 1000 + Math.random() * 50 + Math.sin(Date.now() / 12000) * 20,
          gps: {
            lat: prev.gps.lat + (Math.random() - 0.5) * 0.001,
            lng: prev.gps.lng + (Math.random() - 0.5) * 0.001
          },
          gyroscope: {
            x: (Math.random() - 0.5) * 90,
            y: (Math.random() - 0.5) * 90,
            z: (Math.random() - 0.5) * 90
          },
          uv: Math.max(0, Math.min(11, 5 + (Math.random() - 0.5) * 4 + Math.sin(Date.now() / 15000) * 3)),
          co2: 400 + Math.random() * 200 + Math.cos(Date.now() / 20000) * 100
        };

        // Actualizar historial
        setDataHistory(prevHistory => ({
          temperature: [...prevHistory.temperature.slice(-19), { time: now, value: newData.temperature }],
          humidity: [...prevHistory.humidity.slice(-19), { time: now, value: newData.humidity }],
          pressure: [...prevHistory.pressure.slice(-19), { time: now, value: newData.pressure }],
          gyroscope: [...prevHistory.gyroscope.slice(-19), { 
            time: now, 
            x: newData.gyroscope.x,
            y: newData.gyroscope.y,
            z: newData.gyroscope.z
          }],
          uv: [...prevHistory.uv.slice(-19), { time: now, value: newData.uv }],
          co2: [...prevHistory.co2.slice(-19), { time: now, value: newData.co2 }],
        }));

        return newData;
      });
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        duration: 0.5
      }
    }
  };

  return (
    <motion.div
      variants={containerVariants}
      initial="hidden"
      animate="visible"
      className="space-y-8"
    >
      {/* Tarjetas de resumen de sensores */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-6 gap-6">
        <SensorCard title="Temperatura" value={`${sensorData.temperature.toFixed(1)}°C`} icon={<Thermometer className="w-6 h-6" />} color="from-red-500 to-orange-500" trend={sensorData.temperature > 22 ? 'up' : 'down'} />
        <SensorCard title="Humedad" value={`${sensorData.humidity.toFixed(1)}%`} icon={<Droplets className="w-6 h-6" />} color="from-blue-500 to-cyan-500" trend={sensorData.humidity > 60 ? 'up' : 'down'} />
        <SensorCard title="Presión" value={`${sensorData.pressure.toFixed(1)} hPa`} icon={<Gauge className="w-6 h-6" />} color="from-green-500 to-emerald-500" trend={sensorData.pressure > 1013 ? 'up' : 'down'} />
        <SensorCard title="Índice UV" value={`${sensorData.uv.toFixed(1)}`} icon={<Sun className="w-6 h-6" />} color="from-yellow-500 to-amber-500" trend={sensorData.uv > 6 ? 'up' : 'down'} />
        <SensorCard title="Nivel CO2" value={`${sensorData.co2.toFixed(0)} ppm`} icon={<Wind className="w-6 h-6" />} color="from-slate-500 to-gray-500" trend={sensorData.co2 > 500 ? 'up' : 'down'} />
        <SensorCard title="GPS Activo" value="Ubicación" icon={<MapPin className="w-6 h-6" />} color="from-purple-500 to-pink-500" trend="stable" />
      </motion.div>

      {/* Gráficas principales */}
      <motion.div variants={itemVariants} className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="glass-card rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-red-500 to-orange-500"><Thermometer className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-semibold">Temperatura</h3>
          </div>
          <TemperatureChart data={dataHistory.temperature} />
        </div>

        <div className="glass-card rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-blue-500 to-cyan-500"><Droplets className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-semibold">Humedad</h3>
          </div>
          <HumidityChart data={dataHistory.humidity} />
        </div>

        <div className="glass-card rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-green-500 to-emerald-500"><Gauge className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-semibold">Presión Atmosférica</h3>
          </div>
          <PressureChart data={dataHistory.pressure} />
        </div>

        <div className="glass-card rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-yellow-500 to-amber-500"><Sun className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-semibold">Radiación UV</h3>
          </div>
          <UVChart data={dataHistory.uv} />
        </div>

        <div className="glass-card rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-slate-500 to-gray-500"><Wind className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-semibold">Nivel de CO2</h3>
          </div>
          <CO2Chart data={dataHistory.co2} />
        </div>
        
        <div className="glass-card rounded-xl p-6 lg:col-span-1">
          <div className="flex items-center gap-3 mb-6">
            <div className="p-2 rounded-lg bg-gradient-to-r from-purple-500 to-pink-500"><Compass className="w-5 h-5 text-white" /></div>
            <h3 className="text-xl font-semibold">Giroscopio</h3>
          </div>
          <GyroscopeChart data={dataHistory.gyroscope} />
        </div>
      </motion.div>

      {/* Mapa GPS */}
      <motion.div variants={itemVariants} className="glass-card rounded-xl p-6">
        <div className="flex items-center gap-3 mb-6">
          <div className="p-2 rounded-lg bg-gradient-to-r from-indigo-500 to-purple-500"><MapPin className="w-5 h-5 text-white" /></div>
          <h3 className="text-xl font-semibold">Ubicación GPS</h3>
          <div className="ml-auto text-sm text-gray-400">
            Lat: {sensorData.gps.lat.toFixed(4)}, Lng: {sensorData.gps.lng.toFixed(4)}
          </div>
        </div>
        <GPSMap position={sensorData.gps} />
      </motion.div>
    </motion.div>
  );
};

export default SensorDashboard;