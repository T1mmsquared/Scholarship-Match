'use client';

import { useState } from 'react';
import { User } from '@/types';
import { ArrowRight, GraduationCap, MapPin, DollarSign } from 'lucide-react';
import { useToast } from '@/lib/toast';
import FormField from './FormField';

interface OnboardingProps {
  onComplete: (user: Partial<User>) => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(1);
  const [formData, setFormData] = useState<Partial<User['profile']>>({});
  const { showToast } = useToast();

  const updateField = (field: keyof User['profile'], value: any) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1);
      showToast('info', `Step ${step + 1} of 3`, 2000);
    } else {
      onComplete({ profile: formData as User['profile'], onboardingCompleted: true });
      showToast('success', 'Profile setup complete! Finding your scholarships...', 3000);
    }
  };

  const handleSkip = () => {
    onComplete({ profile: formData as User['profile'], onboardingCompleted: true });
  };

  const progress = (step / 3) * 100;

  return (
    <div className="min-h-screen bg-gradient-to-br from-primary-50 via-primary-100 to-secondary-100 dark:from-neutral-950 dark:via-neutral-900 dark:to-neutral-950 flex items-center justify-center p-4 transition-colors">
      <div className="bg-white dark:bg-neutral-900 rounded-2xl shadow-xl w-full max-w-md p-8 border border-gray-200 dark:border-neutral-800 animate-in fade-in slide-in-from-bottom-4 duration-500">
        {/* Progress Bar */}
        <div className="mb-8">
          <div className="flex justify-between text-sm text-gray-600 dark:text-gray-400 mb-2">
            <span>Step {step} of 3</span>
            <span>{Math.round(progress)}%</span>
          </div>
          <div className="w-full bg-gray-200 dark:bg-neutral-700 rounded-full h-2 overflow-hidden">
            <div 
              className="bg-primary-600 dark:bg-primary-500 h-2 rounded-full transition-all duration-500 ease-out relative"
              style={{ width: `${progress}%` }}
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary-400 to-primary-600 dark:from-primary-500 dark:to-primary-700 animate-pulse"></div>
            </div>
          </div>
        </div>

        {/* Step 1: Basic Info */}
        {step === 1 && (
          <div className="space-y-6">
            <div className="text-center animate-in fade-in slide-in-from-right-4 duration-500">
              <div className="relative mb-4">
                <GraduationCap className="w-16 h-16 mx-auto text-primary-600 dark:text-primary-400 animate-bounce" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="w-20 h-20 bg-primary-100 dark:bg-primary-900/30 rounded-full animate-ping opacity-20"></div>
                </div>
              </div>
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Welcome! Let's get started</h2>
              <p className="text-gray-600 dark:text-gray-400">We'll help you find scholarships that match your profile</p>
            </div>

            <div className="space-y-4">
              <FormField
                label="What year are you?"
                name="year"
                type="select"
                value={formData.year || ''}
                onChange={(value) => updateField('year', value)}
                optional
                options={[
                  { value: 'freshman', label: 'Freshman' },
                  { value: 'sophomore', label: 'Sophomore' },
                  { value: 'junior', label: 'Junior' },
                  { value: 'senior', label: 'Senior' },
                ]}
              />

              <FormField
                label="What's your GPA?"
                name="gpa"
                type="number"
                value={formData.gpa || ''}
                onChange={(value) => updateField('gpa', value)}
                placeholder="3.5"
                optional
                min={0}
                max={4.0}
                step={0.1}
                validation={(val) => {
                  const num = typeof val === 'number' ? val : parseFloat(val as string);
                  if (val === '' || val === null || val === undefined) return { isValid: true };
                  if (isNaN(num)) return { isValid: false, message: 'Please enter a valid number' };
                  if (num < 0) return { isValid: false, message: 'GPA must be 0.0 or higher' };
                  if (num > 4.0) return { isValid: false, message: 'GPA must be 4.0 or lower (unweighted scale)' };
                  return { isValid: true, message: '✓ GPA looks good' };
                }}
              />

              <FormField
                label="What's your major?"
                name="major"
                type="text"
                value={formData.major || ''}
                onChange={(value) => updateField('major', value)}
                placeholder="Engineering, Business, etc."
                optional
              />
            </div>
          </div>
        )}

        {/* Step 2: Location */}
        {step === 2 && (
          <div className="space-y-6">
            <div className="text-center animate-in fade-in slide-in-from-right-4 duration-500">
              <MapPin className="w-16 h-16 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Where are you located?</h2>
              <p className="text-gray-600 dark:text-gray-400">This helps us find local scholarships with better odds</p>
            </div>

            <div className="space-y-4">
              <FormField
                label="State"
                name="state"
                type="text"
                value={formData.state || ''}
                onChange={(value) => updateField('state', (value as string).toUpperCase())}
                placeholder="CA, NY, TX, etc."
                optional
                maxLength={2}
                validation={(val) => {
                  const str = val as string;
                  if (!str || str.length === 0) return { isValid: true };
                  if (str.length === 2 && /^[A-Z]{2}$/.test(str)) {
                    return { isValid: true, message: '✓ State code looks good' };
                  }
                  return { isValid: false, message: 'Please enter a 2-letter state code (e.g., CA, NY)' };
                }}
              />

              <FormField
                label="City"
                name="city"
                type="text"
                value={formData.city || ''}
                onChange={(value) => updateField('city', value)}
                placeholder="Los Angeles, New York, etc."
                optional
              />
            </div>
          </div>
        )}

        {/* Step 3: Preferences */}
        {step === 3 && (
          <div className="space-y-6">
            <div className="text-center animate-in fade-in slide-in-from-right-4 duration-500">
              <DollarSign className="w-16 h-16 mx-auto text-primary-600 dark:text-primary-400 mb-4" />
              <h2 className="text-2xl font-heading font-bold text-gray-900 dark:text-gray-100 mb-2">Almost done!</h2>
              <p className="text-gray-600 dark:text-gray-400">Tell us a bit more about your preferences</p>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Application Type Preference
                </label>
                <select
                  value={formData.essayPreference || ''}
                  onChange={(e) => updateField('essayPreference', e.target.value)}
                  className="w-full px-4 py-3 border border-gray-300 dark:border-neutral-700 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100 rounded-lg focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all hover:border-primary-300 dark:hover:border-primary-600"
                >
                  <option value="">No preference</option>
                  <option value="no-essay">No Essay (Quick Apply)</option>
                  <option value="essay">Written Essay</option>
                  <option value="video">Video Submission</option>
                  <option value="creative">Creative Submission</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="block text-sm font-medium text-gray-700">Check all that apply:</label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.financialNeed || false}
                    onChange={(e) => updateField('financialNeed', e.target.checked)}
                    className="w-4 h-4 text-primary-600 dark:text-primary-400 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">I have financial need</span>
                </label>
                <label className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={formData.firstGeneration || false}
                    onChange={(e) => updateField('firstGeneration', e.target.checked)}
                    className="w-4 h-4 text-primary-600 dark:text-primary-400 rounded focus:ring-primary-500"
                  />
                  <span className="text-sm text-gray-700 dark:text-gray-300">First-generation college student</span>
                </label>
              </div>
            </div>
          </div>
        )}

        {/* Buttons */}
        <div className="mt-8 flex gap-3">
          {step > 1 && (
            <button
              onClick={() => setStep(step - 1)}
              className="flex-1 px-4 py-3 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              Back
            </button>
          )}
          <button
            onClick={handleSkip}
            className="px-4 py-3 text-gray-600 dark:text-gray-400 font-medium hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
          >
            Skip for now
          </button>
          <button
            onClick={handleNext}
            className="flex-1 px-4 py-3 bg-primary-600 dark:bg-primary-500 text-white rounded-lg font-display font-medium hover:bg-primary-700 dark:hover:bg-primary-600 active:scale-95 transition-all duration-200 flex items-center justify-center gap-2 shadow-lg hover:shadow-xl"
          >
            {step === 3 ? 'Get Started' : 'Next'}
            {step < 3 && <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />}
          </button>
        </div>
      </div>
    </div>
  );
}

