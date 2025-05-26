
import React, { useState } from 'react';
import { 
  Bell, 
  AlertTriangle, 
  CheckCircle, 
  Info, 
  X,
  Clock,
  Settings,
  Filter
} from 'lucide-react';

interface Notification {
  id: string;
  type: 'warning' | 'success' | 'info' | 'error';
  title: string;
  message: string;
  timestamp: string;
  isRead: boolean;
  action?: string;
}

const NotificationCenter = () => {
  const [notifications, setNotifications] = useState<Notification[]>([
    {
      id: '1',
      type: 'warning',
      title: 'Niska vlažnost',
      message: 'Vlažnost zemljišta u zoni "Vrt - Povrće" je ispod 25%. Potrebno je zalivanje.',
      timestamp: '10:30',
      isRead: false,
      action: 'Pokreni zalivanje'
    },
    {
      id: '2',
      type: 'error',
      title: 'pH senzor offline',
      message: 'pH senzor u staklenici nije dostupan već 2 sata.',
      timestamp: '09:15',
      isRead: false,
      action: 'Proveri konekciju'
    },
    {
      id: '3',
      type: 'success',
      title: 'Zalivanje završeno',
      message: 'Automatsko zalivanje zone "Cvećnjak" je uspešno završeno.',
      timestamp: '08:45',
      isRead: true
    },
    {
      id: '4',
      type: 'info',
      title: 'Vreme za berbu',
      message: 'Paradajz u staklenici je spreman za berbu nakon 75 dana.',
      timestamp: '08:00',
      isRead: false,
      action: 'Označi kao obrano'
    },
    {
      id: '5',
      type: 'warning',
      title: 'Visoka temperatura',
      message: 'Temperatura u staklenici je 31°C. Preporučuje se uključivanje ventilatora.',
      timestamp: '07:30',
      isRead: true,
      action: 'Uključi ventilator'
    }
  ]);

  const [filter, setFilter] = useState<'all' | 'unread' | 'warning' | 'error'>('all');

  const getNotificationIcon = (type: string) => {
    switch (type) {
      case 'warning': return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'error': return <X className="h-5 w-5 text-red-500" />;
      case 'success': return <CheckCircle className="h-5 w-5 text-green-500" />;
      default: return <Info className="h-5 w-5 text-blue-500" />;
    }
  };

  const getNotificationColor = (type: string) => {
    switch (type) {
      case 'warning': return 'border-l-yellow-400 bg-yellow-50';
      case 'error': return 'border-l-red-400 bg-red-50';
      case 'success': return 'border-l-green-400 bg-green-50';
      default: return 'border-l-blue-400 bg-blue-50';
    }
  };

  const markAsRead = (notificationId: string) => {
    setNotifications(notifications.map(notification =>
      notification.id === notificationId
        ? { ...notification, isRead: true }
        : notification
    ));
  };

  const deleteNotification = (notificationId: string) => {
    setNotifications(notifications.filter(n => n.id !== notificationId));
  };

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread': return !notification.isRead;
      case 'warning': return notification.type === 'warning';
      case 'error': return notification.type === 'error';
      default: return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.isRead).length;

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center space-x-3">
          <h3 className="text-lg font-semibold text-gray-900">Notifikacije</h3>
          {unreadCount > 0 && (
            <span className="inline-flex items-center px-2 py-1 rounded-full text-xs font-medium bg-red-100 text-red-800">
              {unreadCount} novo
            </span>
          )}
        </div>
        <div className="flex items-center space-x-2">
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value as any)}
            className="text-sm border border-gray-300 rounded-lg px-3 py-1 focus:ring-2 focus:ring-green-500 focus:border-transparent"
          >
            <option value="all">Sve</option>
            <option value="unread">Nepročitane</option>
            <option value="warning">Upozorenja</option>
            <option value="error">Greške</option>
          </select>
          <button className="p-2 text-gray-400 hover:text-gray-600 transition-colors">
            <Settings className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {filteredNotifications.map((notification) => (
          <div
            key={notification.id}
            className={`border-l-4 rounded-lg p-4 ${getNotificationColor(notification.type)} ${
              !notification.isRead ? 'shadow-sm' : 'opacity-75'
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="flex items-start space-x-3">
                {getNotificationIcon(notification.type)}
                <div className="flex-1">
                  <div className="flex items-center space-x-2 mb-1">
                    <h4 className={`font-medium ${!notification.isRead ? 'text-gray-900' : 'text-gray-700'}`}>
                      {notification.title}
                    </h4>
                    {!notification.isRead && (
                      <div className="w-2 h-2 bg-blue-500 rounded-full"></div>
                    )}
                  </div>
                  <p className="text-sm text-gray-600 mb-2">{notification.message}</p>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-1 text-xs text-gray-500">
                      <Clock className="h-3 w-3" />
                      <span>{notification.timestamp}</span>
                    </div>
                    {notification.action && (
                      <button className="text-xs bg-white border border-gray-300 px-2 py-1 rounded hover:bg-gray-50 transition-colors">
                        {notification.action}
                      </button>
                    )}
                  </div>
                </div>
              </div>
              <div className="flex items-center space-x-1">
                {!notification.isRead && (
                  <button
                    onClick={() => markAsRead(notification.id)}
                    className="p-1 text-gray-400 hover:text-gray-600 transition-colors"
                    title="Označi kao pročitano"
                  >
                    <CheckCircle className="h-4 w-4" />
                  </button>
                )}
                <button
                  onClick={() => deleteNotification(notification.id)}
                  className="p-1 text-gray-400 hover:text-red-600 transition-colors"
                  title="Obriši"
                >
                  <X className="h-4 w-4" />
                </button>
              </div>
            </div>
          </div>
        ))}
        
        {filteredNotifications.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            <Bell className="h-12 w-12 mx-auto mb-3 text-gray-300" />
            <p>Nema notifikacija za prikaz</p>
          </div>
        )}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="flex items-center justify-between text-sm text-gray-600">
          <span>Ukupno: {notifications.length}</span>
          <button className="text-green-600 hover:text-green-700 font-medium">
            Označi sve kao pročitane
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationCenter;
