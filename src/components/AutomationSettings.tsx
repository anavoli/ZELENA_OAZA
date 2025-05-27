
import React, { useState } from 'react';
import { Settings as SettingsIcon, Thermometer } from 'lucide-react';
import { Slider } from '@/components/ui/slider';

const AutomationSettings = () => {
  const [automation, setAutomation] = useState({
    autoWatering: true,
    temperatureControl: false,
    lightAdjustment: true,
    moistureThreshold: 40,
    optimalTemperature: 22
  });

  const handleAutomationChange = (key: string) => {
    setAutomation(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTemperatureChange = (value: number[]) => {
    setAutomation(prev => ({ ...prev, optimalTemperature: value[0] }));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center space-x-3 mb-6">
        <div className="p-2 bg-green-100 rounded-lg">
          <SettingsIcon className="h-5 w-5 text-green-600" />
        </div>
        <h2 className="text-xl font-semibold text-gray-900">Automatizacija</h2>
      </div>
      
      <div className="space-y-6">
        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-medium text-gray-900">Automatsko zalievanje</div>
            <div className="text-sm text-gray-600">Sistem će automatski zalievati biljke prema rasporedu</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={automation.autoWatering}
              onChange={() => handleAutomationChange('autoWatering')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-medium text-gray-900">Kontrola temperature</div>
            <div className="text-sm text-gray-600">Automatsko upravljanje ventilacijom i grejanjem</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={automation.temperatureControl}
              onChange={() => handleAutomationChange('temperatureControl')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div className="flex items-center justify-between py-2">
          <div>
            <div className="font-medium text-gray-900">Prilagođavanje osvetljenja</div>
            <div className="text-sm text-gray-600">Automatsko upravljanje LED osvetljenjem</div>
          </div>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={automation.lightAdjustment}
              onChange={() => handleAutomationChange('lightAdjustment')}
              className="sr-only peer"
            />
            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
          </label>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Prag vlažnosti za automatsko zalievanje ({automation.moistureThreshold}%)
          </label>
          <input
            type="range"
            min="20"
            max="80"
            value={automation.moistureThreshold}
            onChange={(e) => setAutomation(prev => ({ ...prev, moistureThreshold: parseInt(e.target.value) }))}
            className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer slider"
          />
          <div className="flex justify-between text-xs text-gray-500 mt-1">
            <span>20%</span>
            <span>50%</span>
            <span>80%</span>
          </div>
        </div>

        <div>
          <div className="flex items-center space-x-3 mb-3">
            <Thermometer className="h-5 w-5 text-orange-500" />
            <label className="block text-sm font-medium text-gray-700">
              Optimalna temperatura ({automation.optimalTemperature}°C)
            </label>
          </div>
          <div className="space-y-2">
            <Slider
              value={[automation.optimalTemperature]}
              onValueChange={handleTemperatureChange}
              max={35}
              min={15}
              step={1}
              className="w-full"
            />
            <div className="flex justify-between text-xs text-gray-500">
              <span>15°C</span>
              <span>25°C</span>
              <span>35°C</span>
            </div>
            <div className="text-xs text-gray-600 mt-2">
              Sistem će održavati temperaturu na {automation.optimalTemperature}°C kada je aktivna kontrola temperature
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AutomationSettings;
