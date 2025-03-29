import React from 'react';

interface BookCardProps {
  title: string;
  author: string;
  coverImageUrl: string;
  publishedDate: string;
}

const BookCard: React.FC<BookCardProps> = ({ title, author, coverImageUrl, publishedDate }) => {
  return (
    <div className="bg-white shadow-md rounded-lg overflow-hidden">
      <img src={coverImageUrl} alt={`${title} cover`} className="w-full h-48 object-cover" />
      <div className="p-4">
        <h2 className="text-xl font-semibold">{title}</h2>
        <p className="text-gray-600">{author}</p>
        <p className="text-gray-500 text-sm">{publishedDate}</p>
      </div>
    </div>
  );
};

export default BookCard;
