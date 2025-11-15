export interface Course {
  id: string;
  courseNumber: string;
  name: string;
  department: string;
  units: number;
  level: 'undergraduate' | 'graduate';
  description: string;
  prerequisites: string;
}

export interface Review {
  id: string;
  courseId: string;
  overallRating: number;
  difficultyRating: number;
  workloadHours: number;
  usefulnessRating: number;
  reviewText: string;
  professorName: string;
  semester: string;
  upvotes: number;
  createdAt: string;
}

export interface Question {
  id: string;
  courseId: string;
  title: string;
  body: string;
  upvotes: number;
  createdAt: string;
  answers: Answer[];
}

export interface Answer {
  id: string;
  body: string;
  upvotes: number;
  createdAt: string;
}

export interface User {
  email: string;
  isVerified: boolean;
}
