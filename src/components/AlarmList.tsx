import React from 'react';
import { Bell, CheckCircle, AlertTriangle, Info } from 'lucide-react';
import type { Alarm } from '../types';

const severityIcons = {
  critical: Bell,
  warning: AlertTriangle,
  info: Info,
};

const severityColors = {
  critical: 'text-red-500',
  warning: 'text-yellow-500',
  info: 'text-blue-500',
};

const statusColors = {
  active: 'bg-red-500',
  acknowledged: 'bg-yellow-500',
  resolved: 'bg-green-500',
};

interface AlarmListProps {
  alarms: Alarm[];
  onAcknowledge: (id: string) => void;
  onSelectAlarm: (alarm: Alarm) => void;
}

export function AlarmList({ alarms, onAcknowledge, onSelectAlarm }: AlarmListProps) {
  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="text-left border-b border-slate-700">
            <th className="p-4">Severity</th>
            <th className="p-4">Title</th>
            <th className="p-4 hidden md:table-cell">Source</th>
            <th className="p-4">Status</th>
            <th className="p-4 hidden md:table-cell">Time</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {alarms.map((alarm) => {
            const Icon = severityIcons[alarm.severity];
            return (
              <tr
                key={alarm.id}
                onClick={() => onSelectAlarm(alarm)}
                className="border-b border-slate-700 hover:bg-slate-800/50 transition-colors cursor-pointer"
              >
                <td className="p-4">
                  <Icon
                    className={`${severityColors[alarm.severity]}`}
                    size={20}
                  />
                </td>
                <td className="p-4">
                  <div className="font-medium">{alarm.title}</div>
                  <div className="text-sm text-slate-400">{alarm.description}</div>
                </td>
                <td className="p-4 hidden md:table-cell">{alarm.source}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[alarm.status]
                    }`}
                  >
                    {alarm.status}
                  </span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  {new Date(alarm.timestamp).toLocaleString()}
                </td>
                <td className="p-4">
                  {alarm.status === 'active' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAcknowledge(alarm.id);
                      }}
                      className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                    >
                      <CheckCircle size={20} className="text-green-500" />
                    </button>
                  )}
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}