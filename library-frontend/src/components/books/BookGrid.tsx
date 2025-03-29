import React from 'react';
import BookCard from './BookCard';

interface Book {
  id: string;
  title: string;
  author: string;
  coverImageUrl: string;
  publishedDate: string;
}

interface BookGridProps {
  books: Book[];
}

const BookGrid: React.FC<BookGridProps> = ({ books }) => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
      {books.map((book) => (
        <BookCard
          key={book.id}
          title={book.title}
          author={book.author}
          coverImageUrl={book.coverImageUrl}
          publishedDate={book.publishedDate}
        />
      ))}
    </div>
  );
};

export default BookGrid;
