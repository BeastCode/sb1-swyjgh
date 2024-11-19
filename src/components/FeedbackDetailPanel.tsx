import React from 'react';
import { X, AlertCircle, Bug, Lightbulb, Clock, Monitor, ExternalLink, MessageCircle, Share2, Image, Play } from 'lucide-react';
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

  const handleAction = (action: string) => {
    // TODO: Implement action handlers
    console.log(`Executing action: ${action}`);
    alert(`${action} feature coming soon!`);
  };

  return (
    <>
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm transition-opacity z-50"
        onClick={onClose}
      />
      <div className="fixed bottom-0 left-0 right-0 bg-slate-800 rounded-t-xl shadow-xl transform transition-transform duration-300 ease-in-out h-[90vh] z-50">
        <div className="max-w-7xl mx-auto h-full">
          <div className="flex h-full divide-x divide-slate-700">
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto">
              <div className="p-8 space-y-8">
                <div className="sticky top-0 bg-slate-800 z-10 pb-6 mb-6 border-b border-slate-700">
                  <div className="flex justify-between items-start">
                    <div className="flex items-center gap-3">
                      <Icon className={`${typeColors[feedback.type]} w-8 h-8`} />
                      <h2 className="text-2xl font-semibold">{feedback.title}</h2>
                    </div>
                    <button
                      onClick={onClose}
                      className="p-2 hover:bg-slate-700 rounded-full transition-colors"
                    >
                      <X className="w-6 h-6" />
                    </button>
                  </div>
                </div>

                <div className="space-y-8">
                  <div className="flex flex-wrap gap-6">
                    <div className="flex items-center gap-2">
                      <Clock className="w-5 h-5 text-slate-400" />
                      <span className="text-base">
                        {new Date(feedback.timestamp).toLocaleString()}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Monitor className="w-5 h-5 text-slate-400" />
                      <span className="text-base">{feedback.source}</span>
                    </div>
                    <div className="flex items-center gap-3">
                      <span
                        className={`px-3 py-1 rounded-full text-sm font-medium ${
                          statusColors[feedback.status]
                        }`}
                      >
                        {feedback.status}
                      </span>
                      {feedback.improvementType && (
                        <span className="px-3 py-1 rounded-full text-sm font-medium bg-blue-500/20 text-blue-400">
                          {feedback.improvementType}
                        </span>
                      )}
                    </div>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-slate-200 mb-3">
                      Description
                    </h3>
                    <p className="text-slate-400 text-base leading-relaxed">{feedback.description}</p>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-slate-200 mb-3">
                      Recommended Actions
                    </h3>
                    <ul className="list-disc list-inside text-slate-400 space-y-2 text-base">
                      {feedback.type === 'error' && (
                        <>
                          <li>Check error logs for detailed stack trace</li>
                          <li>Verify system connectivity and dependencies</li>
                          <li>Review recent deployments and configuration changes</li>
                          <li>Analyze error patterns in monitoring tools</li>
                          <li>Update incident response documentation</li>
                        </>
                      )}
                      {feedback.type === 'bug' && (
                        <>
                          <li>Reproduce the issue in development environment</li>
                          <li>Review related code changes and pull requests</li>
                          <li>Create regression tests to prevent recurrence</li>
                          <li>Document workarounds for customer support</li>
                          <li>Schedule bug fix priority in sprint planning</li>
                        </>
                      )}
                      {feedback.type === 'improvement' && (
                        <>
                          <li>Analyze user feedback patterns and metrics</li>
                          <li>Create detailed product specification</li>
                          <li>Gather stakeholder requirements and feedback</li>
                          <li>Estimate development effort and resources</li>
                          <li>Schedule for next sprint planning discussion</li>
                        </>
                      )}
                    </ul>
                  </div>

                  <div className="bg-slate-900/50 rounded-xl p-6">
                    <h3 className="text-lg font-medium text-slate-200 mb-3">
                      Impact Analysis
                    </h3>
                    <div className="space-y-4">
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Severity Level</span>
                        <span className={`font-medium ${
                          feedback.severity === 'high' ? 'text-red-400' :
                          feedback.severity === 'medium' ? 'text-yellow-400' :
                          'text-green-400'
                        }`}>
                          {feedback.severity.charAt(0).toUpperCase() + feedback.severity.slice(1)}
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Affected Users</span>
                        <span className="text-blue-400 font-medium">
                          {Math.floor(Math.random() * 100)}%
                        </span>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-slate-400">Time to Resolution</span>
                        <span className="text-purple-400 font-medium">
                          {Math.floor(Math.random() * 24) + 1}h estimated
                        </span>
                      </div>
                    </div>
                  </div>

                  {feedback.attachments && feedback.attachments.length > 0 && (
                    <div className="bg-slate-900/50 rounded-xl p-6">
                      <h3 className="text-lg font-medium text-slate-200 mb-4">
                        Attachments
                      </h3>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        {feedback.attachments.map((attachment, index) => (
                          <div
                            key={index}
                            className="group relative bg-slate-900 rounded-lg overflow-hidden"
                          >
                            <img
                              src={attachment.url}
                              alt={attachment.title}
                              className="w-full h-64 object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                              <div className="absolute bottom-0 left-0 right-0 p-4">
                                <div className="flex items-center justify-between">
                                  <span className="text-white font-medium">
                                    {attachment.title}
                                  </span>
                                  {attachment.type === 'image' ? (
                                    <Image className="w-5 h-5 text-white" />
                                  ) : (
                                    <Play className="w-5 h-5 text-white" />
                                  )}
                                </div>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>

            {/* Actions Panel */}
            <div className="w-80 p-8 space-y-6">
              <div>
                <h3 className="text-lg font-medium text-slate-200 mb-4">Actions</h3>
                <div className="space-y-3">
                  <button
                    onClick={() => handleAction('Create Jira Ticket')}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <ExternalLink className="w-5 h-5" />
                      <span>Create Jira Ticket</span>
                    </div>
                    <span className="text-blue-200 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => handleAction('Send to Slack')}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <MessageCircle className="w-5 h-5" />
                      <span>Send to Slack</span>
                    </div>
                    <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                  </button>

                  <button
                    onClick={() => handleAction('Share Feedback')}
                    className="w-full flex items-center justify-between gap-2 px-4 py-3 bg-slate-700 hover:bg-slate-600 text-white rounded-lg transition-colors group"
                  >
                    <div className="flex items-center gap-2">
                      <Share2 className="w-5 h-5" />
                      <span>Share Feedback</span>
                    </div>
                    <span className="text-slate-300 group-hover:translate-x-1 transition-transform">→</span>
                  </button>
                </div>
              </div>

              <div className="pt-6 border-t border-slate-700">
                <h4 className="text-sm font-medium text-slate-400 mb-3">Quick Links</h4>
                <div className="space-y-2">
                  <a
                    href="#"
                    className="block text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAction('View Documentation');
                    }}
                  >
                    View Documentation
                  </a>
                  <a
                    href="#"
                    className="block text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAction('Related Issues');
                    }}
                  >
                    Related Issues
                  </a>
                  <a
                    href="#"
                    className="block text-blue-400 hover:text-blue-300 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleAction('Knowledge Base');
                    }}
                  >
                    Knowledge Base
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}