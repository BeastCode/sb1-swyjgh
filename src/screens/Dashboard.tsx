import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { FeedbackList } from '../components/FeedbackList';
import { TrendChart } from '../components/TrendChart';
import { StatusCards } from '../components/StatusCards';
import { FeedbackDetailPanel } from '../components/FeedbackDetailPanel';
import type { Feedback, FeedbackType } from '../types';
import { generateMockFeedback } from '../utils/mockData';

export function Dashboard() {
  const [feedback, setFeedback] = useState<Feedback[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState<FeedbackType | 'all'>('all');
  const [selectedFeedback, setSelectedFeedback] = useState<Feedback | null>(null);

  useEffect(() => {
    // Initial load
    setFeedback(generateMockFeedback());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setFeedback(prev => {
        const newFeedback = generateMockFeedback(1)[0];
        return [newFeedback, ...prev.slice(0, 9)];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredFeedback = feedback.filter(item => {
    const matchesSearch = item.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         item.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesType = typeFilter === 'all' || item.type === typeFilter;
    return matchesSearch && matchesType;
  });

  const handleAcknowledge = (id: string) => {
    setFeedback(prev =>
      prev.map(item =>
        item.id === id ? { ...item, status: 'acknowledged' } : item
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feedback Dashboard</h1>
          <p className="text-slate-400">Monitor and manage system feedback in real-time</p>
        </div>

        <StatusCards feedback={feedback} />

        <div className="mb-8 bg-slate-800 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Feedback Trends</h2>
          <TrendChart feedback={feedback} />
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl">
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-xl font-semibold">Active Feedback</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search feedback..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative flex-1 md:flex-initial">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={typeFilter}
                    onChange={(e) => setTypeFilter(e.target.value as FeedbackType | 'all')}
                  >
                    <option value="all">All Types</option>
                    <option value="error">Errors</option>
                    <option value="bug">Bugs</option>
                    <option value="improvement">Improvements</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <FeedbackList
            feedback={filteredFeedback}
            onAcknowledge={handleAcknowledge}
            onSelectFeedback={setSelectedFeedback}
          />
        </div>
      </div>

      <FeedbackDetailPanel
        feedback={selectedFeedback}
        onClose={() => setSelectedFeedback(null)}
      />
    </div>
  );
}