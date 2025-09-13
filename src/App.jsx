import React from 'react';
import { Helmet } from 'react-helmet';
import { motion } from 'framer-motion';
import { Toaster } from '@/components/ui/toaster';
import SensorDashboard from '@/components/SensorDashboard';
import 'leaflet/dist/leaflet.css';

function App() {
  return (
    <>
      <Helmet>
        <title>Dashboard de Sensores IoT - Monitoreo en Tiempo Real</title>
        <meta name="description" content="Dashboard avanzado para monitoreo de sensores IoT con gráficas de temperatura, humedad, presión, GPS, giroscopio, UV y CO2 en tiempo real." />
        <meta property="og:title" content="Dashboard de Sensores IoT - Monitoreo en Tiempo Real" />
        <meta property="og:description" content="Dashboard avanzado para monitoreo de sensores IoT con gráficas de temperatura, humedad, presión, GPS, giroscopio, UV y CO2 en tiempo real." />
      </Helmet>
      
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-indigo-900">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          className="container mx-auto px-4 py-8"
        >
          <motion.div
            initial={{ y: -50, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-center mb-12"
          >
            <h1 className="text-5xl font-bold mb-4 gradient-text">
              Dashboard de Sensores IoT
            </h1>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Monitoreo en tiempo real de temperatura, humedad, presión, GPS, giroscopio, UV y CO2.
            </p>
          </motion.div>

          <SensorDashboard />
        </motion.div>
        
        <Toaster />
      </div>
    </>
  );
}

export default App;