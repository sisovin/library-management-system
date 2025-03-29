import { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publishedDate: string;
}

const useBooks = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      setLoading(true);
      try {
        const response = await axios.get('/api/books');
        setBooks(response.data);
      } catch (err) {
        setError('Failed to fetch books');
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  return { books, loading, error };
};

export default useBooks;
