import { createContext, useContext, useState, ReactNode } from 'react';
import { Review, Question, Answer } from '../types';
import { reviews as initialReviews, questions as initialQuestions } from '../data/mockData';

interface DataContextType {
  reviews: Review[];
  questions: Question[];
  addReview: (review: Omit<Review, 'id' | 'upvotes' | 'createdAt'>) => Promise<{ success: boolean; message: string }>;
  addQuestion: (question: Omit<Question, 'id' | 'upvotes' | 'createdAt' | 'answers'>) => void;
  addAnswer: (questionId: string, answer: Omit<Answer, 'id' | 'upvotes' | 'createdAt'>) => void;
  upvoteReview: (reviewId: string) => void;
  upvoteQuestion: (questionId: string) => void;
  upvoteAnswer: (questionId: string, answerId: string) => void;
}

const DataContext = createContext<DataContextType | null>(null);

// Simple AI moderation simulation
function checkForViolations(text: string): { passed: boolean; message: string } {
  const violations = [
    { pattern: /exam\s+(question|answer|solution)/i, message: 'Content appears to contain exam questions or answers' },
    { pattern: /homework\s+(solution|answer|code)/i, message: 'Content appears to contain homework solutions' },
    { pattern: /here\'?s?\s+(my|the)\s+(code|solution)/i, message: 'Sharing code solutions is not allowed' },
    { pattern: /def\s+\w+\s*\(|function\s+\w+\s*\(|class\s+\w+/i, message: 'Code snippets detected - please avoid sharing solutions' },
  ];

  for (const { pattern, message } of violations) {
    if (pattern.test(text)) {
      return { passed: false, message };
    }
  }

  return { passed: true, message: 'Content approved' };
}

export function DataProvider({ children }: { children: ReactNode }) {
  const [reviews, setReviews] = useState<Review[]>(initialReviews);
  const [questions, setQuestions] = useState<Question[]>(initialQuestions);

  const addReview = async (review: Omit<Review, 'id' | 'upvotes' | 'createdAt'>): Promise<{ success: boolean; message: string }> => {
    // Simulate AI moderation delay
    await new Promise(resolve => setTimeout(resolve, 1500));

    const moderationResult = checkForViolations(review.reviewText);

    if (!moderationResult.passed) {
      return { success: false, message: moderationResult.message };
    }

    const newReview: Review = {
      ...review,
      id: Date.now().toString(),
      upvotes: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setReviews(prev => [newReview, ...prev]);
    return { success: true, message: 'Review published successfully!' };
  };

  const addQuestion = (question: Omit<Question, 'id' | 'upvotes' | 'createdAt' | 'answers'>) => {
    const newQuestion: Question = {
      ...question,
      id: Date.now().toString(),
      upvotes: 0,
      createdAt: new Date().toISOString().split('T')[0],
      answers: []
    };
    setQuestions(prev => [newQuestion, ...prev]);
  };

  const addAnswer = (questionId: string, answer: Omit<Answer, 'id' | 'upvotes' | 'createdAt'>) => {
    const newAnswer: Answer = {
      ...answer,
      id: Date.now().toString(),
      upvotes: 0,
      createdAt: new Date().toISOString().split('T')[0]
    };

    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? { ...q, answers: [...q.answers, newAnswer] }
          : q
      )
    );
  };

  const upvoteReview = (reviewId: string) => {
    setReviews(prev =>
      prev.map(r => (r.id === reviewId ? { ...r, upvotes: r.upvotes + 1 } : r))
    );
  };

  const upvoteQuestion = (questionId: string) => {
    setQuestions(prev =>
      prev.map(q => (q.id === questionId ? { ...q, upvotes: q.upvotes + 1 } : q))
    );
  };

  const upvoteAnswer = (questionId: string, answerId: string) => {
    setQuestions(prev =>
      prev.map(q =>
        q.id === questionId
          ? {
              ...q,
              answers: q.answers.map(a =>
                a.id === answerId ? { ...a, upvotes: a.upvotes + 1 } : a
              )
            }
          : q
      )
    );
  };

  return (
    <DataContext.Provider
      value={{
        reviews,
        questions,
        addReview,
        addQuestion,
        addAnswer,
        upvoteReview,
        upvoteQuestion,
        upvoteAnswer
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

export function useData() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useData must be used within DataProvider');
  }
  return context;
}
