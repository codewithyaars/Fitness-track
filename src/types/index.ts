export interface TimeTableEntry {
  time: string;
  activity: string;
  isHighlighted: boolean;
}

export interface Exercise {
  name: string;
  videoId: string;
  sets: number;
  reps: string;
}

export interface WorkoutDay {
  day: string;
  focus: string;
  exercises: Exercise[];
}

export interface MealPlan {
  time: string;
  title: string;
  items: string[];
}

export interface Rule {
  rule: string;
}

export interface Result {
  description: string;
}

export interface CodingRoutine {
  time: string;
  activity: string;
}