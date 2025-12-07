// Core type definitions for the scholarship matching app

export interface Scholarship {
  id: string;
  title: string;
  provider: string;
  amount: number;
  deadline: string; // ISO date string
  description: string;
  requirements: {
    gpa?: number;
    major?: string[];
    year?: string[]; // freshman, sophomore, junior, senior
    state?: string;
    city?: string;
    county?: string;
    financialNeed?: boolean;
    firstGeneration?: boolean;
    ethnicity?: string[];
    gender?: string;
    lgbtq?: boolean;
    disability?: boolean;
    military?: boolean;
    extracurricular?: string[];
    career?: string[];
    intendedCollege?: string[];
  };
  applicationType: 'essay' | 'video' | 'no-essay' | 'creative' | 'quick-entry';
  estimatedTime: number; // minutes
  essayPrompt?: string;
  essayWordCount?: number;
  renewable: boolean;
  competitionLevel: 'low' | 'medium' | 'high';
  historicalData?: {
    awardsGiven: number;
    avgWinnerGPA?: number;
    typicalAmount?: number;
  };
  tags: string[];
  url: string;
  local: boolean;
  state?: string;
  city?: string;
}

export interface User {
  id: string;
  email: string;
  name: string;
  profile: {
    gpa?: number;
    major?: string;
    year?: string;
    state?: string;
    city?: string;
    county?: string;
    financialNeed?: boolean;
    firstGeneration?: boolean;
    ethnicity?: string;
    gender?: string;
    lgbtq?: boolean;
    disability?: boolean;
    military?: boolean;
    extracurricular?: string[];
    career?: string[];
    intendedCollege?: string[];
    essayPreference?: 'essay' | 'video' | 'no-essay' | 'creative' | 'quick-entry';
  };
  onboardingCompleted: boolean;
  createdAt: string;
}

export interface Application {
  id: string;
  userId: string;
  scholarshipId: string;
  status: 'saved' | 'in-progress' | 'submitted' | 'won' | 'lost';
  submittedAt?: string;
  essay?: string;
  documents?: string[]; // document IDs
  priority: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface UserProgress {
  userId: string;
  applicationsSubmitted: number;
  applicationsInProgress: number;
  totalDollarsApplied: number;
  totalDollarsWon: number;
  successRate: number; // percentage
  currentStreak: number; // days
  longestStreak: number;
  lastActivityDate: string;
  badges: Badge[];
  points: number;
  level: number;
}

export interface Badge {
  id: string;
  name: string;
  description: string;
  icon: string;
  earnedAt: string;
}

export interface Notification {
  id: string;
  userId: string;
  type: 'deadline' | 'new-match' | 'achievement' | 'reminder';
  title: string;
  message: string;
  scholarshipId?: string;
  read: boolean;
  createdAt: string;
}

export interface Document {
  id: string;
  userId: string;
  name: string;
  type: 'transcript' | 'resume' | 'recommendation' | 'other';
  url: string;
  uploadedAt: string;
}

