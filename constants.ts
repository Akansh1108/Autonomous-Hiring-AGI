
import { Type } from '@google/genai';
import { AssessmentStageType } from './types';

export const SYSTEM_PROMPTS: Record<AssessmentStageType, string> = {
  [AssessmentStageType.TECHNICAL]: `You are a hiring-grade technical evaluator. Given a candidate's resume, GitHub activity summary, and outputs from sandbox tests, return a JSON object with the specified schema. Return only valid JSON.`,
  [AssessmentStageType.BEHAVIORAL]: `You are a behavioral assessor. Given interview transcripts, cover letter snippets, and company culture descriptors, output a JSON object with the specified schema. Return only valid JSON.`,
  [AssessmentStageType.SYNTHESIS]: `You are a predictive hiring analyst. Consume candidate technical & culture JSON, a job_spec, and a historical_hires_summary. Produce a JSON object with the specified schema. Return only valid JSON.`,
};

export const PLACEHOLDER_DATA: Record<AssessmentStageType, string> = {
  [AssessmentStageType.TECHNICAL]: `{
  "candidate_artifacts": {
    "resume_summary": "Senior Backend Engineer with 8+ years in Python/Go. Led scaling of microservices at Acme Corp. Proficient in Kubernetes, AWS, and PostgreSQL.",
    "github_summary": "Active contributor to open-source project 'speedy-db'. High commit frequency. Repos show strong testing practices. Languages: Go, Python.",
    "sandbox_test_outputs": {
      "test_name": "API Rate Limiter",
      "result": "Passed all test cases.",
      "time_to_complete_seconds": 1800,
      "code_quality_notes": "Clean, well-documented code. Efficient algorithm used."
    }
  },
  "job_id": "job_123",
  "candidate_id": "cand_456"
}`,
  [AssessmentStageType.BEHAVIORAL]: `{
  "interview_transcript_snippets": [
    "Q: Tell me about a time you had a conflict with a coworker. A: We had different ideas on an API design. I scheduled a meeting, created a doc comparing pros and cons of each approach, and we came to a consensus that blended both our ideas. The key was to focus on the technical merits, not our egos.",
    "Q: How do you stay up-to-date? A: I dedicate a few hours each week to reading tech blogs, and I'm currently taking a course on distributed systems. I enjoy learning and applying new concepts."
  ],
  "company_culture": "We value collaboration, ownership, and continuous learning.",
  "job_id": "job_123",
  "candidate_id": "cand_456"
}`,
  [AssessmentStageType.SYNTHESIS]: `{
  "technical_assessment": {
    "scores": { "backend": 92, "system_design": 85, "overall": 88 },
    "weaknesses": ["Limited frontend experience."]
  },
  "behavioral_assessment": {
    "culture_scores": { "teamwork": 90, "communication": 88, "learning_agility": 95 },
    "red_flags": []
  },
  "job_spec": { "title": "Senior Backend Engineer", "level": "L5", "must_have_skills": ["Go", "Kubernetes", "AWS"] },
  "historical_hires_summary": "Engineers with similar profiles had a 90% success rate and ramped up within 30 days.",
  "job_id": "job_123",
  "candidate_id": "cand_456"
}`
};


const technicalSchema = {
  type: Type.OBJECT,
  properties: {
    candidate_id: { type: Type.STRING },
    job_id: { type: Type.STRING },
    scores: {
      type: Type.OBJECT,
      properties: {
        algorithms: { type: Type.NUMBER },
        system_design: { type: Type.NUMBER },
        frontend: { type: Type.NUMBER },
        backend: { type: Type.NUMBER },
        devops: { type: Type.NUMBER },
        overall: { type: Type.NUMBER },
      },
      required: ['algorithms', 'system_design', 'frontend', 'backend', 'devops', 'overall'],
    },
    evidence: {
      type: Type.ARRAY,
      items: {
        type: Type.OBJECT,
        properties: {
          type: { type: Type.STRING },
          snippet: { type: Type.STRING },
          source_ref: { type: Type.STRING },
        },
        required: ['type', 'snippet', 'source_ref'],
      },
    },
    weaknesses: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommended_test: {
      type: Type.OBJECT,
      properties: {
        type: { type: Type.STRING },
        difficulty: { type: Type.STRING },
        runtime_seconds: { type: Type.NUMBER },
      },
      required: ['type', 'difficulty', 'runtime_seconds'],
      nullable: true,
    },
    confidence: { type: Type.NUMBER },
  },
  required: ['candidate_id', 'job_id', 'scores', 'evidence', 'weaknesses', 'confidence'],
};

const behavioralSchema = {
  type: Type.OBJECT,
  properties: {
    candidate_id: { type: Type.STRING },
    job_id: { type: Type.STRING },
    culture_scores: {
      type: Type.OBJECT,
      properties: {
        teamwork: { type: Type.NUMBER },
        autonomy: { type: Type.NUMBER },
        communication: { type: Type.NUMBER },
        learning_agility: { type: Type.NUMBER },
      },
      required: ['teamwork', 'autonomy', 'communication', 'learning_agility'],
    },
    red_flags: { type: Type.ARRAY, items: { type: Type.STRING } },
    recommended_onboarding_focus: { type: Type.ARRAY, items: { type: Type.STRING } },
    confidence: { type: Type.NUMBER },
  },
  required: ['candidate_id', 'job_id', 'culture_scores', 'red_flags', 'recommended_onboarding_focus', 'confidence'],
};

const synthesisSchema = {
  type: Type.OBJECT,
  properties: {
    candidate_id: { type: Type.STRING },
    job_id: { type: Type.STRING },
    predicted_90d_roi: { type: Type.NUMBER },
    risk_score: { type: Type.NUMBER },
    top_three_reasons: { type: Type.ARRAY, items: { type: Type.STRING } },
    hire_recommendation: { type: Type.STRING, enum: ['hire_now', 'hire_conditionally', 'no_hire'] },
    recommended_comp_range: {
      type: Type.OBJECT,
      properties: {
        min: { type: Type.NUMBER },
        max: { type: Type.NUMBER },
        currency: { type: Type.STRING },
      },
      required: ['min', 'max', 'currency'],
    },
    onboarding_plan: {
      type: Type.OBJECT,
      properties: {
        day_1: { type: Type.ARRAY, items: { type: Type.STRING } },
        day_30: { type: Type.ARRAY, items: { type: Type.STRING } },
        day_90: { type: Type.ARRAY, items: { type: Type.STRING } },
      },
      required: ['day_1', 'day_30', 'day_90'],
    },
    confidence: { type: Type.NUMBER },
  },
  required: ['candidate_id', 'job_id', 'predicted_90d_roi', 'risk_score', 'top_three_reasons', 'hire_recommendation', 'recommended_comp_range', 'onboarding_plan', 'confidence'],
};


export const RESPONSE_SCHEMAS: Record<AssessmentStageType, any> = {
  [AssessmentStageType.TECHNICAL]: technicalSchema,
  [AssessmentStageType.BEHAVIORAL]: behavioralSchema,
  [AssessmentStageType.SYNTHESIS]: synthesisSchema,
};
