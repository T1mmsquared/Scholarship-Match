'use client';

import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  
  // Only use theme hook after mount to avoid SSR issues
  let resolvedTheme: 'light' | 'dark' = 'light';
  let toggleTheme: () => void = () => {};
  
  try {
    const theme = useTheme();
    resolvedTheme = theme.resolvedTheme;
    toggleTheme = theme.toggleTheme;
  } catch (e) {
    // ThemeProvider not available (SSR), use default
    if (typeof window !== 'undefined') {
      resolvedTheme = document.documentElement.classList.contains('dark') ? 'dark' : 'light';
      toggleTheme = () => {
        const isDark = document.documentElement.classList.contains('dark');
        if (isDark) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('theme', 'dark');
        }
      };
    }
  }

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) {
    // Return a placeholder during SSR
    return (
      <button
        className="btn btn-ghost btn-circle"
        aria-label="Toggle theme"
        disabled
      >
        <Moon className="w-5 h-5" />
      </button>
    );
  }

  return (
    <button
      onClick={toggleTheme}
      className="btn btn-ghost btn-circle"
      aria-label={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
      title={`Switch to ${resolvedTheme === 'dark' ? 'light' : 'dark'} mode`}
    >
      {resolvedTheme === 'dark' ? (
        <Sun className="w-5 h-5" />
      ) : (
        <Moon className="w-5 h-5" />
      )}
    </button>
  );
}

