import type { Feedback, FeedbackType, ImprovementType, FeedbackSeverity, FeedbackStatus, FeedbackAttachment } from '../types';

const generateRandomAttachments = (): FeedbackAttachment[] | undefined => {
  if (Math.random() > 0.7) return undefined; // 30% chance of having attachments

  const attachmentCount = Math.floor(Math.random() * 2) + 1; // 1-2 attachments
  return Array.from({ length: attachmentCount }, (_, index) => ({
    type: Math.random() > 0.8 ? 'video' : 'image',
    url: `https://source.unsplash.com/random/1200x800?bug,error,tech&sig=${Date.now()}-${index}`,
    thumbnail: `https://source.unsplash.com/random/300x200?bug,error,tech&sig=${Date.now()}-${index}`,
    title: `Screenshot ${index + 1}`,
  }));
};

const generateRandomFeedback = (): Feedback => {
  const types: FeedbackType[] = ['error', 'bug', 'improvement'];
  const improvementTypes: ImprovementType[] = ['feature', 'usability', 'insight'];
  const severities: FeedbackSeverity[] = ['high', 'medium', 'low'];
  const statuses: FeedbackStatus[] = ['active', 'acknowledged', 'resolved'];
  
  const type = types[Math.floor(Math.random() * types.length)];
  const improvementType = type === 'improvement' 
    ? improvementTypes[Math.floor(Math.random() * improvementTypes.length)]
    : undefined;

  return {
    id: `feedback-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
    title: getRandomTitle(type),
    description: `Detailed information about this ${type}`,
    type,
    improvementType,
    severity: severities[Math.floor(Math.random() * severities.length)],
    timestamp: new Date(Date.now() - Math.random() * 86400000).toISOString(),
    status: statuses[Math.floor(Math.random() * statuses.length)],
    source: getRandomSource(),
    attachments: generateRandomAttachments(),
  };
};

const getRandomTitle = (type: FeedbackType): string => {
  const titles = {
    error: [
      'Application Crash on Startup',
      'Database Connection Failed',
      'Payment Processing Error',
      'Authentication Failed',
    ],
    bug: [
      'UI Elements Misaligned',
      'Incorrect Data Display',
      'Form Submission Issue',
      'Search Results Inconsistent',
    ],
    improvement: [
      'Add Dark Mode Support',
      'Enhance Mobile Navigation',
      'Simplify Checkout Process',
      'Improve Loading Performance',
    ],
  };
  
  return titles[type][Math.floor(Math.random() * titles[type].length)];
};

const getRandomSource = (): string => {
  const sources = [
    'Mobile App',
    'Web Dashboard',
    'Customer Support',
    'System Monitor',
    'User Feedback Form',
  ];
  
  return sources[Math.floor(Math.random() * sources.length)];
};

export const generateMockFeedback = (count = 10): Feedback[] => {
  return Array.from({ length: count }, generateRandomFeedback);
};