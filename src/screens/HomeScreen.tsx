import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AlertCircle, PlayCircle, Activity } from 'lucide-react';
import { StatusCards } from '../components/StatusCards';
import { generateMockFeedback } from '../utils/mockData';
import type { Feedback } from '../types';

export function HomeScreen() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);

  useEffect(() => {
    setFeedback(generateMockFeedback());
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-3xl mx-auto text-center mb-16">
          <h1 className="text-5xl font-bold mb-6 bg-clip-text text-transparent bg-gradient-to-r from-blue-500 to-cyan-500">
            Feedback Management System
          </h1>
          <p className="text-xl text-slate-400">
            Streamline your feedback process with real-time monitoring and management of errors, bugs, and improvements
          </p>
        </div>

        <StatusCards feedback={feedback} />

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
          <Link
            to="/dashboard"
            className="group bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <AlertCircle className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-semibold">Feedback Dashboard</h2>
            </div>
            <p className="text-slate-400">
              Monitor and manage system errors, bugs, and improvement suggestions with advanced filtering
            </p>
          </Link>

          <Link
            to="/simulator"
            className="group bg-slate-800 rounded-xl p-6 hover:bg-slate-700 transition-colors border border-slate-700 hover:border-blue-500/50"
          >
            <div className="flex items-center gap-4 mb-4">
              <PlayCircle className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-semibold">Feedback Simulator</h2>
            </div>
            <p className="text-slate-400">
              Test the system by creating sample feedback entries across different categories
            </p>
          </Link>

          <div className="bg-slate-800 rounded-xl p-6 border border-slate-700">
            <div className="flex items-center gap-4 mb-4">
              <Activity className="w-8 h-8 text-blue-500" />
              <h2 className="text-xl font-semibold">System Overview</h2>
            </div>
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Resolution Rate</span>
                <span className="text-green-500">94%</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">Avg Response Time</span>
                <span className="text-blue-500">2.5h</span>
              </div>
              <div className="flex items-center justify-between">
                <span className="text-slate-400">User Satisfaction</span>
                <span className="text-yellow-500">4.8/5</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}