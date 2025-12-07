'use client';

import { useEffect, useState } from 'react';
import Navigation from '@/components/Navigation';
import { User, UserProgress } from '@/types';
import { Settings, Award, TrendingUp } from 'lucide-react';

export default function ProfilePage() {
  const [user, setUser] = useState<User | null>(null);
  const [progress, setProgress] = useState<UserProgress | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const res = await fetch('/api/user?userId=demo-user');
      const data = await res.json();
      setUser(data.user);
      setProgress(data.progress);
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading profile...</p>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white border-b p-4">
          <h1 className="text-2xl font-bold text-gray-900">Profile</h1>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Profile Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-semibold text-gray-900">Profile Information</h2>
              <Settings className="w-5 h-5 text-gray-400" />
            </div>
            <div className="space-y-3">
              <div>
                <label className="text-sm font-medium text-gray-700">Name</label>
                <div className="text-gray-900">{user?.name || 'Not set'}</div>
              </div>
              <div>
                <label className="text-sm font-medium text-gray-700">Email</label>
                <div className="text-gray-900">{user?.email || 'Not set'}</div>
              </div>
              {user?.profile.major && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Major</label>
                  <div className="text-gray-900">{user.profile.major}</div>
                </div>
              )}
              {user?.profile.year && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Year</label>
                  <div className="text-gray-900 capitalize">{user.profile.year}</div>
                </div>
              )}
              {user?.profile.gpa && (
                <div>
                  <label className="text-sm font-medium text-gray-700">GPA</label>
                  <div className="text-gray-900">{user.profile.gpa.toFixed(2)}</div>
                </div>
              )}
              {user?.profile.state && (
                <div>
                  <label className="text-sm font-medium text-gray-700">Location</label>
                  <div className="text-gray-900">
                    {user.profile.city && `${user.profile.city}, `}
                    {user.profile.state}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Stats Summary */}
          {progress && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <TrendingUp className="w-5 h-5 text-blue-600" />
                Your Statistics
              </h2>
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <div className="text-sm text-gray-600">Level</div>
                  <div className="text-2xl font-bold text-gray-900">{progress.level}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Points</div>
                  <div className="text-2xl font-bold text-gray-900">{progress.points}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Applications</div>
                  <div className="text-2xl font-bold text-gray-900">{progress.applicationsSubmitted}</div>
                </div>
                <div>
                  <div className="text-sm text-gray-600">Success Rate</div>
                  <div className="text-2xl font-bold text-gray-900">
                    {progress.successRate > 0 ? `${progress.successRate}%` : '—'}
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* Badges */}
          {progress && progress.badges.length > 0 && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4 flex items-center gap-2">
                <Award className="w-5 h-5 text-yellow-600" />
                Earned Badges
              </h2>
              <div className="grid grid-cols-4 gap-4">
                {progress.badges.map((badge) => (
                  <div key={badge.id} className="text-center">
                    <div className="text-4xl mb-2">{badge.icon}</div>
                    <div className="text-sm font-medium text-gray-700">{badge.name}</div>
                    <div className="text-xs text-gray-500">
                      {new Date(badge.earnedAt).toLocaleDateString()}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </>
  );
}

