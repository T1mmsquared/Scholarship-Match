// Data generation and management utilities
import { Scholarship, User, Application, UserProgress } from '@/types';

// Generate sample scholarships (500+)
export function generateSampleScholarships(): Scholarship[] {
  const scholarships: Scholarship[] = [];
  const states = ['CA', 'NY', 'TX', 'FL', 'IL', 'PA', 'OH', 'GA', 'NC', 'MI'];
  const cities = ['Los Angeles', 'New York', 'Chicago', 'Houston', 'Phoenix', 'Philadelphia', 'San Antonio', 'San Diego', 'Dallas', 'San Jose'];
  const majors = ['Engineering', 'Business', 'Medicine', 'Education', 'Arts', 'Science', 'Technology', 'Nursing', 'Law', 'Social Work'];
  const years = ['freshman', 'sophomore', 'junior', 'senior'];
  const applicationTypes: Array<'essay' | 'video' | 'no-essay' | 'creative' | 'quick-entry'> = ['essay', 'video', 'no-essay', 'creative', 'quick-entry'];
  
  const commonEssayPrompts = [
    "Describe a challenge you've overcome and how it shaped you.",
    "What are your career goals and how will this scholarship help?",
    "Describe your community involvement and its impact.",
    "What makes you unique and why should you receive this scholarship?",
    "How have you demonstrated leadership in your community?",
    "Describe a time you failed and what you learned.",
    "What does success mean to you?",
    "How do you plan to give back to your community?",
    "Describe your financial need and how this scholarship would help.",
    "What inspires you to pursue your chosen field?"
  ];

  // Generate local/state scholarships (higher win rate)
  for (let i = 0; i < 200; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const amount = Math.floor(Math.random() * 5000) + 500; // $500-$5500
    const appType = applicationTypes[Math.floor(Math.random() * applicationTypes.length)];
    
    scholarships.push({
      id: `local-${i}`,
      title: `${city} Community Foundation Scholarship ${i + 1}`,
      provider: `${city} Community Foundation`,
      amount,
      deadline: generateFutureDate(30, 365),
      description: `A local scholarship opportunity for students in ${city}, ${state}.`,
      requirements: {
        state,
        city,
        gpa: Math.random() > 0.5 ? Math.random() * 1.5 + 2.5 : undefined,
        major: Math.random() > 0.7 ? [majors[Math.floor(Math.random() * majors.length)]] : undefined,
        year: Math.random() > 0.5 ? [years[Math.floor(Math.random() * years.length)]] : undefined,
        financialNeed: Math.random() > 0.6,
        firstGeneration: Math.random() > 0.7,
      },
      applicationType: appType,
      estimatedTime: appType === 'no-essay' || appType === 'quick-entry' ? Math.floor(Math.random() * 10) + 5 : Math.floor(Math.random() * 60) + 30,
      essayPrompt: appType === 'essay' ? commonEssayPrompts[Math.floor(Math.random() * commonEssayPrompts.length)] : undefined,
      essayWordCount: appType === 'essay' ? [250, 500, 750, 1000][Math.floor(Math.random() * 4)] : undefined,
      renewable: Math.random() > 0.8,
      competitionLevel: 'low',
      historicalData: {
        awardsGiven: Math.floor(Math.random() * 20) + 5,
        avgWinnerGPA: Math.random() * 1.5 + 2.5,
        typicalAmount: amount,
      },
      tags: ['local', 'community', state.toLowerCase()],
      url: `https://example.com/scholarship/local-${i}`,
      local: true,
      state,
      city,
    });
  }

  // Generate state-specific scholarships
  for (let i = 0; i < 150; i++) {
    const state = states[Math.floor(Math.random() * states.length)];
    const amount = Math.floor(Math.random() * 10000) + 1000; // $1000-$11000
    const appType = applicationTypes[Math.floor(Math.random() * applicationTypes.length)];
    
    scholarships.push({
      id: `state-${i}`,
      title: `${state} State Education Grant ${i + 1}`,
      provider: `${state} Department of Education`,
      amount,
      deadline: generateFutureDate(30, 365),
      description: `State-specific scholarship for ${state} residents pursuing higher education.`,
      requirements: {
        state,
        gpa: Math.random() > 0.3 ? Math.random() * 1.5 + 2.5 : undefined,
        major: Math.random() > 0.6 ? [majors[Math.floor(Math.random() * majors.length)]] : undefined,
        financialNeed: Math.random() > 0.5,
      },
      applicationType: appType,
      estimatedTime: appType === 'no-essay' || appType === 'quick-entry' ? Math.floor(Math.random() * 15) + 5 : Math.floor(Math.random() * 90) + 30,
      essayPrompt: appType === 'essay' ? commonEssayPrompts[Math.floor(Math.random() * commonEssayPrompts.length)] : undefined,
      essayWordCount: appType === 'essay' ? [250, 500, 750, 1000][Math.floor(Math.random() * 4)] : undefined,
      renewable: Math.random() > 0.7,
      competitionLevel: 'medium',
      historicalData: {
        awardsGiven: Math.floor(Math.random() * 100) + 20,
        avgWinnerGPA: Math.random() * 1.5 + 2.8,
        typicalAmount: amount,
      },
      tags: ['state', state.toLowerCase()],
      url: `https://example.com/scholarship/state-${i}`,
      local: false,
      state,
    });
  }

  // Generate no-essay/quick-entry scholarships
  for (let i = 0; i < 100; i++) {
    const amount = Math.floor(Math.random() * 2000) + 100; // $100-$2100
    const appType = Math.random() > 0.5 ? 'no-essay' : 'quick-entry';
    
    scholarships.push({
      id: `quick-${i}`,
      title: `Quick Apply Scholarship ${i + 1}`,
      provider: `Scholarship Provider ${i + 1}`,
      amount,
      deadline: generateFutureDate(15, 180),
      description: `Easy application process - no essay required!`,
      requirements: {
        gpa: Math.random() > 0.6 ? Math.random() * 1.0 + 2.0 : undefined,
      },
      applicationType: appType,
      estimatedTime: Math.floor(Math.random() * 10) + 5, // 5-15 minutes
      renewable: false,
      competitionLevel: 'high',
      tags: ['no-essay', 'quick', 'easy'],
      url: `https://example.com/scholarship/quick-${i}`,
      local: false,
    });
  }

  // Generate major-specific scholarships
  for (let i = 0; i < 100; i++) {
    const major = majors[Math.floor(Math.random() * majors.length)];
    const amount = Math.floor(Math.random() * 15000) + 2000; // $2000-$17000
    const appType = applicationTypes[Math.floor(Math.random() * 3)]; // essay, video, or creative
    
    scholarships.push({
      id: `major-${i}`,
      title: `${major} Excellence Scholarship ${i + 1}`,
      provider: `${major} Professional Association`,
      amount,
      deadline: generateFutureDate(30, 365),
      description: `Scholarship for students pursuing ${major} degrees.`,
      requirements: {
        major: [major],
        gpa: Math.random() * 1.0 + 3.0, // 3.0-4.0
        year: [years[Math.floor(Math.random() * years.length)]],
      },
      applicationType: appType,
      estimatedTime: Math.floor(Math.random() * 120) + 60, // 60-180 minutes
      essayPrompt: appType === 'essay' ? commonEssayPrompts[Math.floor(Math.random() * commonEssayPrompts.length)] : undefined,
      essayWordCount: appType === 'essay' ? [500, 750, 1000][Math.floor(Math.random() * 3)] : undefined,
      renewable: Math.random() > 0.9,
      competitionLevel: 'medium',
      tags: ['major', major.toLowerCase()],
      url: `https://example.com/scholarship/major-${i}`,
      local: false,
    });
  }

  // Generate identity-based scholarships
  const identityTypes = [
    { name: 'First Generation', key: 'firstGeneration' },
    { name: 'LGBTQ+', key: 'lgbtq' },
    { name: 'Women in STEM', key: 'gender', value: 'female' },
    { name: 'Veteran', key: 'military' },
    { name: 'Disability', key: 'disability' },
  ];

  for (let i = 0; i < 50; i++) {
    const identity = identityTypes[Math.floor(Math.random() * identityTypes.length)];
    const amount = Math.floor(Math.random() * 10000) + 1000;
    const appType = applicationTypes[Math.floor(Math.random() * applicationTypes.length)];
    
    const requirements: any = {
      gpa: Math.random() > 0.4 ? Math.random() * 1.0 + 2.5 : undefined,
    };
    
    if (identity.key === 'gender') {
      requirements.gender = identity.value;
    } else {
      requirements[identity.key] = true;
    }
    
    scholarships.push({
      id: `identity-${i}`,
      title: `${identity.name} Scholarship ${i + 1}`,
      provider: `${identity.name} Foundation`,
      amount,
      deadline: generateFutureDate(30, 365),
      description: `Scholarship supporting ${identity.name.toLowerCase()} students.`,
      requirements,
      applicationType: appType,
      estimatedTime: appType === 'no-essay' ? 15 : Math.floor(Math.random() * 90) + 30,
      essayPrompt: appType === 'essay' ? commonEssayPrompts[Math.floor(Math.random() * commonEssayPrompts.length)] : undefined,
      essayWordCount: appType === 'essay' ? [250, 500, 750][Math.floor(Math.random() * 3)] : undefined,
      renewable: Math.random() > 0.8,
      competitionLevel: 'medium',
      tags: ['identity', identity.name.toLowerCase().replace(' ', '-')],
      url: `https://example.com/scholarship/identity-${i}`,
      local: false,
    });
  }

  return scholarships;
}

function generateFutureDate(minDays: number, maxDays: number): string {
  const days = Math.floor(Math.random() * (maxDays - minDays + 1)) + minDays;
  const date = new Date();
  date.setDate(date.getDate() + days);
  return date.toISOString().split('T')[0];
}

// Initialize default user progress
export function createDefaultProgress(userId: string): UserProgress {
  return {
    userId,
    applicationsSubmitted: 0,
    applicationsInProgress: 0,
    totalDollarsApplied: 0,
    totalDollarsWon: 0,
    successRate: 0,
    currentStreak: 0,
    longestStreak: 0,
    lastActivityDate: new Date().toISOString(),
    badges: [],
    points: 0,
    level: 1,
  };
}

