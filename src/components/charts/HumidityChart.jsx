import React from 'react';
import { motion } from 'framer-motion';

const HumidityChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>Cargando datos de humedad...</p>
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
          <linearGradient id="humidityGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#3b82f6" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#06b6d4" stopOpacity="0.2" />
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
              {value.toFixed(1)}%
            </text>
          );
        })}
        
        {/* Chart bars */}
        {data.map((point, index) => {
          const x = 40 + (index / data.length) * 340;
          const barWidth = 340 / data.length * 0.8;
          const barHeight = ((point.value - minValue) / range) * 128;
          const y = 168 - barHeight;
          
          return (
            <motion.rect
              key={index}
              x={x}
              y={y}
              width={barWidth}
              height={barHeight}
              fill="url(#humidityGradient)"
              rx="2"
              initial={{ height: 0, y: 168 }}
              animate={{ height: barHeight, y }}
              transition={{ duration: 0.8, delay: index * 0.05 }}
            />
          );
        })}
      </svg>
      
      {/* Current value indicator */}
      {data.length > 0 && (
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {data[data.length - 1]?.value.toFixed(1)}%
        </motion.div>
      )}
    </div>
  );
};

export default HumidityChart;