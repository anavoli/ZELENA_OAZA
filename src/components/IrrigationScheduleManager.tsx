
import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Clock, Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';

interface ScheduleItem {
  id: string;
  time: string;
  zones: string[];
  duration: number;
  active: boolean;
  days: string[];
}

interface IrrigationScheduleManagerProps {
  onClose: () => void;
}

const IrrigationScheduleManager = ({ onClose }: IrrigationScheduleManagerProps) => {
  const [schedules, setSchedules] = useState<ScheduleItem[]>([
    { 
      id: '1', 
      time: '06:00', 
      zones: ['Vrt - Povrće', 'Cvećnjak'], 
      duration: 15, 
      active: true, 
      days: ['Mon', 'Wed', 'Fri'] 
    },
    { 
      id: '2', 
      time: '12:00', 
      zones: ['Staklenica'], 
      duration: 5, 
      active: true, 
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri'] 
    },
    { 
      id: '3', 
      time: '18:00', 
      zones: ['Travnjak'], 
      duration: 20, 
      active: false, 
      days: ['Sat', 'Sun'] 
    },
    { 
      id: '4', 
      time: '20:00', 
      zones: ['Vrt - Povrće'], 
      duration: 10, 
      active: true, 
      days: ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'] 
    }
  ]);

  const [editingSchedule, setEditingSchedule] = useState<ScheduleItem | null>(null);
  const [isCreating, setIsCreating] = useState(false);

  const availableZones = ['Vrt - Povrće', 'Cvećnjak', 'Travnjak', 'Staklenica'];
  const daysOfWeek = [
    { key: 'Mon', label: 'Pon' },
    { key: 'Tue', label: 'Uto' },
    { key: 'Wed', label: 'Sre' },
    { key: 'Thu', label: 'Čet' },
    { key: 'Fri', label: 'Pet' },
    { key: 'Sat', label: 'Sub' },
    { key: 'Sun', label: 'Ned' }
  ];

  const createNewSchedule = () => {
    const newSchedule: ScheduleItem = {
      id: Date.now().toString(),
      time: '08:00',
      zones: [],
      duration: 10,
      active: true,
      days: ['Mon', 'Wed', 'Fri']
    };
    setEditingSchedule(newSchedule);
    setIsCreating(true);
  };

  const saveSchedule = (schedule: ScheduleItem) => {
    if (isCreating) {
      setSchedules([...schedules, schedule]);
      setIsCreating(false);
    } else {
      setSchedules(schedules.map(s => s.id === schedule.id ? schedule : s));
    }
    setEditingSchedule(null);
  };

  const deleteSchedule = (id: string) => {
    setSchedules(schedules.filter(s => s.id !== id));
  };

  const toggleScheduleActive = (id: string) => {
    setSchedules(schedules.map(s => 
      s.id === id ? { ...s, active: !s.active } : s
    ));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-xl shadow-lg max-w-4xl w-full max-h-[90vh] overflow-y-auto m-4">
        <div className="p-6 border-b border-gray-200 flex items-center justify-between">
          <h2 className="text-xl font-semibold text-gray-900">Upravljanje rasporedom navodnjavanja</h2>
          <button 
            onClick={onClose}
            className="p-2 text-gray-400 hover:text-gray-600 transition-colors"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="p-6">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-lg font-medium text-gray-900">Trenutni raspored</h3>
            <Button onClick={createNewSchedule} className="flex items-center space-x-2">
              <Plus className="h-4 w-4" />
              <span>Dodaj novi raspored</span>
            </Button>
          </div>

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                {editingSchedule?.id === schedule.id ? (
                  <ScheduleEditForm 
                    schedule={editingSchedule}
                    availableZones={availableZones}
                    daysOfWeek={daysOfWeek}
                    onSave={saveSchedule}
                    onCancel={() => {
                      setEditingSchedule(null);
                      setIsCreating(false);
                    }}
                  />
                ) : (
                  <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-4">
                      <div className="flex items-center space-x-2">
                        <Clock className="h-5 w-5 text-blue-500" />
                        <span className="text-lg font-semibold">{schedule.time}</span>
                      </div>
                      
                      <div className="flex flex-wrap gap-2">
                        {schedule.zones.map((zone, index) => (
                          <span key={index} className="px-2 py-1 bg-blue-100 text-blue-800 text-sm font-medium rounded-full">
                            {zone}
                          </span>
                        ))}
                      </div>
                      
                      <span className="text-sm text-gray-600">{schedule.duration} min</span>
                      
                      <div className="flex flex-wrap gap-1">
                        {schedule.days.map(day => {
                          const dayLabel = daysOfWeek.find(d => d.key === day)?.label || day;
                          return (
                            <span key={day} className="px-2 py-1 bg-gray-100 text-gray-700 text-xs rounded">
                              {dayLabel}
                            </span>
                          );
                        })}
                      </div>
                    </div>
                    
                    <div className="flex items-center space-x-2">
                      <button
                        onClick={() => toggleScheduleActive(schedule.id)}
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          schedule.active 
                            ? 'bg-green-100 text-green-800' 
                            : 'bg-gray-100 text-gray-800'
                        }`}
                      >
                        {schedule.active ? 'Aktivno' : 'Neaktivno'}
                      </button>
                      
                      <button
                        onClick={() => setEditingSchedule(schedule)}
                        className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
                      >
                        <Edit className="h-4 w-4" />
                      </button>
                      
                      <button
                        onClick={() => deleteSchedule(schedule.id)}
                        className="p-2 text-gray-400 hover:text-red-600 transition-colors"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

interface ScheduleEditFormProps {
  schedule: ScheduleItem;
  availableZones: string[];
  daysOfWeek: { key: string; label: string }[];
  onSave: (schedule: ScheduleItem) => void;
  onCancel: () => void;
}

const ScheduleEditForm = ({ schedule, availableZones, daysOfWeek, onSave, onCancel }: ScheduleEditFormProps) => {
  const [formData, setFormData] = useState<ScheduleItem>(schedule);

  const handleZoneToggle = (zone: string) => {
    setFormData(prev => ({
      ...prev,
      zones: prev.zones.includes(zone)
        ? prev.zones.filter(z => z !== zone)
        : [...prev.zones, zone]
    }));
  };

  const handleDayToggle = (day: string) => {
    setFormData(prev => ({
      ...prev,
      days: prev.days.includes(day)
        ? prev.days.filter(d => d !== day)
        : [...prev.days, day]
    }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.zones.length === 0) {
      alert('Molimo odaberite najmanje jednu zonu');
      return;
    }
    if (formData.days.length === 0) {
      alert('Molimo odaberite najmanje jedan dan');
      return;
    }
    onSave(formData);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vreme</label>
          <input
            type="time"
            value={formData.time}
            onChange={(e) => setFormData(prev => ({ ...prev, time: e.target.value }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trajanje (minuti)</label>
          <input
            type="number"
            min="1"
            max="120"
            value={formData.duration}
            onChange={(e) => setFormData(prev => ({ ...prev, duration: parseInt(e.target.value) }))}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        
        <div className="flex items-end">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.active}
              onChange={(e) => setFormData(prev => ({ ...prev, active: e.target.checked }))}
              className="rounded border-gray-300 focus:ring-blue-500"
            />
            <span className="text-sm font-medium text-gray-700">Aktivno</span>
          </label>
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Zone za zalivanje</label>
        <div className="grid grid-cols-2 gap-2">
          {availableZones.map(zone => (
            <label key={zone} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.zones.includes(zone)}
                onChange={() => handleZoneToggle(zone)}
                className="rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{zone}</span>
            </label>
          ))}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">Dani u nedelji</label>
        <div className="flex flex-wrap gap-2">
          {daysOfWeek.map(day => (
            <label key={day.key} className="flex items-center space-x-2">
              <input
                type="checkbox"
                checked={formData.days.includes(day.key)}
                onChange={() => handleDayToggle(day.key)}
                className="rounded border-gray-300 focus:ring-blue-500"
              />
              <span className="text-sm text-gray-700">{day.label}</span>
            </label>
          ))}
        </div>
      </div>

      <div className="flex items-center space-x-4 pt-4">
        <Button type="submit" className="flex items-center space-x-2">
          <Save className="h-4 w-4" />
          <span>Sačuvaj</span>
        </Button>
        
        <Button type="button" variant="outline" onClick={onCancel}>
          Otkaži
        </Button>
      </div>
    </form>
  );
};

export default IrrigationScheduleManager;
