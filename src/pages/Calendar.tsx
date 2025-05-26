
import React, { useState } from 'react';
import { Calendar as CalendarIcon, Plus, Sprout, Droplets, Scissors, AlertCircle } from 'lucide-react';

const Calendar = () => {
  const [selectedDate, setSelectedDate] = useState(new Date());
  
  const events = [
    {
      id: 1,
      title: 'Sadnja paradajza',
      date: '2025-05-28',
      type: 'planting',
      description: 'Sadnja mladih biljaka paradajza u stakleniku',
      completed: false
    },
    {
      id: 2,
      title: 'Zaljevanje ruzmarina',
      date: '2025-05-26',
      type: 'watering',
      description: 'Redovno zaljevanje začinskog bilja',
      completed: true
    },
    {
      id: 3,
      title: 'Berba salate',
      date: '2025-05-29',
      type: 'harvest',
      description: 'Berba prve berbe salate',
      completed: false
    },
    {
      id: 4,
      title: 'Orezivanje bosiljka',
      date: '2025-05-30',
      type: 'pruning',
      description: 'Orezivanje vrchova bosiljka za bolji rast',
      completed: false
    },
    {
      id: 5,
      title: 'Đubrenje paprike',
      date: '2025-05-27',
      type: 'fertilizing',
      description: 'Aplikacija organskog đubriva za paprike',
      completed: false
    }
  ];

  const getEventIcon = (type: string) => {
    switch (type) {
      case 'planting': return <Sprout className="h-4 w-4" />;
      case 'watering': return <Droplets className="h-4 w-4" />;
      case 'harvest': return <Scissors className="h-4 w-4" />;
      case 'pruning': return <Scissors className="h-4 w-4" />;
      case 'fertilizing': return <AlertCircle className="h-4 w-4" />;
      default: return <CalendarIcon className="h-4 w-4" />;
    }
  };

  const getEventColor = (type: string) => {
    switch (type) {
      case 'planting': return 'bg-green-100 text-green-800';
      case 'watering': return 'bg-blue-100 text-blue-800';
      case 'harvest': return 'bg-yellow-100 text-yellow-800';
      case 'pruning': return 'bg-purple-100 text-purple-800';
      case 'fertilizing': return 'bg-orange-100 text-orange-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getEventTypeLabel = (type: string) => {
    switch (type) {
      case 'planting': return 'Sadnja';
      case 'watering': return 'Zaljevanje';
      case 'harvest': return 'Berba';
      case 'pruning': return 'Orezivanje';
      case 'fertilizing': return 'Đubrenje';
      default: return 'Aktivnost';
    }
  };

  // Simple calendar for current month
  const currentDate = new Date();
  const currentMonth = currentDate.getMonth();
  const currentYear = currentDate.getFullYear();
  const firstDay = new Date(currentYear, currentMonth, 1);
  const lastDay = new Date(currentYear, currentMonth + 1, 0);
  const daysInMonth = lastDay.getDate();
  const startDay = firstDay.getDay();

  const monthNames = [
    'Januar', 'Februar', 'Mart', 'April', 'Maj', 'Jun',
    'Jul', 'Avgust', 'Septembar', 'Oktobar', 'Novembar', 'Decembar'
  ];

  const dayNames = ['Ned', 'Pon', 'Uto', 'Sre', 'Čet', 'Pet', 'Sub'];

  const calendar = [];
  for (let i = 0; i < startDay; i++) {
    calendar.push(null);
  }
  for (let day = 1; day <= daysInMonth; day++) {
    calendar.push(day);
  }

  const hasEvent = (day: number) => {
    const dateStr = `${currentYear}-${String(currentMonth + 1).padStart(2, '0')}-${String(day).padStart(2, '0')}`;
    return events.some(event => event.date === dateStr);
  };

  const todayEvents = events.filter(event => {
    const today = new Date().toISOString().split('T')[0];
    return event.date === today;
  });

  const upcomingEvents = events.filter(event => {
    const today = new Date();
    const eventDate = new Date(event.date);
    return eventDate > today;
  }).slice(0, 3);

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <div>
            <h1 className="text-3xl font-bold text-gray-900 mb-2">Kalendar</h1>
            <p className="text-gray-600">Planirajte i pratite aktivnosti u vašoj bašti</p>
          </div>
          <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
            <Plus className="h-4 w-4" />
            <span>Dodaj aktivnost</span>
          </button>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <div className="flex items-center justify-between mb-6">
                <h2 className="text-xl font-semibold text-gray-900">
                  {monthNames[currentMonth]} {currentYear}
                </h2>
                <div className="flex space-x-2">
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    ←
                  </button>
                  <button className="p-2 hover:bg-gray-100 rounded-lg">
                    →
                  </button>
                </div>
              </div>
              
              <div className="grid grid-cols-7 gap-1 mb-4">
                {dayNames.map(day => (
                  <div key={day} className="p-3 text-center text-sm font-medium text-gray-500">
                    {day}
                  </div>
                ))}
              </div>
              
              <div className="grid grid-cols-7 gap-1">
                {calendar.map((day, index) => (
                  <div
                    key={index}
                    className={`aspect-square p-2 text-center text-sm relative cursor-pointer hover:bg-gray-50 rounded-lg ${
                      day === currentDate.getDate() && currentMonth === new Date().getMonth()
                        ? 'bg-green-600 text-white'
                        : day ? 'text-gray-900' : ''
                    }`}
                  >
                    {day && (
                      <>
                        <span>{day}</span>
                        {hasEvent(day) && (
                          <div className="absolute bottom-1 left-1/2 transform -translate-x-1/2 w-1 h-1 bg-green-500 rounded-full"></div>
                        )}
                      </>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Today's Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Danas</h3>
              {todayEvents.length > 0 ? (
                <div className="space-y-3">
                  {todayEvents.map(event => (
                    <div key={event.id} className="flex items-start space-x-3">
                      <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                        {getEventIcon(event.type)}
                      </div>
                      <div className="flex-1">
                        <div className="font-medium text-gray-900">{event.title}</div>
                        <div className="text-sm text-gray-600">{event.description}</div>
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium mt-1 ${getEventColor(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </span>
                      </div>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-gray-500 text-sm">Nema planiranih aktivnosti za danas</div>
              )}
            </div>

            {/* Upcoming Events */}
            <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
              <h3 className="text-lg font-semibold text-gray-900 mb-4">Nadolazeće aktivnosti</h3>
              <div className="space-y-3">
                {upcomingEvents.map(event => (
                  <div key={event.id} className="flex items-start space-x-3">
                    <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                      {getEventIcon(event.type)}
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-gray-900">{event.title}</div>
                      <div className="text-sm text-gray-600">{event.description}</div>
                      <div className="flex items-center justify-between mt-1">
                        <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                          {getEventTypeLabel(event.type)}
                        </span>
                        <span className="text-xs text-gray-500">
                          {new Date(event.date).toLocaleDateString('sr-RS')}
                        </span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Quick Actions */}
            <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-xl p-6 text-white">
              <h3 className="text-lg font-semibold mb-4">Brze akcije</h3>
              <div className="space-y-3">
                <button className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Sprout className="h-5 w-5" />
                  <span>Dodaj sadnju</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Droplets className="h-5 w-5" />
                  <span>Zakaži zaljevanje</span>
                </button>
                <button className="w-full flex items-center space-x-3 p-3 bg-white/20 rounded-lg hover:bg-white/30 transition-colors">
                  <Scissors className="h-5 w-5" />
                  <span>Planiraj berbu</span>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* All Events */}
        <div className="mt-8 bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-6">Sve aktivnosti</h3>
          <div className="space-y-4">
            {events.map(event => (
              <div key={event.id} className={`flex items-center justify-between p-4 border border-gray-200 rounded-lg ${event.completed ? 'bg-gray-50' : ''}`}>
                <div className="flex items-center space-x-4">
                  <div className={`p-2 rounded-lg ${getEventColor(event.type)}`}>
                    {getEventIcon(event.type)}
                  </div>
                  <div>
                    <div className={`font-medium ${event.completed ? 'text-gray-500 line-through' : 'text-gray-900'}`}>
                      {event.title}
                    </div>
                    <div className="text-sm text-gray-600">{event.description}</div>
                    <div className="flex items-center space-x-3 mt-1">
                      <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${getEventColor(event.type)}`}>
                        {getEventTypeLabel(event.type)}
                      </span>
                      <span className="text-xs text-gray-500">
                        {new Date(event.date).toLocaleDateString('sr-RS')}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  {event.completed ? (
                    <span className="text-green-600 text-sm font-medium">Završeno</span>
                  ) : (
                    <button className="px-3 py-1 bg-green-600 text-white text-sm rounded-lg hover:bg-green-700 transition-colors">
                      Označi kao završeno
                    </button>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Calendar;
