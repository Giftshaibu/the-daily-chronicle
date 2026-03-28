import { useState, useEffect, ReactNode } from 'react';
import { type AuthUser, getUserProfile } from '@/api/auth';
import { AuthContext } from "@/context/auth-context";

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<AuthUser | null>(null);
  const [token, setToken] = useState<string | null>(localStorage.getItem('token'));
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const savedToken = localStorage.getItem('token');
    if (savedToken) {
      // Re-validate the token by fetching the user profile
      getUserProfile()
        .then((u) => setUser(u))
        .catch(() => {
          // Token is invalid – clear storage
          localStorage.removeItem('token');
          localStorage.removeItem('user');
          setToken(null);
        })
        .finally(() => setIsLoading(false));
    } else {
      setIsLoading(false);
    }
  }, []);

  const setAuth = (newUser: AuthUser, newToken: string) => {
    localStorage.setItem('token', newToken);
    localStorage.setItem('user', JSON.stringify(newUser));
    setToken(newToken);
    setUser(newUser);
  };

  const clearAuth = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setToken(null);
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, token, isAuthenticated: !!user, isLoading, setAuth, clearAuth }}>
      {children}
    </AuthContext.Provider>
  );
}
