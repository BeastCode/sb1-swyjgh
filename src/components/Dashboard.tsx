import React, { useState, useEffect } from 'react';
import { Search, Filter } from 'lucide-react';
import { AlarmList } from './AlarmList';
import { TrendChart } from './TrendChart';
import { StatusCards } from './StatusCards';
import { AlarmDetailPanel } from './AlarmDetailPanel';
import type { Alarm } from '../types';

// Simulated real-time data updates
const generateMockAlarms = (): Alarm[] => {
  const sources = ['Server Room A', 'Network Switch B', 'Database Cluster', 'Load Balancer'];
  const titles = [
    'High CPU Usage',
    'Memory Threshold Exceeded',
    'Network Latency Spike',
    'Disk Space Warning',
  ];
  
  return Array.from({ length: 10 }, (_, i) => ({
    id: `alarm-${i}`,
    title: titles[Math.floor(Math.random() * titles.length)],
    description: `Detailed information about alarm ${i + 1}`,
    severity: ['critical', 'warning', 'info'][Math.floor(Math.random() * 3)] as Alarm['severity'],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    status: ['active', 'acknowledged', 'resolved'][Math.floor(Math.random() * 3)] as Alarm['status'],
    source: sources[Math.floor(Math.random() * sources.length)],
  }));
};

export function Dashboard() {
  const [alarms, setAlarms] = useState<Alarm[]>([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState<Alarm['status'] | 'all'>('all');
  const [selectedAlarm, setSelectedAlarm] = useState<Alarm | null>(null);

  useEffect(() => {
    // Initial load
    setAlarms(generateMockAlarms());

    // Simulate real-time updates
    const interval = setInterval(() => {
      setAlarms(prev => {
        const newAlarm: Alarm = {
          id: `alarm-${Date.now()}`,
          title: 'New Alert Detected',
          description: 'System generated alert',
          severity: Math.random() > 0.5 ? 'warning' : 'critical',
          timestamp: new Date().toISOString(),
          status: 'active',
          source: 'Real-time Monitor',
        };
        return [newAlarm, ...prev.slice(0, 9)];
      });
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const filteredAlarms = alarms.filter(alarm => {
    const matchesSearch = alarm.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         alarm.source.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = statusFilter === 'all' || alarm.status === statusFilter;
    return matchesSearch && matchesStatus;
  });

  const handleAcknowledge = (id: string) => {
    setAlarms(prev =>
      prev.map(alarm =>
        alarm.id === id ? { ...alarm, status: 'acknowledged' } : alarm
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Alarm Monitoring Dashboard</h1>
          <p className="text-slate-400">Real-time system monitoring and alerts</p>
        </div>

        <StatusCards alarms={alarms} />

        <div className="mb-8 bg-slate-800 rounded-lg p-6 shadow-xl">
          <h2 className="text-xl font-semibold mb-4">Alarm Trends</h2>
          <TrendChart alarms={alarms} />
        </div>

        <div className="bg-slate-800 rounded-lg shadow-xl">
          <div className="p-6 border-b border-slate-700">
            <div className="flex flex-col md:flex-row gap-4 items-center justify-between">
              <h2 className="text-xl font-semibold">Active Alarms</h2>
              <div className="flex gap-4 w-full md:w-auto">
                <div className="relative flex-1 md:flex-initial">
                  <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <input
                    type="text"
                    placeholder="Search alarms..."
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                  />
                </div>
                <div className="relative flex-1 md:flex-initial">
                  <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 text-slate-400" size={20} />
                  <select
                    className="w-full pl-10 pr-4 py-2 bg-slate-700 rounded-lg appearance-none focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={statusFilter}
                    onChange={(e) => setStatusFilter(e.target.value as Alarm['status'] | 'all')}
                  >
                    <option value="all">All Status</option>
                    <option value="active">Active</option>
                    <option value="acknowledged">Acknowledged</option>
                    <option value="resolved">Resolved</option>
                  </select>
                </div>
              </div>
            </div>
          </div>
          <AlarmList
            alarms={filteredAlarms}
            onAcknowledge={handleAcknowledge}
            onSelectAlarm={setSelectedAlarm}
          />
        </div>
      </div>

      <AlarmDetailPanel
        alarm={selectedAlarm}
        onClose={() => setSelectedAlarm(null)}
      />
    </div>
  );
}