
import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Home, Sprout, Droplets, Calendar, Settings, BarChart3, Bell } from 'lucide-react';

const Navigation = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: Home, label: 'Dashboard' },
    { path: '/plants', icon: Sprout, label: 'Biljke' },
    { path: '/irrigation', icon: Droplets, label: 'Navodnjavanje' },
    { path: '/calendar', icon: Calendar, label: 'Kalendar' },
    { path: '/analytics', icon: BarChart3, label: 'Analitika' },
    { path: '/settings', icon: Settings, label: 'Podešavanja' }
  ];

  return (
    <nav className="bg-white border-b border-gray-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center space-x-8">
            <Link to="/" className="flex items-center space-x-2">
              <Sprout className="h-8 w-8 text-green-600" />
              <span className="text-xl font-bold text-gray-900">Pametna Bašta</span>
            </Link>
            
            <div className="hidden md:flex space-x-6">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={item.path}
                  className={`flex items-center space-x-2 px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    location.pathname === item.path
                      ? 'text-green-600 bg-green-50'
                      : 'text-gray-600 hover:text-green-600 hover:bg-green-50'
                  }`}
                >
                  <item.icon className="h-4 w-4" />
                  <span>{item.label}</span>
                </Link>
              ))}
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <button className="p-2 rounded-full bg-green-50 text-green-600 hover:bg-green-100 transition-colors">
              <Bell className="h-5 w-5" />
            </button>
            <div className="w-8 h-8 bg-green-600 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">M</span>
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation;
