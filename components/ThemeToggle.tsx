'use client';

import { useTheme } from '@/lib/theme';
import { Sun, Moon } from 'lucide-react';
import { useEffect, useState } from 'react';

export default function ThemeToggle() {
  const [mounted, setMounted] = useState(false);
  const [isDark, setIsDark] = useState(false);
  
  // Use theme hook if available
  let themeContext: ReturnType<typeof useTheme> | null = null;
  try {
    themeContext = useTheme();
  } catch (e) {
    // ThemeProvider not available, will use fallback
  }

  useEffect(() => {
    setMounted(true);
    
    // Check initial theme
    const checkTheme = () => {
      const root = document.documentElement;
      const dark = root.classList.contains('dark');
      setIsDark(dark);
    };
    
    checkTheme();
    
    // Watch for theme changes
    const observer = new MutationObserver(checkTheme);
    observer.observe(document.documentElement, {
      attributes: true,
      attributeFilter: ['class', 'data-theme'],
    });
    
    return () => observer.disconnect();
  }, []);

  // Update state when theme context changes
  useEffect(() => {
    if (themeContext) {
      setIsDark(themeContext.resolvedTheme === 'dark');
    }
  }, [themeContext?.resolvedTheme]);

  const handleToggle = () => {
    if (themeContext) {
      // Use theme context if available
      themeContext.toggleTheme();
    } else {
      // Fallback: manually toggle
      const root = document.documentElement;
      const isCurrentlyDark = root.classList.contains('dark');
      
      if (isCurrentlyDark) {
        root.classList.remove('dark');
        root.setAttribute('data-theme', 'light');
        localStorage.setItem('theme', 'light');
        setIsDark(false);
      } else {
        root.classList.add('dark');
        root.setAttribute('data-theme', 'dark');
        localStorage.setItem('theme', 'dark');
        setIsDark(true);
      }
    }
  };

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
      onClick={handleToggle}
      className="btn btn-ghost btn-circle hover:bg-gray-100 dark:hover:bg-neutral-800 transition-colors"
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      title={`Switch to ${isDark ? 'light' : 'dark'} mode`}
    >
      {isDark ? (
        <Sun className="w-5 h-5 text-warning-500" />
      ) : (
        <Moon className="w-5 h-5 text-gray-600 dark:text-gray-400" />
      )}
    </button>
  );
}

