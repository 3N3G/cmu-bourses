# CMU Course Reviews

A frontend demo for a CMU course review platform - built for a hackathon. This is a fully functional frontend simulation that demonstrates the complete user experience of the platform.

## Features

- **User Authentication Flow**: Registration with CMU email validation, email verification simulation, and login
- **Course Browsing**: Search and filter courses by department, view course details
- **Anonymous Reviews**: Submit course reviews with ratings for difficulty, workload, and usefulness
- **AI Content Moderation**: Simulated AI moderation that checks for academic integrity violations
- **Q&A System**: Ask questions and provide answers about courses
- **Upvoting**: Vote on helpful reviews and answers
- **CMU Branding**: Uses Carnegie Mellon's signature red color scheme

## Tech Stack

- React 18 + TypeScript
- Vite (build tool)
- Tailwind CSS (styling)
- React Router (navigation)
- Lucide React (icons)

## Demo Flow

1. **Landing Page**: View the platform's value proposition
2. **Register**: Sign up with a CMU email (@andrew.cmu.edu or @cmu.edu)
3. **Verify Email**: Simulate email verification (click the button to verify)
4. **Browse Courses**: Search and filter through available courses
5. **View Course Details**: See reviews, ratings, and Q&A for each course
6. **Write Review**: Submit an anonymous review (includes AI moderation simulation)
7. **Participate in Q&A**: Ask questions and provide answers

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

## Demo Credentials

For the demo, use any CMU email format:
- Email: `yourname@andrew.cmu.edu` or `yourname@cmu.edu`
- Password: Any password meeting requirements (8+ chars, uppercase, lowercase, number, special char)

Example: `demo@andrew.cmu.edu` with password `Demo123!`

## Project Structure

```
src/
├── components/       # Reusable UI components (Navbar, StarRating)
├── context/          # React Context for auth and data state
├── data/             # Mock data for courses, reviews, questions
├── pages/            # Main page components (Login, CourseList, etc.)
├── types/            # TypeScript type definitions
└── App.tsx           # Main app with routing
```

## Mock Data

The demo includes pre-populated data:
- 5 CMU courses (15-213, 15-251, 15-410, 18-240, 36-401)
- Sample reviews with ratings and detailed feedback
- Q&A threads with questions and answers

## AI Moderation Simulation

When submitting a review, the system simulates AI content moderation by checking for:
- Exam questions or answers
- Homework solutions
- Code snippets
- Any content that violates academic integrity

This ensures the demo accurately reflects how the real platform would protect academic integrity.

## Notes

- All data is stored in memory and will reset on page refresh
- No backend - this is a pure frontend demonstration
- Reviews are anonymous and attributed to "Verified CMU Student"
- The platform enforces CMU email validation for authenticity
