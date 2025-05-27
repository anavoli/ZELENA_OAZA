
import React from 'react';
import { Database, Shield } from 'lucide-react';

const SystemSettings = () => {
  return (
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
  );
};

export default SystemSettings;
