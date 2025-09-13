import React from 'react';
import { motion } from 'framer-motion';

const PressureChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>Cargando datos de presión...</p>
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
          <linearGradient id="pressureGradient" x1="0%" y1="0%" x2="0%" y2="100%">
            <stop offset="0%" stopColor="#10b981" stopOpacity="0.8" />
            <stop offset="100%" stopColor="#059669" stopOpacity="0.2" />
          </linearGradient>
          <filter id="glow">
            <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
            <feMerge> 
              <feMergeNode in="coloredBlur"/>
              <feMergeNode in="SourceGraphic"/>
            </feMerge>
          </filter>
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
              {value.toFixed(0)} hPa
            </text>
          );
        })}
        
        {/* Smooth curve */}
        {data.length > 1 && (
          <motion.path
            d={`M ${data.map((point, index) => {
              const x = 40 + (index / (data.length - 1)) * 340;
              const y = 40 + ((maxValue - point.value) / range) * 128;
              if (index === 0) return `M ${x} ${y}`;
              
              const prevX = 40 + ((index - 1) / (data.length - 1)) * 340;
              const prevY = 40 + ((maxValue - data[index - 1].value) / range) * 128;
              const cpX1 = prevX + (x - prevX) / 3;
              const cpY1 = prevY;
              const cpX2 = x - (x - prevX) / 3;
              const cpY2 = y;
              
              return `C ${cpX1} ${cpY1} ${cpX2} ${cpY2} ${x} ${y}`;
            }).join(' ')}`}
            fill="none"
            stroke="#10b981"
            strokeWidth="3"
            strokeLinecap="round"
            filter="url(#glow)"
            initial={{ pathLength: 0 }}
            animate={{ pathLength: 1 }}
            transition={{ duration: 1.5 }}
          />
        )}
        
        {/* Data points with pulse animation */}
        {data.map((point, index) => {
          const x = 40 + (index / (data.length - 1)) * 340;
          const y = 40 + ((maxValue - point.value) / range) * 128;
          return (
            <g key={index}>
              <motion.circle
                cx={x}
                cy={y}
                r="6"
                fill="#10b981"
                opacity="0.3"
                initial={{ scale: 0 }}
                animate={{ scale: [1, 1.5, 1] }}
                transition={{ 
                  duration: 2, 
                  repeat: Infinity, 
                  delay: index * 0.2 
                }}
              />
              <motion.circle
                cx={x}
                cy={y}
                r="3"
                fill="#10b981"
                stroke="white"
                strokeWidth="2"
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                transition={{ duration: 0.3, delay: index * 0.1 }}
              />
            </g>
          );
        })}
      </svg>
      
      {/* Current value indicator */}
      {data.length > 0 && (
        <motion.div
          className="absolute top-4 right-4 bg-gradient-to-r from-green-500 to-emerald-500 text-white px-3 py-1 rounded-full text-sm font-semibold"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          {data[data.length - 1]?.value.toFixed(1)} hPa
        </motion.div>
      )}
    </div>
  );
};

export default PressureChart;