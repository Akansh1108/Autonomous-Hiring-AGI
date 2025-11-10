
export enum AssessmentStageType {
  TECHNICAL = 'Technical Scoring',
  BEHAVIORAL = 'Behavioral Scoring',
  SYNTHESIS = 'ROI & Risk Prediction',
}

export interface Scores {
  algorithms: number;
  system_design: number;
  frontend: number;
  backend: number;
  devops: number;
  overall: number;
}

export interface Evidence {
  type: string;
  snippet: string;
  source_ref: string;
}

export interface RecommendedTest {
  type: string;
  difficulty: string;
  runtime_seconds: number;
}

export interface TechnicalAssessment {
  candidate_id: string;
  job_id: string;
  scores: Scores;
  evidence: Evidence[];
  weaknesses: string[];
  recommended_test?: RecommendedTest;
  confidence: number;
}

export interface CultureScores {
  teamwork: number;
  autonomy: number;
  communication: number;
  learning_agility: number;
}

export interface BehavioralAssessment {
  candidate_id: string;
  job_id: string;
  culture_scores: CultureScores;
  red_flags: string[];
  recommended_onboarding_focus: string[];
  confidence: number;
}

export interface RecommendedCompRange {
  min: number;
  max: number;
  currency: string;
}

export interface OnboardingPlan {
  day_1: string[];
  day_30: string[];
  day_90: string[];
}

export interface SynthesisAssessment {
  candidate_id: string;
  job_id: string;
  predicted_90d_roi: number;
  risk_score: number;
  top_three_reasons: string[];
  hire_recommendation: 'hire_now' | 'hire_conditionally' | 'no_hire';
  recommended_comp_range: RecommendedCompRange;
  onboarding_plan: OnboardingPlan;
  confidence: number;
}
