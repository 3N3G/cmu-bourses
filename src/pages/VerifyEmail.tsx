import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Mail, CheckCircle } from 'lucide-react';

export function VerifyEmail() {
  const { pendingVerification, verifyEmail } = useAuth();
  const navigate = useNavigate();

  const handleVerify = () => {
    verifyEmail();
    navigate('/courses');
  };

  if (!pendingVerification) {
    navigate('/login');
    return null;
  }

  return (
    <div className="min-h-[calc(100vh-4rem)] flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full bg-white rounded-lg shadow-md p-8 text-center">
        <div className="bg-cmu-red/10 rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6">
          <Mail className="text-cmu-red" size={40} />
        </div>

        <h2 className="text-2xl font-bold text-gray-900 mb-4">
          Check Your Email
        </h2>

        <p className="text-gray-600 mb-2">
          We've sent a verification link to:
        </p>
        <p className="font-semibold text-gray-900 mb-6">
          {pendingVerification}
        </p>

        <div className="bg-blue-50 border border-blue-200 rounded-md p-4 mb-6">
          <p className="text-sm text-blue-800">
            <strong>Demo Mode:</strong> Click the button below to simulate email verification.
          </p>
        </div>

        <button
          onClick={handleVerify}
          className="w-full bg-cmu-red text-white py-3 px-4 rounded-md font-semibold hover:bg-cmu-red-dark transition-colors flex items-center justify-center gap-2"
        >
          <CheckCircle size={20} />
          Verify Email (Demo)
        </button>

        <p className="mt-6 text-sm text-gray-500">
          Didn't receive the email? Check your spam folder or{' '}
          <button className="text-cmu-red hover:underline">resend verification</button>
        </p>
      </div>
    </div>
  );
}
