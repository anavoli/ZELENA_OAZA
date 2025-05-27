
import React, { useState } from 'react';
import { Bell } from 'lucide-react';

const NotificationSettings = () => {
  const [notifications, setNotifications] = useState({
    watering: true,
    lowMoisture: true,
    temperature: false,
    harvest: true,
    maintenance: true
  });

  const handleNotificationChange = (key: string) => {
    setNotifications(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
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
  );
};

export default NotificationSettings;
