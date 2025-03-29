import React, { useState, useEffect } from 'react';
import axios from 'axios';

interface Book {
  id: number;
  title: string;
  author: string;
  publishedDate: string;
  isbn: string;
  coverImageUrl: string;
}

const BookCRUD: React.FC = () => {
  const [books, setBooks] = useState<Book[]>([]);
  const [newBook, setNewBook] = useState<Partial<Book>>({});
  const [editingBook, setEditingBook] = useState<Partial<Book> | null>(null);

  useEffect(() => {
    fetchBooks();
  }, []);

  const fetchBooks = async () => {
    try {
      const response = await axios.get('/api/books');
      setBooks(response.data);
    } catch (error) {
      console.error('Error fetching books:', error);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    if (editingBook) {
      setEditingBook({ ...editingBook, [name]: value });
    } else {
      setNewBook({ ...newBook, [name]: value });
    }
  };

  const handleCreateBook = async () => {
    try {
      const response = await axios.post('/api/books', newBook);
      setBooks([...books, response.data]);
      setNewBook({});
    } catch (error) {
      console.error('Error creating book:', error);
    }
  };

  const handleUpdateBook = async () => {
    if (!editingBook || !editingBook.id) return;
    try {
      const response = await axios.put(`/api/books/${editingBook.id}`, editingBook);
      setBooks(books.map(book => (book.id === editingBook.id ? response.data : book)));
      setEditingBook(null);
    } catch (error) {
      console.error('Error updating book:', error);
    }
  };

  const handleDeleteBook = async (id: number) => {
    try {
      await axios.delete(`/api/books/${id}`);
      setBooks(books.filter(book => book.id !== id));
    } catch (error) {
      console.error('Error deleting book:', error);
    }
  };

  return (
    <div>
      <h1>Book Management</h1>
      <div>
        <h2>{editingBook ? 'Edit Book' : 'Add New Book'}</h2>
        <input
          type="text"
          name="title"
          placeholder="Title"
          value={editingBook ? editingBook.title || '' : newBook.title || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="author"
          placeholder="Author"
          value={editingBook ? editingBook.author || '' : newBook.author || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="publishedDate"
          placeholder="Published Date"
          value={editingBook ? editingBook.publishedDate || '' : newBook.publishedDate || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="isbn"
          placeholder="ISBN"
          value={editingBook ? editingBook.isbn || '' : newBook.isbn || ''}
          onChange={handleInputChange}
        />
        <input
          type="text"
          name="coverImageUrl"
          placeholder="Cover Image URL"
          value={editingBook ? editingBook.coverImageUrl || '' : newBook.coverImageUrl || ''}
          onChange={handleInputChange}
        />
        <button onClick={editingBook ? handleUpdateBook : handleCreateBook}>
          {editingBook ? 'Update Book' : 'Add Book'}
        </button>
        {editingBook && <button onClick={() => setEditingBook(null)}>Cancel</button>}
      </div>
      <div>
        <h2>Books List</h2>
        <table>
          <thead>
            <tr>
              <th>Title</th>
              <th>Author</th>
              <th>Published Date</th>
              <th>ISBN</th>
              <th>Cover Image</th>
              <th>Actions</th>
            </tr>
          </thead>
          <tbody>
            {books.map(book => (
              <tr key={book.id}>
                <td>{book.title}</td>
                <td>{book.author}</td>
                <td>{book.publishedDate}</td>
                <td>{book.isbn}</td>
                <td>
                  <img src={book.coverImageUrl} alt={book.title} width="50" />
                </td>
                <td>
                  <button onClick={() => setEditingBook(book)}>Edit</button>
                  <button onClick={() => handleDeleteBook(book.id)}>Delete</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default BookCRUD;
