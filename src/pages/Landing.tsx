import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, Shield, Users, MessageCircle } from 'lucide-react';

export function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-cmu-red text-white py-20">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            Make Informed Course Decisions
          </h1>
          <p className="text-lg text-white/90 max-w-2xl mx-auto mb-8">
            Read honest, anonymous reviews from fellow CMU students. Share your experiences
            and help others navigate their academic journey.
          </p>
          {user ? (
            <Link
              to="/courses"
              className="bg-white text-cmu-red px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Browse Courses
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-white text-cmu-red px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started with CMU Email
            </Link>
          )}

          {/* Stats */}
          <div className="mt-12 grid grid-cols-3 gap-8 max-w-xl mx-auto">
            <div>
              <div className="text-3xl font-bold">1000+</div>
              <div className="text-white/80 text-sm mt-1">Reviews</div>
            </div>
            <div>
              <div className="text-3xl font-bold">500+</div>
              <div className="text-white/80 text-sm mt-1">Courses</div>
            </div>
            <div>
              <div className="text-3xl font-bold">100%</div>
              <div className="text-white/80 text-sm mt-1">Anonymous</div>
            </div>
          </div>
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              Why Use CMU Course Reviews?
            </h2>
            <p className="text-gray-600">
              A trusted platform built by students, for students
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-cmu-red" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Complete Anonymity</h3>
              <p className="text-gray-600 text-sm">
                Share honest feedback without fear. Your identity is never revealed.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-cmu-red" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">Verified CMU Students</h3>
              <p className="text-gray-600 text-sm">
                Only verified CMU students can post reviews, ensuring authentic experiences.
              </p>
            </div>

            <div className="text-center">
              <div className="bg-gray-100 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <MessageCircle className="text-cmu-red" size={28} />
              </div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered Moderation</h3>
              <p className="text-gray-600 text-sm">
                Content is checked for academic integrity violations automatically.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-5xl mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-900 mb-3">
              What Students Are Saying
            </h2>
            <p className="text-gray-600">
              Real reviews from real CMU students
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-cmu-red text-white px-3 py-1 rounded text-sm font-mono font-semibold">15-213</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "This is THE course that will make you a real programmer. Yes, it's hard, but
                you'll learn more about how computers actually work than any other course."
              </p>
              <div className="text-xs text-gray-500">
                Verified CMU Student • Fall 2024
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-blue-600 text-white px-3 py-1 rounded text-sm font-mono font-semibold">15-251</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star size={14} className="text-gray-300" />
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "One of the most mind-bending courses at CMU. The material is fascinating -
                you'll learn about computation, cryptography, and complexity theory."
              </p>
              <div className="text-xs text-gray-500">
                Verified CMU Student • Fall 2024
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-sm p-6 border border-gray-200">
              <div className="flex items-center justify-between mb-3">
                <span className="bg-green-600 text-white px-3 py-1 rounded text-sm font-mono font-semibold">10-301</span>
                <div className="flex items-center gap-0.5">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={14} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 text-sm mb-3">
                "Amazing introduction to machine learning! The professors are passionate, and the projects are super practical."
              </p>
              <div className="text-xs text-gray-500">
                Verified CMU Student • Spring 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div className="py-16 bg-cmu-red text-white text-center">
          <div className="max-w-3xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make Better Course Decisions?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of CMU students sharing their course experiences.
            </p>
            <Link
              to="/register"
              className="bg-white text-cmu-red px-8 py-3 rounded-md font-semibold hover:bg-gray-100 transition-colors inline-block"
            >
              Sign Up Now - It's Free
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
