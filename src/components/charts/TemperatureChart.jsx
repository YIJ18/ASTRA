import React from 'react';
import { motion } from 'framer-motion';

const TemperatureChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>Cargando datos de temperatura...</p>
      </div>
    );
  }

  const maxValue = Math.max(...data.map(d => d.value));
  const minValue = Math.min(...data.map(d => d.value));
  const range = maxValue - minValue || 1;

  return (
    <div className="h-64 relative">
      <svg className="w-full h-full" viewBox="0 0 400 200">
        <defs>
          <linearGradient id="temperatureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#ef4444" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#f97316" stopOpacity="0.2" />
          </linearGradient>
        </defs>
        
        {/* Grid lines */}
        {[0, 1, 2, 3, 4].map(i => (
          <line
            key={i}
            x1="40"
            y1={40 + i * 32}
            x2="380"
            y2={40 + i * 32}
            stroke="rgba(255,255,255,0.1)"
            strokeWidth="1"
          />
        ))}
        
        {/* Y-axis labels */}
        {[0, 1, 2, 3, 4].map(i => {
          const value = maxValue - (i * range / 4);
          return (
            <text
              key={i}
              x="30"
              y={45 + i * 32}
              fill="rgba(255,255,255,0.6)"
              fontSize="10"
              textAnchor="end"
            >
              {value.toFixed(1)}°C
            </text>
          );
        })}
        
        {/* Chart line */}
        {data.length > 1 && (
          <motion.path
            d={`M ${data.map((point, index) => {
              const x = 40 + (index / (data.length - 1)) * 340;
              const y = 40 + ((maxValue - point.value) / range) * 128;
              return `${index === 0 ? 'M' : 'L'} ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="url(#temperatureGradient)"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1 }}
          />
        )}
        
        {/* Area fill */}
        {data.length > 1 && (
          <motion.path
            d={`M 40 168 ${data.map((point, index) => {
              const x = 40 + (index / (data.length - 1)) * 340;
              const y = 40 + ((maxValue - point.value) / range) * 128;
              return `L ${x} ${y}`;
            }).join(' ')} L 380 168 Z`}
            fill="url(#temperatureGradient)"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1, delay: 0.5 }}
          />
        )}
        
        {/* Data points */}
        {data.map((point, index) => {
          const x = 40 + (index / (data.length - 1)) * 340;
          const y = 40 + ((maxValue - point.value) / range) * 128;
          return (
            <motion.circle
              key={index}
              cx={x}
              cy={y}
              r="4"
              fill="#ef4444"
              stroke="white"
              strokeWidth="2"
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ duration: 0.3, delay: index * 0.1 }}
            />
          );
        })}
      </svg>
      
      {/* Current value indicator */}
      {data.length > 0 && (
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {data[data.length - 1]?.value.toFixed(1)}°C
        </motion.div>
      )}
    </div>
  );
};

export default TemperatureChart;