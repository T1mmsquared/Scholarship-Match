import { NextResponse } from 'next/server';
import { generateSampleScholarships } from '@/lib/data';

// In a real app, this would fetch from a database
// For now, we'll generate and cache the scholarships
let cachedScholarships: any = null;

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId');

  if (!cachedScholarships) {
    cachedScholarships = generateSampleScholarships();
  }

  // In a real app, we'd match based on user profile
  // For now, just return all scholarships
  return NextResponse.json({
    scholarships: cachedScholarships,
    total: cachedScholarships.length,
  });
}

