
import React from 'react';
import ScheduleItemComponent from './ScheduleItem';
import ScheduleForm from './ScheduleForm';

interface ScheduleItem {
  id: string;
  time: string;
  zones: string[];
  duration: number;
  active: boolean;
  days: string[];
}

interface ScheduleListProps {
  schedules: ScheduleItem[];
  editingSchedule: ScheduleItem | null;
  isCreating: boolean;
  availableZones: string[];
  daysOfWeek: { key: string; label: string }[];
  onEditSchedule: (schedule: ScheduleItem) => void;
  onDeleteSchedule: (id: string) => void;
  onToggleScheduleActive: (id: string) => void;
  onSaveSchedule: (schedule: ScheduleItem) => void;
  onCancelEdit: () => void;
}

const ScheduleList = ({
  schedules,
  editingSchedule,
  isCreating,
  availableZones,
  daysOfWeek,
  onEditSchedule,
  onDeleteSchedule,
  onToggleScheduleActive,
  onSaveSchedule,
  onCancelEdit
}: ScheduleListProps) => {
  return (
    <div className="space-y-4">
      {schedules.map((schedule) => (
        <div key={schedule.id} className="border border-gray-200 rounded-lg p-4">
          {editingSchedule?.id === schedule.id ? (
            <ScheduleForm 
              schedule={editingSchedule}
              availableZones={availableZones}
              daysOfWeek={daysOfWeek}
              onSave={onSaveSchedule}
              onCancel={onCancelEdit}
              isCreating={isCreating}
            />
          ) : (
            <ScheduleItemComponent
              schedule={schedule}
              daysOfWeek={daysOfWeek}
              onEdit={() => onEditSchedule(schedule)}
              onDelete={() => onDeleteSchedule(schedule.id)}
              onToggleActive={() => onToggleScheduleActive(schedule.id)}
            />
          )}
        </div>
      ))}

      {/* Show new schedule form if creating */}
      {isCreating && editingSchedule && !schedules.find(s => s.id === editingSchedule.id) && (
        <div className="border border-gray-200 rounded-lg p-4">
          <ScheduleForm 
            schedule={editingSchedule}
            availableZones={availableZones}
            daysOfWeek={daysOfWeek}
            onSave={onSaveSchedule}
            onCancel={onCancelEdit}
            isCreating={isCreating}
          />
        </div>
      )}
    </div>
  );
};

export default ScheduleList;
