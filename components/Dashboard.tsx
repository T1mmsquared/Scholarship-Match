'use client';

import { UserProgress, Scholarship } from '@/types';
import { Trophy, TrendingUp, Calendar, Target, Flame, Award } from 'lucide-react';
import { formatCurrency } from '@/lib/utils';

interface DashboardProps {
  progress: UserProgress;
  upcomingDeadlines: Scholarship[];
  recentMatches: Scholarship[];
}

export default function Dashboard({ progress, upcomingDeadlines, recentMatches }: DashboardProps) {
  const badges = [
    { id: 'first', name: 'First Application', icon: '🎯', earned: progress.applicationsSubmitted > 0 },
    { id: 'ten', name: '10 Applications', icon: '🔥', earned: progress.applicationsSubmitted >= 10 },
    { id: 'fifty', name: '$50K Applied', icon: '💰', earned: progress.totalDollarsApplied >= 50000 },
    { id: 'local', name: 'Local Hunter', icon: '🏠', earned: false },
    { id: 'streak', name: '7 Day Streak', icon: '⚡', earned: progress.currentStreak >= 7 },
  ];

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pb-20 transition-colors">
      {/* Header */}
      <div className="bg-gradient-to-r from-primary-600 to-primary-700 dark:from-primary-700 dark:to-primary-800 text-white p-6 transition-colors">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-2xl font-bold mb-2">Your Scholarship Journey</h1>
          <p className="text-primary-100 dark:text-primary-200">Level {progress.level} • {progress.points} points</p>
        </div>
      </div>

      <div className="max-w-4xl mx-auto p-4 space-y-6">
        {/* Stats Grid */}
        <div className="grid grid-cols-2 gap-4">
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-800 transition-all hover:shadow-md hover:scale-[1.02] cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Applications</span>
              <Target className="w-5 h-5 text-primary-600 dark:text-primary-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">{progress.applicationsSubmitted}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {progress.applicationsInProgress} in progress
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-800 transition-all hover:shadow-md hover:scale-[1.02] cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Total Applied</span>
              <TrendingUp className="w-5 h-5 text-success-600 dark:text-success-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
              {formatCurrency(progress.totalDollarsApplied)}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              {formatCurrency(progress.totalDollarsWon)} won
            </div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-800 transition-all hover:shadow-md hover:scale-[1.02] cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Success Rate</span>
              <Trophy className="w-5 h-5 text-warning-600 dark:text-warning-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">
              {progress.successRate > 0 ? `${progress.successRate}%` : '—'}
            </div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">Win rate</div>
          </div>

          <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-800 transition-all hover:shadow-md hover:scale-[1.02] cursor-default group">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-gray-600 dark:text-gray-400">Current Streak</span>
              <Flame className="w-5 h-5 text-warning-600 dark:text-warning-400 group-hover:scale-110 transition-transform" />
            </div>
            <div className="text-2xl font-bold text-gray-900 dark:text-gray-100 transition-colors">{progress.currentStreak}</div>
            <div className="text-xs text-gray-500 dark:text-gray-400 mt-1">
              Best: {progress.longestStreak} days
            </div>
          </div>
        </div>

        {/* Badges Section */}
        <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800 transition-colors">
          <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
            <Award className="w-5 h-5 text-blue-600" />
            Your Badges
          </h2>
          <div className="grid grid-cols-5 gap-3">
            {badges.map((badge) => (
              <div
                key={badge.id}
                className={`text-center p-3 rounded-lg border-2 transition-all ${
                  badge.earned
                    ? 'border-primary-500 dark:border-primary-400 bg-primary-50 dark:bg-primary-900/20 hover:scale-110 hover:shadow-lg cursor-pointer'
                    : 'border-gray-200 dark:border-neutral-700 bg-gray-50 dark:bg-neutral-800 opacity-50'
                }`}
              >
                <div className="text-3xl mb-1">{badge.icon}</div>
                <div className="text-xs font-medium text-gray-700 dark:text-gray-300">{badge.name}</div>
                {badge.earned && (
                  <div className="text-xs text-primary-600 dark:text-primary-400 mt-1 font-semibold">✓ Earned</div>
                )}
              </div>
            ))}
          </div>
        </div>

        {/* Upcoming Deadlines */}
        {upcomingDeadlines.length > 0 && (
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4 flex items-center gap-2">
              <Calendar className="w-5 h-5 text-red-600" />
              Upcoming Deadlines
            </h2>
            <div className="space-y-3">
              {upcomingDeadlines.slice(0, 5).map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="flex items-center justify-between p-3 bg-gray-50 dark:bg-neutral-800 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-all hover:scale-[1.02] cursor-pointer group"
                >
                  <div className="flex-1">
                    <div className="font-medium text-gray-900 dark:text-gray-100 group-hover:text-primary-600 dark:group-hover:text-primary-400 transition-colors">{scholarship.title}</div>
                    <div className="text-sm text-gray-600 dark:text-gray-400">
                      {formatCurrency(scholarship.amount)} • Due {new Date(scholarship.deadline).toLocaleDateString()}
                    </div>
                  </div>
                  <div className="text-xs text-error-600 dark:text-error-400 font-medium">
                    {getDaysUntilDeadline(scholarship.deadline)} days
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Recent Matches */}
        {recentMatches.length > 0 && (
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800 transition-colors">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">New Matches for You</h2>
            <div className="space-y-3">
              {recentMatches.slice(0, 3).map((scholarship) => (
                <div
                  key={scholarship.id}
                  className="p-4 border border-gray-200 dark:border-neutral-800 rounded-lg hover:border-primary-300 dark:hover:border-primary-600 transition-all hover:shadow-md hover:scale-[1.01] cursor-pointer group"
                >
                  <div className="flex items-start justify-between mb-2">
                    <div className="flex-1">
                      <h3 className="font-semibold text-gray-900">{scholarship.title}</h3>
                      <p className="text-sm text-gray-600">{scholarship.provider}</p>
                    </div>
                    <div className="text-right">
                    <div className="text-lg font-bold text-success-600 dark:text-success-400 group-hover:scale-110 transition-transform">
                      {formatCurrency(scholarship.amount)}
                    </div>
                      {scholarship.local && (
                        <span className="text-xs bg-blue-100 text-blue-700 px-2 py-1 rounded">
                          Local
                        </span>
                      )}
                    </div>
                  </div>
                  <div className="flex items-center gap-4 text-sm text-gray-500">
                    <span>{scholarship.estimatedTime} min</span>
                    <span>•</span>
                    <span className={`capitalize ${
                      scholarship.competitionLevel === 'low' ? 'text-green-600' :
                      scholarship.competitionLevel === 'medium' ? 'text-yellow-600' :
                      'text-red-600'
                    }`}>
                      {scholarship.competitionLevel} competition
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

function getDaysUntilDeadline(deadline: string): number {
  const today = new Date();
  const deadlineDate = new Date(deadline);
  const diffTime = deadlineDate.getTime() - today.getTime();
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  return diffDays > 0 ? diffDays : 0;
}

