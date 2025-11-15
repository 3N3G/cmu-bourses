import { useState } from 'react';
import { useParams, Link } from 'react-router-dom';
import { courses } from '../data/mockData';
import { useData } from '../context/DataContext';
import { StarRating } from '../components/StarRating';
import { RatingDistribution } from '../components/RatingDistribution';
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
  XCircle,
  TrendingUp,
  Award,
  Users
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
    <div className="min-h-[calc(100vh-4rem)] bg-gradient-to-b from-gray-50 to-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link to="/courses" className="inline-flex items-center gap-2 text-cmu-red hover:text-cmu-red-dark font-medium mb-6 transition-colors group">
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" />
          Back to courses
        </Link>

        {/* Course Header */}
        <div className="bg-white rounded-2xl shadow-xl p-8 mb-6 animate-fade-in">
          <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-6 mb-6">
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-4">
                <span className="bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white px-5 py-2 rounded-xl font-mono font-bold text-base shadow-lg">
                  {course.courseNumber}
                </span>
                <div className="flex items-center gap-2 text-sm">
                  <span className="bg-blue-100 text-blue-700 px-3 py-1 rounded-full font-medium">
                    {course.department}
                  </span>
                  <span className="bg-purple-100 text-purple-700 px-3 py-1 rounded-full font-medium">
                    {course.units} units
                  </span>
                  <span className="bg-green-100 text-green-700 px-3 py-1 rounded-full font-medium capitalize">
                    {course.level}
                  </span>
                </div>
              </div>
              <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4 leading-tight">{course.name}</h1>
              <p className="text-lg text-gray-700 leading-relaxed">{course.description}</p>
            </div>
            <button
              onClick={() => setShowReviewForm(true)}
              className="bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white px-6 py-3 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 flex items-center gap-2 shadow-lg"
            >
              <PenSquare size={20} />
              Write Review
            </button>
          </div>

          {course.prerequisites && (
            <div className="bg-gradient-to-r from-blue-50 to-purple-50 rounded-xl p-4 border-l-4 border-blue-500">
              <p className="text-sm">
                <strong className="text-blue-900">Prerequisites:</strong>{' '}
                <span className="text-gray-700">{course.prerequisites}</span>
              </p>
            </div>
          )}
        </div>

        {/* Stats Section */}
        {courseReviews.length > 0 && (
          <div className="grid lg:grid-cols-5 gap-6 mb-6 animate-slide-up">
            <div className="lg:col-span-2 bg-white rounded-2xl shadow-lg p-6">
              <div className="text-center mb-6">
                <div className="text-6xl font-bold text-cmu-red mb-2">{avgRating.toFixed(1)}</div>
                <StarRating rating={Math.round(avgRating)} size={24} />
                <div className="text-gray-600 mt-2">{courseReviews.length} reviews</div>
              </div>
              <RatingDistribution ratings={courseReviews.map(r => r.overallRating)} />
            </div>

            <div className="lg:col-span-3 grid grid-cols-3 gap-4">
              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border-t-4 border-orange-500">
                <AlertTriangle className="mx-auto mb-3 text-orange-500" size={32} />
                <div className="text-3xl font-bold text-orange-600 mb-1">{avgDifficulty.toFixed(1)}</div>
                <div className="text-sm text-gray-600 font-medium">Difficulty</div>
                <div className="text-xs text-gray-500 mt-1">out of 5</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border-t-4 border-blue-500">
                <Clock className="mx-auto mb-3 text-blue-500" size={32} />
                <div className="text-3xl font-bold text-blue-600 mb-1">{Math.round(avgWorkload)}</div>
                <div className="text-sm text-gray-600 font-medium">Hours</div>
                <div className="text-xs text-gray-500 mt-1">per week</div>
              </div>

              <div className="bg-white rounded-2xl shadow-lg p-6 text-center hover:shadow-xl transition-shadow border-t-4 border-green-500">
                <Award className="mx-auto mb-3 text-green-500" size={32} />
                <div className="text-3xl font-bold text-green-600 mb-1">{avgUsefulness.toFixed(1)}</div>
                <div className="text-sm text-gray-600 font-medium">Usefulness</div>
                <div className="text-xs text-gray-500 mt-1">out of 5</div>
              </div>
            </div>
          </div>
        )}

        {/* Submit Result Alert */}
        {submitResult && (
          <div
            className={`mb-6 p-5 rounded-xl flex items-center gap-3 shadow-lg animate-slide-up ${
              submitResult.success
                ? 'bg-gradient-to-r from-green-50 to-emerald-50 border-2 border-green-200 text-green-800'
                : 'bg-gradient-to-r from-red-50 to-rose-50 border-2 border-red-200 text-red-800'
            }`}
          >
            {submitResult.success ? (
              <CheckCircle size={24} className="flex-shrink-0" />
            ) : (
              <XCircle size={24} className="flex-shrink-0" />
            )}
            <span className="font-medium">{submitResult.message}</span>
          </div>
        )}

        {/* Tabs */}
        <div className="bg-white rounded-2xl shadow-xl overflow-hidden">
          <div className="border-b-2 border-gray-100">
            <div className="flex">
              <button
                onClick={() => setActiveTab('reviews')}
                className={`px-8 py-5 font-bold flex items-center gap-3 transition-all relative ${
                  activeTab === 'reviews'
                    ? 'text-cmu-red bg-red-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {activeTab === 'reviews' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cmu-red to-cmu-red-dark"></div>
                )}
                <BookOpen size={20} />
                <span>Reviews</span>
                <span className={`px-2.5 py-0.5 rounded-full text-sm font-semibold ${
                  activeTab === 'reviews'
                    ? 'bg-cmu-red text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {courseReviews.length}
                </span>
              </button>
              <button
                onClick={() => setActiveTab('qa')}
                className={`px-8 py-5 font-bold flex items-center gap-3 transition-all relative ${
                  activeTab === 'qa'
                    ? 'text-cmu-red bg-red-50'
                    : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                }`}
              >
                {activeTab === 'qa' && (
                  <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-cmu-red to-cmu-red-dark"></div>
                )}
                <MessageSquare size={20} />
                <span>Q&A</span>
                <span className={`px-2.5 py-0.5 rounded-full text-sm font-semibold ${
                  activeTab === 'qa'
                    ? 'bg-cmu-red text-white'
                    : 'bg-gray-200 text-gray-700'
                }`}>
                  {courseQuestions.length}
                </span>
              </button>
            </div>
          </div>

          <div className="p-8">
            {activeTab === 'reviews' ? (
              <div className="space-y-6">
                {courseReviews.length === 0 ? (
                  <div className="text-center py-16">
                    <BookOpen className="mx-auto text-gray-300 mb-4" size={64} />
                    <h3 className="text-2xl font-bold text-gray-700 mb-2">No reviews yet</h3>
                    <p className="text-gray-500 mb-6">Be the first to review this course!</p>
                    <button
                      onClick={() => setShowReviewForm(true)}
                      className="bg-cmu-red text-white px-6 py-3 rounded-xl font-semibold hover:bg-cmu-red-dark transition-colors"
                    >
                      Write the First Review
                    </button>
                  </div>
                ) : (
                  courseReviews
                    .sort((a, b) => b.upvotes - a.upvotes)
                    .map((review, index) => (
                      <div
                        key={review.id}
                        className="bg-gradient-to-br from-white to-gray-50 border-2 border-gray-100 rounded-2xl p-6 hover:shadow-xl transition-all duration-300 hover:border-cmu-red/30 animate-slide-up"
                        style={{ animationDelay: `${index * 0.1}s` }}
                      >
                        <div className="flex justify-between items-start mb-4">
                          <div className="flex-1">
                            <div className="flex items-center gap-3 mb-3">
                              <StarRating rating={review.overallRating} size={20} />
                              <span className="text-lg font-bold text-gray-900">
                                {review.overallRating}.0
                              </span>
                            </div>
                            <div className="flex items-center gap-3 text-sm text-gray-600">
                              <div className="flex items-center gap-1.5">
                                <Users size={14} className="text-cmu-red" />
                                <span className="font-medium">Verified CMU Student</span>
                              </div>
                              {review.professorName && (
                                <>
                                  <span>•</span>
                                  <span className="font-medium">{review.professorName}</span>
                                </>
                              )}
                              <span>•</span>
                              <span>{review.semester}</span>
                            </div>
                          </div>
                          <button
                            onClick={() => upvoteReview(review.id)}
                            className="flex flex-col items-center gap-1 px-4 py-2 rounded-xl bg-gray-100 hover:bg-cmu-red hover:text-white transition-all duration-300 group"
                          >
                            <ThumbsUp size={20} className="group-hover:scale-110 transition-transform" />
                            <span className="text-sm font-bold">{review.upvotes}</span>
                          </button>
                        </div>

                        <p className="text-gray-800 mb-4 leading-relaxed text-lg">{review.reviewText}</p>

                        <div className="flex gap-3 flex-wrap">
                          <div className="bg-orange-50 border border-orange-200 rounded-xl px-4 py-2 flex items-center gap-2">
                            <AlertTriangle size={16} className="text-orange-600" />
                            <span className="text-sm">
                              <span className="font-semibold text-orange-900">Difficulty:</span>{' '}
                              <span className="font-bold text-orange-700">{review.difficultyRating}/5</span>
                            </span>
                          </div>
                          <div className="bg-blue-50 border border-blue-200 rounded-xl px-4 py-2 flex items-center gap-2">
                            <Clock size={16} className="text-blue-600" />
                            <span className="text-sm">
                              <span className="font-semibold text-blue-900">Workload:</span>{' '}
                              <span className="font-bold text-blue-700">{review.workloadHours} hrs/week</span>
                            </span>
                          </div>
                          <div className="bg-green-50 border border-green-200 rounded-xl px-4 py-2 flex items-center gap-2">
                            <Award size={16} className="text-green-600" />
                            <span className="text-sm">
                              <span className="font-semibold text-green-900">Usefulness:</span>{' '}
                              <span className="font-bold text-green-700">{review.usefulnessRating}/5</span>
                            </span>
                          </div>
                        </div>

                        <div className="mt-4 pt-4 border-t border-gray-200 text-xs text-gray-500">
                          Posted {review.createdAt}
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-3xl w-full max-h-[90vh] overflow-y-auto animate-scale-in">
              <div className="sticky top-0 bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white px-8 py-6 rounded-t-3xl">
                <h2 className="text-3xl font-bold">Write a Review</h2>
                <p className="text-white/90 mt-1">Share your experience with {course.name}</p>
              </div>
              <div className="p-8">
                <form onSubmit={handleSubmitReview} className="space-y-6">
                  <div className="bg-gradient-to-br from-yellow-50 to-orange-50 rounded-2xl p-6 border-2 border-yellow-200">
                    <label className="block text-base font-bold text-gray-900 mb-3">
                      Overall Rating *
                    </label>
                    <StarRating
                      rating={reviewForm.overallRating}
                      size={40}
                      interactive
                      onChange={(rating) => setReviewForm({ ...reviewForm, overallRating: rating })}
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div className="bg-orange-50 rounded-2xl p-6 border-2 border-orange-200">
                      <label className="block text-base font-bold text-gray-900 mb-3">
                        Difficulty (1=Easy, 5=Hard)
                      </label>
                      <StarRating
                        rating={reviewForm.difficultyRating}
                        size={32}
                        interactive
                        onChange={(rating) => setReviewForm({ ...reviewForm, difficultyRating: rating })}
                      />
                    </div>

                    <div className="bg-green-50 rounded-2xl p-6 border-2 border-green-200">
                      <label className="block text-base font-bold text-gray-900 mb-3">
                        Usefulness (1=Low, 5=High)
                      </label>
                      <StarRating
                        rating={reviewForm.usefulnessRating}
                        size={32}
                        interactive
                        onChange={(rating) => setReviewForm({ ...reviewForm, usefulnessRating: rating })}
                      />
                    </div>
                  </div>

                  <div className="bg-blue-50 rounded-2xl p-6 border-2 border-blue-200">
                    <label className="block text-base font-bold text-gray-900 mb-3">
                      Hours per Week: <span className="text-blue-600">{reviewForm.workloadHours}</span>
                    </label>
                    <input
                      type="range"
                      min="1"
                      max="40"
                      value={reviewForm.workloadHours}
                      onChange={(e) =>
                        setReviewForm({ ...reviewForm, workloadHours: parseInt(e.target.value) })
                      }
                      className="w-full h-3 bg-blue-200 rounded-lg appearance-none cursor-pointer accent-blue-600"
                    />
                    <div className="flex justify-between text-xs text-blue-600 mt-2">
                      <span>1 hr</span>
                      <span>20 hrs</span>
                      <span>40 hrs</span>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Professor (Optional)
                      </label>
                      <input
                        type="text"
                        value={reviewForm.professorName}
                        onChange={(e) => setReviewForm({ ...reviewForm, professorName: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cmu-red focus:border-cmu-red transition-all"
                        placeholder="Prof. Name"
                      />
                    </div>

                    <div>
                      <label className="block text-sm font-bold text-gray-900 mb-2">
                        Semester
                      </label>
                      <select
                        value={reviewForm.semester}
                        onChange={(e) => setReviewForm({ ...reviewForm, semester: e.target.value })}
                        className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cmu-red focus:border-cmu-red transition-all appearance-none bg-white cursor-pointer"
                      >
                        <option>Fall 2024</option>
                        <option>Spring 2024</option>
                        <option>Fall 2023</option>
                        <option>Spring 2023</option>
                      </select>
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Your Review *
                      <span className={`ml-2 text-xs ${
                        reviewForm.reviewText.length < 50
                          ? 'text-red-600'
                          : reviewForm.reviewText.length > 1900
                          ? 'text-orange-600'
                          : 'text-green-600'
                      }`}>
                        ({reviewForm.reviewText.length}/2000)
                      </span>
                    </label>
                    <textarea
                      value={reviewForm.reviewText}
                      onChange={(e) => setReviewForm({ ...reviewForm, reviewText: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-cmu-red focus:border-cmu-red transition-all resize-none"
                      rows={8}
                      minLength={50}
                      maxLength={2000}
                      placeholder="Share your experience... What did you learn? How was the workload? Any tips for future students?"
                      required
                    />
                    <p className="text-xs text-gray-600 mt-2 bg-gray-50 p-3 rounded-lg border border-gray-200">
                      <strong>Note:</strong> Minimum 50 characters. Do not share exam questions, solutions, or copyrighted materials.
                    </p>
                  </div>

                  <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                    <button
                      type="submit"
                      disabled={submitting || reviewForm.overallRating === 0}
                      className="flex-1 bg-gradient-to-r from-cmu-red to-cmu-red-dark text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center justify-center gap-3"
                    >
                      {submitting && <Loader2 size={20} className="animate-spin" />}
                      {submitting ? 'Checking with AI...' : 'Submit Review'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowReviewForm(false)}
                      className="px-8 py-4 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors border-2 border-gray-300"
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
          <div className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center p-4 z-50 animate-fade-in">
            <div className="bg-white rounded-3xl shadow-2xl max-w-2xl w-full animate-scale-in">
              <div className="bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-6 rounded-t-3xl">
                <h2 className="text-3xl font-bold">Ask a Question</h2>
                <p className="text-white/90 mt-1">Get answers from students who've taken {course.name}</p>
              </div>
              <div className="p-8">
                <form onSubmit={handleSubmitQuestion} className="space-y-6">
                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Question Title *
                    </label>
                    <input
                      type="text"
                      value={questionForm.title}
                      onChange={(e) => setQuestionForm({ ...questionForm, title: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all"
                      placeholder="What would you like to know?"
                      required
                    />
                  </div>

                  <div>
                    <label className="block text-sm font-bold text-gray-900 mb-2">
                      Details *
                    </label>
                    <textarea
                      value={questionForm.body}
                      onChange={(e) => setQuestionForm({ ...questionForm, body: e.target.value })}
                      className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 transition-all resize-none"
                      rows={6}
                      placeholder="Provide more context about your question..."
                      required
                    />
                  </div>

                  <div className="flex gap-4 pt-6 border-t-2 border-gray-200">
                    <button
                      type="submit"
                      className="flex-1 bg-gradient-to-r from-blue-600 to-purple-600 text-white px-8 py-4 rounded-xl font-bold hover:shadow-2xl hover:scale-105 transition-all duration-300"
                    >
                      Post Question
                    </button>
                    <button
                      type="button"
                      onClick={() => setShowQuestionForm(false)}
                      className="px-8 py-4 rounded-xl font-bold text-gray-700 hover:bg-gray-100 transition-colors border-2 border-gray-300"
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
