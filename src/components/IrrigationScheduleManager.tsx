
import React, { useState } from 'react';
import { Plus, X } from 'lucide-react';
import { Button } from '@/components/ui/button';
import ScheduleList from './ScheduleList';

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
    console.log('Creating new schedule...');
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
    console.log('New schedule created:', newSchedule);
  };

  const saveSchedule = (schedule: ScheduleItem) => {
    console.log('Saving schedule:', schedule);
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

  const cancelEdit = () => {
    console.log('Canceling edit...');
    setEditingSchedule(null);
    setIsCreating(false);
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

          <ScheduleList
            schedules={schedules}
            editingSchedule={editingSchedule}
            isCreating={isCreating}
            availableZones={availableZones}
            daysOfWeek={daysOfWeek}
            onEditSchedule={setEditingSchedule}
            onDeleteSchedule={deleteSchedule}
            onToggleScheduleActive={toggleScheduleActive}
            onSaveSchedule={saveSchedule}
            onCancelEdit={cancelEdit}
          />
        </div>
      </div>
    </div>
  );
};

export default IrrigationScheduleManager;
