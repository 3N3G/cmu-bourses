import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { GraduationCap, LogOut, User } from 'lucide-react';

export function Navbar() {
  const { user, logout } = useAuth();

  return (
    <nav className="bg-cmu-red text-white shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16">
          <div className="flex items-center">
            <Link to="/" className="flex items-center space-x-2">
              <GraduationCap size={28} />
              <span className="font-bold text-xl">CMU Course Reviews</span>
            </Link>
          </div>

          <div className="flex items-center space-x-4">
            {user ? (
              <>
                <Link
                  to="/courses"
                  className="hover:bg-cmu-red-dark px-3 py-2 rounded-md transition-colors"
                >
                  Browse Courses
                </Link>
                <div className="flex items-center space-x-2 bg-cmu-red-dark px-3 py-2 rounded-md">
                  <User size={16} />
                  <span className="text-sm">{user.email.split('@')[0]}</span>
                </div>
                <button
                  onClick={logout}
                  className="hover:bg-cmu-red-dark p-2 rounded-md transition-colors"
                  title="Logout"
                >
                  <LogOut size={18} />
                </button>
              </>
            ) : (
              <>
                <Link
                  to="/login"
                  className="hover:bg-cmu-red-dark px-4 py-2 rounded-md transition-colors"
                >
                  Login
                </Link>
                <Link
                  to="/register"
                  className="bg-white text-cmu-red px-4 py-2 rounded-md font-semibold hover:bg-gray-100 transition-colors"
                >
                  Sign Up
                </Link>
              </>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}
