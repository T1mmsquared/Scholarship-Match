// Scholarship matching algorithm
import { Scholarship, User } from '@/types';

export function matchScholarships(scholarships: Scholarship[], user: User): Scholarship[] {
  const scored = scholarships.map(scholarship => ({
    scholarship,
    score: calculateMatchScore(scholarship, user),
  }));

  // Sort by score (highest first) and return scholarships
  return scored
    .sort((a, b) => b.score - a.score)
    .filter(item => item.score > 0)
    .map(item => item.scholarship);
}

function calculateMatchScore(scholarship: Scholarship, user: User): number {
  let score = 0;
  const req = scholarship.requirements;
  const profile = user.profile;

  // Basic eligibility checks (if user doesn't meet requirement, score = 0)
  if (req.gpa && (!profile.gpa || profile.gpa < req.gpa)) {
    return 0;
  }

  if (req.state && profile.state !== req.state) {
    return 0;
  }

  if (req.city && profile.city !== req.city) {
    return 0;
  }

  if (req.county && profile.county !== req.county) {
    return 0;
  }

  if (req.major && (!profile.major || !req.major.includes(profile.major))) {
    return 0;
  }

  if (req.year && (!profile.year || !req.year.includes(profile.year))) {
    return 0;
  }

  if (req.financialNeed && !profile.financialNeed) {
    return 0;
  }

  if (req.firstGeneration && !profile.firstGeneration) {
    return 0;
  }

  if (req.gender && profile.gender !== req.gender) {
    return 0;
  }

  if (req.lgbtq && !profile.lgbtq) {
    return 0;
  }

  if (req.disability && !profile.disability) {
    return 0;
  }

  if (req.military && !profile.military) {
    return 0;
  }

  // Scoring based on matches (higher score = better match)
  
  // Local scholarships get bonus (higher win rate)
  if (scholarship.local) {
    score += 50;
  }

  // State match
  if (req.state && profile.state === req.state) {
    score += 30;
  }

  // City match
  if (req.city && profile.city === req.city) {
    score += 40;
  }

  // County match
  if (req.county && profile.county === req.county) {
    score += 35;
  }

  // Major match
  if (req.major && profile.major && req.major.includes(profile.major)) {
    score += 25;
  }

  // Year match
  if (req.year && profile.year && req.year.includes(profile.year)) {
    score += 15;
  }

  // Financial need match
  if (req.financialNeed && profile.financialNeed) {
    score += 20;
  }

  // First generation match
  if (req.firstGeneration && profile.firstGeneration) {
    score += 20;
  }

  // Identity matches
  if (req.gender && profile.gender === req.gender) {
    score += 15;
  }

  if (req.lgbtq && profile.lgbtq) {
    score += 15;
  }

  if (req.disability && profile.disability) {
    score += 15;
  }

  if (req.military && profile.military) {
    score += 15;
  }

  // Application type preference
  if (profile.essayPreference && scholarship.applicationType === profile.essayPreference) {
    score += 10;
  }

  // Quick-entry bonus (easier to apply)
  if (scholarship.applicationType === 'no-essay' || scholarship.applicationType === 'quick-entry') {
    score += 15;
  }

  // Renewable bonus
  if (scholarship.renewable) {
    score += 10;
  }

  // Amount consideration (higher amounts get slight boost)
  score += Math.min(scholarship.amount / 1000, 20);

  // Competition level (lower competition = higher score)
  if (scholarship.competitionLevel === 'low') {
    score += 20;
  } else if (scholarship.competitionLevel === 'medium') {
    score += 10;
  }

  return score;
}

export function calculateROI(scholarship: Scholarship): number {
  // ROI = potential award / time investment (in minutes)
  // Higher ROI = better value
  return scholarship.amount / scholarship.estimatedTime;
}

