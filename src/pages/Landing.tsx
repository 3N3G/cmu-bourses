import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Star, Shield, Users, Search } from 'lucide-react';

export function Landing() {
  const { user } = useAuth();

  return (
    <div className="min-h-[calc(100vh-4rem)]">
      {/* Hero Section */}
      <div className="bg-gradient-to-br from-cmu-red to-cmu-red-dark text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-5xl font-bold mb-6">
            Make Informed Course Decisions
          </h1>
          <p className="text-xl text-white/90 max-w-3xl mx-auto mb-8">
            Read honest, anonymous reviews from fellow CMU students. Share your experiences
            and help others navigate their academic journey.
          </p>
          {user ? (
            <Link
              to="/courses"
              className="bg-white text-cmu-red px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Browse Courses
            </Link>
          ) : (
            <Link
              to="/register"
              className="bg-white text-cmu-red px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Get Started with CMU Email
            </Link>
          )}
        </div>
      </div>

      {/* Features */}
      <div className="py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            Why Use CMU Course Reviews?
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="text-center p-6">
              <div className="bg-cmu-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Shield className="text-cmu-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Complete Anonymity</h3>
              <p className="text-gray-600">
                Share honest feedback without fear. Your identity is never revealed to anyone.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-cmu-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Users className="text-cmu-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">Verified CMU Students</h3>
              <p className="text-gray-600">
                Only verified CMU students can post reviews, ensuring authentic experiences.
              </p>
            </div>

            <div className="text-center p-6">
              <div className="bg-cmu-red/10 rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-4">
                <Search className="text-cmu-red" size={32} />
              </div>
              <h3 className="text-xl font-semibold mb-2">AI-Powered Moderation</h3>
              <p className="text-gray-600">
                Content is checked for academic integrity violations to keep the platform safe.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Sample Reviews */}
      <div className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h2 className="text-3xl font-bold text-center text-gray-900 mb-12">
            What Students Are Saying
          </h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-cmu-red">15-213</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 5 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                </div>
              </div>
              <p className="text-gray-700 italic">
                "This is THE course that will make you a real programmer. Yes, it's hard, but
                you'll learn more about how computers actually work than any other course."
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Verified CMU Student • Fall 2024
              </div>
            </div>

            <div className="bg-white rounded-lg shadow-md p-6">
              <div className="flex items-center justify-between mb-4">
                <span className="font-semibold text-cmu-red">15-251</span>
                <div className="flex items-center gap-1">
                  {Array.from({ length: 4 }).map((_, i) => (
                    <Star key={i} size={16} className="fill-yellow-400 text-yellow-400" />
                  ))}
                  <Star size={16} className="text-gray-300" />
                </div>
              </div>
              <p className="text-gray-700 italic">
                "One of the most mind-bending courses at CMU. The material is fascinating -
                you'll learn about computation, cryptography, and complexity theory."
              </p>
              <div className="mt-4 text-sm text-gray-500">
                Verified CMU Student • Fall 2024
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* CTA */}
      {!user && (
        <div className="py-16 bg-cmu-red text-white text-center">
          <div className="max-w-4xl mx-auto px-4">
            <h2 className="text-3xl font-bold mb-4">
              Ready to Make Better Course Decisions?
            </h2>
            <p className="text-lg text-white/90 mb-8">
              Join thousands of CMU students sharing their course experiences.
            </p>
            <Link
              to="/register"
              className="bg-white text-cmu-red px-8 py-3 rounded-md font-semibold text-lg hover:bg-gray-100 transition-colors inline-block"
            >
              Sign Up Now
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
