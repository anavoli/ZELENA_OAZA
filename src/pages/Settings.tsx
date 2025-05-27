import React, { useState } from 'react';
import { Settings as SettingsIcon, Bell, Wifi, Database, Shield, User, Save, Thermometer } from 'lucide-react';
import { Slider } from '@/components/ui/slider';
import WiFiManager from '@/components/WiFiManager';

const Settings = () => {
  const [notifications, setNotifications] = useState({
    watering: true,
    lowMoisture: true,
    temperature: false,
    harvest: true,
    maintenance: true
  });

  const [automation, setAutomation] = useState({
    autoWatering: true,
    temperatureControl: false,
    lightAdjustment: true,
    moistureThreshold: 40,
    optimalTemperature: 22
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleAutomationChange = (key: string) => {
    setAutomation(prev => ({ ...prev, [key]: !prev[key] }));
  };

  const handleTemperatureChange = (value: number[]) => {
    setAutomation(prev => ({ ...prev, optimalTemperature: value[0] }));
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Podešavanja</h1>
          <p className="text-gray-600">Prilagodite vašu pametnu baštu prema potrebama</p>
        </div>

        <div className="space-y-6">
          {/* Profile Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-blue-100 rounded-lg">
                <User className="h-5 w-5 text-blue-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Profil</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Ime</label>
                <input
                  type="text"
                  defaultValue="Marko Petrović"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                <input
                  type="email"
                  defaultValue="marko@example.com"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Lokacija bašte</label>
                <input
                  type="text"
                  defaultValue="Beograd, Srbija"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">Veličina bašte (m²)</label>
                <input
                  type="number"
                  defaultValue="50"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-green-500 focus:border-transparent"
                />
              </div>
            </div>
          </div>

          {/* WiFi Management */}
          <WiFiManager />

          {/* Notification Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-yellow-100 rounded-lg">
                <Bell className="h-5 w-5 text-yellow-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Notifikacije</h2>
            </div>
            
            <div className="space-y-4">
              {Object.entries(notifications).map(([key, value]) => (
                <div key={key} className="flex items-center justify-between py-2">
                  <div>
                    <div className="font-medium text-gray-900">
                      {key === 'watering' ? 'Podsetnik za zalievanje' :
                       key === 'lowMoisture' ? 'Niska vlažnost zemljišta' :
                       key === 'temperature' ? 'Ekstremne temperature' :
                       key === 'harvest' ? 'Vreme za berbu' :
                       'Održavanje sistema'}
                    </div>
                    <div className="text-sm text-gray-600">
                      {key === 'watering' ? 'Obaveštenja o rasporedima zalievanja' :
                       key === 'lowMoisture' ? 'Upozorenja kada je potrebno zalievanje' :
                       key === 'temperature' ? 'Upozorenja o visokim/niskim temperaturama' :
                       key === 'harvest' ? 'Podsetnici kada je biljka spremna za berbu' :
                       'Obaveštenja o potrebi za održavanje'}
                    </div>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={value}
                      onChange={() => handleNotificationChange(key)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-green-300 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* Automation Settings */}
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

          {/* System Settings */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3 mb-6">
              <div className="p-2 bg-purple-100 rounded-lg">
                <Database className="h-5 w-5 text-purple-600" />
              </div>
              <h2 className="text-xl font-semibold text-gray-900">Sistem</h2>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Shield className="h-5 w-5 text-blue-500" />
                  <span className="font-medium text-gray-900">Sigurnost</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">Firmware verzija: 2.4.1</div>
                <div className="text-xs text-green-600">Ažurirano • Najnovija verzija</div>
              </div>

              <div className="p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-3 mb-3">
                  <Database className="h-5 w-5 text-purple-500" />
                  <span className="font-medium text-gray-900">Skladište podataka</span>
                </div>
                <div className="text-sm text-gray-600 mb-2">Lokalno: 2.3 GB / 8 GB</div>
                <div className="text-xs text-green-600">Dostupno prostora</div>
              </div>
            </div>

            <div className="mt-6 pt-6 border-t border-gray-200">
              <h3 className="font-medium text-gray-900 mb-4">Senzori i uređaji</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Temperatura</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Vlažnost</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
                <div className="text-center p-3 bg-green-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">Svetlost</div>
                  <div className="text-xs text-green-600">Online</div>
                </div>
                <div className="text-center p-3 bg-red-50 rounded-lg">
                  <div className="text-sm font-medium text-gray-900">pH senzor</div>
                  <div className="text-xs text-red-600">Offline</div>
                </div>
              </div>
            </div>
          </div>

          {/* Save Button */}
          <div className="flex justify-end">
            <button className="flex items-center space-x-2 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Save className="h-4 w-4" />
              <span>Sačuvaj podešavanja</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
