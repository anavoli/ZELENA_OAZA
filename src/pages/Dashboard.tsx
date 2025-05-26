
import React from 'react';
import { Thermometer, Droplets, Sun, Activity } from 'lucide-react';
import SensorCard from '../components/SensorCard';
import IrrigationControl from '../components/IrrigationControl';
import HardwareControl from '../components/HardwareControl';
import AutomationRules from '../components/AutomationRules';
import NotificationCenter from '../components/NotificationCenter';

const Dashboard = () => {
  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard</h1>
          <p className="text-gray-600">Pregled stanja vaše pametne bašte</p>
        </div>

        {/* Sensor Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <SensorCard
            title="Temperatura"
            value="24.5"
            unit="°C"
            trend="up"
            trendValue="+1.2°C"
            icon={<Thermometer className="h-6 w-6 text-white" />}
            color="bg-orange-100"
            optimal={true}
          />
          <SensorCard
            title="Vlažnost zemljišta"
            value="68"
            unit="%"
            trend="down"
            trendValue="-5%"
            icon={<Droplets className="h-6 w-6 text-white" />}
            color="bg-blue-100"
            optimal={true}
          />
          <SensorCard
            title="Svetlost"
            value="850"
            unit="lux"
            trend="stable"
            trendValue="0"
            icon={<Sun className="h-6 w-6 text-white" />}
            color="bg-yellow-100"
            optimal={true}
          />
          <SensorCard
            title="pH vrednost"
            value="6.8"
            unit="pH"
            trend="up"
            trendValue="+0.2"
            icon={<Activity className="h-6 w-6 text-white" />}
            color="bg-green-100"
            optimal={false}
          />
        </div>

        {/* Main Content Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          <IrrigationControl />
          <HardwareControl />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <AutomationRules />
          <NotificationCenter />
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
