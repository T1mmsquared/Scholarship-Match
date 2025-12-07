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

export default function ApplyPage() {
  const params = useParams();
  const scholarshipId = params.id as string;
  const [scholarship, setScholarship] = useState<Scholarship | null>(null);
  const [loading, setLoading] = useState(true);
  const [essayText, setEssayText] = useState('');

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
    alert('Application submitted! (This is a demo)');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (!scholarship) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl font-semibold text-gray-900 mb-2">Scholarship not found</h2>
          <Link href="/scholarships" className="text-blue-600 hover:underline">
            Browse scholarships
          </Link>
        </div>
      </div>
    );
  }

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-20">
        {/* Header */}
        <div className="bg-white border-b sticky top-0 z-10 p-4">
          <div className="max-w-4xl mx-auto flex items-center gap-4">
            <Link href="/scholarships" className="text-gray-600 hover:text-gray-900">
              <ArrowLeft className="w-6 h-6" />
            </Link>
            <div className="flex-1">
              <h1 className="text-xl font-bold text-gray-900">{scholarship.title}</h1>
              <p className="text-sm text-gray-600">{scholarship.provider}</p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-green-600">
                {formatCurrency(scholarship.amount)}
              </div>
            </div>
          </div>
        </div>

        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {/* Scholarship Info */}
          <div className="bg-white rounded-xl p-6 shadow-sm">
            <h2 className="text-lg font-semibold text-gray-900 mb-4">Scholarship Details</h2>
            <div className="space-y-3">
              <div className="flex items-center gap-2 text-sm">
                <Clock className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Estimated time: </span>
                <span className="font-medium text-gray-900">{scholarship.estimatedTime} minutes</span>
              </div>
              <div className="flex items-center gap-2 text-sm">
                <Award className="w-4 h-4 text-gray-400" />
                <span className="text-gray-600">Deadline: </span>
                <span className="font-medium text-gray-900">
                  {new Date(scholarship.deadline).toLocaleDateString('en-US', {
                    month: 'long',
                    day: 'numeric',
                    year: 'numeric',
                  })}
                </span>
              </div>
              <div>
                <p className="text-sm text-gray-600">{scholarship.description}</p>
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
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">Application</h2>
              <p className="text-gray-600 mb-4">
                This scholarship uses a {scholarship.applicationType.replace('-', ' ')} application.
                Click the button below to proceed to the external application.
              </p>
              <a
                href={scholarship.url}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Continue to Application
              </a>
            </div>
          )}

          {/* Submit Button */}
          {scholarship.applicationType === 'essay' && (
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <button
                onClick={handleSubmit}
                disabled={!essayText || (scholarship.essayWordCount ? 
                  (essayText.trim().split(/\s+/).length < scholarship.essayWordCount * 0.9) : false)}
                className="w-full px-6 py-3 bg-green-600 text-white rounded-lg font-medium hover:bg-green-700 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
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

