import React from 'react';
import { AlertCircle, Bug, Lightbulb } from 'lucide-react';
import type { Feedback } from '../types';

interface StatusCardsProps {
  feedback: Feedback[];
}

export function StatusCards({ feedback }: StatusCardsProps) {
  const stats = {
    errors: feedback.filter(f => f.type === 'error' && f.status === 'active').length,
    bugs: feedback.filter(f => f.type === 'bug' && f.status === 'active').length,
    improvements: feedback.filter(f => f.type === 'improvement').length,
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
      <div className="bg-gradient-to-br from-red-500/20 to-red-600/20 p-6 rounded-lg border border-red-500/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-red-400 text-sm font-medium">Active Errors</p>
            <h3 className="text-3xl font-bold text-red-500 mt-1">{stats.errors}</h3>
          </div>
          <AlertCircle className="text-red-500" size={32} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-yellow-500/20 to-yellow-600/20 p-6 rounded-lg border border-yellow-500/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-yellow-400 text-sm font-medium">Active Bugs</p>
            <h3 className="text-3xl font-bold text-yellow-500 mt-1">{stats.bugs}</h3>
          </div>
          <Bug className="text-yellow-500" size={32} />
        </div>
      </div>

      <div className="bg-gradient-to-br from-blue-500/20 to-blue-600/20 p-6 rounded-lg border border-blue-500/20 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <p className="text-blue-400 text-sm font-medium">Improvements</p>
            <h3 className="text-3xl font-bold text-blue-500 mt-1">{stats.improvements}</h3>
          </div>
          <Lightbulb className="text-blue-500" size={32} />
        </div>
      </div>
    </div>
  );
}