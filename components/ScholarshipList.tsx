'use client';

import { Scholarship } from '@/types';
import { formatCurrency, getDaysUntil } from '@/lib/utils';
import { Clock, MapPin, Award, TrendingUp, BookOpen } from 'lucide-react';
import { useState } from 'react';
import { useToast } from '@/lib/toast';

interface ScholarshipListProps {
  scholarships: Scholarship[];
  onSave?: (scholarshipId: string) => void;
  onApply?: (scholarshipId: string) => void;
}

export default function ScholarshipList({ scholarships, onSave, onApply }: ScholarshipListProps) {
  const [filter, setFilter] = useState<'all' | 'local' | 'quick' | 'high-value'>('all');
  const [sortBy, setSortBy] = useState<'match' | 'amount' | 'deadline' | 'time'>('match');
  const { showToast } = useToast();

  const filtered = scholarships.filter(sch => {
    if (filter === 'local') return sch.local;
    if (filter === 'quick') return sch.applicationType === 'no-essay' || sch.applicationType === 'quick-entry';
    if (filter === 'high-value') return sch.amount >= 5000;
    return true;
  });

  const sorted = [...filtered].sort((a, b) => {
    if (sortBy === 'amount') return b.amount - a.amount;
    if (sortBy === 'deadline') {
      return new Date(a.deadline).getTime() - new Date(b.deadline).getTime();
    }
    if (sortBy === 'time') return a.estimatedTime - b.estimatedTime;
    return 0; // match score already sorted
  });

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pb-20 transition-colors">
      {/* Filters */}
      <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10 p-4 transition-colors">
        <div className="max-w-4xl mx-auto">
          <div className="flex gap-2 mb-4 overflow-x-auto">
            {(['all', 'local', 'quick', 'high-value'] as const).map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-4 py-2 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                  filter === f
                    ? 'bg-primary-600 dark:bg-primary-500 text-white'
                    : 'bg-gray-100 dark:bg-neutral-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-neutral-700'
                }`}
              >
                {f === 'all' ? 'All' : f === 'local' ? 'Local' : f === 'quick' ? 'Quick Apply' : 'High Value'}
              </button>
            ))}
          </div>
          <select
            value={sortBy}
            onChange={(e) => setSortBy(e.target.value as any)}
            className="w-full px-4 py-2 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-900 text-gray-900 dark:text-gray-100 rounded-lg text-sm transition-colors"
          >
            <option value="match">Best Match</option>
            <option value="amount">Highest Amount</option>
            <option value="deadline">Deadline Soonest</option>
            <option value="time">Quickest to Apply</option>
          </select>
        </div>
      </div>

      {/* List */}
      <div className="max-w-4xl mx-auto p-4 space-y-4">
        {sorted.length === 0 ? (
          <div className="text-center py-12 text-gray-500 dark:text-gray-400">
            No scholarships found. Try adjusting your filters.
          </div>
        ) : (
          sorted.map((scholarship) => (
            <ScholarshipCard
              key={scholarship.id}
              scholarship={scholarship}
              onSave={onSave}
              onApply={onApply}
            />
          ))
        )}
      </div>
    </div>
  );
}

function ScholarshipCard({
  scholarship,
  onSave,
  onApply,
}: {
  scholarship: Scholarship;
  onSave?: (id: string) => void;
  onApply?: (id: string) => void;
}) {
  const daysUntil = getDaysUntil(scholarship.deadline);
  const isUrgent = daysUntil <= 7;
  const roi = scholarship.amount / scholarship.estimatedTime;
  const { showToast } = useToast();

  const handleSave = () => {
    onSave?.(scholarship.id);
    showToast('success', 'Scholarship saved to your list!', 3000);
  };

  const handleApply = () => {
    onApply?.(scholarship.id);
    showToast('info', 'Opening application...', 2000);
    setTimeout(() => {
      window.location.href = `/apply/${scholarship.id}`;
    }, 500);
  };

  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800 hover:shadow-xl hover:border-primary-300 dark:hover:border-primary-600 transition-all duration-300 hover:scale-[1.01] group cursor-pointer">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2">
            <h3 className="text-lg font-semibold text-gray-900 dark:text-gray-100">{scholarship.title}</h3>
            {scholarship.local && (
              <span className="bg-primary-100 dark:bg-primary-900/30 text-primary-700 dark:text-primary-300 text-xs font-medium px-2 py-1 rounded border border-primary-200 dark:border-primary-800">
                Local
              </span>
            )}
            {scholarship.renewable && (
              <span className="bg-success-100 dark:bg-success-900/30 text-success-700 dark:text-success-300 text-xs font-medium px-2 py-1 rounded border border-success-200 dark:border-success-800">
                Renewable
              </span>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">{scholarship.provider}</p>
          <p className="text-sm text-gray-700 dark:text-gray-300 line-clamp-2">{scholarship.description}</p>
        </div>
        <div className="text-right ml-4">
          <div className="text-2xl font-bold text-success-600 dark:text-success-400 mb-1 group-hover:scale-110 transition-transform">
            {formatCurrency(scholarship.amount)}
          </div>
          <div className="text-xs text-gray-500 dark:text-gray-400">ROI: {roi.toFixed(0)}/min</div>
        </div>
      </div>

      {/* Stats */}
      <div className="flex items-center gap-4 text-sm text-gray-600 mb-4 flex-wrap">
        <div className="flex items-center gap-1">
          <Clock className="w-4 h-4" />
          <span>{scholarship.estimatedTime} min</span>
        </div>
        <div className="flex items-center gap-1">
          <Award className="w-4 h-4" />
          <span className={`capitalize ${
            scholarship.competitionLevel === 'low' ? 'text-green-600' :
            scholarship.competitionLevel === 'medium' ? 'text-yellow-600' :
            'text-red-600'
          }`}>
            {scholarship.competitionLevel} competition
          </span>
        </div>
        {scholarship.requirements.state && (
          <div className="flex items-center gap-1">
            <MapPin className="w-4 h-4" />
            <span>{scholarship.requirements.state}</span>
          </div>
        )}
        {scholarship.applicationType !== 'essay' && (
          <div className="flex items-center gap-1">
            <TrendingUp className="w-4 h-4" />
            <span className="capitalize">{scholarship.applicationType.replace('-', ' ')}</span>
          </div>
        )}
        {scholarship.essayWordCount && (
          <div className="flex items-center gap-1">
            <BookOpen className="w-4 h-4" />
            <span>{scholarship.essayWordCount} words</span>
          </div>
        )}
      </div>

      {/* Deadline */}
      <div className={`mb-4 p-3 rounded-lg transition-colors ${
        isUrgent 
          ? 'bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800' 
          : 'bg-gray-50 dark:bg-neutral-800'
      }`}>
        <div className="flex items-center justify-between">
          <div>
            <div className="text-sm font-medium text-gray-900">Deadline</div>
            <div className="text-sm text-gray-600">
              {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                month: 'long',
                day: 'numeric',
                year: 'numeric',
              })}
            </div>
          </div>
          <div className={`text-lg font-bold ${
            isUrgent ? 'text-red-600' : 'text-gray-700'
          }`}>
            {daysUntil} {daysUntil === 1 ? 'day' : 'days'} left
          </div>
        </div>
      </div>

      {/* Actions */}
      <div className="flex gap-3">
        <button
          onClick={handleSave}
          className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 hover:border-primary-300 dark:hover:border-primary-600 transition-all active:scale-95"
        >
          Save for Later
        </button>
        <button
          onClick={handleApply}
          className="flex-1 px-4 py-2 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-display font-medium hover:bg-primary-700 dark:hover:bg-primary-600 hover:shadow-lg active:scale-95 transition-all duration-200"
        >
          Start Application
        </button>
      </div>
    </div>
  );
}

