import React, { useState } from 'react';
import { AlertCircle } from 'lucide-react';
import type { Feedback, FeedbackType, ImprovementType, FeedbackSeverity } from '../types';

export function Simulator() {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    type: 'error' as FeedbackType,
    improvementType: 'feature' as ImprovementType,
    severity: 'medium' as FeedbackSeverity,
    source: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const feedback: Feedback = {
      id: `sim-${Date.now()}`,
      ...formData,
      timestamp: new Date().toISOString(),
      status: 'active',
    };
    console.log('Simulated feedback:', feedback);
    // TODO: Implement feedback dispatch mechanism
    alert('Feedback submitted successfully!');
    setFormData({
      title: '',
      description: '',
      type: 'error',
      improvementType: 'feature',
      severity: 'medium',
      source: '',
    });
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 to-slate-800 text-slate-100">
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold mb-2">Feedback Simulator</h1>
          <p className="text-slate-400">Create test feedback entries to verify system behavior</p>
        </div>

        <div className="max-w-2xl mx-auto">
          <div className="bg-slate-800 rounded-lg p-6 shadow-xl">
            <div className="flex items-center gap-3 mb-6">
              <AlertCircle className="text-blue-500" size={24} />
              <h2 className="text-xl font-semibold">Create Test Feedback</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Title
                </label>
                <input
                  type="text"
                  value={formData.title}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, title: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  placeholder="Enter feedback title"
                  required
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">
                  Description
                </label>
                <textarea
                  value={formData.description}
                  onChange={(e) =>
                    setFormData((prev) => ({ ...prev, description: e.target.value }))
                  }
                  className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 h-32"
                  placeholder="Enter detailed description"
                  required
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Type
                  </label>
                  <select
                    value={formData.type}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        type: e.target.value as FeedbackType,
                        // Reset improvementType if type is not 'improvement'
                        improvementType: e.target.value === 'improvement' ? prev.improvementType : undefined,
                      }))
                    }
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="error">Error</option>
                    <option value="bug">Bug</option>
                    <option value="improvement">Improvement</option>
                  </select>
                </div>

                {formData.type === 'improvement' && (
                  <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">
                      Improvement Type
                    </label>
                    <select
                      value={formData.improvementType}
                      onChange={(e) =>
                        setFormData((prev) => ({
                          ...prev,
                          improvementType: e.target.value as ImprovementType,
                        }))
                      }
                      className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    >
                      <option value="feature">Feature Request</option>
                      <option value="usability">Usability</option>
                      <option value="insight">Insight</option>
                    </select>
                  </div>
                )}

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Severity
                  </label>
                  <select
                    value={formData.severity}
                    onChange={(e) =>
                      setFormData((prev) => ({
                        ...prev,
                        severity: e.target.value as FeedbackSeverity,
                      }))
                    }
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                  >
                    <option value="high">High</option>
                    <option value="medium">Medium</option>
                    <option value="low">Low</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-2">
                    Source
                  </label>
                  <input
                    type="text"
                    value={formData.source}
                    onChange={(e) =>
                      setFormData((prev) => ({ ...prev, source: e.target.value }))
                    }
                    className="w-full px-4 py-2 bg-slate-700 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                    placeholder="Enter feedback source"
                    required
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition-colors font-medium"
              >
                Submit Feedback
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}