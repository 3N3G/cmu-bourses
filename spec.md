# Product Requirements Document: CMU Course Review Platform

**Version:** 1.0  
**Last Updated:** November 15, 2025  
**Product Owner:** TBD  
**Status:** Draft

---

## Executive Summary

The CMU Course Review Platform is a web-based application that enables Carnegie Mellon University students to share and access anonymous course reviews, participate in Q&A discussions, and make informed decisions about their academic choices. The platform validates users through CMU email authentication while maintaining review anonymity, integrates the CMU course catalog, and uses AI-powered content moderation to enforce Academic Integrity Violation (AIV) policies.

---

## Table of Contents

1. [Problem Statement](#1-problem-statement)
2. [Goals and Objectives](#2-goals-and-objectives)
3. [Target Users](#3-target-users)
4. [User Stories](#4-user-stories)
5. [Functional Requirements](#5-functional-requirements)
6. [Non-Functional Requirements](#6-non-functional-requirements)
7. [Technical Architecture](#7-technical-architecture)
8. [Data Models](#8-data-models)
9. [User Interface](#9-user-interface)
10. [AI Content Moderation](#10-ai-content-moderation)
11. [Security and Privacy](#11-security-and-privacy)
12. [Success Metrics](#12-success-metrics)
13. [Timeline and Milestones](#13-timeline-and-milestones)
14. [Risks and Mitigation](#14-risks-and-mitigation)
15. [Future Enhancements](#15-future-enhancements)

---

## 1. Problem Statement

### Current Situation
CMU students currently rely on:
- Informal word-of-mouth recommendations from peers
- Faculty Course Evaluations (FCEs) which are often delayed and aggregated
- External platforms (RateMyProfessor) that lack CMU-specific context
- Private Discord/Slack channels with limited reach and organization

### Pain Points
- **Lack of timely information:** FCEs are only available after semester completion
- **Limited anonymity:** Students fear retaliation or judgment when sharing honest feedback
- **Fragmented information:** Course information scattered across multiple platforms
- **No structured Q&A:** Difficult to ask and answer course-specific questions
- **Academic integrity risks:** No verification that shared content doesn't violate AIV policies

### Opportunity
Create a centralized, verified, and safe platform where CMU students can anonymously share course experiences, ask questions, and access comprehensive course information while maintaining academic integrity.

---

## 2. Goals and Objectives

### Primary Goals
1. **Empower informed decision-making:** Help students select courses based on peer experiences
2. **Maintain academic integrity:** Prevent sharing of solutions, exam content, or other AIV violations
3. **Foster community knowledge:** Build a repository of institutional knowledge about courses
4. **Ensure authenticity:** Verify all users are current CMU students

### Success Criteria
- 30% of active CMU students registered within first semester
- Average of 3+ reviews per popular course within first academic year
- <1% AIV policy violation rate in published content
- 90%+ user satisfaction rating for platform usability

### Key Objectives
- Launch MVP with core features by end of Fall 2025
- Integrate complete CMU course catalog (all departments)
- Achieve 95%+ accuracy in AI content moderation
- Maintain sub-2-second page load times

---

## 3. Target Users

### Primary User Persona: Current CMU Student

**Profile:**
- Undergraduate or graduate student at Carnegie Mellon University
- Active @andrew.cmu.edu or @cmu.edu email address
- Age: 18-30
- Tech-savvy, familiar with online review platforms

**Use Cases:**
1. **Course Selection:** Researching courses before registration
2. **Review Sharing:** Sharing experiences after completing a course
3. **Q&A Participation:** Asking questions about workload, prerequisites, or course content
4. **Professor Comparison:** Comparing different professors for the same course

**User Needs:**
- Quick access to honest, detailed course reviews
- Anonymity when posting potentially critical feedback
- Easy navigation through course catalog
- Confidence that platform maintains academic integrity

### Secondary Users
- **Academic advisors:** Understanding student sentiment about courses
- **Faculty:** Gathering informal feedback (read-only access)
- **Administration:** Monitoring course quality and student satisfaction

---

## 4. User Stories

### Authentication & Onboarding
- **US-001:** As a CMU student, I want to sign up using my CMU email so that I can verify my affiliation with the university
- **US-002:** As a new user, I want to receive a verification email so that my account can be activated
- **US-003:** As a user, I want to log in securely so that I can access the platform
- **US-004:** As a user, I want to reset my password if I forget it

### Course Discovery
- **US-005:** As a student, I want to browse courses by department so that I can explore options in my field
- **US-006:** As a student, I want to search for courses by number or name so that I can quickly find specific courses
- **US-007:** As a student, I want to filter courses by semester, units, or level so that I can find courses matching my criteria
- **US-008:** As a student, I want to see course details (description, units, prerequisites) so that I understand course requirements

### Reviews
- **US-009:** As a student who completed a course, I want to post an anonymous review so that I can share my experience without fear of identification
- **US-010:** As a student, I want to rate courses on multiple dimensions (difficulty, workload, usefulness) so that my review is structured and helpful
- **US-011:** As a student, I want to read reviews from other students so that I can make informed course decisions
- **US-012:** As a student, I want to see the distribution of ratings so that I understand overall sentiment
- **US-013:** As a student, I want to upvote helpful reviews so that quality content rises to the top
- **US-014:** As a user, I want my review to be checked by AI before posting so that I don't accidentally violate AIV policies

### Q&A and Discussion
- **US-015:** As a prospective student, I want to ask questions about a course so that I can clarify doubts
- **US-016:** As a student, I want to answer questions about courses I've taken so that I can help others
- **US-017:** As a user, I want to upvote helpful answers so that the best responses are highlighted
- **US-018:** As a user, I want questions and answers to be moderated for AIV violations

### Content Moderation
- **US-019:** As a platform administrator, I want AI to flag potentially violating content so that I can review it before publication
- **US-020:** As a user, I want to report inappropriate content so that the community stays safe and compliant
- **US-021:** As a user, I want to receive clear feedback if my content violates policies so that I can understand and correct the issue

---

## 5. Functional Requirements

### 5.1 Authentication System

#### FR-1.1: User Registration
- **Description:** Users must register with a valid CMU email address
- **Acceptance Criteria:**
  - Email must end with `@andrew.cmu.edu` or `@cmu.edu`
  - Password must be minimum 8 characters with at least one uppercase, lowercase, number, and special character
  - Verification email sent to registered address
  - Account remains inactive until email verified
  - Duplicate emails rejected

#### FR-1.2: Email Verification
- **Description:** Users verify email ownership via confirmation link
- **Acceptance Criteria:**
  - Unique verification token generated and sent via email
  - Token expires after 24 hours
  - User can request new verification email
  - Account activated upon successful verification
  - Clear success/error messages displayed

#### FR-1.3: Login System
- **Description:** Verified users can log in with email and password
- **Acceptance Criteria:**
  - JWT token issued upon successful authentication
  - Token expires after 7 days
  - Remember me option extends token to 30 days
  - Failed login attempts tracked (max 5 attempts before temporary lockout)
  - Session persists across browser sessions

#### FR-1.4: Password Management
- **Description:** Users can reset forgotten passwords
- **Acceptance Criteria:**
  - Password reset link sent to verified email
  - Reset token expires after 1 hour
  - New password must meet strength requirements
  - Password reset invalidates all existing sessions

### 5.2 Course Catalog Integration

#### FR-2.1: Course Database
- **Description:** System maintains comprehensive CMU course catalog
- **Acceptance Criteria:**
  - All departments represented (CS, ECE, Business, etc.)
  - Course information includes: number, name, description, units, department, level, prerequisites
  - Data updated each semester from official CMU sources
  - Historical course data preserved

#### FR-2.2: Course Search
- **Description:** Users can search for courses using various criteria
- **Acceptance Criteria:**
  - Search by course number (e.g., "15-213")
  - Search by course name (partial match supported)
  - Search by professor name
  - Results returned in <500ms for typical queries
  - Fuzzy matching for common typos

#### FR-2.3: Course Filtering
- **Description:** Users can filter courses by attributes
- **Acceptance Criteria:**
  - Filter by department
  - Filter by course level (undergraduate/graduate)
  - Filter by units (range slider)
  - Filter by semester offered
  - Multiple filters can be combined
  - Filter state persists during session

#### FR-2.4: Course Detail Page
- **Description:** Each course has a dedicated page with all information
- **Acceptance Criteria:**
  - Displays official course description
  - Shows all reviews for the course
  - Lists Q&A threads
  - Displays aggregate ratings
  - Shows prerequisites and co-requisites
  - Links to official course website (if available)

### 5.3 Anonymous Review System

#### FR-3.1: Review Submission
- **Description:** Verified users can submit anonymous course reviews
- **Acceptance Criteria:**
  - User must be logged in
  - One review per course per user (editable)
  - Review includes:
    - Overall rating (1-5 stars)
    - Difficulty rating (1-5)
    - Workload rating (hours per week)
    - Usefulness rating (1-5)
    - Written review (50-2000 characters)
    - Optional: Professor name, semester taken
  - Review attributed to "Verified CMU Student" (no identifying info)
  - Draft saving supported

#### FR-3.2: Review Display
- **Description:** Reviews are displayed on course pages with helpful information
- **Acceptance Criteria:**
  - Reviews sorted by helpfulness (upvotes) by default
  - Alternative sorting: newest, highest rated, lowest rated
  - Display shows: ratings, written content, semester/year, professor (if provided)
  - Aggregate statistics shown at top: average ratings, total reviews, rating distribution
  - Reviews paginated (10 per page)

#### FR-3.3: Review Voting
- **Description:** Users can upvote helpful reviews
- **Acceptance Criteria:**
  - One upvote per review per user
  - Upvote count displayed on review
  - User can remove their upvote
  - Cannot upvote own reviews
  - Voting requires login

#### FR-3.4: Review Editing
- **Description:** Users can edit their own reviews
- **Acceptance Criteria:**
  - User can access their reviews via profile
  - Edit preserves review ID (no new review created)
  - Edit history not shown publicly
  - Edited reviews re-submitted for AI moderation
  - "Last edited" timestamp displayed

### 5.4 Q&A System

#### FR-4.1: Question Posting
- **Description:** Users can post questions about courses
- **Acceptance Criteria:**
  - Question title (10-200 characters)
  - Question body (20-2000 characters)
  - Optional tags (e.g., "prerequisites", "workload", "projects")
  - Questions attributed to "Verified CMU Student"
  - Questions tied to specific course

#### FR-4.2: Answer Posting
- **Description:** Users can answer questions
- **Acceptance Criteria:**
  - Answer body (20-2000 characters)
  - Multiple answers allowed per question
  - Answers attributed to "Verified CMU Student"
  - Cannot answer own questions (but can comment)

#### FR-4.3: Q&A Voting
- **Description:** Users vote on helpful questions and answers
- **Acceptance Criteria:**
  - Upvote/downvote on questions
  - Upvote/downvote on answers
  - One vote per item per user
  - Vote count displayed
  - Answers sorted by vote count

#### FR-4.4: Q&A Moderation
- **Description:** Q&A content subject to same moderation as reviews
- **Acceptance Criteria:**
  - All questions/answers checked by AI before posting
  - Flagged content goes to manual review
  - Clear violation feedback provided to user

### 5.5 AI Content Moderation

#### FR-5.1: Automatic Moderation
- **Description:** AI reviews all user-generated content before publication
- **Acceptance Criteria:**
  - Content analyzed for AIV policy violations including:
    - Sharing of exam questions or answers
    - Posting assignment solutions or code
    - Sharing copyrighted course materials
    - Coordinating academic dishonesty
  - Analysis completes in <3 seconds for typical content
  - Content classified as: approved, flagged for review, rejected
  - Clear explanations provided for flagged/rejected content

#### FR-5.2: AIV Policy Rules
- **Description:** System enforces specific AIV violation detection
- **Acceptance Criteria:**
  - Detects direct quotes from exams/assignments
  - Identifies code snippets or pseudo-code solutions
  - Flags requests for homework help
  - Detects sharing of instructor-only materials
  - Recognizes attempts to circumvent detection (e.g., leetspeak, encoding)

#### FR-5.3: Manual Review Queue
- **Description:** Flagged content routed to human moderators
- **Acceptance Criteria:**
  - Moderator dashboard shows pending items
  - Moderators can approve, reject, or request revision
  - Users notified of moderation decisions
  - Moderation decisions logged for audit
  - Appeal process available for rejected content

#### FR-5.4: User Feedback
- **Description:** Users receive clear feedback on content issues
- **Acceptance Criteria:**
  - Specific policy violations highlighted in submitted content
  - Suggestions for revision provided
  - Examples of acceptable content shown
  - Users can edit and resubmit
  - Repeated violations tracked

### 5.6 User Reporting

#### FR-6.1: Content Reporting
- **Description:** Users can report inappropriate content
- **Acceptance Criteria:**
  - Report button on all user-generated content
  - Report categories: AIV violation, harassment, spam, other
  - Optional comment field for context
  - Anonymous reporting
  - Confirmation message shown

#### FR-6.2: Report Processing
- **Description:** Reported content reviewed by moderators
- **Acceptance Criteria:**
  - Reports added to moderation queue
  - High-priority reports (e.g., AIV) surfaced first
  - Moderators can dismiss or take action
  - Original reporter notified of outcome (without revealing identity)

---

## 6. Non-Functional Requirements

### 6.1 Performance

**NFR-1.1: Page Load Time**
- Initial page load: <2 seconds on standard broadband
- Subsequent navigation: <500ms
- Search results: <500ms for typical queries
- Review submission: <3 seconds including AI moderation

**NFR-1.2: Scalability**
- Support 15,000+ concurrent users (entire CMU student body)
- Handle 100+ reviews submitted per day
- Database supports 50,000+ courses, 500,000+ reviews

**NFR-1.3: Availability**
- 99.5% uptime during semester (excluding planned maintenance)
- Scheduled maintenance during low-traffic periods (2-6 AM)
- Graceful degradation if AI moderation service unavailable

### 6.2 Security

**NFR-2.1: Data Protection**
- All passwords hashed using bcrypt (cost factor 12)
- JWT tokens signed with secure secret key
- HTTPS required for all connections
- Database credentials stored in environment variables
- Regular security audits conducted

**NFR-2.2: Privacy**
- Review anonymity cryptographically guaranteed (no mapping of user to review stored)
- User email addresses never displayed publicly
- IP addresses not logged or stored
- Analytics anonymized and aggregated

**NFR-2.3: Authentication Security**
- Account lockout after 5 failed login attempts (15-minute cooldown)
- Password reset tokens single-use and time-limited
- Email verification required before any platform access
- Session tokens invalidated on password change

### 6.3 Usability

**NFR-3.1: Accessibility**
- WCAG 2.1 Level AA compliance
- Screen reader compatible
- Keyboard navigation supported
- Sufficient color contrast (4.5:1 minimum)
- Responsive design for mobile, tablet, desktop

**NFR-3.2: Browser Compatibility**
- Support latest 2 versions of: Chrome, Firefox, Safari, Edge
- Graceful degradation for older browsers
- Mobile browser support: iOS Safari, Chrome Android

**NFR-3.3: User Experience**
- Intuitive navigation requiring no tutorial
- Clear error messages and guidance
- Consistent UI patterns throughout application
- Maximum 3 clicks to reach any major feature

### 6.4 Maintainability

**NFR-4.1: Code Quality**
- Well-documented codebase with inline comments
- Modular architecture enabling easy updates
- Automated testing with >80% code coverage
- Version control using Git

**NFR-4.2: Monitoring**
- Application logging for errors and important events
- Performance monitoring and alerting
- User activity analytics (anonymized)
- AI moderation accuracy tracking

### 6.5 Compliance

**NFR-5.1: Legal Compliance**
- Terms of Service and Privacy Policy clearly displayed
- FERPA compliance for educational records
- User consent for data collection
- Right to deletion (GDPR-style)

**NFR-5.2: University Policy**
- Alignment with CMU acceptable use policies
- Academic integrity policy enforcement
- Compliance with student conduct code

---

## 7. Technical Architecture

### 7.1 System Overview

```
┌─────────────┐         ┌──────────────┐         ┌─────────────┐
│   Client    │◄───────►│   Backend    │◄───────►│  Database   │
│  (React)    │  HTTPS  │  (Node.js)   │         │  (SQLite/   │
│             │         │              │         │  PostgreSQL)│
└─────────────┘         └──────────────┘         └─────────────┘
                               │
                               │ API Call
                               ▼
                        ┌──────────────┐
                        │  AI Service  │
                        │ (Anthropic)  │
                        └──────────────┘
```

### 7.2 Technology Stack

**Frontend:**
- Framework: React 18+ with TypeScript
- State Management: React Context API or Zustand
- Routing: React Router v6
- UI Components: Tailwind CSS or Material-UI
- HTTP Client: Axios or Fetch API
- Build Tool: Vite

**Backend:**
- Runtime: Node.js 18+
- Framework: Express.js
- Authentication: JWT (jsonwebtoken)
- Validation: express-validator
- Email: Nodemailer
- AI Integration: Anthropic Claude API

**Database:**
- Development: SQLite
- Production: PostgreSQL
- ORM: Prisma or direct SQL queries
- Migration: Prisma Migrate or custom scripts

**Infrastructure:**
- Hosting: Vercel (frontend), Railway/Render (backend)
- CDN: Cloudflare
- Email Service: SendGrid or AWS SES
- Monitoring: Sentry (errors), Google Analytics (usage)

### 7.3 API Design

**RESTful API Endpoints:**

**Authentication:**
- `POST /api/auth/register` - Register new user
- `POST /api/auth/verify-email` - Verify email
- `POST /api/auth/login` - Login
- `POST /api/auth/logout` - Logout
- `POST /api/auth/forgot-password` - Request password reset
- `POST /api/auth/reset-password` - Reset password
- `GET /api/auth/me` - Get current user info

**Courses:**
- `GET /api/courses` - List courses (with filters/search)
- `GET /api/courses/:id` - Get course details
- `GET /api/courses/:id/reviews` - Get course reviews
- `GET /api/courses/:id/questions` - Get course Q&A

**Reviews:**
- `POST /api/reviews` - Submit review (includes AI check)
- `GET /api/reviews/:id` - Get specific review
- `PUT /api/reviews/:id` - Edit review
- `DELETE /api/reviews/:id` - Delete review
- `POST /api/reviews/:id/upvote` - Upvote review
- `DELETE /api/reviews/:id/upvote` - Remove upvote

**Q&A:**
- `POST /api/questions` - Post question
- `GET /api/questions/:id` - Get question with answers
- `POST /api/questions/:id/answers` - Post answer
- `POST /api/questions/:id/upvote` - Upvote question
- `POST /api/answers/:id/upvote` - Upvote answer

**Moderation:**
- `POST /api/moderate` - Check content (internal)
- `POST /api/reports` - Submit report
- `GET /api/admin/moderation-queue` - Get pending items (admin)
- `POST /api/admin/moderate/:id` - Moderate content (admin)

### 7.4 Database Schema

**Users Table:**
```sql
CREATE TABLE users (
  id INTEGER PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  is_verified BOOLEAN DEFAULT FALSE,
  verification_token VARCHAR(255),
  verification_expires TIMESTAMP,
  reset_token VARCHAR(255),
  reset_expires TIMESTAMP,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  last_login TIMESTAMP
);
```

**Courses Table:**
```sql
CREATE TABLE courses (
  id INTEGER PRIMARY KEY,
  course_number VARCHAR(20) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  description TEXT,
  department VARCHAR(100),
  units DECIMAL(3,1),
  level VARCHAR(20), -- 'undergraduate' or 'graduate'
  prerequisites TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);
```

**Reviews Table:**
```sql
CREATE TABLE reviews (
  id INTEGER PRIMARY KEY,
  course_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL, -- For editing, never exposed
  overall_rating INTEGER CHECK(overall_rating BETWEEN 1 AND 5),
  difficulty_rating INTEGER CHECK(difficulty_rating BETWEEN 1 AND 5),
  workload_hours INTEGER,
  usefulness_rating INTEGER CHECK(usefulness_rating BETWEEN 1 AND 5),
  review_text TEXT NOT NULL,
  professor_name VARCHAR(255),
  semester VARCHAR(20), -- e.g., 'Fall 2024'
  upvotes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  moderation_status VARCHAR(20), -- 'pending', 'approved', 'rejected'
  moderation_notes TEXT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, course_id) -- One review per user per course
);
```

**Questions Table:**
```sql
CREATE TABLE questions (
  id INTEGER PRIMARY KEY,
  course_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  title VARCHAR(200) NOT NULL,
  body TEXT NOT NULL,
  tags TEXT, -- JSON array
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (course_id) REFERENCES courses(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Answers Table:**
```sql
CREATE TABLE answers (
  id INTEGER PRIMARY KEY,
  question_id INTEGER NOT NULL,
  user_id INTEGER NOT NULL,
  body TEXT NOT NULL,
  upvotes INTEGER DEFAULT 0,
  downvotes INTEGER DEFAULT 0,
  is_approved BOOLEAN DEFAULT FALSE,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (question_id) REFERENCES questions(id),
  FOREIGN KEY (user_id) REFERENCES users(id)
);
```

**Votes Table:**
```sql
CREATE TABLE votes (
  id INTEGER PRIMARY KEY,
  user_id INTEGER NOT NULL,
  votable_type VARCHAR(20) NOT NULL, -- 'review', 'question', 'answer'
  votable_id INTEGER NOT NULL,
  vote_type VARCHAR(10) NOT NULL, -- 'up' or 'down'
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (user_id) REFERENCES users(id),
  UNIQUE(user_id, votable_type, votable_id)
);
```

**Reports Table:**
```sql
CREATE TABLE reports (
  id INTEGER PRIMARY KEY,
  reporter_id INTEGER NOT NULL,
  reported_type VARCHAR(20) NOT NULL, -- 'review', 'question', 'answer'
  reported_id INTEGER NOT NULL,
  reason VARCHAR(50) NOT NULL,
  comment TEXT,
  status VARCHAR(20) DEFAULT 'pending',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  FOREIGN KEY (reporter_id) REFERENCES users(id)
);
```

---

## 8. Data Models

### 8.1 Course Catalog Source

**Initial Data Source:**
- CMU Course Catalog API (if available)
- Web scraping from Schedule of Classes (https://enr-apps.as.cmu.edu/open/SOC/SOCServlet)
- Manual entry for MVP with top 100 most-enrolled courses

**Update Frequency:**
- Full refresh at start of each semester
- Incremental updates for course changes

### 8.2 Anonymization Strategy

**Review Anonymity:**
- Reviews stored with user_id reference (for editing only)
- No public-facing endpoint returns user_id
- Frontend displays all reviews as "Verified CMU Student"
- Even admins cannot see which user wrote which review in standard interface
- Database backups encrypted

---

## 9. User Interface

### 9.1 Key Pages/Views

**Landing Page (Unauthenticated):**
- Hero section explaining platform value
- Featured courses with review counts
- Sample reviews (3-4 examples)
- Call-to-action: Sign up with CMU email
- Login link

**Registration Page:**
- Email input (validation for @andrew.cmu.edu/@cmu.edu)
- Password input with strength indicator
- Terms of Service acceptance checkbox
- Submit button
- Link to login page

**Email Verification Page:**
- Message confirming email sent
- Resend verification link
- Instructions for checking spam folder

**Login Page:**
- Email and password inputs
- "Remember me" checkbox
- Forgot password link
- Login button
- Link to registration page

**Home/Dashboard (Authenticated):**
- Search bar prominently displayed
- Department browsing (grid or list)
- "Recently reviewed courses"
- "Most popular courses"
- User's review count and activity

**Course Listing Page:**
- Filter sidebar:
  - Department dropdown
  - Level checkboxes
  - Units range slider
  - Semester multi-select
- Course cards showing:
  - Course number and name
  - Average rating (stars)
  - Review count
  - Department
  - Units
- Pagination controls

**Course Detail Page:**
- Course header:
  - Course number and name
  - Department
  - Units, level, prerequisites
- Aggregate ratings section:
  - Overall rating (large)
  - Difficulty, workload, usefulness averages
  - Rating distribution histogram
  - Total review count
- Reviews tab:
  - Sort controls (helpfulness, newest, rating)
  - Review cards with ratings, text, metadata
  - Upvote buttons
  - Load more button
- Q&A tab:
  - "Ask a question" button
  - Question list with answer counts
  - Sort by votes or recency
- Official info tab:
  - Full course description
  - Link to course website

**Write Review Page:**
- Course selection (if not from course page)
- Rating sliders:
  - Overall (1-5 stars)
  - Difficulty (1-5)
  - Workload (hours/week)
  - Usefulness (1-5)
- Text editor for written review
  - Character counter (50-2000)
- Optional fields:
  - Professor dropdown
  - Semester selector
- Preview button
- Submit button
- Save draft button

**Review Submission Feedback:**
- Loading spinner during AI moderation
- Success message: "Review published!"
- Warning message: "Your review needs revision" (with specific issues highlighted)
- Error message: "Review violates AIV policy" (with explanation)

**Q&A Pages:**
- Question detail page:
  - Question title and body
  - Tags
  - Vote buttons
  - Answers section
  - "Add answer" form
- Ask question page:
  - Title input
  - Body text editor
  - Tag selector
  - Submit button

**User Profile:**
- Account settings
- My reviews (editable)
- My questions and answers
- Activity summary

**Admin Dashboard (Future):**
- Moderation queue
- Reported content
- User management
- Analytics overview

### 9.2 Design Principles

- **Clarity:** Information hierarchy guides users naturally
- **Consistency:** Uniform patterns for all interactions
- **Feedback:** Immediate response to all user actions
- **Accessibility:** Usable by all students regardless of ability
- **Mobile-first:** Optimized for smartphone use
- **Minimalism:** Focus on content, not decoration

### 9.3 Color Scheme & Branding

- CMU colors (Carnegie Red #C41230, Gray) as accents
- Clean, professional aesthetic
- High contrast for readability
- Friendly but not playful tone

---

## 10. AI Content Moderation

### 10.1 Moderation Workflow

```
User submits content
        │
        ▼
AI analyzes content (Anthropic Claude API)
        │
   ┌────┴────┐
   │         │
Approved   Flagged
   │         │
   │    ┌────┴────┐
   │    │         │
   │  Minor    Major
   │  Issues   Violation
   │    │         │
   │    ▼         ▼
   │  Manual   Auto-reject
   │  Review    with feedback
   │    │
   └────┴───► Published
```

### 10.2 AI Prompt Design

**System Prompt for Content Moderation:**

```
You are a content moderator for a CMU course review platform. Your role is to identify Academic Integrity Violations (AIV) in student-submitted content.

APPROVE content that:
- Shares general course experiences and opinions
- Discusses teaching style, workload, or course structure
- Asks about prerequisites or course difficulty
- Describes types of assignments without specific solutions

FLAG or REJECT content that:
- Contains exam questions or answers
- Shares assignment solutions or significant code snippets
- Provides step-by-step homework help
- Includes copyrighted course materials (slides, handouts)
- Coordinates academic dishonesty
- Uses coded language to share prohibited info

Analyze the following content and respond with:
1. DECISION: approve / flag / reject
2. CONFIDENCE: low / medium / high
3. REASON: brief explanation
4. SPECIFIC_ISSUES: highlight problematic sections (if any)

Content to analyze:
[USER_CONTENT]
```

### 10.3 Detection Strategies

**Pattern Matching:**
- Keywords: "exam", "solution", "answer key", "homework", "code"
- Code blocks or formatted code
- Mathematical formulas (suspicious in certain contexts)
- URLs to file-sharing sites

**Semantic Analysis:**
- Intent to share solutions
- Request for homework help
- Description of exam content
- Sharing of instructor materials

**Contextual Understanding:**
- Differentiate between "the exam was hard" (OK) vs. "exam question 3 was X" (violation)
- "Assignment involved sorting algorithms" (OK) vs. "here's my merge sort code" (violation)

### 10.4 False Positive Handling

- Low confidence flags → Manual review
- User education on what's acceptable
- Examples of acceptable vs. prohibited content
- Appeal process for rejected content

### 10.5 Continuous Improvement

- Log all moderation decisions
- Regular review of false positives/negatives
- Update AI prompts based on patterns
- Quarterly accuracy audits

---

## 11. Security and Privacy

### 11.1 Threat Model

**Potential Threats:**
1. Unauthorized access to reviews (de-anonymization)
2. Credential theft or account takeover
3. SQL injection or XSS attacks
4. DDoS attacks during registration periods
5. Spam or bot reviews
6. Malicious content in reviews

**Mitigations:**
1. Anonymization at database level, no reverse mapping
2. Strong password requirements, JWT expiration, rate limiting
3. Input validation, parameterized queries, CSP headers
4. Rate limiting, Cloudflare DDoS protection
5. Email verification, rate limits on review submission
6. AI moderation, user reporting

### 11.2 Data Privacy

**Data Collection:**
- Minimal data: email, hashed password, user-generated content
- No tracking cookies beyond essential session management
- No third-party analytics without anonymization

**Data Retention:**
- User accounts: Active until user requests deletion
- Reviews: Preserved even if user deletes account (anonymity maintained)
- Logs: 90 days for security logs, 30 days for application logs

**User Rights:**
- Access: Users can download their data
- Correction: Users can edit reviews
- Deletion: Users can delete account (reviews remain anonymous)
- Portability: Export in JSON format

### 11.3 Compliance

**FERPA Considerations:**
- Platform does not store grades or official academic records
- Course reviews are peer-generated, not institutional records
- No integration with university student information systems

**CMU Policy Alignment:**
- Clear guidelines against AIV
- Moderation enforces university academic integrity policies
- Cooperation with university if AIV violations discovered

---

## 12. Success Metrics

### 12.1 Adoption Metrics
- **User Registration:** Target 30% of CMU students (4,500 users) in first year
- **Active Users:** 20% monthly active users (900)
- **Reviews Generated:** 5,000 reviews in first year
- **Course Coverage:** 70% of courses offered have at least one review

### 12.2 Engagement Metrics
- **Reviews per User:** Average 2.5 reviews per registered user
- **Q&A Participation:** 1,000 questions, 3,000 answers in first year
- **Session Duration:** Average 8+ minutes per session
- **Return Rate:** 40% of users return within 7 days of first visit

### 12.3 Quality Metrics
- **Review Length:** Average 300+ characters (indicates thoughtfulness)
- **Moderation Accuracy:** <5% false positive rate on AI moderation
- **AIV Violation Rate:** <1% of submitted content violates policies
- **User Reports:** <2% of published content gets reported

### 12.4 Satisfaction Metrics
- **User Surveys:** 85%+ satisfaction with platform
- **NPS Score:** 40+ (promoters - detractors)
- **Feature Requests:** Active user suggestions indicate engagement

### 12.5 Business Metrics
- **Cost per User:** <$1 per registered user (operational costs)
- **Support Tickets:** <10 per week (indicates usability)

---

## 13. Timeline and Milestones

### Phase 1: MVP Development (8-12 weeks)

**Week 1-2: Planning & Setup**
- Finalize PRD
- Set up development environment
- Design database schema
- Create wireframes and mockups

**Week 3-5: Backend Development**
- User authentication system
- Database setup and migrations
- Core API endpoints
- AI moderation integration

**Week 6-8: Frontend Development**
- Landing and authentication pages
- Course listing and detail pages
- Review submission and display
- Q&A basic functionality

**Week 9-10: Integration & Testing**
- Connect frontend to backend
- End-to-end testing
- Security audit
- Performance optimization

**Week 11-12: Beta Launch**
- Deploy to staging environment
- Closed beta with 50-100 students
- Gather feedback
- Bug fixes and refinements

### Phase 2: Public Launch (Week 13-16)

**Week 13-14: Launch Preparation**
- Load course catalog (top 200 courses)
- Set up monitoring and analytics
- Prepare marketing materials
- Deploy to production

**Week 15: Soft Launch**
- Open to select departments (CS, ECE)
- Monitor performance and errors
- Quick iteration on feedback

**Week 16: Full Launch**
- Open to all CMU students
- Marketing campaign (social media, posters, email)
- Monitor adoption and engagement

### Phase 3: Growth & Iteration (Month 4-6)

- Add remaining courses to catalog
- Implement user-requested features
- Improve AI moderation based on patterns
- Scale infrastructure as needed
- Build admin dashboard

### Phase 4: Long-term (Month 7+)

- Professor response feature
- Mobile app (iOS/Android)
- Integration with course registration system
- Advanced analytics for students
- Expand to other universities (if successful)

---

## 14. Risks and Mitigation

### 14.1 Technical Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| AI moderation inaccuracy | High | Medium | Manual review queue, continuous prompt refinement, user appeals |
| Scalability issues at launch | Medium | Low | Load testing, CDN, auto-scaling infrastructure |
| Data breach / security incident | Critical | Low | Security audits, encryption, minimal data collection, penetration testing |
| CMU blocks platform | Critical | Low | Proactive communication with administration, ensure policy compliance |

### 14.2 User Adoption Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Low initial adoption | High | Medium | Marketing campaign, partnership with student orgs, incentivize early reviewers |
| Competing platforms exist | Medium | High | Differentiate with CMU-specific features, better UX, anonymity guarantees |
| Negative reviews discourage use | Medium | Low | Emphasize constructive feedback, show positive reviews too, transparency |

### 14.3 Content Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| Users circumvent AIV detection | High | Medium | Continuous AI improvement, user education, manual review |
| Spam or malicious reviews | Medium | Medium | Rate limiting, email verification, community reporting |
| Defamatory content about professors | High | Low | Clear ToS, moderation for harassment, legal review of policies |
| Platform used for coordinated cheating | Critical | Low | Strong AIV enforcement, cooperation with university, monitoring patterns |

### 14.4 Operational Risks

| Risk | Impact | Probability | Mitigation |
|------|--------|-------------|------------|
| High moderation workload | Medium | High | Efficient AI filtering, prioritize high-risk content, recruit moderators |
| Insufficient funding/resources | High | Medium | Keep infrastructure costs low, seek university or external funding |
| Key team member departure | Medium | Low | Documentation, knowledge sharing, code reviews |

---

## 15. Future Enhancements

### 15.1 Short-term (6-12 months)
- **Professor Responses:** Allow professors to respond to reviews (verified)
- **Course Comparison:** Side-by-side comparison of similar courses
- **Personalized Recommendations:** Suggest courses based on user's reviews and interests
- **Advanced Search:** Filter by professor, keywords in reviews, ratings thresholds
- **Mobile Apps:** Native iOS and Android applications
- **Email Notifications:** Digest of new reviews for followed courses

### 15.2 Medium-term (1-2 years)
- **Integration with Registration:** Show reviews during course registration
- **Schedule Builder:** Plan semester with course reviews integrated
- **Transcript Import:** Auto-suggest courses to review based on transcript
- **Community Features:** Follow users, build reputation through helpful reviews
- **Professor Ratings:** Separate rating system for instructors across courses
- **Historical Trends:** Show how course difficulty/quality changed over semesters

### 15.3 Long-term (2+ years)
- **Machine Learning Insights:** Predict course difficulty for individual students based on background
- **Career Path Recommendations:** Suggest courses based on career goals
- **Multi-University Platform:** Expand to other universities
- **Anonymous Mentorship:** Connect students who took courses with prospective students
- **Research Integration:** Analyze review data for academic research (with IRB approval)

---

## 16. Appendices

### Appendix A: Glossary

- **AIV:** Academic Integrity Violation - actions that violate CMU's academic honesty policies
- **FCE:** Faculty Course Evaluation - official end-of-semester course surveys at CMU
- **JWT:** JSON Web Token - authentication mechanism
- **MVP:** Minimum Viable Product
- **PRD:** Product Requirements Document

### Appendix B: Related Documents

- CMU Academic Integrity Policy: https://www.cmu.edu/policies/student-and-student-life/academic-integrity.html
- CMU Student Code of Conduct
- FERPA Guidelines
- API Documentation (to be created)
- Design System (to be created)

### Appendix C: References

- Carnegie Mellon Course Catalog: https://www.cmu.edu/hub/catalog/
- Schedule of Classes: https://enr-apps.as.cmu.edu/open/SOC/SOCServlet
- RateMyProfessor (competitor analysis)
- Existing CMU student feedback channels

---

## Document Control

**Revision History:**

| Version | Date | Author | Changes |
|---------|------|--------|---------|
| 1.0 | Nov 15, 2025 | dlcguo | Initial draft |

**Approvals:**

| Role | Name | Signature | Date |
|------|------|-----------|------|
| Product Owner | TBD | | |
| Tech Lead | TBD | | |
| CMU Administration Representative | TBD | | |

---

**End of Document**

