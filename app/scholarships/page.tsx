'use client';

import { useEffect, useState } from 'react';
import ScholarshipList from '@/components/ScholarshipList';
import Navigation from '@/components/Navigation';
import { Scholarship, User } from '@/types';
import { matchScholarships } from '@/lib/matching';
import { generateSampleScholarships } from '@/lib/data';

export default function ScholarshipsPage() {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      // Load user
      const userRes = await fetch('/api/user?userId=demo-user');
      const userData = await userRes.json();
      setUser(userData.user);

      // Load and match scholarships
      const allScholarships = generateSampleScholarships();
      if (userData.user.profile && Object.keys(userData.user.profile).length > 0) {
        const matched = matchScholarships(allScholarships, userData.user);
        setScholarships(matched);
      } else {
        setScholarships(allScholarships);
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSave = (scholarshipId: string) => {
    // In a real app, this would save to the backend
    console.log('Saving scholarship:', scholarshipId);
    // You could show a toast notification here
  };

  const handleApply = (scholarshipId: string) => {
    // In a real app, this would navigate to application page
    console.log('Starting application for:', scholarshipId);
    // Navigate to application page
    window.location.href = `/apply/${scholarshipId}`;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading scholarships...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <ScholarshipList
        scholarships={scholarships}
        onSave={handleSave}
        onApply={handleApply}
      />
      <Navigation />
    </>
  );
}

