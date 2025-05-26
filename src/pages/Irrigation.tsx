
import React from 'react';
import IrrigationControl from '../components/IrrigationControl';
import { Calendar, Clock, Droplets, Settings, TrendingUp } from 'lucide-react';

const Irrigation = () => {
  const waterUsageData = [
    { day: 'Pon', usage: 45 },
    { day: 'Uto', usage: 38 },
    { day: 'Sre', usage: 52 },
    { day: 'Čet', usage: 41 },
    { day: 'Pet', usage: 47 },
    { day: 'Sub', usage: 55 },
    { day: 'Ned', usage: 43 }
  ];

  const schedules = [
    { time: '06:00', zones: ['Vrt - Povrće', 'Cvećnjak'], duration: '15 min', active: true },
    { time: '12:00', zones: ['Staklenica'], duration: '5 min', active: true },
    { time: '18:00', zones: ['Travnjak'], duration: '20 min', active: false },
    { time: '20:00', zones: ['Vrt - Povrće'], duration: '10 min', active: true }
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Navodnjavanje</h1>
          <p className="text-gray-600">Upravljanje sistemom navodnjavanja i praćenje potrošnje vode</p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">287L</div>
                <div className="text-sm text-gray-600">Danas</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-green-100 rounded-lg">
                <TrendingUp className="h-6 w-6 text-green-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">-12%</div>
                <div className="text-sm text-gray-600">Vs prošla nedelja</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-purple-100 rounded-lg">
                <Clock className="h-6 w-6 text-purple-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">4</div>
                <div className="text-sm text-gray-600">Aktivna zona</div>
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center space-x-3">
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Calendar className="h-6 w-6 text-yellow-600" />
              </div>
              <div>
                <div className="text-2xl font-bold text-gray-900">12</div>
                <div className="text-sm text-gray-600">Zakazano danas</div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Irrigation Control */}
          <div>
            <IrrigationControl />
          </div>

          {/* Water Usage Chart */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Potrošnja vode (7 dana)</h3>
            <div className="space-y-4">
              {waterUsageData.map((data, index) => (
                <div key={index} className="flex items-center justify-between">
                  <span className="text-sm font-medium text-gray-600 w-8">{data.day}</span>
                  <div className="flex-1 mx-4">
                    <div className="w-full bg-gray-200 rounded-full h-3">
                      <div 
                        className="bg-blue-500 h-3 rounded-full transition-all duration-300" 
                        style={{ width: `${(data.usage / 60) * 100}%` }}
                      ></div>
                    </div>
                  </div>
                  <span className="text-sm font-medium text-gray-900 w-12 text-right">{data.usage}L</span>
                </div>
              ))}
            </div>
            <div className="mt-6 pt-6 border-t border-gray-200">
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Ukupno ove nedelje:</span>
                <span className="font-semibold text-gray-900">321L</span>
              </div>
            </div>
          </div>
        </div>

        {/* Schedule */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-semibold text-gray-900">Raspored navodnjavanja</h3>
            <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
              <Settings className="h-4 w-4" />
              <span>Uredi raspored</span>
            </button>
          </div>
          
          <div className="space-y-4">
            {schedules.map((schedule, index) => (
              <div key={index} className="flex items-center justify-between p-4 border border-gray-200 rounded-lg">
                <div className="flex items-center space-x-4">
                  <div className="text-lg font-semibold text-gray-900">{schedule.time}</div>
                  <div className="flex flex-wrap gap-2">
                    {schedule.zones.map((zone, zoneIndex) => (
                      <span key={zoneIndex} className="px-2 py-1 bg-blue-100 text-blue-800 text-xs font-medium rounded-full">
                        {zone}
                      </span>
                    ))}
                  </div>
                  <span className="text-sm text-gray-600">{schedule.duration}</span>
                </div>
                
                <div className="flex items-center space-x-3">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium ${
                    schedule.active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                  }`}>
                    {schedule.active ? 'Aktivno' : 'Neaktivno'}
                  </span>
                  <button className="text-gray-400 hover:text-gray-600">
                    <Settings className="h-4 w-4" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Tips */}
        <div className="bg-gradient-to-r from-green-500 to-green-600 rounded-xl p-6 text-white">
          <h3 className="text-lg font-semibold mb-4">Saveti za efikasno navodnjavanje</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-200 rounded-full mt-2"></div>
              <div>
                <div className="font-medium">Rano jutro je najbolje</div>
                <div className="text-green-100 text-sm">Zalijevajte između 6-8h ujutru za najmanje isparavanja</div>
              </div>
            </div>
            <div className="flex items-start space-x-3">
              <div className="w-2 h-2 bg-green-200 rounded-full mt-2"></div>
              <div>
                <div className="font-medium">Provjerite vremenske uslove</div>
                <div className="text-green-100 text-sm">Smanjite zaljevanje ako se očekuje kiša</div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Irrigation;
