import { NextResponse } from 'next/server';
import { matchScholarships } from '@/lib/matching';
import { generateSampleScholarships } from '@/lib/data';
import { User } from '@/types';

let cachedScholarships: any = null;

export async function POST(request: Request) {
  const body = await request.json();
  const user: User = body.user;

  if (!cachedScholarships) {
    cachedScholarships = generateSampleScholarships();
  }

  const matched = matchScholarships(cachedScholarships, user);

  return NextResponse.json({
    scholarships: matched,
    total: matched.length,
  });
}

