import { apiClient } from '@/lib/axios';
import { Post } from '@/types/api';

export const getPosts = async (params?: { category?: string }): Promise<Post[]> => {
  const category = params?.category?.trim();
  const query = category ? `?category=${encodeURIComponent(category)}` : '';
  return apiClient.get(`/posts${query}`);
};

export const getPostBySlugOrId = async (slugOrId: string): Promise<Post> => {
  return apiClient.get(`/posts/${slugOrId}`);
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  return apiClient.get(`/posts/search?q=${encodeURIComponent(query)}`);
};
