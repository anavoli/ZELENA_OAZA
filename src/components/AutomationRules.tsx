
import React, { useState } from 'react';
import { 
  Plus, 
  Edit, 
  Trash2, 
  Clock, 
  Thermometer, 
  Droplets,
  Sun,
  Moon,
  Play,
  Pause
} from 'lucide-react';

interface AutomationRule {
  id: string;
  name: string;
  condition: string;
  action: string;
  isActive: boolean;
  lastTriggered?: string;
  icon: React.ReactNode;
}

const AutomationRules = () => {
  const [rules, setRules] = useState<AutomationRule[]>([
    {
      id: '1',
      name: 'Automatsko zalivanje',
      condition: 'Vlažnost < 30%',
      action: 'Pokreni pumpu 10min',
      isActive: true,
      lastTriggered: '08:30',
      icon: <Droplets className="h-4 w-4 text-blue-500" />
    },
    {
      id: '2',
      name: 'Noćno osvetljenje',
      condition: 'Vreme > 18:00',
      action: 'Uključi LED 50%',
      isActive: true,
      lastTriggered: '18:00',
      icon: <Moon className="h-4 w-4 text-purple-500" />
    },
    {
      id: '3',
      name: 'Temperaturna kontrola',
      condition: 'Temperatura > 28°C',
      action: 'Uključi ventilator',
      isActive: false,
      icon: <Thermometer className="h-4 w-4 text-red-500" />
    },
    {
      id: '4',
      name: 'Jutarnje osvetljenje',
      condition: 'Vreme = 06:00',
      action: 'Uključi LED 100%',
      isActive: true,
      lastTriggered: '06:00',
      icon: <Sun className="h-4 w-4 text-yellow-500" />
    }
  ]);

  const toggleRule = (ruleId: string) => {
    setRules(rules.map(rule => 
      rule.id === ruleId 
        ? { ...rule, isActive: !rule.isActive }
        : rule
    ));
  };

  const deleteRule = (ruleId: string) => {
    setRules(rules.filter(rule => rule.id !== ruleId));
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-gray-900">Automatizacije</h3>
        <button className="flex items-center space-x-2 px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors">
          <Plus className="h-4 w-4" />
          <span>Novo pravilo</span>
        </button>
      </div>

      <div className="space-y-4">
        {rules.map((rule) => (
          <div key={rule.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
            <div className="flex items-center justify-between mb-3">
              <div className="flex items-center space-x-3">
                <div className="p-2 bg-gray-50 rounded-lg">
                  {rule.icon}
                </div>
                <div>
                  <h4 className="font-medium text-gray-900">{rule.name}</h4>
                  <div className="flex items-center space-x-2 text-sm text-gray-600">
                    <span className={`inline-flex items-center px-2 py-1 rounded-full text-xs font-medium ${
                      rule.isActive ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {rule.isActive ? 'Aktivno' : 'Neaktivno'}
                    </span>
                    {rule.lastTriggered && (
                      <div className="flex items-center space-x-1">
                        <Clock className="h-3 w-3" />
                        <span>Poslednji put: {rule.lastTriggered}</span>
                      </div>
                    )}
                  </div>
                </div>
              </div>
              
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => toggleRule(rule.id)}
                  className={`p-2 rounded-lg transition-colors ${
                    rule.isActive
                      ? 'bg-green-100 text-green-600 hover:bg-green-200'
                      : 'bg-gray-100 text-gray-400 hover:bg-gray-200'
                  }`}
                >
                  {rule.isActive ? <Pause className="h-4 w-4" /> : <Play className="h-4 w-4" />}
                </button>
                <button className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg transition-colors">
                  <Edit className="h-4 w-4" />
                </button>
                <button 
                  onClick={() => deleteRule(rule.id)}
                  className="p-2 text-red-600 hover:bg-red-50 rounded-lg transition-colors"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            </div>
            
            <div className="text-sm text-gray-600">
              <div className="mb-1">
                <span className="font-medium">Uslov:</span> {rule.condition}
              </div>
              <div>
                <span className="font-medium">Akcija:</span> {rule.action}
              </div>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-6 pt-6 border-t border-gray-200">
        <div className="text-sm text-gray-600">
          Aktivnih pravila: {rules.filter(r => r.isActive).length} od {rules.length}
        </div>
      </div>
    </div>
  );
};

export default AutomationRules;
