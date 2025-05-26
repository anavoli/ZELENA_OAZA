
import React, { useState } from 'react';
import { Droplets, Play, Pause, Clock, Settings } from 'lucide-react';

interface Zone {
  id: number;
  name: string;
  status: 'active' | 'inactive' | 'scheduled';
  lastRun: string;
  nextRun: string;
  duration: number;
}

const IrrigationControl = () => {
  const [zones, setZones] = useState<Zone[]>([
    { id: 1, name: 'Vrt - Povrće', status: 'active', lastRun: '08:00', nextRun: '20:00', duration: 15 },
    { id: 2, name: 'Cvećnjak', status: 'inactive', lastRun: '18:00', nextRun: '06:00', duration: 10 },
    { id: 3, name: 'Travnjak', status: 'scheduled', lastRun: '07:30', nextRun: '19:30', duration: 20 },
    { id: 4, name: 'Staklenica', status: 'inactive', lastRun: '12:00', nextRun: '18:00', duration: 5 }
  ]);

  const toggleZone = (id: number) => {
    setZones(zones.map(zone => 
      zone.id === id 
        ? { ...zone, status: zone.status === 'active' ? 'inactive' : 'active' }
        : zone
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'bg-green-100 text-green-800';
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'active': return 'Aktivno';
      case 'scheduled': return 'Zakazano';
      default: return 'Neaktivno';
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Kontrola navodnjavanja</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors">
          <Settings className="h-4 w-4" />
          <span>Podešavanja</span>
        </button>
      </div>
      
      <div className="space-y-4">
        {zones.map((zone) => (
          <div key={zone.id} className="border border-gray-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <Droplets className="h-5 w-5 text-blue-500" />
                <div>
                  <h4 className="font-medium text-gray-900">{zone.name}</h4>
                  <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(zone.status)}`}>
                    {getStatusText(zone.status)}
                  </span>
                </div>
              </div>
              
              <button
                onClick={() => toggleZone(zone.id)}
                className={`flex items-center space-x-2 px-3 py-2 rounded-lg transition-colors ${
                  zone.status === 'active'
                    ? 'bg-red-100 text-red-700 hover:bg-red-200'
                    : 'bg-green-100 text-green-700 hover:bg-green-200'
                }`}
              >
                {zone.status === 'active' ? (
                  <>
                    <Pause className="h-4 w-4" />
                    <span>Zaustavi</span>
                  </>
                ) : (
                  <>
                    <Play className="h-4 w-4" />
                    <span>Pokreni</span>
                  </>
                )}
              </button>
            </div>
            
            <div className="grid grid-cols-3 gap-4 text-sm text-gray-600">
              <div>
                <span className="block font-medium">Poslednji ciklus</span>
                <span>{zone.lastRun}</span>
              </div>
              <div>
                <span className="block font-medium">Sledeći ciklus</span>
                <span>{zone.nextRun}</span>
              </div>
              <div>
                <span className="block font-medium">Trajanje</span>
                <span>{zone.duration} min</span>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <Clock className="h-5 w-5 text-gray-400" />
            <span className="text-sm text-gray-600">Automatski režim: Uključen</span>
          </div>
          <div className="text-sm text-gray-600">
            Sledeće automatsko zalivanje: 06:00
          </div>
        </div>
      </div>
    </div>
  );
};

export default IrrigationControl;
