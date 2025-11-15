import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, Shield, Users, Search, TrendingUp, Award, MessageCircle } from 'lucide-react';

export function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cmu-red via-cmu-red to-cmu-red-dark text-white py-24 md:py-32 relative overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-64 h-64 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-20 right-10 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <div className="animate-fade-in">
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              Make Informed
              <span className="block text-transparent bg-clip-text bg-gradient-to-r from-yellow-200 to-yellow-400">
                Course Decisions
              </span>
            </h1>
            <p className="text-xl md:text-2xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
              Read honest, anonymous reviews from fellow CMU students. Share your experiences
              and help others navigate their academic journey.
            </p>
            {user ? (
              <Link
                to="/courses"
                className="bg-white text-cmu-red px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block shadow-xl"
              >
                Browse Courses
              </Link>
            ) : (
              <Link
                to="/register"
                className="bg-white text-cmu-red px-10 py-4 rounded-lg font-semibold text-lg hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block shadow-xl"
              >
                Get Started with CMU Email
              </Link>
            )}
          </div>

          {/* Stats */}
          <div className="mt-16 grid grid-cols-3 gap-8 max-w-3xl mx-auto">
            <div className="animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="text-4xl font-bold">1000+</div>
              <div className="text-white/80 mt-1">Reviews</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="text-4xl font-bold">500+</div>
              <div className="text-white/80 mt-1">Courses</div>
            </div>
            <div className="animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="text-4xl font-bold">100%</div>
              <div className="text-white/80 mt-1">Anonymous</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-20 bg-gradient-to-b from-white to-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16 animate-fade-in">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              Why Use CMU Course Reviews?
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              A trusted platform built by students, for students
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-10">
            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.1s' }}>
              <div className="bg-gradient-to-br from-cmu-red to-cmu-red-dark rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Shield className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Complete Anonymity</h3>
              <p className="text-gray-600 leading-relaxed">
                Share honest feedback without fear. Your identity is never revealed to anyone, guaranteed by our encryption.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.2s' }}>
              <div className="bg-gradient-to-br from-cmu-red to-cmu-red-dark rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Users className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">Verified CMU Students</h3>
              <p className="text-gray-600 leading-relaxed">
                Only verified CMU students can post reviews, ensuring authentic experiences from your peers.
              </p>
            </div>

            <div className="text-center p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 animate-slide-up" style={{ animationDelay: '0.3s' }}>
              <div className="bg-gradient-to-br from-cmu-red to-cmu-red-dark rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6 shadow-lg">
                <Award className="text-white" size={36} />
              </div>
              <h3 className="text-2xl font-bold mb-3 text-gray-900">AI-Powered Moderation</h3>
              <p className="text-gray-600 leading-relaxed">
                Content is checked for academic integrity violations to keep the platform safe and compliant.
              </p>
            </div>
          </div>

          {/* Additional Features */}
          <div className="mt-16 grid md:grid-cols-3 gap-8">
            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md animate-slide-up" style={{ animationDelay: '0.4s' }}>
              <div className="bg-blue-100 rounded-lg p-3">
                <Search className="text-blue-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Smart Search</h4>
                <p className="text-gray-600 text-sm">Find courses quickly with our intelligent search and filtering system</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md animate-slide-up" style={{ animationDelay: '0.5s' }}>
              <div className="bg-green-100 rounded-lg p-3">
                <TrendingUp className="text-green-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Detailed Insights</h4>
                <p className="text-gray-600 text-sm">See workload, difficulty, and usefulness ratings for every course</p>
              </div>
            </div>

            <div className="flex items-start gap-4 p-6 bg-white rounded-xl shadow-md animate-slide-up" style={{ animationDelay: '0.6s' }}>
              <div className="bg-purple-100 rounded-lg p-3">
                <MessageCircle className="text-purple-600" size={24} />
              </div>
              <div>
                <h4 className="font-semibold text-lg mb-1">Q&A Community</h4>
                <p className="text-gray-600 text-sm">Ask questions and get answers from students who've taken the course</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-gray-900 mb-4">
              What Students Are Saying
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Real reviews from real CMU students
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-cmu-red animate-scale-in">
              <div className="flex items-center justify-between mb-4">
                <span className="bg-cmu-red text-white px-4 py-2 rounded-lg font-mono font-bold text-sm">15-213</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "This is THE course that will make you a real programmer. Yes, it's hard, but
                you'll learn more about how computers actually work than any other course."
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-8 h-8 bg-gradient-to-br from-cmu-red to-cmu-red-dark rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Verified CMU Student</div>
                  <div className="text-xs">Fall 2024</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-blue-600 animate-scale-in" style={{ animationDelay: '0.1s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-blue-600 text-white px-4 py-2 rounded-lg font-mono font-bold text-sm">15-251</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star size={18} className="text-gray-300" />
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "One of the most mind-bending courses at CMU. The material is fascinating -
                you'll learn about computation, cryptography, and complexity theory."
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-8 h-8 bg-gradient-to-br from-blue-600 to-blue-700 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Verified CMU Student</div>
                  <div className="text-xs">Fall 2024</div>
                </div>
              </div>
            </div>

            <div className="bg-white rounded-2xl shadow-lg p-8 hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-t-4 border-green-600 animate-scale-in md:col-span-2 lg:col-span-1" style={{ animationDelay: '0.2s' }}>
              <div className="flex items-center justify-between mb-4">
                <span className="bg-green-600 text-white px-4 py-2 rounded-lg font-mono font-bold text-sm">10-301</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={18} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 leading-relaxed mb-4">
                "Amazing introduction to machine learning! The professors are passionate, and the projects are super practical. Workload is heavy but totally worth it."
              </p>
              <div className="flex items-center gap-2 text-sm text-gray-500">
                <div className="w-8 h-8 bg-gradient-to-br from-green-600 to-green-700 rounded-full flex items-center justify-center">
                  <Users size={16} className="text-white" />
                </div>
                <div>
                  <div className="font-medium text-gray-900">Verified CMU Student</div>
                  <div className="text-xs">Spring 2024</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div className="py-20 bg-gradient-to-br from-cmu-red via-cmu-red to-cmu-red-dark text-white text-center relative overflow-hidden">
          <div className="absolute inset-0 opacity-10">
            <div className="absolute top-10 left-20 w-64 h-64 bg-white rounded-full blur-3xl"></div>
            <div className="absolute bottom-10 right-20 w-80 h-80 bg-white rounded-full blur-3xl"></div>
          </div>
          <div className="max-w-4xl mx-auto px-4 relative z-10">
            <h2 className="text-4xl md:text-5xl font-bold mb-6">
              Ready to Make Better Course Decisions?
            </h2>
            <p className="text-xl md:text-2xl text-white/90 mb-10 leading-relaxed">
              Join thousands of CMU students sharing their course experiences.
            </p>
            <Link
              to="/register"
              className="bg-white text-cmu-red px-10 py-4 rounded-lg font-bold text-lg hover:bg-gray-100 hover:shadow-2xl hover:scale-105 transition-all duration-300 inline-block shadow-xl"
            >
              Sign Up Now - It's Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
