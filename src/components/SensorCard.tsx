
import React from 'react';
import { TrendingUp, TrendingDown, Minus } from 'lucide-react';

interface SensorCardProps {
  title: string;
  value: string;
  unit: string;
  trend: 'up' | 'down' | 'stable';
  trendValue: string;
  icon: React.ReactNode;
  color: string;
  optimal?: boolean;
}

const SensorCard: React.FC<SensorCardProps> = ({
  title,
  value,
  unit,
  trend,
  trendValue,
  icon,
  color,
  optimal = true
}) => {
  const getTrendIcon = () => {
    switch (trend) {
      case 'up':
        return <TrendingUp className="h-4 w-4" />;
      case 'down':
        return <TrendingDown className="h-4 w-4" />;
      default:
        return <Minus className="h-4 w-4" />;
    }
  };

  const getTrendColor = () => {
    if (trend === 'stable') return 'text-gray-500';
    return optimal ? 'text-green-500' : 'text-red-500';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-shadow">
      <div className="flex items-center justify-between mb-4">
        <div className={`p-3 rounded-lg ${color}`}>
          {icon}
        </div>
        <div className={`flex items-center space-x-1 ${getTrendColor()}`}>
          {getTrendIcon()}
          <span className="text-sm font-medium">{trendValue}</span>
        </div>
      </div>
      
      <h3 className="text-gray-600 text-sm font-medium mb-1">{title}</h3>
      <div className="flex items-baseline space-x-1">
        <span className="text-2xl font-bold text-gray-900">{value}</span>
        <span className="text-gray-500 text-sm">{unit}</span>
      </div>
      
      <div className="mt-3">
        <div className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
          optimal ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'
        }`}>
          {optimal ? 'Optimalno' : 'Potrebna pažnja'}
        </div>
      </div>
    </div>
  );
};

export default SensorCard;
