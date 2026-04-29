import { apiClient } from '@/lib/axios';

export interface AuthUser {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'author' | 'user';
  avatar?: string;
  email_verified_at?: string | null;
}

export interface AuthResponse {
  access_token: string;
  token_type: string;
  user: AuthUser;
}

export interface RegisterResponse extends AuthResponse {
  message: string;
  email_verified: boolean;
}

export const login = async (email: string, password: string): Promise<AuthResponse> => {
  return apiClient.post('/login', { email, password });
};

export const register = async (
  name: string,
  email: string,
  password: string,
  passwordConfirmation: string,
  redirectPath = '/'
): Promise<RegisterResponse> => {
  return apiClient.post('/register', {
    name,
    email,
    password,
    password_confirmation: passwordConfirmation,
    redirect_path: redirectPath,
  });
};

export const logout = async (): Promise<void> => {
  return apiClient.post('/logout');
};

export const getUserProfile = async (): Promise<AuthUser> => {
  return apiClient.get('/user');
};

export const forgotPassword = async (email: string): Promise<{ status: string }> => {
  return apiClient.post('/forgot-password', { email });
};

export const resetPassword = async (data: Record<string, string>): Promise<{ status: string }> => {
  return apiClient.post('/reset-password', data);
};

export const verifyEmail = async (url: string): Promise<{ status: string }> => {
  // Extract path and query params from the signed URL since baseURL is already '/api'
  // But wait! If `apiClient` adds `/api` automatically, we just need to send the request.
  // We can just use Axios directly or apiClient with the generated URL.
  // Laravel generates a full URL like `http://localhost:5173/verify-email/1/hash?signature=xyz`
  // We need to send it back to the API. 
  // Wait, let's just accept the full url from the component and use it with apiClient.
  return apiClient.get(url);
};

export const resendVerificationEmail = async (redirectPath = '/'): Promise<{ status: string }> => {
  return apiClient.post('/email/verification-notification', { redirect_path: redirectPath });
};

export const resendVerificationEmailWithToken = async (token: string, redirectPath = '/'): Promise<{ status: string }> => {
  return apiClient.post('/email/verification-notification', { redirect_path: redirectPath }, {
    headers: { Authorization: `Bearer ${token}` },
  });
};
