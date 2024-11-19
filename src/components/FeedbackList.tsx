import React from 'react';
import { AlertCircle, Bug, Lightbulb, CheckCircle, Paperclip } from 'lucide-react';
import type { Feedback } from '../types';

const typeIcons = {
  error: AlertCircle,
  bug: Bug,
  improvement: Lightbulb,
};

const typeColors = {
  error: 'text-red-500',
  bug: 'text-yellow-500',
  improvement: 'text-blue-500',
};

const statusColors = {
  active: 'bg-red-500',
  acknowledged: 'bg-yellow-500',
  resolved: 'bg-green-500',
};

interface FeedbackListProps {
  feedback: Feedback[];
  onAcknowledge: (id: string) => void;
  onSelectFeedback: (feedback: Feedback) => void;
}

export function FeedbackList({ feedback, onAcknowledge, onSelectFeedback }: FeedbackListProps) {
  return (
    <div className="overflow-y-auto max-h-[600px] scrollbar-thin">
      <table className="w-full">
        <thead className="sticky top-0 bg-slate-800 z-10">
          <tr className="text-left border-b border-slate-700">
            <th className="p-4">Type</th>
            <th className="p-4">Title</th>
            <th className="p-4 hidden md:table-cell">Source</th>
            <th className="p-4">Status</th>
            <th className="p-4 hidden md:table-cell">Time</th>
            <th className="p-4 hidden md:table-cell">Attachments</th>
            <th className="p-4">Actions</th>
          </tr>
        </thead>
        <tbody>
          {feedback.map((item) => {
            const Icon = typeIcons[item.type];
            return (
              <tr
                key={item.id}
                onClick={() => onSelectFeedback(item)}
                className="border-b border-slate-700 hover:bg-slate-700/50 transition-all cursor-pointer group"
              >
                <td className="p-4">
                  <div className="flex items-center gap-2">
                    <Icon className={`${typeColors[item.type]} group-hover:scale-110 transition-transform`} size={20} />
                    <span className="hidden md:inline capitalize">{item.type}</span>
                    {item.improvementType && (
                      <span className="text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                        {item.improvementType}
                      </span>
                    )}
                  </div>
                </td>
                <td className="p-4">
                  <div className="font-medium group-hover:text-blue-400 transition-colors">{item.title}</div>
                  <div className="text-sm text-slate-400">{item.description}</div>
                </td>
                <td className="p-4 hidden md:table-cell">{item.source}</td>
                <td className="p-4">
                  <span
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      statusColors[item.status]
                    } group-hover:ring-2 ring-offset-2 ring-offset-slate-800 transition-all`}
                  >
                    {item.status}
                  </span>
                </td>
                <td className="p-4 hidden md:table-cell">
                  {new Date(item.timestamp).toLocaleString()}
                </td>
                <td className="p-4 hidden md:table-cell">
                  {item.attachments && item.attachments.length > 0 && (
                    <div className="flex items-center gap-1 text-slate-400">
                      <Paperclip size={16} />
                      <span className="text-sm">{item.attachments.length}</span>
                    </div>
                  )}
                </td>
                <td className="p-4">
                  {item.status === 'active' && (
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onAcknowledge(item.id);
                      }}
                      className="p-2 hover:bg-slate-600 rounded-full transition-colors group-hover:scale-110"
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