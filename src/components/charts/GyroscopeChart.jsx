import React from 'react';
import { motion } from 'framer-motion';

const RocketIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 125" className="w-24 h-24 drop-shadow-[0_5px_15px_rgba(255,255,255,0.2)]">
        <defs>
            <linearGradient id="rocketBody" x1="0%" y1="0%" x2="100%" y2="0%">
                <stop offset="0%" stopColor="#d1d5db"/>
                <stop offset="50%" stopColor="#f3f4f6"/>
                <stop offset="100%" stopColor="#d1d5db"/>
            </linearGradient>
            <linearGradient id="rocketFlame" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#f97316"/>
                <stop offset="100%" stopColor="#facc15"/>
            </linearGradient>
        </defs>
        <path fill="url(#rocketBody)" d="M72.5,45.3c-2.4-7.8-6.4-17.6-11.8-27.1c-2-3.6-4.2-7-6.5-10.1C52.4,5.4,50.7,3.5,50,3.5 s-2.4,1.9-4.2,4.6c-2.3,3.1-4.5,6.5-6.5,10.1C33.8,27.7,29.9,37.5,27.5,45.3c-2.5,8-3.4,16.5-2.7,24.1c0.3,3.8,3.4,6.7,7.2,6.7 h1c0,6.2,5,11.3,11.3,11.3s11.3-5,11.3-11.3h1c3.8,0,6.9-3,7.2-6.7C75.9,61.8,75,53.3,72.5,45.3z M50,65 c-3.5,0-6.3-2.8-6.3-6.3s2.8-6.3,6.3-6.3s6.3,2.8,6.3,6.3S53.5,65,50,65z"/>
        <path fill="#ef4444" d="M35.9,76.2H25c-3.5,0-6.3,2.8-6.3,6.3S21.5,88.8,25,88.8h10.9c0.8,0,1.5-0.7,1.5-1.5v-9.6 C37.4,76.8,36.7,76.2,35.9,76.2z"/>
        <path fill="#ef4444" d="M75,76.2H64.1c-0.8,0-1.5,0.7-1.5,1.5v9.6c0,0.8,0.7,1.5,1.5,1.5H75c3.5,0,6.3-2.8,6.3-6.3 S78.5,76.2,75,76.2z"/>
        <motion.path 
            fill="url(#rocketFlame)" 
            d="M50,87.5c-4.4,0-8,3.6-8,8s3.6,8,8,8s8-3.6,8-8S54.4,87.5,50,87.5z"
            animate={{ scaleY: [1, 1.5, 1], y: [0, 5, 0] }}
            transition={{ duration: 0.5, repeat: Infinity }}
        />
    </svg>
);


const GyroscopeChart = ({ data }) => {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-gray-400">
        <p>Cargando datos del giroscopio...</p>
      </div>
    );
  }

  const currentData = data[data.length - 1] || { x: 0, y: 0, z: 0 };

  return (
    <div className="h-64 flex flex-col justify-between">
      <div className="flex-grow flex items-center justify-center" style={{ perspective: '800px' }}>
        <motion.div
          style={{ transformStyle: 'preserve-3d' }}
          animate={{
            rotateX: currentData.x,
            rotateY: currentData.y,
            rotateZ: currentData.z,
          }}
          transition={{ duration: 0.5, ease: 'easeOut' }}
        >
          <RocketIcon />
        </motion.div>
      </div>

      <div className="text-center">
        <p className="text-sm text-gray-400 mb-2">Un giroscopio mide la orientación y la velocidad angular. ¡Piensa en ello como el sentido del equilibrio de tu dispositivo!</p>
        <div className="flex justify-center gap-4 text-sm">
          <span className="text-red-400 font-semibold">X: {currentData.x.toFixed(1)}°</span>
          <span className="text-green-400 font-semibold">Y: {currentData.y.toFixed(1)}°</span>
          <span className="text-blue-400 font-semibold">Z: {currentData.z.toFixed(1)}°</span>
        </div>
      </div>
    </div>
  );
};

export default GyroscopeChart;