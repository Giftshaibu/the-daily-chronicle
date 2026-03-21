import { apiClient } from '@/lib/axios';
import { Post } from '@/types/api';

export const getPosts = async (): Promise<Post[]> => {
  return apiClient.get('/posts');
};

export const getPostBySlugOrId = async (slugOrId: string): Promise<Post> => {
  return apiClient.get(`/posts/${slugOrId}`);
};

export const searchPosts = async (query: string): Promise<Post[]> => {
  return apiClient.get(`/posts/search?q=${encodeURIComponent(query)}`);
};
