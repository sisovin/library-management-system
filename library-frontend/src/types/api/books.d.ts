export interface Book {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  isbn: string;
  coverImageUrl: string;
}

export interface CreateBookRequest {
  title: string;
  author: string;
  publishedDate?: string;
  isbn?: string;
  coverImageUrl?: string;
}

export interface UpdateBookRequest {
  title?: string;
  author?: string;
  publishedDate?: string;
  isbn?: string;
  coverImageUrl?: string;
}

export interface BookResponse {
  id: string;
  title: string;
  author: string;
  publishedDate: string;
  isbn: string;
  coverImageUrl: string;
}

export interface BookListResponse {
  books: Book[];
}
