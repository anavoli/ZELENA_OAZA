
import React from 'react';
import { Droplets, Sun, AlertTriangle, CheckCircle } from 'lucide-react';

interface PlantCardProps {
  name: string;
  variety: string;
  image: string;
  waterLevel: number;
  lightLevel: number;
  health: 'excellent' | 'good' | 'warning' | 'critical';
  lastWatered: string;
  nextWatering: string;
}

const PlantCard: React.FC<PlantCardProps> = ({
  name,
  variety,
  image,
  waterLevel,
  lightLevel,
  health,
  lastWatered,
  nextWatering
}) => {
  const getHealthColor = () => {
    switch (health) {
      case 'excellent': return 'bg-green-100 text-green-800';
      case 'good': return 'bg-blue-100 text-blue-800';
      case 'warning': return 'bg-yellow-100 text-yellow-800';
      case 'critical': return 'bg-red-100 text-red-800';
    }
  };

  const getHealthIcon = () => {
    switch (health) {
      case 'excellent':
      case 'good':
        return <CheckCircle className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-md transition-shadow">
      <div className="aspect-video relative">
        <img 
          src={image} 
          alt={name}
          className="w-full h-full object-cover"
        />
        <div className={`absolute top-3 right-3 flex items-center space-x-1 px-2 py-1 rounded-full text-xs font-medium ${getHealthColor()}`}>
          {getHealthIcon()}
          <span className="capitalize">{health}</span>
        </div>
      </div>
      
      <div className="p-4">
        <h3 className="font-semibold text-gray-900 mb-1">{name}</h3>
        <p className="text-sm text-gray-600 mb-4">{variety}</p>
        
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Droplets className="h-4 w-4 text-blue-500" />
              <span className="text-sm text-gray-600">Vlažnost</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-blue-500 h-2 rounded-full" 
                  style={{ width: `${waterLevel}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{waterLevel}%</span>
            </div>
          </div>
          
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              <Sun className="h-4 w-4 text-yellow-500" />
              <span className="text-sm text-gray-600">Svetlo</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 bg-gray-200 rounded-full h-2">
                <div 
                  className="bg-yellow-500 h-2 rounded-full" 
                  style={{ width: `${lightLevel}%` }}
                ></div>
              </div>
              <span className="text-sm font-medium">{lightLevel}%</span>
            </div>
          </div>
        </div>
        
        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="text-xs text-gray-500">
            <div>Poslednje zalivanje: {lastWatered}</div>
            <div>Sledeće zalivanje: {nextWatering}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PlantCard;
