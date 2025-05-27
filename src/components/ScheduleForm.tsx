
import React from 'react';
import { Save, X } from 'lucide-react';
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

interface ScheduleFormProps {
  schedule: ScheduleItem;
  availableZones: string[];
  daysOfWeek: { key: string; label: string }[];
  onSave: (schedule: ScheduleItem) => void;
  onCancel: () => void;
  isCreating?: boolean;
}

const ScheduleForm = ({ 
  schedule, 
  availableZones, 
  daysOfWeek, 
  onSave, 
  onCancel, 
  isCreating 
}: ScheduleFormProps) => {
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
    console.log('Form submitted with data:', data);
    
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

    console.log('Calling onSave with:', updatedSchedule);
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

export default ScheduleForm;
