import apiClient from './client';

export const fetchBooks = async () => {
  const response = await apiClient.get('/books');
  return response.data;
};

export const fetchBookById = async (id: string) => {
  const response = await apiClient.get(`/books/${id}`);
  return response.data;
};

export const createBook = async (bookData: any) => {
  const response = await apiClient.post('/books', bookData);
  return response.data;
};

export const updateBook = async (id: string, bookData: any) => {
  const response = await apiClient.put(`/books/${id}`, bookData);
  return response.data;
};

export const deleteBook = async (id: string) => {
  const response = await apiClient.delete(`/books/${id}`);
  return response.data;
};

export const searchBooks = async (query: string) => {
  const response = await apiClient.get(`/books/search?query=${query}`);
  return response.data;
};

export const uploadBookCover = async (id: string, coverFile: File) => {
  const formData = new FormData();
  formData.append('cover', coverFile);

  const response = await apiClient.post(`/books/${id}/upload-cover`, formData, {
    headers: {
      'Content-Type': 'multipart/form-data',
    },
  });
  return response.data;
};
