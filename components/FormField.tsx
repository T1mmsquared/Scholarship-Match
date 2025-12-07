'use client';

import { useState, useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle } from 'lucide-react';

interface FormFieldProps {
  label: string;
  name: string;
  type?: 'text' | 'number' | 'email' | 'select';
  value: string | number;
  onChange: (value: any) => void;
  placeholder?: string;
  optional?: boolean;
  validation?: (value: any) => { isValid: boolean; message?: string };
  options?: { value: string; label: string }[];
  min?: number;
  max?: number;
  step?: number;
  maxLength?: number;
}

export default function FormField({
  label,
  name,
  type = 'text',
  value,
  onChange,
  placeholder,
  optional = false,
  validation,
  options,
  min,
  max,
  step,
  maxLength,
}: FormFieldProps) {
  const [touched, setTouched] = useState(false);
  const [validationState, setValidationState] = useState<{
    isValid: boolean;
    message?: string;
  } | null>(null);

  useEffect(() => {
    if (touched && validation && value !== '' && value !== null && value !== undefined) {
      const result = validation(value);
      setValidationState(result);
    } else if (touched && !optional && (value === '' || value === null || value === undefined)) {
      setValidationState({ isValid: false, message: 'This field is required' });
    } else if (touched && (value === '' || value === null || value === undefined)) {
      setValidationState(null);
    }
  }, [value, touched, validation, optional]);

  const handleBlur = () => {
    setTouched(true);
  };

  const getInputClasses = () => {
    let base = 'w-full px-4 py-3 border rounded-lg focus:ring-2 focus:border-transparent transition-all hover:border-primary-300 dark:hover:border-primary-600 bg-white dark:bg-neutral-800 text-gray-900 dark:text-gray-100';
    
    if (validationState) {
      if (validationState.isValid) {
        base += ' border-success-500 focus:ring-success-500';
      } else {
        base += ' border-error-500 focus:ring-error-500';
      }
    } else {
      base += ' border-gray-300 dark:border-neutral-700 focus:ring-primary-500';
    }
    
    return base;
  };

  return (
    <div className="space-y-2">
      <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
        {label}
        {optional && <span className="text-gray-400 dark:text-gray-500 ml-1">(optional)</span>}
      </label>
      
      {type === 'select' && options ? (
        <select
          name={name}
          value={value as string}
          onChange={(e) => onChange(e.target.value)}
          onBlur={handleBlur}
          className={getInputClasses()}
        >
          <option value="">Select {label.toLowerCase()}</option>
          {options.map((option) => (
            <option key={option.value} value={option.value}>
              {option.label}
            </option>
          ))}
        </select>
      ) : (
        <input
          type={type}
          name={name}
          value={value as string | number}
          onChange={(e) => {
            if (type === 'number') {
              onChange(e.target.value === '' ? '' : parseFloat(e.target.value));
            } else {
              onChange(e.target.value);
            }
          }}
          onBlur={handleBlur}
          placeholder={placeholder}
          min={min}
          max={max}
          step={step}
          maxLength={maxLength}
          className={getInputClasses()}
        />
      )}

      {touched && validationState && (
        <div className={`flex items-center gap-2 text-sm animate-in fade-in slide-in-from-top-1 ${
          validationState.isValid ? 'text-success-600 dark:text-success-400' : 'text-error-600 dark:text-error-400'
        }`}>
          {validationState.isValid ? (
            <CheckCircle className="w-4 h-4" />
          ) : (
            <XCircle className="w-4 h-4" />
          )}
          <span>{validationState.message}</span>
        </div>
      )}
    </div>
  );
}

