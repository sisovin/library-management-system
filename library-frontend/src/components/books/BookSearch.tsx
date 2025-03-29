import React from 'react';

interface BookSearchProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const BookSearch: React.FC<BookSearchProps> = ({ searchQuery, setSearchQuery }) => {
  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(event.target.value);
  };

  return (
    <div className="mb-4">
      <input
        type="text"
        value={searchQuery}
        onChange={handleInputChange}
        placeholder="Search for books..."
        className="w-full p-2 border border-gray-300 rounded"
      />
    </div>
  );
};

export default BookSearch;
