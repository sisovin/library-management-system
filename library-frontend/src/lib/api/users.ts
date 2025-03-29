import apiClient from './client';

export const fetchUsers = async () => {
  const response = await apiClient.get('/users');
  return response.data;
};

export const fetchUserById = async (id: string) => {
  const response = await apiClient.get(`/users/${id}`);
  return response.data;
};

export const createUser = async (userData: { username: string; email: string; password: string }) => {
  const response = await apiClient.post('/users', userData);
  return response.data;
};

export const updateUser = async (id: string, userData: Partial<{ username: string; email: string; password: string }>) => {
  const response = await apiClient.put(`/users/${id}`, userData);
  return response.data;
};

export const deleteUser = async (id: string) => {
  const response = await apiClient.delete(`/users/${id}`);
  return response.data;
};
