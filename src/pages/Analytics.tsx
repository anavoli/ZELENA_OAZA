
import React from 'react';
import { BarChart3, TrendingUp, TrendingDown, Droplets, Sun, Thermometer, Activity } from 'lucide-react';

const Analytics = () => {
  const weeklyData = [
    { day: 'Pon', temperature: 24, humidity: 68, light: 75, water: 45 },
    { day: 'Uto', temperature: 26, humidity: 65, light: 82, water: 38 },
    { day: 'Sre', temperature: 23, humidity: 72, light: 70, water: 52 },
    { day: 'Čet', temperature: 25, humidity: 70, light: 78, water: 41 },
    { day: 'Pet', temperature: 27, humidity: 63, light: 85, water: 47 },
    { day: 'Sub', temperature: 28, humidity: 60, light: 90, water: 55 },
    { day: 'Ned', temperature: 26, humidity: 66, light: 88, water: 43 }
  ];

  const plantHealth = [
    { name: 'Paradajz', health: 95, trend: 'up', change: '+5%' },
    { name: 'Bosiljak', health: 78, trend: 'down', change: '-8%' },
    { name: 'Krastavac', health: 88, trend: 'up', change: '+3%' },
    { name: 'Paprika', health: 92, trend: 'stable', change: '0%' },
    { name: 'Salata', health: 85, trend: 'up', change: '+2%' },
    { name: 'Ruzmarin', health: 65, trend: 'down', change: '-12%' }
  ];

  const insights = [
    {
      title: 'Optimizacija navodnjavanja',
      description: 'Smanjite potrošnju vode za 15% prilagođavanjem rasporedа u ranim jutarnjim satima.',
      type: 'water',
      impact: 'Visoko'
    },
    {
      title: 'Svetlosni uslovi',
      description: 'Bosiljak prima premalo svetla. Razmotrite relokaciju ili dodavanje LED osvetljenja.',
      type: 'light',
      impact: 'Srednje'
    },
    {
      title: 'Temperatura staklenika',
      description: 'Ventilacija tokom dana može poboljšati rast paradajza za 10-15%.',
      type: 'temperature',
      impact: 'Visoko'
    }
  ];

  const getTrendIcon = (trend: string) => {
    switch (trend) {
      case 'up': return <TrendingUp className="h-4 w-4 text-green-500" />;
      case 'down': return <TrendingDown className="h-4 w-4 text-red-500" />;
      default: return <Activity className="h-4 w-4 text-gray-500" />;
    }
  };

  const getImpactColor = (impact: string) => {
    switch (impact) {
      case 'Visoko': return 'bg-red-100 text-red-800';
      case 'Srednje': return 'bg-yellow-100 text-yellow-800';
      default: return 'bg-green-100 text-green-800';
    }
  };

  const getInsightIcon = (type: string) => {
    switch (type) {
      case 'water': return <Droplets className="h-5 w-5 text-blue-500" />;
      case 'light': return <Sun className="h-5 w-5 text-yellow-500" />;
      case 'temperature': return <Thermometer className="h-5 w-5 text-red-500" />;
      default: return <Activity className="h-5 w-5 text-gray-500" />;
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Analitika</h1>
          <p className="text-gray-600">Detaljni uvid u performanse vaše pametne bašte</p>
        </div>

        {/* Overview Cards */}
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">89%</div>
                <div className="text-sm text-gray-600">Prosečno zdravlje biljaka</div>
              </div>
              <div className="p-3 bg-green-100 rounded-lg">
                <Activity className="h-6 w-6 text-green-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+5% vs prošla nedelja</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">321L</div>
                <div className="text-sm text-gray-600">Potrošnja vode (nedelja)</div>
              </div>
              <div className="p-3 bg-blue-100 rounded-lg">
                <Droplets className="h-6 w-6 text-blue-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-1 text-red-600">
              <TrendingDown className="h-4 w-4" />
              <span className="text-sm font-medium">-12% vs prošla nedelja</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">7.8h</div>
                <div className="text-sm text-gray-600">Prosečno sunčanih sati</div>
              </div>
              <div className="p-3 bg-yellow-100 rounded-lg">
                <Sun className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+1.2h vs prošla nedelja</span>
            </div>
          </div>

          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <div className="flex items-center justify-between">
              <div>
                <div className="text-2xl font-bold text-gray-900">24.5°C</div>
                <div className="text-sm text-gray-600">Prosečna temperatura</div>
              </div>
              <div className="p-3 bg-red-100 rounded-lg">
                <Thermometer className="h-6 w-6 text-red-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center space-x-1 text-green-600">
              <TrendingUp className="h-4 w-4" />
              <span className="text-sm font-medium">+2.1°C vs prošla nedelja</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Weekly Trends */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Nedeljni trendovi</h3>
            <div className="space-y-6">
              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Temperatura (°C)</span>
                  <Thermometer className="h-4 w-4 text-red-500" />
                </div>
                <div className="space-y-2">
                  {weeklyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 w-8">{data.day}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-red-500 h-2 rounded-full" 
                            style={{ width: `${(data.temperature / 35) * 100}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{data.temperature}°</span>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <div className="flex items-center justify-between mb-2">
                  <span className="text-sm font-medium text-gray-600">Vlažnost (%)</span>
                  <Droplets className="h-4 w-4 text-blue-500" />
                </div>
                <div className="space-y-2">
                  {weeklyData.map((data, index) => (
                    <div key={index} className="flex items-center justify-between">
                      <span className="text-sm text-gray-600 w-8">{data.day}</span>
                      <div className="flex-1 mx-4">
                        <div className="w-full bg-gray-200 rounded-full h-2">
                          <div 
                            className="bg-blue-500 h-2 rounded-full" 
                            style={{ width: `${data.humidity}%` }}
                          ></div>
                        </div>
                      </div>
                      <span className="text-sm font-medium text-gray-900 w-8">{data.humidity}%</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Plant Health Analysis */}
          <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
            <h3 className="text-lg font-semibold text-gray-900 mb-6">Analiza zdravlja biljaka</h3>
            <div className="space-y-4">
              {plantHealth.map((plant, index) => (
                <div key={index} className="flex items-center justify-between p-3 border border-gray-200 rounded-lg">
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <span className="font-medium text-gray-900">{plant.name}</span>
                      <div className="flex items-center space-x-2">
                        {getTrendIcon(plant.trend)}
                        <span className="text-sm font-medium">{plant.change}</span>
                      </div>
                    </div>
                    <div className="w-full bg-gray-200 rounded-full h-2">
                      <div 
                        className={`h-2 rounded-full ${
                          plant.health >= 85 ? 'bg-green-500' :
                          plant.health >= 70 ? 'bg-yellow-500' :
                          'bg-red-500'
                        }`}
                        style={{ width: `${plant.health}%` }}
                      ></div>
                    </div>
                    <div className="text-right mt-1">
                      <span className="text-sm font-medium text-gray-900">{plant.health}%</span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* AI Insights */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
          <div className="flex items-center space-x-2 mb-6">
            <BarChart3 className="h-6 w-6 text-purple-600" />
            <h3 className="text-lg font-semibold text-gray-900">AI Preporuke</h3>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {insights.map((insight, index) => (
              <div key={index} className="border border-gray-200 rounded-lg p-4">
                <div className="flex items-start space-x-3">
                  <div className="p-2 bg-gray-100 rounded-lg">
                    {getInsightIcon(insight.type)}
                  </div>
                  <div className="flex-1">
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-gray-900">{insight.title}</h4>
                      <span className={`px-2 py-1 rounded-full text-xs font-medium ${getImpactColor(insight.impact)}`}>
                        {insight.impact}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600">{insight.description}</p>
                    <button className="mt-3 text-sm text-purple-600 hover:text-purple-700 font-medium">
                      Primeniti preporuku →
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Analytics;
