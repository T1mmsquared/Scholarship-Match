'use client';

import { useState, useEffect } from 'react';
import { FileText, Save, CheckCircle } from 'lucide-react';
import { useToast } from '@/lib/toast';

interface EssayEditorProps {
  prompt: string;
  wordCount?: number;
  initialText?: string;
  onSave?: (text: string) => void;
}

export default function EssayEditor({ prompt, wordCount, initialText = '', onSave }: EssayEditorProps) {
  const [text, setText] = useState(initialText);
  const [currentWordCount, setCurrentWordCount] = useState(0);
  const [saved, setSaved] = useState(false);
  const { showToast } = useToast();

  useEffect(() => {
    const words = text.trim().split(/\s+/).filter(word => word.length > 0);
    setCurrentWordCount(words.length);
  }, [text]);

  const handleSave = () => {
    onSave?.(text);
    setSaved(true);
    showToast('success', 'Essay saved successfully!', 2000);
    setTimeout(() => setSaved(false), 2000);
  };

  const wordCountStatus = wordCount
    ? currentWordCount >= wordCount * 0.9 && currentWordCount <= wordCount * 1.1
      ? 'text-green-600'
      : currentWordCount < wordCount * 0.9
      ? 'text-yellow-600'
      : 'text-red-600'
    : 'text-gray-600';

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="mb-6">
        <div className="flex items-center gap-2 mb-2">
          <FileText className="w-5 h-5 text-blue-600" />
          <h3 className="text-lg font-semibold text-gray-900">Essay Prompt</h3>
        </div>
        <p className="text-gray-700 bg-gray-50 p-4 rounded-lg">{prompt}</p>
        {wordCount && (
          <div className="mt-2 text-sm text-gray-600">
            Target: {wordCount} words
          </div>
        )}
      </div>

      <div className="mb-4">
        <textarea
          value={text}
          onChange={(e) => setText(e.target.value)}
          placeholder="Start writing your essay here..."
          className="w-full h-96 p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent resize-none"
        />
      </div>

      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <div>
            <span className="text-sm text-gray-600">Word count: </span>
            <span className={`font-semibold ${wordCountStatus}`}>
              {currentWordCount}
            </span>
            {wordCount && (
              <span className="text-gray-500"> / {wordCount}</span>
            )}
          </div>
          {wordCount && (
            <div className={`text-sm ${
              currentWordCount >= wordCount * 0.9 && currentWordCount <= wordCount * 1.1
                ? 'text-green-600'
                : 'text-yellow-600'
            }`}>
              {currentWordCount < wordCount * 0.9
                ? `${Math.ceil(wordCount * 0.9 - currentWordCount)} more words needed`
                : currentWordCount > wordCount * 1.1
                ? `${currentWordCount - Math.floor(wordCount * 1.1)} words over limit`
                : '✓ Word count good'}
            </div>
          )}
        </div>

        <button
          onClick={handleSave}
          className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-colors ${
            saved
              ? 'bg-green-600 text-white'
              : 'bg-blue-600 text-white hover:bg-blue-700'
          }`}
        >
          {saved ? (
            <>
              <CheckCircle className="w-4 h-4" />
              Saved
            </>
          ) : (
            <>
              <Save className="w-4 h-4" />
              Save
            </>
          )}
        </button>
      </div>
    </div>
  );
}

