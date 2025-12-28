
export interface Subject {
  id: string;
  name: string;
  credits: number;
  totalMarks?: number;
  obtainedMarks?: number;
  totalTopics?: number;
  coveredTopics?: number;
}

export interface DayBalance {
  day: number;
  class: number;
  study: number;
  refresh: number;
  sleep: number;
}

export interface UserData {
  fullName: string;
  department: string;
  semester: string;
  subjects: Subject[];
  timeBalance: DayBalance[];
  mealsPerDay: number;
  junkFoodPerWeek: number;
  waterIntake: number;
}

export interface WellnessInsight {
  score: number;
  level: 'Low' | 'Medium' | 'High';
  recommendation: string;
  analysis: string;
  nextSteps: string[];
}
