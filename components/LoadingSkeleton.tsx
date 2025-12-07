'use client';

export function CardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800 animate-pulse">
      <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mb-4"></div>
      <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mb-2"></div>
      <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-2/3"></div>
    </div>
  );
}

export function ScholarshipCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-6 shadow-sm border border-gray-200 dark:border-neutral-800 animate-pulse">
      <div className="flex items-start justify-between mb-3">
        <div className="flex-1">
          <div className="h-6 bg-gray-200 dark:bg-neutral-700 rounded w-3/4 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mb-2"></div>
          <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-full"></div>
        </div>
        <div className="h-8 w-20 bg-gray-200 dark:bg-neutral-700 rounded ml-4"></div>
      </div>
      <div className="flex gap-4 mb-4">
        <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-16"></div>
        <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-20"></div>
      </div>
      <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded mb-2"></div>
      <div className="flex gap-3">
        <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded flex-1"></div>
        <div className="h-10 bg-gray-200 dark:bg-neutral-700 rounded flex-1"></div>
      </div>
    </div>
  );
}

export function StatCardSkeleton() {
  return (
    <div className="bg-white dark:bg-neutral-900 rounded-xl p-4 shadow-sm border border-gray-200 dark:border-neutral-800 animate-pulse">
      <div className="h-4 bg-gray-200 dark:bg-neutral-700 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-gray-200 dark:bg-neutral-700 rounded w-1/3 mb-1"></div>
      <div className="h-3 bg-gray-200 dark:bg-neutral-700 rounded w-1/4"></div>
    </div>
  );
}

