import { Course, Review, Question } from '../types';

export const courses: Course[] = [
  {
    id: '1',
    courseNumber: '15-213',
    name: 'Introduction to Computer Systems',
    department: 'Computer Science',
    units: 12,
    level: 'undergraduate',
    description: 'This course provides a programmer\'s view of how computer systems execute programs, store information, and communicate. It enables students to become more effective programmers, especially in dealing with issues of performance, portability and robustness.',
    prerequisites: '15-122'
  },
  {
    id: '2',
    courseNumber: '15-251',
    name: 'Great Ideas in Theoretical Computer Science',
    department: 'Computer Science',
    units: 12,
    level: 'undergraduate',
    description: 'This course is about how to use theoretical ideas to formulate and solve problems in computer science. It integrates mathematical material with general problem solving techniques and computer science applications.',
    prerequisites: '15-151 or 21-127'
  },
  {
    id: '3',
    courseNumber: '15-410',
    name: 'Operating System Design and Implementation',
    department: 'Computer Science',
    units: 15,
    level: 'undergraduate',
    description: 'This course is a rigorous hands-on introduction to the principles and practice of operating systems. The core experience is writing a small Unix-inspired OS kernel, in C with some x86 assembly language.',
    prerequisites: '15-213'
  },
  {
    id: '4',
    courseNumber: '18-240',
    name: 'Structure and Design of Digital Systems',
    department: 'Electrical & Computer Engineering',
    units: 12,
    level: 'undergraduate',
    description: 'An introduction to the hardware and software of digital systems. Basic electronics, digital logic, and machine-level programming.',
    prerequisites: '18-100'
  },
  {
    id: '5',
    courseNumber: '36-401',
    name: 'Modern Regression',
    department: 'Statistics',
    units: 9,
    level: 'undergraduate',
    description: 'This course examines statistical methods for building and evaluating regression models, with heavy emphasis on practical applications.',
    prerequisites: '36-226 or 36-326'
  }
];

export const reviews: Review[] = [
  {
    id: '1',
    courseId: '1',
    overallRating: 5,
    difficultyRating: 4,
    workloadHours: 20,
    usefulnessRating: 5,
    reviewText: 'This is THE course that will make you a real programmer. Yes, it\'s hard and time-consuming, but you\'ll learn more about how computers actually work than any other course. The labs are challenging but incredibly rewarding. Malloc lab changed my life. Start the labs early!',
    professorName: 'Prof. Bryant',
    semester: 'Fall 2024',
    upvotes: 47,
    createdAt: '2024-12-15'
  },
  {
    id: '2',
    courseId: '1',
    overallRating: 4,
    difficultyRating: 5,
    workloadHours: 25,
    usefulnessRating: 5,
    reviewText: 'Brutal but necessary. You\'ll spend countless nights in the cluster debugging segfaults, but the knowledge you gain is invaluable. The textbook is actually readable and the TAs are super helpful. Just don\'t fall behind on the labs.',
    professorName: 'Prof. O\'Hallaron',
    semester: 'Spring 2024',
    upvotes: 32,
    createdAt: '2024-05-20'
  },
  {
    id: '3',
    courseId: '2',
    overallRating: 4,
    difficultyRating: 5,
    workloadHours: 18,
    usefulnessRating: 4,
    reviewText: 'One of the most mind-bending courses at CMU. The material is fascinating - you\'ll learn about computation, cryptography, and complexity theory. However, the homework is HARD. Form a study group and go to office hours. The exams are fair if you understand the concepts.',
    professorName: 'Prof. Rudich',
    semester: 'Fall 2024',
    upvotes: 28,
    createdAt: '2024-12-10'
  },
  {
    id: '4',
    courseId: '3',
    overallRating: 5,
    difficultyRating: 5,
    workloadHours: 30,
    usefulnessRating: 5,
    reviewText: 'The hardest and most rewarding course I\'ve taken at CMU. You\'ll write an entire operating system from scratch. It completely changed how I think about systems programming. Yes, you\'ll sacrifice your social life, but you\'ll come out a much stronger engineer.',
    professorName: 'Prof. Eckhardt',
    semester: 'Spring 2024',
    upvotes: 56,
    createdAt: '2024-05-25'
  }
];

export const questions: Question[] = [
  {
    id: '1',
    courseId: '1',
    title: 'How much C do I need to know before taking this course?',
    body: 'I\'ve only done 15-122 and know some basic C from that. Is that enough or should I practice more before taking 213?',
    upvotes: 15,
    createdAt: '2024-11-01',
    answers: [
      {
        id: '1',
        body: 'The C from 15-122 is definitely enough to start! The course actually teaches you a lot of C concepts as you go, especially around pointers and memory. The first few weeks will cover what you need.',
        upvotes: 12,
        createdAt: '2024-11-02'
      },
      {
        id: '2',
        body: 'I\'d say you\'re fine with 122 background, but if you want to be extra prepared, practice with pointers and dynamic memory allocation. Understanding pointer arithmetic will save you lots of debugging time.',
        upvotes: 8,
        createdAt: '2024-11-02'
      }
    ]
  },
  {
    id: '2',
    courseId: '1',
    title: 'Is this course manageable with other heavy courses?',
    body: 'I\'m planning to take 15-213 with 15-251 next semester. Is this doable or am I going to die?',
    upvotes: 23,
    createdAt: '2024-11-10',
    answers: [
      {
        id: '3',
        body: 'It\'s doable but very tough. Both courses have significant time commitments. If you\'re taking both, make sure your third course is light. Time management is key - don\'t let labs pile up!',
        upvotes: 18,
        createdAt: '2024-11-11'
      }
    ]
  },
  {
    id: '3',
    courseId: '2',
    title: 'Best way to prepare for the exams?',
    body: 'The homework is so different from what I expected. How do people study for the midterm and final?',
    upvotes: 19,
    createdAt: '2024-10-15',
    answers: [
      {
        id: '4',
        body: 'Practice old exams! They release past exams and the format is pretty consistent. Also, really understand the homework solutions - don\'t just read them, make sure you can reproduce the reasoning.',
        upvotes: 22,
        createdAt: '2024-10-16'
      }
    ]
  }
];
