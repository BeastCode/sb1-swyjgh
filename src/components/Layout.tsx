import React from 'react';
import { Routes, Route, NavLink } from 'react-router-dom';
import { Home, Bell, PlayCircle } from 'lucide-react';
import { Dashboard } from '../screens/Dashboard';
import { HomeScreen } from '../screens/HomeScreen';
import { Simulator } from '../screens/Simulator';

export function Layout() {
  return (
    <div className="flex h-screen bg-slate-900">
      {/* Sidebar */}
      <nav className="w-16 bg-slate-800 border-r border-slate-700">
        <div className="flex flex-col items-center py-4 space-y-4">
          <NavLink
            to="/"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-slate-700'
              }`
            }
          >
            <Home size={24} />
          </NavLink>
          <NavLink
            to="/dashboard"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-slate-700'
              }`
            }
          >
            <Bell size={24} />
          </NavLink>
          <NavLink
            to="/simulator"
            className={({ isActive }) =>
              `p-2 rounded-lg transition-colors ${
                isActive
                  ? 'bg-blue-500 text-white'
                  : 'text-slate-400 hover:bg-slate-700'
              }`
            }
          >
            <PlayCircle size={24} />
          </NavLink>
        </div>
      </nav>

      {/* Main Content */}
      <main className="flex-1 overflow-auto">
        <Routes>
          <Route path="/" element={<HomeScreen />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/simulator" element={<Simulator />} />
        </Routes>
      </main>
    </div>
  );
}