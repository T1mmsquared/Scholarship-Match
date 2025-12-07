'use client';

import { useEffect, useState } from 'react';
import Onboarding from '@/components/Onboarding';
import Dashboard from '@/components/Dashboard';
import Navigation from '@/components/Navigation';
import { User, UserProgress, Scholarship } from '@/types';
import { matchScholarships } from '@/lib/matching';
import { generateSampleScholarships } from '@/lib/data';

export default function Home() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [matchedScholarships, setMatchedScholarships] = useState<Scholarship[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadUserData();
  }, []);

  const loadUserData = async () => {
    try {
      const res = await fetch('/api/user?userId=demo-user');
      const data = await res.json();
      setUser(data.user);
      setProgress(data.progress);

      // Load and match scholarships
      if (data.user.onboardingCompleted && data.user.profile) {
        const scholarships = generateSampleScholarships();
        const matched = matchScholarships(scholarships, data.user);
        setMatchedScholarships(matched);
      }
    } catch (error) {
      console.error('Error loading user data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleOnboardingComplete = async (userData: Partial<User>) => {
    try {
      const res = await fetch('/api/user', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          userId: 'demo-user',
          ...userData,
        }),
      });
      const data = await res.json();
      setUser(data.user);

      // Match scholarships after onboarding
      if (data.user.profile) {
        const scholarships = generateSampleScholarships();
        const matched = matchScholarships(scholarships, data.user);
        setMatchedScholarships(matched);
      }
    } catch (error) {
      console.error('Error saving user data:', error);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <p className="text-gray-600">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !user.onboardingCompleted) {
    return <Onboarding onComplete={handleOnboardingComplete} />;
  }

  // Get upcoming deadlines (next 30 days)
  const upcomingDeadlines = matchedScholarships
    .filter(s => {
      const deadline = new Date(s.deadline);
      const today = new Date();
      const diffDays = Math.ceil((deadline.getTime() - today.getTime()) / (1000 * 60 * 60 * 24));
      return diffDays > 0 && diffDays <= 30;
    })
    .sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime())
    .slice(0, 5);

  // Get recent matches (top 3)
  const recentMatches = matchedScholarships.slice(0, 3);

  return (
    <>
      <Dashboard
        progress={progress!}
        upcomingDeadlines={upcomingDeadlines}
        recentMatches={recentMatches}
      />
      <Navigation />
    </>
  );
}
