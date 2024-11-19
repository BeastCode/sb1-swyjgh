export type FeedbackType = 'error' | 'bug' | 'improvement';
export type ImprovementType = 'feature' | 'usability' | 'insight';
export type FeedbackStatus = 'active' | 'acknowledged' | 'resolved';
export type FeedbackSeverity = 'high' | 'medium' | 'low';

export interface FeedbackAttachment {
  type: 'image' | 'video';
  url: string;
  thumbnail?: string;
  title: string;
}

export interface Feedback {
  id: string;
  title: string;
  description: string;
  type: FeedbackType;
  improvementType?: ImprovementType;
  severity: FeedbackSeverity;
  timestamp: string;
  status: FeedbackStatus;
  source: string;
  attachments?: FeedbackAttachment[];
}