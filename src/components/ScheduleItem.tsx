
import React from 'react';
import { Edit, Trash2, Clock } from 'lucide-react';

interface ScheduleItem {
  id: string;
  time: string;
  zones: string[];
  duration: number;
  active: boolean;
  days: string[];
}

interface ScheduleItemProps {
  schedule: ScheduleItem;
  daysOfWeek: { key: string; label: string }[];
  onEdit: () => void;
  onDelete: () => void;
  onToggleActive: () => void;
}

const ScheduleItemComponent = ({ 
  schedule, 
  daysOfWeek, 
  onEdit, 
  onDelete, 
  onToggleActive 
}: ScheduleItemProps) => {
  return (
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
          onClick={onToggleActive}
          className={`px-3 py-1 rounded-full text-sm font-medium ${
            schedule.active 
              ? 'bg-green-100 text-green-800' 
              : 'bg-gray-100 text-gray-800'
          }`}
        >
          {schedule.active ? 'Aktivno' : 'Neaktivno'}
        </button>
        
        <button
          onClick={onEdit}
          className="p-2 text-gray-400 hover:text-blue-600 transition-colors"
        >
          <Edit className="h-4 w-4" />
        </button>
        
        <button
          onClick={onDelete}
          className="p-2 text-gray-400 hover:text-red-600 transition-colors"
        >
          <Trash2 className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default ScheduleItemComponent;
