import React from 'react';
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from 'recharts';
import type { Feedback } from '../types';

interface TrendChartProps {
  feedback: Feedback[];
}

export function TrendChart({ feedback }: TrendChartProps) {
  // Process feedback into time-series data
  const data = React.useMemo(() => {
    const last24Hours = new Date(Date.now() - 24 * 60 * 60 * 1000);
    const hourlyData = Array.from({ length: 24 }, (_, i) => {
      const hour = new Date(last24Hours.getTime() + i * 60 * 60 * 1000);
      return {
        hour: hour.toLocaleTimeString([], { hour: '2-digit' }),
        errors: 0,
        bugs: 0,
        improvements: 0,
      };
    });

    feedback.forEach(item => {
      const itemHour = new Date(item.timestamp).getHours();
      const dataIndex = hourlyData.findIndex(
        d => parseInt(d.hour) === itemHour
      );
      if (dataIndex !== -1) {
        hourlyData[dataIndex][`${item.type}s`]++;
      }
    });

    return hourlyData;
  }, [feedback]);

  return (
    <div className="h-[300px] w-full">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart
          data={data}
          margin={{ top: 10, right: 30, left: 0, bottom: 0 }}
        >
          <defs>
            <linearGradient id="colorErrors" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EF4444" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EF4444" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorBugs" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#EAB308" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#EAB308" stopOpacity={0} />
            </linearGradient>
            <linearGradient id="colorImprovements" x1="0" y1="0" x2="0" y2="1">
              <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8} />
              <stop offset="95%" stopColor="#3B82F6" stopOpacity={0} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
          <XAxis
            dataKey="hour"
            stroke="#94A3B8"
            tick={{ fill: '#94A3B8' }}
          />
          <YAxis stroke="#94A3B8" tick={{ fill: '#94A3B8' }} />
          <Tooltip
            contentStyle={{
              backgroundColor: '#1E293B',
              border: '1px solid #334155',
              borderRadius: '0.5rem',
            }}
          />
          <Area
            type="monotone"
            dataKey="errors"
            stroke="#EF4444"
            fillOpacity={1}
            fill="url(#colorErrors)"
            name="Errors"
          />
          <Area
            type="monotone"
            dataKey="bugs"
            stroke="#EAB308"
            fillOpacity={1}
            fill="url(#colorBugs)"
            name="Bugs"
          />
          <Area
            type="monotone"
            dataKey="improvements"
            stroke="#3B82F6"
            fillOpacity={1}
            fill="url(#colorImprovements)"
            name="Improvements"
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  );
}