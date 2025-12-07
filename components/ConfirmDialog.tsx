'use client';

import { X, AlertTriangle } from 'lucide-react';

interface ConfirmDialogProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  variant?: 'danger' | 'warning' | 'info';
}

export default function ConfirmDialog({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  variant = 'warning',
}: ConfirmDialogProps) {
  if (!isOpen) return null;

  const variantStyles = {
    danger: 'bg-error-500 hover:bg-error-600',
    warning: 'bg-warning-500 hover:bg-warning-600',
    info: 'bg-info-500 hover:bg-info-600',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 animate-in fade-in">
      <div className="bg-white dark:bg-neutral-900 rounded-xl shadow-xl max-w-md w-full border border-gray-200 dark:border-neutral-800 animate-in zoom-in-95 duration-200">
        <div className="p-6">
          <div className="flex items-start gap-4 mb-4">
            <div className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
              variant === 'danger' ? 'bg-error-100 dark:bg-error-900/30' :
              variant === 'warning' ? 'bg-warning-100 dark:bg-warning-900/30' :
              'bg-info-100 dark:bg-info-900/30'
            }`}>
              <AlertTriangle className={`w-5 h-5 ${
                variant === 'danger' ? 'text-error-600 dark:text-error-400' :
                variant === 'warning' ? 'text-warning-600 dark:text-warning-400' :
                'text-info-600 dark:text-info-400'
              }`} />
            </div>
            <div className="flex-1">
              <h3 className="text-lg font-heading font-semibold text-gray-900 dark:text-gray-100 mb-1">
                {title}
              </h3>
              <p className="text-sm text-gray-600 dark:text-gray-400">
                {message}
              </p>
            </div>
            <button
              onClick={onClose}
              className="flex-shrink-0 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
              aria-label="Close"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
          
          <div className="flex gap-3 mt-6">
            <button
              onClick={onClose}
              className="flex-1 px-4 py-2 border border-gray-300 dark:border-neutral-700 rounded-lg text-gray-700 dark:text-gray-300 font-medium hover:bg-gray-50 dark:hover:bg-neutral-800 transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-4 py-2 ${variantStyles[variant]} text-white rounded-lg font-display font-medium transition-all active:scale-95`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

