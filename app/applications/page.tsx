'use client';

import { useState } from 'react';
import Navigation from '@/components/Navigation';
import { FileText, Clock, CheckCircle, XCircle } from 'lucide-react';

export default function ApplicationsPage() {
  // In a real app, this would fetch from the backend
  const [applications] = useState<any[]>([]);

  return (
    <>
      <div className="min-h-screen bg-gray-50 pb-20">
        <div className="bg-white border-b p-4">
          <h1 className="text-2xl font-bold text-gray-900">My Applications</h1>
        </div>

        <div className="max-w-4xl mx-auto p-4">
          {applications.length === 0 ? (
            <div className="bg-white rounded-xl p-12 text-center shadow-sm">
              <FileText className="w-16 h-16 mx-auto text-gray-400 mb-4" />
              <h2 className="text-xl font-semibold text-gray-900 mb-2">No applications yet</h2>
              <p className="text-gray-600 mb-6">
                Start browsing scholarships and apply to ones that match your profile!
              </p>
              <a
                href="/scholarships"
                className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg font-medium hover:bg-blue-700 transition-colors"
              >
                Browse Scholarships
              </a>
            </div>
          ) : (
            <div className="space-y-4">
              {applications.map((app) => (
                <div key={app.id} className="bg-white rounded-xl p-6 shadow-sm">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <h3 className="text-lg font-semibold text-gray-900">{app.scholarshipTitle}</h3>
                      <p className="text-sm text-gray-600">{app.provider}</p>
                    </div>
                    <div className="flex items-center gap-2">
                      {app.status === 'submitted' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {app.status === 'in-progress' && <Clock className="w-5 h-5 text-yellow-600" />}
                      {app.status === 'won' && <CheckCircle className="w-5 h-5 text-green-600" />}
                      {app.status === 'lost' && <XCircle className="w-5 h-5 text-red-600" />}
                      <span className={`text-sm font-medium capitalize ${
                        app.status === 'submitted' || app.status === 'won' ? 'text-green-600' :
                        app.status === 'in-progress' ? 'text-yellow-600' :
                        'text-red-600'
                      }`}>
                        {app.status.replace('-', ' ')}
                      </span>
                    </div>
                  </div>
                  <div className="text-sm text-gray-600">
                    Started: {new Date(app.createdAt).toLocaleDateString()}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
      <Navigation />
    </>
  );
}

