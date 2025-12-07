import { NextResponse } from 'next/server';
import { User, UserProgress } from '@/types';
import { createDefaultProgress } from '@/lib/data';

// In-memory storage for demo (use a database in production)
let users: Map<string, User> = new Map();
let userProgress: Map<string, UserProgress> = new Map();

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const userId = searchParams.get('userId') || 'demo-user';

  let user = users.get(userId);
  if (!user) {
    user = {
      id: userId,
      email: 'demo@example.com',
      name: 'Demo User',
      profile: {},
      onboardingCompleted: false,
      createdAt: new Date().toISOString(),
    };
    users.set(userId, user);
    userProgress.set(userId, createDefaultProgress(userId));
  }

  const progress = userProgress.get(userId) || createDefaultProgress(userId);

  return NextResponse.json({ user, progress });
}

export async function POST(request: Request) {
  const body = await request.json();
  const userId = body.userId || 'demo-user';

  let user = users.get(userId) || {
    id: userId,
    email: body.email || 'demo@example.com',
    name: body.name || 'Demo User',
    profile: {},
    onboardingCompleted: false,
    createdAt: new Date().toISOString(),
  };

  // Update user profile
  if (body.profile) {
    user.profile = { ...user.profile, ...body.profile };
  }
  if (body.onboardingCompleted !== undefined) {
    user.onboardingCompleted = body.onboardingCompleted;
  }

  users.set(userId, user);

  // Initialize progress if needed
  if (!userProgress.has(userId)) {
    userProgress.set(userId, createDefaultProgress(userId));
  }

  return NextResponse.json({ user, success: true });
}

