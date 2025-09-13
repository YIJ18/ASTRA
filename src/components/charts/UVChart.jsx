import React from 'react';
import { motion } from 'framer-motion';
import { Sun } from 'lucide-react';

const UVChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>Cargando datos de UV...</p>
      </div>
    );
  }

  const currentValue = data[data.length - 1].value;
  const maxUv = 11;
  const percentage = (currentValue / maxUv) * 100;

  const getUvColor = (value) => {
    if (value <= 2) return '#a3e635'; // Low
    if (value <= 5) return '#facc15'; // Moderate
    if (value <= 7) return '#f97316'; // High
    if (value <= 10) return '#ef4444'; // Very High
    return '#dc2626'; // Extreme
  };

  const uvColor = getUvColor(currentValue);

  return (
    <div className="h-64 flex flex-col items-center justify-center relative">
      <motion.div
        initial={{ opacity: 0, scale: 0.5 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8 }}
        className="relative w-40 h-40"
      >
        <svg className="w-full h-full" viewBox="0 0 100 100">
          <defs>
            <filter id="uvGlow">
              <feGaussianBlur stdDeviation="3" result="coloredBlur"/>
              <feMerge> 
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          <circle
            cx="50"
            cy="50"
            r="45"
            stroke="#374151"
            strokeWidth="8"
            fill="none"
          />
          <motion.circle
            cx="50"
            cy="50"
            r="45"
            stroke={uvColor}
            strokeWidth="8"
            fill="none"
            strokeLinecap="round"
            strokeDasharray={2 * Math.PI * 45}
            initial={{ strokeDashoffset: 2 * Math.PI * 45 }}
            animate={{ strokeDashoffset: 2 * Math.PI * 45 * (1 - percentage / 100) }}
            transition={{ duration: 1.5, ease: "easeInOut" }}
            transform="rotate(-90 50 50)"
            filter="url(#uvGlow)"
          />
        </svg>
        <div className="absolute inset-0 flex flex-col items-center justify-center">
          <Sun className="w-8 h-8 mb-1" style={{ color: uvColor }} />
          <motion.span 
            className="text-4xl font-bold"
            style={{ color: uvColor }}
          >
            {currentValue.toFixed(1)}
          </motion.span>
          <span className="text-sm text-gray-400">Índice</span>
        </div>
      </motion.div>
      <div className="mt-4 text-center">
        <p className="font-semibold" style={{ color: uvColor }}>
          {currentValue <= 2 ? 'Bajo' : currentValue <= 5 ? 'Moderado' : currentValue <= 7 ? 'Alto' : currentValue <= 10 ? 'Muy Alto' : 'Extremo'}
        </p>
        <p className="text-xs text-gray-500">Nivel de radiación UV</p>
      </div>
    </div>
  );
};

export default UVChart;