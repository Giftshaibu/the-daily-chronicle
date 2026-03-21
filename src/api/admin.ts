import { apiClient } from '@/lib/axios';
import { AdminArticle, AdminUser, MediaItem, ActivityItem } from '@/types/admin';

// -------------- Articles ----------------
export const getAdminArticles = async (): Promise<AdminArticle[]> => {
  return apiClient.get('/admin/articles');
};

export const getAdminArticle = async (id: string): Promise<AdminArticle> => {
  return apiClient.get(`/admin/articles/${id}`);
};

export const createAdminArticle = async (data: FormData): Promise<{ message: string; id: string }> => {
  return apiClient.post('/admin/articles', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const updateAdminArticle = async (id: string, data: FormData): Promise<{ message: string }> => {
  data.append('_method', 'PUT'); // Laravel requirement for FormData PUT requests
  return apiClient.post(`/admin/articles/${id}`, data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteAdminArticle = async (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/admin/articles/${id}`);
};

// -------------- Users ----------------
export const getAdminUsers = async (): Promise<AdminUser[]> => {
  return apiClient.get('/admin/users');
};

export const updateAdminUser = async (id: string, data: { role: string }): Promise<{ message: string }> => {
  return apiClient.patch(`/admin/users/${id}`, data);
};

export const deleteAdminUser = async (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/admin/users/${id}`);
};

// -------------- Media ----------------
export const getAdminMedia = async (): Promise<MediaItem[]> => {
  return apiClient.get('/admin/media');
};

export const uploadAdminMedia = async (data: FormData): Promise<MediaItem> => {
  return apiClient.post('/admin/media', data, {
    headers: { 'Content-Type': 'multipart/form-data' },
  });
};

export const deleteAdminMedia = async (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/admin/media/${id}`);
};

// -------------- Activities ----------------
export const getAdminActivities = async (): Promise<ActivityItem[]> => {
  return apiClient.get('/admin/activities');
};

// -------------- Categories ----------------
import { Category } from '@/types/api';

export const getAdminCategories = async (): Promise<Category[]> => {
  return apiClient.get('/admin/categories');
};

export const createAdminCategory = async (data: { name: string; slug: string }): Promise<Category> => {
  return apiClient.post('/admin/categories', data);
};

export const updateAdminCategory = async (id: string, data: { name: string; slug: string }): Promise<Category> => {
  return apiClient.patch(`/admin/categories/${id}`, data);
};

export const deleteAdminCategory = async (id: string): Promise<{ message: string }> => {
  return apiClient.delete(`/admin/categories/${id}`);
};
