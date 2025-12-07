'use client';

import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import EssayEditor from '@/components/EssayEditor';
import Navigation from '@/components/Navigation';
import { Scholarship } from '@/types';
import { generateSampleScholarships } from '@/lib/data';
import { formatCurrency } from '@/lib/utils';
import { ArrowLeft, Clock, Award } from 'lucide-react';
import Link from 'next/link';
import { useToast } from '@/lib/toast';

export default function ApplyPage() {
  const params = useParams();
  const scholarshipId = params.id as string;
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [essayText, setEssayText] = useState('');
  const { showToast } = useToast();

  useEffect(() => {
    loadScholarship();
  }, [scholarshipId]);

  const loadScholarship = () => {
    const scholarships = generateSampleScholarships();
    const found = scholarships.find(s => s.id === scholarshipId);
    setScholarship(found || null);
    setLoading(false);
  };

  const handleSaveEssay = (text: string) => {
    setEssayText(text);
    // In a real app, this would save to the backend
    console.log('Essay saved:', text);
  };

  const handleSubmit = () => {
    // In a real app, this would submit the application
    showToast('success', 'Application submitted successfully!', 4000);
    // In a real app, navigate to applications page
    setTimeout(() => {
      window.location.href = '/applications';
    }, 2000);
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600 dark:border-primary-400 mx-auto mb-4"></div>
          <p className="text-gray-600 dark:text-gray-400">Loading scholarship...</p>
        </div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-neutral-950">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-2">Scholarship not found</h2>
          <Link href="/scholarships" className="text-primary-600 dark:text-primary-400 hover:underline">
            Browse scholarships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 dark:bg-neutral-950 pb-20">
        {/* Header */}
        <div className="bg-white dark:bg-neutral-900 border-b border-gray-200 dark:border-neutral-800 sticky top-0 z-10 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Link href="/scholarships" className="text-gray-600 dark:text-gray-400 hover:text-gray-900 dark:hover:text-gray-100">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900 dark:text-gray-100">{scholarship.title}</h1>
              <p className="text-sm text-gray-600 dark:text-gray-400">{scholarship.provider}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-success-600 dark:text-success-400">
                {formatCurrency(scholarship.amount)}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Scholarship Info */}
          <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
            <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Scholarship Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Estimated time: </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">{scholarship.estimatedTime} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-gray-400 dark:text-gray-500" />
                <span className="text-gray-600 dark:text-gray-400">Deadline: </span>
                <span className="font-medium text-gray-900 dark:text-gray-100">
                  {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600 dark:text-gray-400">{scholarship.description}</p>
              </div>
            </div>
          </div>

          {/* Essay Editor */}
          {scholarship.applicationType === 'essay' && scholarship.essayPrompt && (
            <EssayEditor
              prompt={scholarship.essayPrompt}
              wordCount={scholarship.essayWordCount}
              initialText={essayText}
              onSave={handleSaveEssay}
            />
          )}

          {/* Non-essay applications */}
          {scholarship.applicationType !== 'essay' && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
              <h2 className="text-lg font-semibold text-gray-900 dark:text-gray-100 mb-4">Application</h2>
              <p className="text-gray-600 dark:text-gray-400 mb-4">
                This scholarship uses a {scholarship.applicationType.replace('-', ' ')} application.
                Click the button below to proceed to the external application.
              </p>
              <a
                href={scholarship.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-medium hover:bg-primary-700 dark:hover:bg-primary-600 transition-colors"
              >
                Continue to Application
              </a>
            </div>
          )}

          {/* Submit Button */}
          {scholarship.applicationType === 'essay' && (
            <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800">
              <button
                onClick={handleSubmit}
                disabled={!essayText || (scholarship.essayWordCount ? 
                  (essayText.trim().split(/\s+/).length < scholarship.essayWordCount * 0.9) : false)}
                className="w-full px-6 py-3 bg-success-600 dark:bg-success-500 text-white rounded-lg font-medium hover:bg-success-700 dark:hover:bg-success-600 transition-colors disabled:bg-gray-300 dark:disabled:bg-neutral-700 disabled:text-gray-500 dark:disabled:text-gray-400 disabled:cursor-not-allowed"
              >
                Submit Application
              </button>
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </>
  );
}

