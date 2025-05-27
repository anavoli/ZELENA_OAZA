
import React from 'react';
import { Save } from 'lucide-react';
import WiFiManager from '@/components/WiFiManager';
import ProfileSettings from '@/components/ProfileSettings';
import NotificationSettings from '@/components/NotificationSettings';
import AutomationSettings from '@/components/AutomationSettings';
import SystemSettings from '@/components/SystemSettings';

const Settings = () => {
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
          <ProfileSettings />

          {/* WiFi Management */}
          <WiFiManager />

          {/* Notification Settings */}
          <NotificationSettings />

          {/* Automation Settings */}
          <AutomationSettings />

          {/* System Settings */}
          <SystemSettings />

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
