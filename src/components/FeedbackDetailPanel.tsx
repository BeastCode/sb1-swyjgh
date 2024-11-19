import React from 'react';
import { X, AlertCircle, Bug, Lightbulb, Clock, Monitor } from 'lucide-react';
import type { Feedback } from '../types';

interface FeedbackDetailPanelProps {
  feedback: Feedback | null;
  onClose: () => void;
}

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

export function FeedbackDetailPanel({ feedback, onClose }: FeedbackDetailPanelProps) {
  if (!feedback) return null;

  const Icon = typeIcons[feedback.type];

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
              <Icon className={`${typeColors[feedback.type]} w-6 h-6`} />
              <h2 className="text-xl font-semibold">{feedback.title}</h2>
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
                  {new Date(feedback.timestamp).toLocaleString()}
                </span>
              </div>
              <div className="flex items-center gap-2">
                <Monitor className="w-4 h-4 text-slate-400" />
                <span className="text-sm">{feedback.source}</span>
              </div>
              <div className="flex items-center gap-2">
                <span
                  className={`px-2.5 py-0.5 rounded-full text-xs font-medium ${
                    statusColors[feedback.status]
                  }`}
                >
                  {feedback.status}
                </span>
                {feedback.improvementType && (
                  <span className="px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-500/20 text-blue-400">
                    {feedback.improvementType}
                  </span>
                )}
              </div>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Description
              </h3>
              <p className="text-slate-400">{feedback.description}</p>
            </div>

            <div className="bg-slate-900/50 rounded-lg p-4">
              <h3 className="text-sm font-medium text-slate-300 mb-2">
                Recommended Actions
              </h3>
              <ul className="list-disc list-inside text-slate-400 space-y-1">
                {feedback.type === 'error' && (
                  <>
                    <li>Check error logs for detailed stack trace</li>
                    <li>Verify system connectivity</li>
                    <li>Review recent deployments</li>
                  </>
                )}
                {feedback.type === 'bug' && (
                  <>
                    <li>Reproduce the issue in development</li>
                    <li>Review related code changes</li>
                    <li>Create regression tests</li>
                  </>
                )}
                {feedback.type === 'improvement' && (
                  <>
                    <li>Analyze user feedback patterns</li>
                    <li>Create product specification</li>
                    <li>Schedule for next sprint planning</li>
                  </>
                )}
              </ul>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}