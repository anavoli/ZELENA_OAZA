import React, { useState } from 'react';
import { Plus, Edit, Trash2, Save, X, Clock } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';

interface ScheduleItem {
  id: string;
  time: string;
  zones: string[];
  duration: number;
  active: boolean;
  days: string[];
}

interface ScheduleFormData {
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
    console.log('Creating new schedule...'); // Debug log
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
    console.log('New schedule created:', newSchedule); // Debug log
  };

  const saveSchedule = (schedule: ScheduleItem) => {
    console.log('Saving schedule:', schedule); // Debug log
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
    console.log('Canceling edit...'); // Debug log
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

          <div className="space-y-4">
            {schedules.map((schedule) => (
              <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
                {editingSchedule?.id === schedule.id ? (
                  <ScheduleEditForm 
                    schedule={editingSchedule}
                    availableZones={availableZones}
                    daysOfWeek={daysOfWeek}
                    onSave={saveSchedule}
                    onCancel={cancelEdit}
                    isCreating={isCreating}
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

            {/* Show new schedule form if creating */}
            {isCreating && editingSchedule && !schedules.find(s => s.id === editingSchedule.id) && (
              <div className="border border-gray-200 rounded-lg p-4">
                <ScheduleEditForm 
                  schedule={editingSchedule}
                  availableZones={availableZones}
                  daysOfWeek={daysOfWeek}
                  onSave={saveSchedule}
                  onCancel={cancelEdit}
                  isCreating={isCreating}
                />
              </div>
            )}
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
  isCreating?: boolean;
}

const ScheduleEditForm = ({ schedule, availableZones, daysOfWeek, onSave, onCancel, isCreating }: ScheduleEditFormProps) => {
  const { register, handleSubmit, watch, setValue, formState: { errors } } = useForm<ScheduleFormData>({
    defaultValues: {
      time: schedule.time,
      zones: schedule.zones,
      duration: schedule.duration,
      active: schedule.active,
      days: schedule.days
    }
  });

  const watchedZones = watch('zones');
  const watchedDays = watch('days');

  const handleZoneToggle = (zone: string) => {
    const currentZones = watchedZones || [];
    const newZones = currentZones.includes(zone)
      ? currentZones.filter(z => z !== zone)
      : [...currentZones, zone];
    setValue('zones', newZones);
  };

  const handleDayToggle = (day: string) => {
    const currentDays = watchedDays || [];
    const newDays = currentDays.includes(day)
      ? currentDays.filter(d => d !== day)
      : [...currentDays, day];
    setValue('days', newDays);
  };

  const onSubmit = (data: ScheduleFormData) => {
    console.log('Form submitted with data:', data); // Debug log
    
    if (!data.zones || data.zones.length === 0) {
      alert('Molimo odaberite najmanje jednu zonu');
      return;
    }
    if (!data.days || data.days.length === 0) {
      alert('Molimo odaberite najmanje jedan dan');
      return;
    }

    const updatedSchedule: ScheduleItem = {
      ...schedule,
      ...data
    };

    console.log('Calling onSave with:', updatedSchedule); // Debug log
    onSave(updatedSchedule);
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Vreme</label>
          <input
            type="time"
            {...register('time', { required: 'Vreme je obavezno' })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.time && <span className="text-red-500 text-sm">{errors.time.message}</span>}
        </div>
        
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">Trajanje (minuti)</label>
          <input
            type="number"
            min="1"
            max="120"
            {...register('duration', { 
              required: 'Trajanje je obavezno',
              min: { value: 1, message: 'Minimalno 1 minut' },
              max: { value: 120, message: 'Maksimalno 120 minuta' }
            })}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
          {errors.duration && <span className="text-red-500 text-sm">{errors.duration.message}</span>}
        </div>
        
        <div className="flex items-end">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              {...register('active')}
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
                checked={(watchedZones || []).includes(zone)}
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
                checked={(watchedDays || []).includes(day.key)}
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
          <span>{isCreating ? 'Kreiraj' : 'Sačuvaj'}</span>
        </Button>
        
        <Button type="button" variant="outline" onClick={onCancel}>
          Otkaži
        </Button>
      </div>
    </form>
  );
};

export default IrrigationScheduleManager;
