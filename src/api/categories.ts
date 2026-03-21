import { apiClient } from '@/lib/axios';
import { Category } from '@/types/api';

export const getCategories = async (): Promise<Category[]> => {
  return apiClient.get('/categories');
};

export const getCategoryBySlugOrId = async (slugOrId: string): Promise<Category> => {
  return apiClient.get(`/categories/${slugOrId}`);
};
