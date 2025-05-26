
import React from 'react';
import { Cloud, Sun, CloudRain, Wind } from 'lucide-react';

const WeatherWidget = () => {
  const weatherData = {
    current: {
      temp: 24,
      condition: 'Oblačno',
      humidity: 65,
      windSpeed: 12,
      icon: Cloud
    },
    forecast: [
      { day: 'Sutra', temp: 26, icon: Sun, rain: 0 },
      { day: 'Preksutra', temp: 22, icon: CloudRain, rain: 80 },
      { day: 'Čet', temp: 25, icon: Cloud, rain: 20 },
      { day: 'Pet', temp: 28, icon: Sun, rain: 0 }
    ]
  };

  return (
    <div className="bg-gradient-to-br from-blue-500 to-blue-600 rounded-xl p-6 text-white">
      <h3 className="text-lg font-semibold mb-4">Vremenska prognoza</h3>
      
      <div className="flex items-center justify-between mb-6">
        <div>
          <div className="text-3xl font-bold">{weatherData.current.temp}°C</div>
          <div className="text-blue-100">{weatherData.current.condition}</div>
        </div>
        <weatherData.current.icon className="h-12 w-12 text-blue-100" />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-blue-300 rounded-full"></div>
          <span className="text-sm">Vlažnost: {weatherData.current.humidity}%</span>
        </div>
        <div className="flex items-center space-x-2">
          <Wind className="h-4 w-4 text-blue-300" />
          <span className="text-sm">{weatherData.current.windSpeed} km/h</span>
        </div>
      </div>
      
      <div className="space-y-3">
        <h4 className="text-sm font-medium text-blue-100">Naredni dani</h4>
        {weatherData.forecast.map((day, index) => (
          <div key={index} className="flex items-center justify-between">
            <span className="text-sm">{day.day}</span>
            <div className="flex items-center space-x-2">
              <day.icon className="h-4 w-4 text-blue-200" />
              <span className="text-sm">{day.temp}°C</span>
              {day.rain > 0 && (
                <span className="text-xs text-blue-200">({day.rain}%)</span>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default WeatherWidget;
