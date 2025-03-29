import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import { fetchBookById, updateBookCover } from '../../../../lib/api/books';
import BookCard from '../../../../components/books/BookCard';

const BookDetailsPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [book, setBook] = useState(null);
  const [coverFile, setCoverFile] = useState(null);

  useEffect(() => {
    if (id) {
      const fetchData = async () => {
        const result = await fetchBookById(id);
        setBook(result);
      };

      fetchData();
    }
  }, [id]);

  const handleCoverUpload = async (event) => {
    event.preventDefault();
    if (coverFile) {
      const formData = new FormData();
      formData.append('cover', coverFile);

      await updateBookCover(id, formData);
      const updatedBook = await fetchBookById(id);
      setBook(updatedBook);
    }
  };

  return (
    <div className="p-4">
      {book ? (
        <>
          <h1 className="text-2xl font-bold mb-4">{book.title}</h1>
          <BookCard book={book} />
          <form onSubmit={handleCoverUpload}>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => setCoverFile(e.target.files[0])}
            />
            <button type="submit" className="mt-2 p-2 bg-blue-500 text-white rounded">
              Upload Cover
            </button>
          </form>
        </>
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default BookDetailsPage;
