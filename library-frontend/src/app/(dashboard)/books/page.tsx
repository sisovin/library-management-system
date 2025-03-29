import React, { useState, useEffect } from 'react';
import BookCard from '../../../components/books/BookCard';
import BookSearch from '../../../components/books/BookSearch';
import { fetchBooks } from '../../../lib/api/books';

const BooksPage = () => {
  const [books, setBooks] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    const fetchData = async () => {
      const result = await fetchBooks(searchQuery);
      setBooks(result);
    };

    fetchData();
  }, [searchQuery]);

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Books</h1>
      <BookSearch searchQuery={searchQuery} setSearchQuery={setSearchQuery} />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
        {books.map((book) => (
          <BookCard key={book.id} book={book} />
        ))}
      </div>
    </div>
  );
};

export default BooksPage;
