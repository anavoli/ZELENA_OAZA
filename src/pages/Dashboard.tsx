
import React from 'react';
import SensorCard from '../components/SensorCard';
import WeatherWidget from '../components/WeatherWidget';
import PlantCard from '../components/PlantCard';
import IrrigationControl from '../components/IrrigationControl';
import { Thermometer, Droplets, Sun, Activity, Wind, Eye } from 'lucide-react';

const Dashboard = () => {
  const sensorData = [
    {
      title: 'Temperatura',
      value: '24',
      unit: '°C',
      trend: 'up' as const,
      trendValue: '+2°C',
      icon: <Thermometer className="h-6 w-6 text-white" />,
      color: 'bg-red-500',
      optimal: true
    },
    {
      title: 'Vlažnost zemljišta',
      value: '68',
      unit: '%',
      trend: 'down' as const,
      trendValue: '-5%',
      icon: <Droplets className="h-6 w-6 text-white" />,
      color: 'bg-blue-500',
      optimal: false
    },
    {
      title: 'Svetlost',
      value: '75',
      unit: '%',
      trend: 'stable' as const,
      trendValue: '0%',
      icon: <Sun className="h-6 w-6 text-white" />,
      color: 'bg-yellow-500',
      optimal: true
    },
    {
      title: 'pH vrednost',
      value: '6.8',
      unit: 'pH',
      trend: 'up' as const,
      trendValue: '+0.2',
      icon: <Activity className="h-6 w-6 text-white" />,
      color: 'bg-purple-500',
      optimal: true
    }
  ];

  const plants = [
    {
      name: 'Paradajz Cherry',
      variety: 'Solanum lycopersicum',
      image: 'https://images.unsplash.com/photo-1518495973542-4542c06a5843?w=400',
      waterLevel: 85,
      lightLevel: 92,
      health: 'excellent' as const,
      lastWatered: 'Pre 2 sata',
      nextWatering: 'Za 6 sati'
    },
    {
      name: 'Bosiljak',
      variety: 'Ocimum basilicum',
      image: 'https://images.unsplash.com/photo-1465146344425-f00d5f5c8f07?w=400',
      waterLevel: 45,
      lightLevel: 78,
      health: 'warning' as const,
      lastWatered: 'Pre 8 sati',
      nextWatering: 'Sada'
    },
    {
      name: 'Krastavac',
      variety: 'Cucumis sativus',
      image: 'https://images.unsplash.com/photo-1509316975850-ff9c5deb0cd9?w=400',
      waterLevel: 72,
      lightLevel: 85,
      health: 'good' as const,
      lastWatered: 'Pre 4 sata',
      nextWatering: 'Za 4 sata'
    }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Pregled stanja vaše pametne bašte</p>
        </div>

        {/* Sensor Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          {sensorData.map((sensor, index) => (
            <SensorCard key={index} {...sensor} />
          ))}
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
          {/* Weather Widget */}
          <div className="lg:col-span-1">
            <WeatherWidget />
          </div>
          
          {/* Irrigation Control */}
          <div className="lg:col-span-2">
            <IrrigationControl />
          </div>
        </div>

        {/* Plants Section */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h2 className="text-2xl font-bold text-gray-900">Vaše biljke</h2>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Eye className="h-4 w-4" />
              <span>Pogledaj sve</span>
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {plants.map((plant, index) => (
              <PlantCard key={index} {...plant} />
            ))}
          </div>
        </div>

        {/* Quick Stats */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Dnevni pregled</h3>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
            <div className="text-center">
              <div className="text-2xl font-bold text-green-600">12</div>
              <div className="text-sm text-gray-600">Zdravih biljaka</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-600">45L</div>
              <div className="text-sm text-gray-600">Potrošnja vode</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-yellow-600">8.5h</div>
              <div className="text-sm text-gray-600">Sunčanih sati</div>
            </div>
            <div className="text-center">
              <div className="text-2xl font-bold text-purple-600">3</div>
              <div className="text-sm text-gray-600">Potrebne akcije</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
