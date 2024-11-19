import React from 'react';
import { X, Bell, AlertTriangle, Info, Clock, Server } from 'lucide-react';
import type { Alarm } from '../types';

interface AlarmDetailPanelProps {
  alarm: Alarm | null;
  onClose: () => void;
}

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

export function AlarmDetailPanel({ alarm, onClose }: AlarmDetailPanelProps) {
  if (!alarm) return null;

  const Icon = severityIcons[alarm.severity];

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 rounded-t-xl shadow-xl transform transition-transform duration-300 ease-in-out">
        <div className="max-w-3xl mx-auto p-6">
          <div className="flex justify-between items-start mb-6">
            <div className="flex items-center gap-3">
              <Icon className={`${severityColors[alarm.severity]} w-6 h-6`} />
              <h2 className="text-xl font-semibold">{alarm.title}</h2>
            </div>
            <button
              onClick={onClose}
              className="p-1 hover:bg-slate-700 rounded-full transition-colors"
            >
              <X className="w-5 h-5" />
            </button>
          </div>

          <div className="space-y-6">
            <div className="flex flex-wrap gap-4">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 text-slate-400" />
                <span className="text-sm">
                  {new Date(alarm.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Server className="w-4 h-4 text-slate-400" />
                <span className="text-sm">{alarm.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[alarm.status]
                  }`}
                >
                  {alarm.status}
                </span>
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Description
              </h3>
              <p className="text-slate-400">{alarm.description}</p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Recommended Actions
              </h3>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                <li>Check system logs for related errors</li>
                <li>Verify system resource utilization</li>
                <li>Review recent configuration changes</li>
                <li>Contact system administrator if issue persists</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}