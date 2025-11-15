import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/mockData';
import { useData } from '../context/DataContext';
import { StarRating } from '../components/StarRating';
import {
  ArrowLeft,
  ThumbsUp,
  Clock,
  AlertTriangle,
  BookOpen,
  MessageSquare,
  PenSquare,
  Loader2,
  CheckCircle,
  XCircle
} from 'lucide-react';

export function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const {
    reviews,
    questions,
    addReview,
    addQuestion,
    addAnswer,
    upvoteReview,
    upvoteQuestion,
    upvoteAnswer
  } = useData();

  const [activeTab, setActiveTab] = useState<'reviews' | 'qa'>('reviews');
  const [showReviewForm, setShowReviewForm] = useState(false);
  const [showQuestionForm, setShowQuestionForm] = useState(false);
  const [answeringQuestion, setAnsweringQuestion] = useState<string | null>(null);

  // Review form state
  const [reviewForm, setReviewForm] = useState({
    overallRating: 0,
    difficultyRating: 0,
    workloadHours: 15,
    usefulnessRating: 0,
    reviewText: '',
    professorName: '',
    semester: 'Fall 2024'
  });
  const [submitting, setSubmitting] = useState(false);
  const [submitResult, setSubmitResult] = useState<{ success: boolean; message: string } | null>(null);

  // Question form state
  const [questionForm, setQuestionForm] = useState({ title: '', body: '' });
  const [answerText, setAnswerText] = useState('');

  const course = courses.find(c => c.id === id);
  if (!course) {
    return <div className="p-8 text-center">Course not found</div>;
  }

  const courseReviews = reviews.filter(r => r.courseId === id);
  const courseQuestions = questions.filter(q => q.courseId === id);

  const avgRating = courseReviews.length
    ? courseReviews.reduce((sum, r) => sum + r.overallRating, 0) / courseReviews.length
    : 0;
  const avgDifficulty = courseReviews.length
    ? courseReviews.reduce((sum, r) => sum + r.difficultyRating, 0) / courseReviews.length
    : 0;
  const avgWorkload = courseReviews.length
    ? courseReviews.reduce((sum, r) => sum + r.workloadHours, 0) / courseReviews.length
    : 0;
  const avgUsefulness = courseReviews.length
    ? courseReviews.reduce((sum, r) => sum + r.usefulnessRating, 0) / courseReviews.length
    : 0;

  const handleSubmitReview = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setSubmitResult(null);

    const result = await addReview({
      courseId: id!,
      ...reviewForm
    });

    setSubmitResult(result);
    setSubmitting(false);

    if (result.success) {
      setShowReviewForm(false);
      setReviewForm({
        overallRating: 0,
        difficultyRating: 0,
        workloadHours: 15,
        usefulnessRating: 0,
        reviewText: '',
        professorName: '',
        semester: 'Fall 2024'
      });
    }
  };

  const handleSubmitQuestion = (e: React.FormEvent) => {
    e.preventDefault();
    addQuestion({ courseId: id!, ...questionForm });
    setShowQuestionForm(false);
    setQuestionForm({ title: '', body: '' });
  };

  const handleSubmitAnswer = (questionId: string) => {
    addAnswer(questionId, { body: answerText });
    setAnsweringQuestion(null);
    setAnswerText('');
  };

  return (
    <div className="min-h-[calc(100vh-4rem)] bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/courses" className="flex items-center gap-2 text-cmu-red hover:underline mb-6">
          <ArrowLeft size={18} />
          Back to courses
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <span className="bg-cmu-red text-white px-3 py-1 rounded-md font-mono text-sm">
                {course.courseNumber}
              </span>
              <h1 className="text-3xl font-bold text-gray-900 mt-3">{course.name}</h1>
              <p className="text-gray-600 mt-1">
                {course.department} • {course.units} units • {course.level}
              </p>
            </div>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-cmu-red text-white px-4 py-2 rounded-md font-semibold hover:bg-cmu-red-dark transition-colors flex items-center gap-2"
            >
              <PenSquare size={18} />
              Write Review
            </button>
          </div>

          <p className="text-gray-700 mb-4">{course.description}</p>

          <div className="bg-gray-50 rounded-md p-4">
            <p className="text-sm text-gray-600">
              <strong>Prerequisites:</strong> {course.prerequisites || 'None'}
            </p>
          </div>

          {/* Stats */}
          {courseReviews.length > 0 && (
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-6">
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <div className="text-2xl font-bold text-cmu-red">{avgRating.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Overall Rating</div>
                <StarRating rating={Math.round(avgRating)} size={14} />
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <div className="text-2xl font-bold text-orange-600">{avgDifficulty.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Difficulty</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <div className="text-2xl font-bold text-blue-600">{Math.round(avgWorkload)}</div>
                <div className="text-sm text-gray-600">Hours/Week</div>
              </div>
              <div className="text-center p-4 bg-gray-50 rounded-md">
                <div className="text-2xl font-bold text-green-600">{avgUsefulness.toFixed(1)}</div>
                <div className="text-sm text-gray-600">Usefulness</div>
              </div>
            </div>
          )}
        </div>

        {/* Submit Result Alert */}
        {submitResult && (
          <div
            className={`mb-6 p-4 rounded-md flex items-center gap-2 ${
              submitResult.success
                ? 'bg-green-50 border border-green-200 text-green-700'
                : 'bg-red-50 border border-red-200 text-red-700'
            }`}
          >
            {submitResult.success ? <CheckCircle size={20} /> : <XCircle size={20} />}
            {submitResult.message}
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-lg shadow-md">
          <div className="border-b">
            <div className="flex">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-6 py-4 font-medium flex items-center gap-2 ${
                  activeTab === 'reviews'
                    ? 'border-b-2 border-cmu-red text-cmu-red'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <BookOpen size={18} />
                Reviews ({courseReviews.length})
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`px-6 py-4 font-medium flex items-center gap-2 ${
                  activeTab === 'qa'
                    ? 'border-b-2 border-cmu-red text-cmu-red'
                    : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                <MessageSquare size={18} />
                Q&A ({courseQuestions.length})
              </button>
            </div>
          </div>

          <div className="p-6">
            {activeTab === 'reviews' ? (
              <div className="space-y-6">
                {courseReviews.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-8">
                    No reviews yet. Be the first to review this course!
                  </p>
                ) : (
                  courseReviews
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map(review => (
                      <div key={review.id} className="border rounded-md p-4">
                        <div className="flex justify-between items-start mb-3">
                          <div className="flex items-center gap-4">
                            <StarRating rating={review.overallRating} size={18} />
                            <span className="text-sm text-gray-600">
                              {review.professorName} • {review.semester}
                            </span>
                          </div>
                          <button
                            onClick={() => upvoteReview(review.id)}
                            className="flex items-center gap-1 text-gray-500 hover:text-cmu-red transition-colors"
                          >
                            <ThumbsUp size={16} />
                            <span className="text-sm">{review.upvotes}</span>
                          </button>
                        </div>

                        <p className="text-gray-700 mb-3">{review.reviewText}</p>

                        <div className="flex gap-4 text-sm text-gray-600">
                          <div className="flex items-center gap-1">
                            <AlertTriangle size={14} className="text-orange-500" />
                            Difficulty: {review.difficultyRating}/5
                          </div>
                          <div className="flex items-center gap-1">
                            <Clock size={14} className="text-blue-500" />
                            {review.workloadHours} hrs/week
                          </div>
                        </div>

                        <div className="mt-3 text-xs text-gray-500">
                          Verified CMU Student • {review.createdAt}
                        </div>
                      </div>
                    ))
                )}
              </div>
            ) : (
              <div className="space-y-6">
                <button
                  onClick={() => setShowQuestionForm(true)}
                  className="bg-cmu-red text-white px-4 py-2 rounded-md font-semibold hover:bg-cmu-red-dark transition-colors"
                >
                  Ask a Question
                </button>

                {courseQuestions.length === 0 ? (
                  <p className="text-gray-500 italic text-center py-8">
                    No questions yet. Ask the first question!
                  </p>
                ) : (
                  courseQuestions.map(question => (
                    <div key={question.id} className="border rounded-md p-4">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="font-semibold text-lg">{question.title}</h3>
                        <button
                          onClick={() => upvoteQuestion(question.id)}
                          className="flex items-center gap-1 text-gray-500 hover:text-cmu-red transition-colors"
                        >
                          <ThumbsUp size={16} />
                          <span className="text-sm">{question.upvotes}</span>
                        </button>
                      </div>
                      <p className="text-gray-700 mb-3">{question.body}</p>
                      <div className="text-xs text-gray-500 mb-4">
                        Verified CMU Student • {question.createdAt}
                      </div>

                      {/* Answers */}
                      <div className="ml-4 space-y-3 border-l-2 border-gray-200 pl-4">
                        {question.answers.map(answer => (
                          <div key={answer.id} className="bg-gray-50 rounded-md p-3">
                            <div className="flex justify-between items-start mb-2">
                              <p className="text-gray-700">{answer.body}</p>
                              <button
                                onClick={() => upvoteAnswer(question.id, answer.id)}
                                className="flex items-center gap-1 text-gray-500 hover:text-cmu-red transition-colors ml-2"
                              >
                                <ThumbsUp size={14} />
                                <span className="text-xs">{answer.upvotes}</span>
                              </button>
                            </div>
                            <div className="text-xs text-gray-500">
                              Verified CMU Student • {answer.createdAt}
                            </div>
                          </div>
                        ))}

                        {answeringQuestion === question.id ? (
                          <div className="bg-gray-50 rounded-md p-3">
                            <textarea
                              value={answerText}
                              onChange={(e) => setAnswerText(e.target.value)}
                              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
                              rows={3}
                              placeholder="Write your answer..."
                            />
                            <div className="flex gap-2 mt-2">
                              <button
                                onClick={() => handleSubmitAnswer(question.id)}
                                className="bg-cmu-red text-white px-3 py-1 rounded-md text-sm hover:bg-cmu-red-dark"
                              >
                                Submit
                              </button>
                              <button
                                onClick={() => setAnsweringQuestion(null)}
                                className="text-gray-600 px-3 py-1 rounded-md text-sm hover:bg-gray-200"
                              >
                                Cancel
                              </button>
                            </div>
                          </div>
                        ) : (
                          <button
                            onClick={() => setAnsweringQuestion(question.id)}
                            className="text-cmu-red text-sm hover:underline"
                          >
                            Add an answer
                          </button>
                        )}
                      </div>
                    </div>
                  ))
                )}
              </div>
            )}
          </div>
        </div>

        {/* Review Form Modal */}
        {showReviewForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-2xl w-full max-h-[90vh] overflow-y-auto">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Write a Review</h2>
                <form onSubmit={handleSubmitReview} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Overall Rating
                    </label>
                    <StarRating
                      rating={reviewForm.overallRating}
                      size={32}
                      interactive
                      onChange={(rating) => setReviewForm({ ...reviewForm, overallRating: rating })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Difficulty (1=Easy, 5=Very Hard)
                    </label>
                    <StarRating
                      rating={reviewForm.difficultyRating}
                      size={32}
                      interactive
                      onChange={(rating) => setReviewForm({ ...reviewForm, difficultyRating: rating })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Usefulness (1=Not Useful, 5=Very Useful)
                    </label>
                    <StarRating
                      rating={reviewForm.usefulnessRating}
                      size={32}
                      interactive
                      onChange={(rating) => setReviewForm({ ...reviewForm, usefulnessRating: rating })}
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-2">
                      Hours per Week: {reviewForm.workloadHours}
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={reviewForm.workloadHours}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, workloadHours: parseInt(e.target.value) })
                      }
                      className="w-full"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Professor
                    </label>
                    <input
                      type="text"
                      value={reviewForm.professorName}
                      onChange={(e) => setReviewForm({ ...reviewForm, professorName: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
                      placeholder="Prof. Name"
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Semester
                    </label>
                    <select
                      value={reviewForm.semester}
                      onChange={(e) => setReviewForm({ ...reviewForm, semester: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
                    >
                      <option>Fall 2024</option>
                      <option>Spring 2024</option>
                      <option>Fall 2023</option>
                      <option>Spring 2023</option>
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Your Review ({reviewForm.reviewText.length}/2000)
                    </label>
                    <textarea
                      value={reviewForm.reviewText}
                      onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
                      rows={6}
                      minLength={50}
                      maxLength={2000}
                      placeholder="Share your experience... What did you learn? How was the workload? Any tips for future students?"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Minimum 50 characters. Do not share exam questions, solutions, or copyrighted materials.
                    </p>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      disabled={submitting || reviewForm.overallRating === 0}
                      className="bg-cmu-red text-white px-6 py-2 rounded-md font-semibold hover:bg-cmu-red-dark transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                    >
                      {submitting && <Loader2 size={18} className="animate-spin" />}
                      {submitting ? 'Checking with AI...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="text-gray-600 px-6 py-2 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}

        {/* Question Form Modal */}
        {showQuestionForm && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-white rounded-lg shadow-xl max-w-xl w-full">
              <div className="p-6">
                <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>
                <form onSubmit={handleSubmitQuestion} className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Question Title
                    </label>
                    <input
                      type="text"
                      value={questionForm.title}
                      onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
                      placeholder="What would you like to know?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">
                      Details
                    </label>
                    <textarea
                      value={questionForm.body}
                      onChange={(e) => setQuestionForm({ ...questionForm, body: e.target.value })}
                      className="w-full px-3 py-2 border border-gray-300 rounded-md focus:ring-2 focus:ring-cmu-red focus:border-transparent"
                      rows={4}
                      placeholder="Provide more context..."
                      required
                    />
                  </div>

                  <div className="flex gap-3 pt-4">
                    <button
                      type="submit"
                      className="bg-cmu-red text-white px-6 py-2 rounded-md font-semibold hover:bg-cmu-red-dark transition-colors"
                    >
                      Post Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="text-gray-600 px-6 py-2 rounded-md hover:bg-gray-100"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
