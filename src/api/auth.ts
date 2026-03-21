import { apiClient } from '@/lib/axios';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'user';
  avatar?: string;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return apiClient.post('/login', { email, password });
};

export const register = async (name: string, email: string, password: string): Promise<AuthResponse> => {
  return apiClient.post('/register', { name, email, password });
};

export const logout = async (): Promise<void> => {
  return apiClient.post('/logout');
};

export const getUserProfile = async (): Promise<AuthUser> => {
  return apiClient.get('/user');
};
