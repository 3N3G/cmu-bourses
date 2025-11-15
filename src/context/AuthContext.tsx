import { createContext, useContext, useState, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  register: (email: string, password: string) => Promise<boolean>;
  verifyEmail: () => void;
  logout: () => void;
  pendingVerification: string | null;
}

const AuthContext = createContext<AuthContextType | null>(null);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [pendingVerification, setPendingVerification] = useState<string | null>(null);

  const login = async (email: string, _password: string): Promise<boolean> => {
    // Simulate login - in real app would call API
    await new Promise(resolve => setTimeout(resolve, 800));

    if (email.endsWith('@andrew.cmu.edu') || email.endsWith('@cmu.edu')) {
      setUser({ email, isVerified: true });
      return true;
    }
    return false;
  };

  const register = async (email: string, _password: string): Promise<boolean> => {
    // Simulate registration
    await new Promise(resolve => setTimeout(resolve, 1000));

    if (email.endsWith('@andrew.cmu.edu') || email.endsWith('@cmu.edu')) {
      setPendingVerification(email);
      return true;
    }
    return false;
  };

  const verifyEmail = () => {
    if (pendingVerification) {
      setUser({ email: pendingVerification, isVerified: true });
      setPendingVerification(null);
    }
  };

  const logout = () => {
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, register, verifyEmail, logout, pendingVerification }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
}
